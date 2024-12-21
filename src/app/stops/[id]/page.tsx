// src/app/stops/[id]/page.tsx
import { RouteBox } from '@/components/RouteBox';
import { getStopRoutes } from '@/lib/data';
import Link from 'next/link';

interface StopPageProps {
  params: {
    id: string;
  };
}

export default async function StopPage({ params }: StopPageProps) {
  const routes = await getStopRoutes(params.id);

  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="w-full h-14 bg-gray-100 sticky top-0 z-20">
        <Link 
          href="/"
          className="px-6 py-3 text-gray-800 text-lg absolute top-2 left-2"
        >
          ← Back
        </Link>
      </div>
      <div className="flex flex-col w-full">
        {routes.map((route) => (
          <RouteBox key={route.id} {...route} />
        ))}
      </div>
    </div>
  );
}