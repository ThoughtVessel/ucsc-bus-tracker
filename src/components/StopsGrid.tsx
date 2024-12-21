// src/components/StopsGrid.tsx
import { BusStopCard } from './BusStopCard';

interface Stop {
  id: string;
  name: string;
}

interface StopsGridProps {
  stops: Stop[];
}

export function StopsGrid({ stops }: StopsGridProps) {
  return (
    <div className="w-full h-screen bg-gray-900">
      <div className="grid grid-cols-2 w-full">
        {stops.map((stop) => (
          <BusStopCard 
            key={stop.id}
            id={stop.id}
            name={stop.name}
          />
        ))}
      </div>
    </div>
  );
}