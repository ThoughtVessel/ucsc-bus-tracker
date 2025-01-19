// src/app/stops/[id]/page.tsx
import { Suspense } from 'react';
import { LiveStopContent } from '@/components/LiveStopContent';
import { getStopById } from '@/lib/data';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function StopPage({ params }: PageProps) {
  // Await the params promise to get the id
  const { id } = await params;
  
  const stop = getStopById(id);
  
  if (!stop) {
    throw new Error('Stop not found');
  }

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
        <LiveStopContent initialStop={stop} />
      </Suspense>
    </div>
  );
}