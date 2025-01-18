import { Suspense } from 'react';
import Link from 'next/link';
import { RouteBox } from '@/components/RouteBox';
import { getStopRoutes, getStopById } from '@/lib/data';

interface StopPageProps {
  params: {
    id: string;
  };
}

interface GroupedRoute {
  id: string;
  description: string;
  location: string;
  times: number[];
  color: string;
}

async function StopContent({ id }: { id: string }) {
  try {
    const stop = getStopById(id);
    if (!stop) {
      throw new Error('Stop not found');
    }

    const routes = await getStopRoutes(id);

    // Group routes by ID and sort times
    const groupedRoutes = routes.reduce<Record<string, GroupedRoute>>((acc, route) => {
      const key = route.id;
      if (!acc[key]) {
        acc[key] = {
          ...route,
          times: [route.time]
        };
      } else {
        acc[key].times.push(route.time);
        acc[key].times.sort((a, b) => a - b);
      }
      return acc;
    }, {});

    return (
      <>
        <div className="w-full bg-gray-100 sticky top-0 z-20 shadow-sm">
          <h1 className="text-2xl font-bold text-center py-4 text-gray-900">
            {stop.name}
          </h1>
        </div>
        <div className="flex flex-col w-full pb-24">
          {Object.values(groupedRoutes).length > 0 ? (
            Object.values(groupedRoutes).map((route) => (
              <RouteBox 
                key={route.id}
                {...route}
                times={route.times}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-600">
              No upcoming buses at this time
            </div>
          )}
        </div>
        <div className="fixed bottom-8 left-0 right-0 flex justify-center">
          <Link 
            href="/"
            className="bg-gray-800/90 text-white px-8 py-3 rounded-full text-lg font-medium 
                     hover:bg-gray-700/90 transition-colors duration-200 backdrop-blur-sm
                     shadow-lg"
          >
            All Stops
          </Link>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error loading stop data:', error);
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">Error loading stop information</h2>
          <p className="mt-2 text-gray-600">Unable to load bus predictions at this time</p>
          <Link 
            href="/"
            className="mt-4 inline-block rounded-full bg-gray-800/90 px-8 py-3 text-white 
                     hover:bg-gray-700/90 transition-colors duration-200"
          >
            All Stops
          </Link>
        </div>
      </div>
    );
  }
}

export default async function StopPage({ params }: StopPageProps) {
  const { id } = await params;
  
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading stop information...</p>
          </div>
        </div>
      }>
        <StopContent id={id} />
      </Suspense>
    </div>
  );
}