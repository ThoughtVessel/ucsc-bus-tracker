// src/components/RouteBox.tsx

interface RouteBoxProps {
  id: string;
  description: string;
  location: string;
  times: number[];
  color: string;
}

export function RouteBox({ id, description, location, times, color }: RouteBoxProps) {
  return (
    <div className={`flex items-center justify-between w-full px-8 py-6 ${color}`}>
      <div className="flex flex-col gap-1">
        <span className="text-white text-5xl font-bold">{id}</span>
        <span className="text-white/90 text-lg pl-1">{location}</span>
        <span className="text-white text-2xl font-medium pl-1 mt-1">{description}</span>
      </div>
      <div className="flex flex-col items-center justify-center min-w-[12rem]">
        <div className="text-white text-5xl font-medium">
          {times.join(', ')}
        </div>
        <span className="text-white/90 text-lg">minutes</span>
      </div>
    </div>
  );
}