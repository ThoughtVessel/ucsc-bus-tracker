// src/lib/types.ts

export interface Route {
  id: string;
  description: string;
  location: string;
  time: number;
  color: string;
}

export interface BusStop {
  id: string;
  name: string;
  routes?: Route[];
}

export interface BusStopResponse {
  stops: BusStop[];
}

export interface RouteResponse {
  routes: Route[];
}