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

interface CombinedPrediction {
  id: string;
  description: string;
  location: string;
  time: number;
  color: string;
  stopName: string;
  direction?: string;
}

// Helper function to format prediction descriptions
function formatPredictionDescription(pred: BusTimePrediction): string {
  const routeName = ROUTE_NAMES[pred.rt] || pred.rt;
  return `${routeName} - ${pred.des}`;
}

// Helper function to determine if predictions should be combined
function shouldCombinePredictions(pred1: CombinedPrediction, pred2: CombinedPrediction): boolean {
  const timeThreshold = 3; // minutes
  return pred1.id === pred2.id && 
         Math.abs(pred1.time - pred2.time) <= timeThreshold;
}

export async function getStops(): Promise<Stop[]> {
  // Return our predefined list of stops
  return DISPLAY_STOPS.map(stop => ({
    id: stop.id,
    name: stop.name
  }));
}

export async function getStopRoutes(stopId: string): Promise<Route[]> {
  try {
    // Check if this is a grouped stop
    const groupedStop = Object.values(STOP_GROUPINGS).find(group => group.id === stopId);
    
    if (groupedStop) {
      // Fetch predictions for all stops in the group
      const predictionsPromises = groupedStop.stops.map(async stop => {
        try {
          const response = await fetch(
            `${BUS_API_CONFIG.apiUrl}/getpredictions?key=${BUS_API_CONFIG.apiKey}&stpid=${stop.busstopId}${
              BUS_API_CONFIG.rtpidatafeed ? `&rtpidatafeed=${BUS_API_CONFIG.rtpidatafeed}` : ''
            }`
          );
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          
          if (data.error) {
            console.error(`Error fetching predictions for stop ${stop.name}:`, data.error);
            return [];
          }

          return (data['bustime-response'].prd || []).map((pred: BusTimePrediction): CombinedPrediction => ({
            id: pred.rt,
            description: formatPredictionDescription(pred),
            location: pred.stpnm,
            time: parseInt(pred.prdctdn),
            color: ROUTE_COLORS[pred.rt] || 'bg-gray-500',
            stopName: stop.name,
            direction: pred.des
          }));
        } catch (error) {
          console.error(`Error fetching predictions for stop ${stop.busstopId}:`, error);
          return [];
        }
      });

      const predictions = await Promise.all(predictionsPromises);
      const allPredictions = predictions.flat().sort((a, b) => a.time - b.time);

      // Combine and deduplicate predictions
      const combinedPredictions: Route[] = [];
      const processedPredictions = new Set<string>();

      allPredictions.forEach(pred => {
        const predictionKey = `${pred.id}-${pred.time}-${pred.direction}`;
        
        if (processedPredictions.has(predictionKey)) {
          return;
        }

        const existingPred = combinedPredictions.find(
          existing => shouldCombinePredictions(existing as CombinedPrediction, pred)
        );

        if (existingPred) {
          // Update existing prediction with the earlier time
          existingPred.time = Math.min(existingPred.time, pred.time);
          // Only add stop name if it's different
          if (!existingPred.location.includes(pred.stopName)) {
            existingPred.location = `${existingPred.location} & ${pred.stopName}`;
          }
        } else {
          // Add new prediction
          combinedPredictions.push({
            id: pred.id,
            description: pred.description,
            location: pred.stopName,
            time: pred.time,
            color: pred.color
          });
        }

        processedPredictions.add(predictionKey);
      });

      return combinedPredictions;

    } else {
      // Handle single stop case
      const singleStop = SINGLE_STOPS.find(stop => stop.id === stopId);
      
      if (!singleStop) {
        throw new Error(`No stop found for ID ${stopId}`);
      }

      const response = await fetch(
        `${BUS_API_CONFIG.apiUrl}/getpredictions?key=${BUS_API_CONFIG.apiKey}&stpid=${singleStop.busstopId}${
          BUS_API_CONFIG.rtpidatafeed ? `&rtpidatafeed=${BUS_API_CONFIG.rtpidatafeed}` : ''
        }`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.msg);
      }

      const predictions = data['bustime-response'].prd || [];

      return predictions.map((pred: BusTimePrediction): Route => ({
        id: pred.rt,
        description: formatPredictionDescription(pred),
        location: pred.stpnm,
        time: parseInt(pred.prdctdn),
        color: ROUTE_COLORS[pred.rt] || 'bg-gray-500'
      }));
    }
  } catch (error) {
    console.error('Failed to fetch predictions:', error);
    return [];
  }
}

// Helper function for development/testing
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