// src/services/busService.ts

import { BusStop, Route, BusStopResponse, RouteResponse } from '../lib/types';

export async function getBusStops(): Promise<BusStop[]> {
  // Replace with your actual API endpoint
  const response = await fetch('YOUR_API_URL/stops');
  const data: BusStopResponse = await response.json();
  return data.stops;
}

export async function getStopRoutes(stopId: string): Promise<Route[]> {
  // Replace with your actual API endpoint
  const response = await fetch(`YOUR_API_URL/stops/${stopId}/routes`);
  const data: RouteResponse = await response.json();
  return data.routes;
}