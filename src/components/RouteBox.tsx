interface RouteBoxProps {
  id: string;
  description: string;
  times: number[];
  color: string;
}

export function RouteBox({ id, description, times, color }: RouteBoxProps) {
  return (
    <div className={`flex items-center justify-between w-full px-4 sm:px-8 py-4 sm:py-6 ${color}`}>
      <div className="flex flex-col gap-1">
        <span className="text-white text-3xl sm:text-5xl font-bold">{id}</span>
        <span className="hidden sm:block text-white text-lg sm:text-2xl font-medium pl-1 mt-1">{description}</span>
      </div>
      <div className="flex flex-col items-center justify-center min-w-[8rem] sm:min-w-[12rem]">
        <div className="text-white text-3xl sm:text-5xl font-medium">
          {times.join(', ')}
        </div>
        <span className="text-white/90 text-base sm:text-lg">minutes</span>
      </div>
    </div>
  );
}

export default RouteBox;