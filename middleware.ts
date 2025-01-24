// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the hostname from the request (e.g., 'your-app.vercel.app')
  const hostname = request.headers.get('host')

  // Check if the hostname includes 'vercel.app'
  if (hostname?.includes('vercel.app')) {
    // Get the current path (everything after the domain)
    const pathname = request.nextUrl.pathname
    
    // Construct the new URL with the desired domain
    const newUrl = `https://gigatransit.com${pathname}`
    
    // Return a redirect response
    return NextResponse.redirect(newUrl)
  }
}

// Configure which paths the middleware runs on
export const config = {
  // Match all request paths except for those starting with:
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  // Add other paths you want to exclude as needed
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}