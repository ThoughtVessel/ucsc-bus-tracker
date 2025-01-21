//src/components/RouteBox.tsx
interface RouteBoxProps {
  id: string;
  description: string;
  times: number[];
  color: string;
}

export function RouteBox({ id, description, times, color }: RouteBoxProps) {
  //If you want to replace zero times with a word, modify here.
  //const formattedTimes = times.map(time => time === 0 ? 'Now' : time);
  const formattedTimes = times;
  return (
    <div className={`flex items-center justify-between w-full px-4 sm:px-8 py-4 sm:py-6 ${color}`}>
      <div className="flex flex-col gap-1">
        <span className="text-white text-3xl sm:text-5xl font-bold">{id}</span>
        <span className="sm:block text-white text-base sm:text-2xl">{description}</span>
      </div>
      <div className="flex flex-col items-center justify-center min-w-[8rem] sm:min-w-[12rem]">
        <div className="text-white text-3xl sm:text-5xl font-medium">
          {formattedTimes.join(', ')}
        </div>
        <span className="text-white/90 text-base sm:text-lg">minutes</span>
      </div>
    </div>
  );
}

export default RouteBox;