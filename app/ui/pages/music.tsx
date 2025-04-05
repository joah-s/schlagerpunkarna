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
                {textData.timeline.discografi.map((album, i) => (
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

          {/* Mobile Version with vertical timeline */}
          <div className="md:hidden space-y-12 ">
            <div className=" relative ">
              {textData.timeline.discografi.map((album, i) => (
                <div key={i} className="mb-24  w-full">
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
      </div>
    </div>
  );
}
