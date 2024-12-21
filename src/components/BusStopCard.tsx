// src/components/BusStopCard.tsx
import Link from 'next/link';

interface BusStopCardProps {
  id: string;
  name: string;
}

export function BusStopCard({ id, name }: BusStopCardProps) {
  return (
    <Link 
      href={`/stops/${id}`}
      className="relative h-24 border-[0.5px] border-gray-700 overflow-hidden group"
    >
      <div className="absolute inset-0 bg-navy-800 group-hover:bg-navy-700">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute transform rotate-45 w-full h-1 bg-white/20" />
          <div className="absolute transform -rotate-45 w-full h-1 bg-white/20" />
        </div>
      </div>
      <div className="relative z-10 h-full flex items-center px-4">
        <span className="text-white text-lg font-medium">{name}</span>
      </div>
    </Link>
  );
}