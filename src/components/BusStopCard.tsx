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
      className="relative h-24 border-[0.5px] border-[#FDC700]/60 overflow-hidden group
                backdrop-blur-sm shadow-lg transition-all duration-200"
    >
      <div className="absolute inset-0 bg-[#003C6C]/90 group-hover:bg-[#004d89]/90 
                      transition-colors duration-200">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute transform rotate-45 w-full h-1 bg-[#FDC700]" />
          <div className="absolute transform -rotate-45 w-full h-1 bg-[#FDC700]" />
        </div>
      </div>
      <div className="relative z-10 h-full flex items-center px-4">
        <span className="text-white text-lg font-medium">{name}</span>
      </div>
    </Link>
  );
}
