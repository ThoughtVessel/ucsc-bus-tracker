// src/lib/data.ts

import { 
  BUS_API_CONFIG, 
  STOP_GROUPINGS, 
  DISPLAY_STOPS,
  ROUTE_COLORS, 
  SINGLE_STOPS 
} from './busConfig';
import { debug } from './debug';

interface Route {
  id: string;
  description: string;
  location: string;
  time: number;
  color: string;
}

interface Stop {
  id: string;
  name: string;
}

interface BusTimePrediction {
  tmstmp: string;
  typ: string;
  stpid: string;
  stpnm: string;
  vid: string;
  dstp: number;
  rt: string;
  des: string;
  prdtm: string;
  tablockid: string;
  tatripid: string;
  dly: boolean;
  prdctdn: string;
  zone: string;
}

interface CacheEntry {
  data: Route[];
  timestamp: number;
}

interface StopGroup {
  id: string;
  stops: string[]; // List of busstopIds
  name: string;
}

// Constants
const CACHE_DURATION = 60 * 1000; // 1 minute
const MAX_STOPS_PER_REQUEST = 10;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Batch groups definition
const BATCH_GROUPS: StopGroup[] = [
  {
    id: 'upper-campus',
    name: 'Upper Campus Stops',
    stops: [
      '1509', '2673', // Kresge
      '1615', '2674', // Science Hill
      '1616', '2675', // College Nine
      '1617',         // Crown Merrill
      '2672'          // Kerr Hall
    ]
  },
  {
    id: 'central-campus',
    name: 'Central Campus Stops',
    stops: [
      '2102', '2676', // Bookstore
      '2101',         // East Field
      '1501', '2677'  // East Remote
    ]
  },
  {
    id: 'lower-campus',
    name: 'Lower Campus Stops',
    stops: [
      '2669', '2678', // Farm
      '1342',         // Lower Campus
      '1341', '2375', // Main Gate
      '1510', '2374', // High & Western
      '2739'          // High & Tosca
    ]
  },
  {
    id: 'west-campus',
    name: 'West Campus Stops',
    stops: [
      '1385', '2328', // Arboretum
      '1505', '2670', // Oakes
      '2516',         // Family Housing
      '2448', '2671'  // Rachel Carson
    ]
  }
];

// Create stop to group mapping
const STOP_TO_GROUP_MAP = new Map<string, StopGroup>();
BATCH_GROUPS.forEach(group => {
  group.stops.forEach(stopId => {
    STOP_TO_GROUP_MAP.set(stopId, group);
  });
});

// Cache for storing predictions
const predictionCache = new Map<string, CacheEntry>();

// Helper Functions
const formatPredictionDescription = (pred: BusTimePrediction): string => {
  return pred.des;
};

const cleanupCache = () => {
  const now = Date.now();
  for (const [groupId, entry] of predictionCache.entries()) {
    if (now - entry.timestamp > CACHE_DURATION) {
      predictionCache.delete(groupId);
      debug.log('cache', `Invalidated cache for group ${groupId}`);
    }
  }
};

const fetchWithRetry = async (url: string): Promise<Response> => {
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
      debug.error(`Request failed (attempt ${i + 1}/${MAX_RETRIES}): ${response.status}`);
    } catch (error) {
      if (error instanceof Error) {
        debug.error(`Fetch attempt ${i + 1}/${MAX_RETRIES} failed:`, error);
      } else {
        debug.error(`Fetch attempt ${i + 1}/${MAX_RETRIES} failed:`, String(error));
      }
      if (i === MAX_RETRIES - 1) throw error;
    }
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (i + 1)));
  }
  throw new Error('Max retries reached');
};

// Main Functions
async function fetchPredictionsForGroup(group: StopGroup): Promise<Route[]> {
  try {
    debug.log(`\n📡 Fetching predictions for group: ${group.id}`);
    
    // Split into chunks of 10 stops if needed (API limit)
    const stopChunks = [];
    for (let i = 0; i < group.stops.length; i += MAX_STOPS_PER_REQUEST) {
      stopChunks.push(group.stops.slice(i, i + MAX_STOPS_PER_REQUEST));
    }
    debug.log(`📦 Split into ${stopChunks.length} chunks due to API limit`);

    // Fetch predictions for each chunk
    const allPredictions = await Promise.all(
      stopChunks.map(async (chunk, index) => {
        const stopsString = chunk.join(',');
        const url = `${BUS_API_CONFIG.apiUrl}/getpredictions?key=${BUS_API_CONFIG.apiKey}&format=${BUS_API_CONFIG.format}&stpid=${stopsString}`;
        
        debug.log(`🌐 Making API request ${index + 1}/${stopChunks.length} for stops: ${stopsString}`);
        
        const response = await fetchWithRetry(url);
        const data = await response.json();
        const predictions = data['bustime-response'].prd || [];
        debug.log(`✅ Received ${predictions.length} predictions from API for chunk ${index + 1}`);
        return predictions;
      })
    );

    // Process and combine predictions
    const routes = allPredictions
      .flat()
      .map((pred: BusTimePrediction): Route => ({
        id: pred.rt,
        description: formatPredictionDescription(pred),
        location: pred.stpnm,
        time: parseInt(pred.prdctdn),
        color: ROUTE_COLORS[pred.rt] || 'bg-gray-500'
      }))
      .sort((a, b) => a.time - b.time);

    debug.log(`📊 Processed ${routes.length} total predictions for group ${group.id}`);

    // Cache the results
    predictionCache.set(group.id, {
      data: routes,
      timestamp: Date.now()
    });
    debug.log(`💾 Cached predictions for group ${group.id}`);

    return routes;
  } catch (error) {
    // Type guard to ensure error is of acceptable type
    const errorMessage = error instanceof Error 
      ? error 
      : new Error(String(error));
      
    debug.error(`Error fetching predictions for group ${group.id}:`, errorMessage);
    
    const cached = predictionCache.get(group.id);
    if (cached) {
      debug.log(`⚠️ Using stale cache as fallback for group ${group.id}`);
      return cached.data;
    }
    debug.log(`⚠️ No cache available for fallback, returning empty array`);
    return [];
  }
}

export async function getStops(): Promise<Stop[]> {
  return DISPLAY_STOPS.map(stop => ({
    id: stop.id,
    name: stop.name
  }));
}

export async function getStopRoutes(stopId: string): Promise<Route[]> {
  debug.log(`\n🚌 getStopRoutes called for stopId: ${stopId}`);

  // Clean up expired cache entries before proceeding
  cleanupCache();
  
  // Convert from display stopId to actual busstopId
  let busstopId: string | undefined;
  let stopName: string | undefined;
  
  // Check if it's a grouped stop
  const groupedStop = Object.values(STOP_GROUPINGS).find(group => group.id === stopId);
  if (groupedStop) {
    busstopId = groupedStop.stops[0].busstopId;
    stopName = groupedStop.name;
    debug.log(`📍 Found grouped stop: ${stopName} (busstopId: ${busstopId})`);
  } else {
    // Check single stops
    const singleStop = SINGLE_STOPS.find(stop => stop.id === stopId);
    if (singleStop) {
      busstopId = singleStop.busstopId;
      stopName = singleStop.name;
      debug.log(`📍 Found single stop: ${stopName} (busstopId: ${busstopId})`);
    }
  }

  if (!busstopId || !stopName) {
    debug.error(`No stop found for ID ${stopId}`);
    throw new Error(`No stop found for ID ${stopId}`);
  }

  // Find which batch group this stop belongs to
  const group = STOP_TO_GROUP_MAP.get(busstopId);
  if (!group) {
    debug.error(`No batch group found for stop ${busstopId}`);
    throw new Error(`No batch group found for stop ${busstopId}`);
  }
  debug.log(`🔍 Stop belongs to batch group: ${group.id}`);

  // Check cache for the group
  const cached = predictionCache.get(group.id);
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    debug.log(`📦 Using cached data for group ${group.id} (age: ${(Date.now() - cached.timestamp) / 1000}s)`);
    const filteredResults = cached.data.filter(route => route.location.includes(stopName));
    debug.log(`📊 Found ${filteredResults.length} predictions in cache for ${stopName}`);
    return filteredResults;
  }

  debug.log(`🔄 Cache miss or expired - fetching fresh data for group ${group.id}`);
  // Fetch fresh data for the entire group
  const groupPredictions = await fetchPredictionsForGroup(group);
  
  // Filter results for requested stop
  const filteredResults = groupPredictions.filter(route => route.location.includes(stopName));
  debug.log(`📊 Found ${filteredResults.length} predictions in fresh data for ${stopName}`);
  return filteredResults;
}

export function getStopById(stopId: string): Stop | undefined {
  const groupedStop = Object.values(STOP_GROUPINGS).find(group => group.id === stopId);
  if (groupedStop) {
    return {
      id: groupedStop.id,
      name: groupedStop.name
    };
  }
  
  const singleStop = SINGLE_STOPS.find(stop => stop.id === stopId);
  if (singleStop) {
    return {
      id: singleStop.id,
      name: singleStop.name
    };
  }
  
  return undefined;
}