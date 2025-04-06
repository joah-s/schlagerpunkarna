'use client';

import { textData } from "@/app/lib/textData";
import AlbumCard from "./AlbumCard";
import { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Music() {
  const [isMobile, setIsMobile] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: false, amount: 0.3 });
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -600, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 600, behavior: 'smooth' });
  };

  // Handle scroll events to show/hide arrows
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      // Show left arrow only if not at the beginning
      setShowLeftArrow(scrollLeft > 10);

      // Show right arrow only if not at the end
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

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

  useEffect(() => {
    // Add scroll event listener to the scroll container
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);

      // Initial check for arrow visibility
      handleScroll();

      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  // Split the heading into words for animation
  const headingWords = textData.timeline.heading.split(' ');

  return (
    <div className="relative px-[2%] md:px-[5rem] lg:px-16 min-h-screen bg-gradient-to-t from-black to-purple-900">
      <div className="relative py-16">
        {/* Header section */}
        <section className="py-16" ref={inViewRef}>
          {isMobile ? (
            // No animation for mobile
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 md:mb-8 uppercase tracking-wider text-white font-Viga">
              {textData.timeline.heading}
            </h2>
          ) : (
            // Animated version for larger screens
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 md:mb-8 uppercase tracking-wider text-white font-Viga">
              {headingWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </h2>
          )}

          {isMobile ? (
            // No animation for mobile
            <div className="mb-12">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 font-semibold font-Viga tracking-wide">
                {textData.timeline.paragraph}
              </p>
            </div>
          ) : (
            // Animated version for larger screens
            <motion.div
              className=" mb-12"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 font-semibold font-Viga tracking-wide">
                {textData.timeline.paragraph}
              </p>
            </motion.div>
          )}
        </section>

        <div className="relative">
          {/* Desktop Version with horizontal scroll */}
          <div className="hidden md:block relative">
            {/* Scroll Arrows */}
            <AnimatePresence>
              {showLeftArrow && (
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    scrollLeft();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/60 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 pointer-events-auto"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronLeft className="w-8 h-8" />
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showRightArrow && (
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    scrollRight();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/60 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 pointer-events-auto"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight className="w-8 h-8" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Scroll Container */}
            <div
              ref={scrollRef}
              className="overflow-x-auto scrollbar-thin scrollbar-track-gray-800/30 scrollbar-thumb-purple-500/50 hover:scrollbar-thumb-purple-500 pb-4 pt-8 scroll-smooth snap-x snap-mandatory"
            >
              <div className="inline-flex gap-4 py-4">
                {textData.timeline.discografi
                  .filter((album) => album.clickable)
                  .map((album, i) => (
                    <div key={i} className="flex-shrink-0 w-60 snap-start">
                      <AlbumCard
                        src={album.imgSrc}
                        title={album.name}
                        description={album.description}
                        year={album.year}
                        link={album.link ? album.link : "#"}
                        songs={album.songs}
                        clickable={album.clickable}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Mobile Version with vertical layout */}
          <div className="md:hidden space-y-12">
            {textData.timeline.discografi
              .filter((album) => album.clickable)
              .map((album, i) => (
                <div key={i} className="w-full mb-8">
                  <AlbumCard
                    src={album.imgSrc}
                    title={album.name}
                    description={album.description}
                    year={album.year}
                    link={album.link ? album.link : "#"}
                    songs={album.songs}
                    clickable={album.clickable}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Spotify Button */}
        <div className="flex justify-center mt-12">
          <a 
            href="https://open.spotify.com/artist/schlagerpunkarna" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#1DB954] hover:bg-[#1ed760] text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Lyssna på Spotify
          </a>
        </div>
      </div>
    </div>
  );
}
