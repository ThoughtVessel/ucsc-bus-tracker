'use client';
// src/components/LiveStopContent.tsx
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { RouteBox } from '@/components/RouteBox';
import type { Route } from '@/lib/types';

interface GroupedRoute {
  id: string;
  description: string;
  location: string;
  times: number[];
  color: string;
}

interface LiveStopContentProps {
  initialStop: {
    id: string;
    name: string;
  };
}

export function LiveStopContent({ initialStop }: LiveStopContentProps) {
  const [groupedRoutes, setGroupedRoutes] = useState<Record<string, GroupedRoute>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  //const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchStopData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/stops/${initialStop.id}`);
      if (!response.ok) throw new Error('Failed to fetch stop data');
      
      const routes: Route[] = await response.json();
      
      // Group routes by ID and sort times
      const grouped = routes.reduce<Record<string, GroupedRoute>>((acc, route) => {
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
      
      setGroupedRoutes(grouped);
      setError(null);
      //setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [initialStop.id]);

  useEffect(() => {
    fetchStopData();
    const interval = setInterval(fetchStopData, 15000); // Update every 15 seconds
    
    return () => clearInterval(interval);
  }, [fetchStopData]); // Now fetchStopData is properly included in dependencies

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">Error loading stop information</h2>
          <p className="mt-2 text-gray-600">{error}</p>
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

  return (
    <>
      <div className="w-full bg-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="px-4">
          <h1 className="text-2xl font-bold text-center py-4 text-gray-900">
            {initialStop.name}
          </h1>
        </div>
      </div>
      <div className="flex flex-col w-full pb-24">
        {loading && Object.keys(groupedRoutes).length === 0 && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}
        {!loading && Object.values(groupedRoutes).length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            No upcoming buses at this time
          </div>
        ) : (
          Object.values(groupedRoutes).map((route) => (
            <RouteBox 
              key={route.id}
              {...route}
              times={route.times}
            />
          ))
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
}