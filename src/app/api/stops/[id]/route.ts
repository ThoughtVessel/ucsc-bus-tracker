// src/app/api/stops/[id]/route.ts
import { getStopRoutes } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const routes = await getStopRoutes(id);
    return NextResponse.json(routes);
  } catch (error) {
    console.error('Error fetching stop data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stop data' },
      { status: 500 }
    );
  }
}