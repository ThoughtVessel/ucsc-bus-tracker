// src/app/page.tsx

import { BusStopsGrid } from '@/components/BusStopsGrid/BusStopsGrid';
import { getBusStops } from '@/services/busService';

export default async function Home() {
  const stops = await getBusStops();
  
  return (
    <main>
      <BusStopsGrid stops={stops} />
    </main>
  );
}