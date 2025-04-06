'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Header from '../../header';
import Footer from './footer';
import { textData } from "../../lib/textData";
import AlbumCard from './AlbumCard';
import Link from 'next/link';
import NameCollector from '../components/NameCollector';

export default function Historia() {
  const [isMobile, setIsMobile] = useState(false);
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: false, amount: 0.3 });
  
  // Split the heading into words for animation
  const headingWords = "Historia".split(' ');

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      // Set initial state
      setIsMobile(window.innerWidth < 640);

      // Add resize listener
      const handleResize = () => {
        setIsMobile(window.innerWidth < 640);
      };

      window.addEventListener('resize', handleResize);

      // Clean up
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <main className="relative text-white">
      <Header />
      <div className="relative px-4 md:px-16 lg:px-16 min-h-screen bg-gradient-to-t from-black to-purple-900">
        {/* Back Button */}
        <Link 
          href="/" 
          className="fixed bottom-8 left-8 z-50 bg-black/50 backdrop-blur-sm px-8 py-4 rounded-lg hover:bg-black/70 transition-all duration-300 flex items-center gap-4 group border border-purple-500/30 hover:border-purple-500/50"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          <span className="text-white font-Viga">Tillbaka</span>
        </Link>

        <div className="relative py-16">
          <section className="py-16" ref={inViewRef}>
            {isMobile ? (
              // No animation for mobile
              <h2 className="flex items-center justify-center md:justify-start text-5xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-Viga tracking-tight mb-4 sm:mb-6 md:mb-8 uppercase tracking-wider text-white">
                Historia
              </h2>
            ) : (
              // Animated version for larger screens
              <h2 className="flex items-center justify-center md:justify-start text-5xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-Viga tracking-tight mb-4 sm:mb-6 md:mb-8 uppercase tracking-wider text-white">
                {headingWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="inline-block mr-4"
                  >
                    {word}
                  </motion.span>
                ))}
              </h2>
            )}

            {isMobile ? (
              // No animation for mobile
              <div className="mb-8">
                <p className="flex items-center justify-center md:justify-start text-center md:text-left text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 font-semibold font-Viga tracking-wide">
                  Lär känna vår historia och resa genom åren.
                </p>
              </div>
            ) : (
              // Animated version for larger screens
              <motion.div
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <p className="text-base text-center md:text-left sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 font-semibold font-Viga tracking-wide">
                  Lär känna vår historia och resa genom åren.
                </p>
              </motion.div>
            )}
          </section>

          {/* Timeline Section */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500/30 to-purple-500/10"></div>

            {/* Timeline Items */}
            <div className="space-y-24">
              {textData.timeline.discografi.map((album, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group flex justify-center"
                >
                  {/* Timeline Dot and Year */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-4 z-20">
                    <div className="w-4 h-4 bg-purple-500 rounded-full group-hover:scale-125 transition-transform duration-300 relative">
                      <div className="absolute inset-0 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    </div>
                    <div className="text-white font-Viga text-lg font-bold whitespace-nowrap">
                      {album.year}
                    </div>
                  </div>

                  {/* Connecting Lines */}
                  {index < textData.timeline.discografi.length - 1 && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-24 w-1 bg-gradient-to-b from-purple-500/30 to-purple-500/10 -bottom-24 z-0"></div>
                  )}

                  {/* Content Container */}
                  <div className="relative max-w-4xl w-full mt-8">
                    <div className="flex flex-col md:flex-row gap-0">
                      {/* Album Info */}
                      <div className="bg-black/50 backdrop-blur-sm p-8 rounded-l-lg md:rounded-r-none rounded-r-lg md:rounded-r-lg shadow-xl flex-1 hover:bg-black/60 transition-colors duration-300">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                          <div className="w-48 h-48 flex-shrink-0 group">
                            <img
                              src={album.imgSrc}
                              alt={album.name}
                              className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-4 font-Viga group-hover:text-purple-400 transition-colors duration-300">{album.name}</h3>
                            <p className="text-purple-400 mb-4 font-Viga md:hidden">{album.year}</p>
                            <p className="text-gray-300 font-Viga">{album.description}</p>
                          </div>
                        </div>
                      </div>

                      {/* Songs List */}
                      {album.songs && album.songs.length > 0 && (
                        <div className="bg-black/50 backdrop-blur-sm p-8 rounded-r-lg md:rounded-l-none rounded-l-lg md:rounded-l-lg shadow-xl w-full md:w-80 flex-shrink-0 hover:bg-black/60 transition-colors duration-300 border-l-2 border-purple-500/30">
                          <h4 className="text-xl font-semibold text-white mb-4 font-Viga group-hover:text-purple-400 transition-colors duration-300">Låtar:</h4>
                          <ul className="space-y-4">
                            {album.songs.map((song, songIndex) => (
                              <li 
                                key={songIndex} 
                                className="text-gray-300 flex justify-between items-center font-Viga hover:text-white transition-colors duration-300"
                              >
                                <span className="text-purple-400 mr-4">{song.number}.</span>
                                <span className="flex-1">{song.title}</span>
                                <span className="text-gray-400 text-sm">{song.length}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div id="form">
              <NameCollector />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
} 