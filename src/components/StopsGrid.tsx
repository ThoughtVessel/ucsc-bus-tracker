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
    <div className="min-h-screen bg-white"> {/* Darker shade of UC Blue */}
      <div className="grid grid-cols-2 w-full gap-4 p-4">
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