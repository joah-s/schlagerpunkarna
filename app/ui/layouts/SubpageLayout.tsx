'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Header from '../../header';

// Lazy load components
const Footer = dynamic(() => import('../pages/footer'), {
  loading: () => <div className="w-full min-h-[20vh] bg-black animate-pulse" />
});

const NameCollector = dynamic(() => import('../components/NameCollector'), {
  loading: () => <div className="w-full min-h-[30vh] bg-gray-900 animate-pulse" />
});

interface SubpageLayoutProps {
  children: React.ReactNode;
  showNameCollector?: boolean;
}

export default function SubpageLayout({ children, showNameCollector = true }: SubpageLayoutProps) {
  return (
    <main className="relative text-white">
      <Header />
      <div className="relative px-4 md:px-16 lg:px-16 min-h-screen bg-gradient-to-t from-black to-purple-900">
        <Suspense fallback={<div className="w-full min-h-[50vh] bg-gray-900 animate-pulse" />}>
          {children}
        </Suspense>
        
        {showNameCollector && (
          <div id="form">
            <Suspense fallback={<div className="w-full min-h-[30vh] bg-gray-900 animate-pulse" />}>
              <NameCollector />
            </Suspense>
          </div>
        )}
      </div>
      <Suspense fallback={<div className="w-full min-h-[20vh] bg-black animate-pulse" />}>
        <Footer />
      </Suspense>
    </main>
  );
} 