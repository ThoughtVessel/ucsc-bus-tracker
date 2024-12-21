// src/lib/data.ts

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

export async function getStops(): Promise<Stop[]> {
  // Replace with your actual API call
  return [
    { id: '1', name: 'Luzern' },
    { id: '2', name: 'Lausanne' },
    // Add more stops...
  ];
}

export async function getStopRoutes(stopId: string): Promise<Route[]> {
  // Replace with your actual API call
  return [
    { 
      id: '12', 
      description: 'Athens Chapel',
      location: 'Demetrius St / Hermia St', 
      time: 4, 
      color: 'bg-rose-400'
    },
    { 
      id: 'FL', 
      description: 'Forest Line',
      location: 'King St / Queen St', 
      time: 2, 
      color: 'bg-teal-700'
    },
    // Add more routes...
  ];
}