// src/components/RouteBox.tsx

interface RouteBoxProps {
  id: string;
  description: string;
  location: string;
  time: number;
  color: string;
}

export function RouteBox({ id, description, location, time, color }: RouteBoxProps) {
  return (
    <div className={`flex items-center justify-between w-full px-8 py-6 ${color}`}>
      <div className="flex flex-col gap-1">
        <span className="text-white text-5xl font-bold">{id}</span>
        <span className="text-white/90 text-lg pl-1">{location}</span>
        <span className="text-white text-2xl font-medium pl-1 mt-1">{description}</span>
      </div>
      <div className="flex flex-col items-center justify-center w-32">
        <span className="text-white text-5xl font-medium">{time}</span>
        <span className="text-white/90 text-lg">minutes</span>
      </div>
    </div>
  );
}