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
    //UCSC stops
    { id: '1', name: 'Science Hill' },
    { id: '2', name: 'College 9 & 10' },
    { id: '3', name: 'Kresge' },
    { id: '4', name: 'Crown / Merril Colleges' },
    { id: '5', name: 'Kerr Hall' },
    { id: '6', name: 'Cowell / Stevenson Colleges' },
    { id: '7', name: 'Rachel Carson / Porter Colleges' },
    { id: '8', name: 'East Field House' },
    { id: '9', name: 'Family Student Housing' },
    { id: '10', name: 'East Remote Parking' },
    { id: '11', name: 'Oakes College' },
    { id: '12', name: 'The Farm' },
    { id: '13', name: '' },
    { id: '14', name: 'Coolidge Dr & Hagar Ct' },
    { id: '16', name: 'Main Entrance' },
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