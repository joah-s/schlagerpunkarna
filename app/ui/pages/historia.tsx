'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Header from '../../header';
import Footer from './footer';
import { textData } from "../../lib/textData";
import AlbumCard from './AlbumCard';
import Link from 'next/link';
import NameCollector from '../components/NameCollector';

export default function Historia() {
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: true, amount: 0.3 });

  return (
    <main className="relative text-white">
      <Header />
      <div className="relative px-[2%] md:px-[5rem] lg:px-16 min-h-screen bg-gradient-to-t from-black to-purple-900">
        {/* Back Button */}
        <Link 
          href="/" 
          className="fixed bottom-8 left-8 z-50 bg-black/50 backdrop-blur-sm px-6 py-3 rounded-lg hover:bg-black/70 transition-all duration-300 flex items-center gap-2 group border border-purple-500/30 hover:border-purple-500/50"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" 
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
            <motion.h2
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 md:mb-8 uppercase tracking-wider text-white font-Viga text-center md:text-left"
            >
              Historia
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-12"
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 font-semibold font-Viga tracking-wide text-center md:text-left max-w-3xl">
                Lär känna vår historia och resa genom åren.
              </p>
            </motion.div>
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
                      <div className="bg-black/50 backdrop-blur-sm p-6 rounded-l-lg md:rounded-r-none rounded-r-lg md:rounded-r-lg shadow-xl flex-1 hover:bg-black/60 transition-colors duration-300">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                          <div className="w-48 h-48 flex-shrink-0 group">
                            <img
                              src={album.imgSrc}
                              alt={album.name}
                              className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-2 font-Viga group-hover:text-purple-400 transition-colors duration-300">{album.name}</h3>
                            <p className="text-purple-400 mb-2 font-Viga md:hidden">{album.year}</p>
                            <p className="text-gray-300 font-Viga">{album.description}</p>
                          </div>
                        </div>
                      </div>

                      {/* Songs List */}
                      {album.songs && album.songs.length > 0 && (
                        <div className="bg-black/50 backdrop-blur-sm p-6 rounded-r-lg md:rounded-l-none rounded-l-lg md:rounded-l-lg shadow-xl w-full md:w-80 flex-shrink-0 hover:bg-black/60 transition-colors duration-300 border-l-2 border-purple-500/30">
                          <h4 className="text-xl font-semibold text-white mb-4 font-Viga group-hover:text-purple-400 transition-colors duration-300">Låtar:</h4>
                          <ul className="space-y-2">
                            {album.songs.map((song, songIndex) => (
                              <li 
                                key={songIndex} 
                                className="text-gray-300 flex justify-between items-center font-Viga hover:text-white transition-colors duration-300"
                              >
                                <span className="text-purple-400 mr-2">{song.number}.</span>
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