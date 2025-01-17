// src/lib/data.ts

import { 
  BUS_API_CONFIG, 
  STOP_MAPPINGS,
  STOP_GROUPINGS, 
  DISPLAY_STOPS,
  ROUTE_COLORS, 
  ROUTE_NAMES,
  SINGLE_STOPS 
} from './busConfig';

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

// New interfaces for optimization
interface CacheEntry {
  data: Route[];
  timestamp: number;
}

interface StopGroup {
  id: string;
  stops: string[]; // List of busstopIds
  name: string;
}

// Constants for optimization
const CACHE_DURATION = 60 * 1000; // 1 minute
const MAX_STOPS_PER_REQUEST = 10;

// Batch groups definition
const BATCH_GROUPS: StopGroup[] = [
  // Upper Campus Group
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
  // Central Campus Group
  {
    id: 'central-campus',
    name: 'Central Campus Stops',
    stops: [
      '2102', '2676', // Bookstore
      '2101',         // East Field
      '1501', '2677'  // East Remote
    ]
  },
  // Lower Campus Group
  {
    id: 'lower-campus',
    name: 'Lower Campus Stops',
    stops: [
      '2669', '2678', // Farm
      '1342',         // Lower Campus
      '1341', '2375', // Main Gate
      '1510', '2374'  // High & Western
    ]
  },
  // West Campus Group
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

// Helper function to format prediction descriptions
function formatPredictionDescription(pred: BusTimePrediction): string {
  const routeName = ROUTE_NAMES[pred.rt] || pred.rt;
  return `${routeName} - ${pred.des}`;
}

async function fetchPredictionsForGroup(group: StopGroup): Promise<Route[]> {
  try {
    console.log(`\n📡 Fetching predictions for group: ${group.id}`);
    
    // Split into chunks of 10 stops if needed (API limit)
    const stopChunks = [];
    for (let i = 0; i < group.stops.length; i += MAX_STOPS_PER_REQUEST) {
      stopChunks.push(group.stops.slice(i, i + MAX_STOPS_PER_REQUEST));
    }
    console.log(`📦 Split into ${stopChunks.length} chunks due to API limit`);

    // Fetch predictions for each chunk
    const allPredictions = await Promise.all(
      stopChunks.map(async (chunk, index) => {
        const stopsString = chunk.join(',');
        const url = `${BUS_API_CONFIG.apiUrl}/getpredictions?key=${BUS_API_CONFIG.apiKey}&format=${BUS_API_CONFIG.format}&stpid=${stopsString}`;
        
        console.log(`🌐 Making API request ${index + 1}/${stopChunks.length} for stops: ${stopsString}`);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const predictions = data['bustime-response'].prd || [];
        console.log(`✅ Received ${predictions.length} predictions from API for chunk ${index + 1}`);
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

    console.log(`📊 Processed ${routes.length} total predictions for group ${group.id}`);

    // Cache the results for the entire group
    predictionCache.set(group.id, {
      data: routes,
      timestamp: Date.now()
    });
    console.log(`💾 Cached predictions for group ${group.id}`);

    return routes;
  } catch (error) {
    console.error(`❌ Error fetching predictions for group ${group.id}:`, error);
    // Return cached data if available
    const cached = predictionCache.get(group.id);
    if (cached) {
      console.log(`⚠️ Using stale cache as fallback for group ${group.id}`);
      return cached.data;
    }
    console.log(`⚠️ No cache available for fallback, returning empty array`);
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
  console.log(`\n🚌 getStopRoutes called for stopId: ${stopId}`);
  
  // Convert from display stopId to actual busstopId
  let busstopId: string | undefined;
  let stopName: string | undefined;
  
  // Check if it's a grouped stop
  const groupedStop = Object.values(STOP_GROUPINGS).find(group => group.id === stopId);
  if (groupedStop) {
    busstopId = groupedStop.stops[0].busstopId;
    stopName = groupedStop.name;
    console.log(`📍 Found grouped stop: ${stopName} (busstopId: ${busstopId})`);
  } else {
    // Check single stops
    const singleStop = SINGLE_STOPS.find(stop => stop.id === stopId);
    if (singleStop) {
      busstopId = singleStop.busstopId;
      stopName = singleStop.name;
      console.log(`📍 Found single stop: ${stopName} (busstopId: ${busstopId})`);
    }
  }

  if (!busstopId || !stopName) {
    console.error(`❌ No stop found for ID ${stopId}`);
    throw new Error(`No stop found for ID ${stopId}`);
  }

  // Find which batch group this stop belongs to
  const group = STOP_TO_GROUP_MAP.get(busstopId);
  if (!group) {
    console.error(`❌ No batch group found for stop ${busstopId}`);
    throw new Error(`No batch group found for stop ${busstopId}`);
  }
  console.log(`🔍 Stop belongs to batch group: ${group.id}`);

  // Check cache for the group
  const cached = predictionCache.get(group.id);
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    console.log(`📦 Using cached data for group ${group.id} (age: ${(Date.now() - cached.timestamp) / 1000}s)`);
    // Filter cached results for requested stop
    const filteredResults = cached.data.filter(route => route.location.includes(stopName));
    console.log(`📊 Found ${filteredResults.length} predictions in cache for ${stopName}`);
    return filteredResults;
  }

  console.log(`🔄 Cache miss or expired - fetching fresh data for group ${group.id}`);
  // Fetch fresh data for the entire group
  const groupPredictions = await fetchPredictionsForGroup(group);
  
  // Filter results for requested stop
  const filteredResults = groupPredictions.filter(route => route.location.includes(stopName));
  console.log(`📊 Found ${filteredResults.length} predictions in fresh data for ${stopName}`);
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