// src/app/page.tsx
import { StopsGrid } from '@/components/StopsGrid';
import { getStops } from '@/lib/data';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
//import { FileSpreadsheet } from 'lucide-react';
import { MessageSquare } from 'lucide-react';

export default async function HomePage() {
  const stops = await getStops();
  
  return (
    <main>
      <div className="w-full bg-white top-0 z-20 shadow-sm">
        <div className="px-4">
          <h1 className="text-2xl font-bold text-center py-4 text-gray-900">
            UCSC Bus Tracker
          </h1>
        </div>
      </div>
      <StopsGrid stops={stops} />
      <div className="mt-12 border-t border-gray-200">
        <div className="mx-auto max-w-2xl py-4 text-center">
          <p className="mt-2 text-gray-600">
            Developed by <span className="font-medium">Andrew Robinson</span>
          </p>
          
          <div className="mt-4 flex justify-center gap-4">
            <Link 
              href="https://github.com/thoughtvessel" 
              className="rounded-full bg-gray-100 p-3 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900"
              aria-label="Personal GitHub"
            >
              <FaGithub className="h-5 w-5" />
            </Link>
            
            <Link 
              href="https://www.linkedin.com/in/andrew-robinson314/" 
              className="rounded-full bg-[#0A66C2] p-3 text-white transition-colors hover:bg-[#004182]"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-5 w-5" />
            </Link>
          </div>
          {/*
          <Link 
            href="https://github.com/ThoughtVessel/ucsc-bus-tracker" 
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-2 text-sm text-white transition-colors hover:bg-gray-700"
          >
            <FaGithub className="h-4 w-4" />
            View Project Source
          </Link>
          */}

          <Link 
            href="https://docs.google.com/forms/d/e/1FAIpQLSc7N91OV_D9zlDQSm8xPMmUvIJzYk9ll3DEkvMLSaJBXyvVvw/viewform?usp=dialog" 
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-2 text-sm text-white transition-colors hover:bg-gray-700"
          >
            <MessageSquare className="h-4 w-4" />
            Share Feedback
          </Link>
        </div>
      </div>
    </main>
  );
}