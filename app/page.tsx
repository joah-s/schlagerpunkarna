'use client';

import Land from '@/app/ui/pages/land'
import Intro from '@/app/ui/pages/intro'
import Characters from '@/app/ui/pages/characters'
import Music from '@/app/ui/pages/music'
import Reviews from '@/app/ui/pages/reviews'
import Videos from '@/app/ui/pages/videos'
import Form from '@/app/ui/pages/form'
import Footer from '@/app/ui/pages/footer'
import Header from './header'
import { motion, useSpring } from 'framer-motion';
import Head from "next/head";
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import NameCollector from './ui/pages/NameCollector';



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
    <main className="relative text-white ">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Viga&display=swap" rel="stylesheet" />
      </Head>

      <Header />
      <motion.div
        className={`fixed bottom-0 right-3 mb-3 z-50 transition-all duration-300 hidden sm:block ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <button
          ref={buttonRef}
          onClick={scrollToTop}
          className="text-white bg-gray-800 hover:bg-gray-700 rounded-full shadow-lg drop-shadow-xl p-4 
                    hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 
                    focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900"
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
        <Land />
      </div>
      <div id="omoss">
        <div id="intro">
          <Intro />
        </div>
        <div id="medlemmar">
          <Characters />
        </div>
        <div id="recensioner" className="hidden md:block">
          <Reviews />
        </div>
      </div>
      <div id="diskografi">
        <div id="musik">
          <Music />
        </div>
        <div id="filmer">
          <Videos />
        </div>
      </div>
      <div id="kontakt">
        <div id="form">
          <NameCollector />
        </div>
        <div className="w-full py-12 bg-gradient-to-t from-purple-900 to-black">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 px-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link 
                href="/historia"
                className="block w-full px-8 py-4 text-lg font-bold text-white bg-purple-700 hover:bg-purple-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-center"
              >
                Vår Historia
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link 
                href="/boka"
                className="block w-full px-8 py-4 text-lg font-bold text-white bg-purple-700 hover:bg-purple-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-center"
              >
                Boka Oss
              </Link>
            </motion.div>
          </div>
        </div>
        <div id="footer">
          <Footer />
        </div>
      </div>
    </main >
  );
}
