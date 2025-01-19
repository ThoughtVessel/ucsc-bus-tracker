// src/lib/types.ts
export interface Route {
  id: string;
  description: string;
  location: string;
  time: number;
  color: string;
}

export interface Stop {
  id: string;
  name: string;
}