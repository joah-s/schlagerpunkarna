'use client';

import dynamic from 'next/dynamic';
import { motion, useSpring } from 'framer-motion';
import Head from "next/head";
import { useRef, useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Header from './header';

// Lazy load components
const Land = dynamic(() => import('@/app/ui/pages/land'), {
  loading: () => <div className="w-full h-screen bg-black animate-pulse" />
});

const Intro = dynamic(() => import('@/app/ui/pages/intro'), {
  loading: () => <div className="w-full min-h-[50vh] bg-gray-900 animate-pulse" />
});

const Characters = dynamic(() => import('@/app/ui/pages/characters'), {
  loading: () => <div className="w-full min-h-[50vh] bg-gray-900 animate-pulse" />
});

const Music = dynamic(() => import('@/app/ui/pages/music'), {
  loading: () => <div className="w-full min-h-[50vh] bg-gray-900 animate-pulse" />
});

const Reviews = dynamic(() => import('@/app/ui/pages/reviews'), {
  loading: () => <div className="w-full min-h-[50vh] bg-gray-900 animate-pulse" />
});

const Videos = dynamic(() => import('@/app/ui/pages/videos'), {
  loading: () => <div className="w-full min-h-[50vh] bg-gray-900 animate-pulse" />
});

const Form = dynamic(() => import('@/app/ui/pages/form'), {
  loading: () => <div className="w-full min-h-[50vh] bg-gray-900 animate-pulse" />
});

const Footer = dynamic(() => import('@/app/ui/pages/footer'), {
  loading: () => <div className="w-full min-h-[20vh] bg-black animate-pulse" />
});

const NameCollector = dynamic(() => import('./ui/components/NameCollector'), {
  loading: () => <div className="w-full min-h-[30vh] bg-gray-900 animate-pulse" />
});

function scrollToElement(id: string) {
  const element = document.getElementById(id);

  if (element) {
    const offsetTop = element.offsetTop;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth"
    });
  }
}

export default function Page() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <main className="relative text-white">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Viga&display=swap" rel="stylesheet" />
      </Head>

      <Header />
      <motion.div
        className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <button
          ref={buttonRef}
          onClick={scrollToTop}
          className="text-white bg-gray-800 hover:bg-gray-700 rounded-full shadow-lg drop-shadow-xl p-4 
                    hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 
                    focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900 hidden sm:block"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6 transform transition-transform duration-300 hover:-translate-y-1"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </motion.div>
      <div id="land">
        <Suspense fallback={<div className="w-full h-screen bg-black animate-pulse" />}>
          <Land />
        </Suspense>
      </div>
      <div id="about">
        <div id="intro">
          <Suspense fallback={<div className="w-full min-h-[50vh] bg-gray-900 animate-pulse" />}>
            <Intro />
          </Suspense>
        </div>
        <div id="members">
          <Suspense fallback={<div className="w-full min-h-[50vh] bg-gray-900 animate-pulse" />}>
            <Characters />
          </Suspense>
        </div>
        <div id="reviews">
          <Suspense fallback={<div className="w-full min-h-[50vh] bg-gray-900 animate-pulse" />}>
            <Reviews />
          </Suspense>
        </div>
      </div>
      <div id="discography">
        <div id="music">
          <Suspense fallback={<div className="w-full min-h-[50vh] bg-gray-900 animate-pulse" />}>
            <Music />
          </Suspense>
        </div>
        <div id="videos">
          <Suspense fallback={<div className="w-full min-h-[50vh] bg-gray-900 animate-pulse" />}>
            <Videos />
          </Suspense>
        </div>
      </div>
      <div id="contact">
        <div id="petition">
          <Suspense fallback={<div className="w-full min-h-[30vh] bg-gray-900 animate-pulse" />}>
            <NameCollector />
          </Suspense>
        </div>

        <div id="footer">
          <Suspense fallback={<div className="w-full min-h-[20vh] bg-black animate-pulse" />}>
            <Footer />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
