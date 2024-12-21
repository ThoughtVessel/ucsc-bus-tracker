// src/components/BusStopsGrid/BusStopsGrid.tsx

import { useRouter } from 'next/navigation';
import { BusStop } from '@/lib/types';

interface BusStopsGridProps {
  stops: BusStop[];
}

export const BusStopsGrid = ({ stops }: BusStopsGridProps) => {
  const router = useRouter();

  return (
    <div className="w-full h-screen bg-gray-900">
      <div className="grid grid-cols-2 w-full">
        {stops.map((stop) => (
          <button 
            key={stop.id}
            onClick={() => router.push(`/stops/${stop.id}`)}
            className="relative h-24 border-[0.5px] border-gray-700 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-navy-800 group-hover:bg-navy-700">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute transform rotate-45 w-full h-1 bg-white/20" />
                <div className="absolute transform -rotate-45 w-full h-1 bg-white/20" />
              </div>
            </div>
            <div className="relative z-10 h-full flex items-center px-4">
              <span className="text-white text-lg font-medium">{stop.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};