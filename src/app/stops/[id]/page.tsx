// src/app/stops/[id]/page.tsx
import { RouteBox } from '@/components/RouteBox';
import { getStopRoutes } from '@/lib/data';
import Link from 'next/link';

interface StopPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Add interface for grouped route
interface GroupedRoute {
  id: string;
  description: string;
  location: string;
  times: number[];
  color: string;
}

export default async function StopPage({ params }: StopPageProps) {
  const { id } = await params;
  const stopId = String(id);

  try {
    const routes = await getStopRoutes(stopId);

    // Group routes by ID with proper typing
    const groupedRoutes = routes.reduce<Record<string, GroupedRoute>>((acc, route) => {
      const key = route.id;
      if (!acc[key]) {
        acc[key] = {
          ...route,
          times: [route.time]
        };
      } else {
        acc[key].times.push(route.time);
        // Sort times in ascending order
        acc[key].times.sort((a: number, b: number) => a - b);
      }
      return acc;
    }, {});

    return (
      <div className="w-full h-screen bg-gray-100">
        <div className="w-full h-14 bg-gray-100 sticky top-0 z-20">
          <Link 
            href="/"
            className="px-6 py-3 text-gray-800 text-lg absolute top-2 left-2"
          >
            ← All Stops
          </Link>
        </div>
        <div className="flex flex-col w-full">
          {Object.values(groupedRoutes).map((route) => (
            <RouteBox 
              key={route.id} 
              {...route} 
              times={route.times}
            />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold">Error loading stop information</h2>
          <Link 
            href="/"
            className="mt-4 inline-block rounded-md bg-blue-500 px-4 py-2 text-white"
          >
            Back to Stops
          </Link>
        </div>
      </div>
    );
  }
}