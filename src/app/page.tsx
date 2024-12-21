// src/app/page.tsx
import { StopsGrid } from '@/components/StopsGrid';
import { getStops } from '@/lib/data';

export default async function HomePage() {
  const stops = await getStops();
  
  return <StopsGrid stops={stops} />;
}