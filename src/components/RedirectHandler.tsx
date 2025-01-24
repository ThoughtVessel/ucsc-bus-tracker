"use client"
import { useEffect } from 'react'

export default function RedirectHandler() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
      window.location.replace('https://gigatransit.com' + window.location.pathname);
    }
  }, []);
  
  return null;
}