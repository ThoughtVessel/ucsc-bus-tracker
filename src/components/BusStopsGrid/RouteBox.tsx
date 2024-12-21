// src/components/BusStopsGrid/RouteBox.tsx

import { Route } from '@/lib/types';

interface RouteBoxProps {
  route: Route;
}

export const RouteBox = ({ route }: RouteBoxProps) => (
  <div className={`flex items-start justify-between w-full px-8 py-6 ${route.color}`}>
    <div className="flex flex-col gap-1">
      <span className="text-white text-5xl font-bold">{route.id}</span>
      <span className="text-white/90 text-lg pl-1">{route.location}</span>
      <span className="text-white text-2xl font-medium pl-1 mt-1">{route.description}</span>
    </div>
    <div className="flex flex-col items-center -mr-4">
      <span className="text-white text-5xl font-medium">{route.time}</span>
      <span className="text-white/90 text-lg">minutes</span>
    </div>
  </div>
);