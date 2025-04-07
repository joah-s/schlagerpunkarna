"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ContainerScroll } from "../container-scroll-animation";
import { textData } from '../../lib/textData';
import Link from 'next/link';

// Remove the space addition since the words already have spaces in the text
const words = textData.intro.heading.split(' ');

export default function Intro() {
  const [isMobile, setIsMobile] = useState(false);
  const targetRef = useRef(null);
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: false, amount: 0.3 });

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

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  // Modified opacity transform but keeping scale at 1 to prevent size changes
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  return (

    <div className="px-4 md:px-16 lg:px-16 relative overflow-hidden" ref={targetRef}>
      {/* Video background for desktop */}
      <div className="hidden md:block">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="ml-36 absolute inset-0 z-[1] bg-gradient-to-t from-black via-transparent to-black opacity-100"></div>
          <div className="ml-36 absolute inset-0 z-[1] bg-gradient-to-r from-black via-transparent to-black opacity-100"></div>
          <video
            className="ml-36 w-full h-full object-cover"
            autoPlay
            loop
            muted
            src="/SPjump.mp4"
            playsInline={true}
          />
        </div>
      </div>

      <section className="py-16 md:py-16 lg:py-16 rounded-lg relative z-10" ref={inViewRef}>
        {isMobile ? (
          // No animation for mobile
          <h2 className="flex items-center justify-center md:justify-start text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-Viga tracking-tight mb-4 sm:mb-6 md:mb-8 uppercase tracking-tight text-white text-center">
            {textData.intro.heading}
          </h2>
        ) : (
          // Animated version for larger screens
          <motion.h2
            style={{ opacity, scale }}
            className=" items-center justify-center md:justify-start text-5xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-Viga tracking-tight mb-4 sm:mb-6 md:mb-8 uppercase tracking-tight text-white text-white text-center md:text-left md:items-start"
          >
            {words.map((word, i) => (
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
          </motion.h2>
        )}

        {isMobile ? (
          // No animation for mobile
          <div className="space-y-8 max-w-3xl">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 font-semibold font-Viga tracking-wide text-center md:text-left md:items-start">
              {textData.intro.paragraph[0]}
            </p>
            <div className="mt-8 space-y-4">
              {textData.intro.paragraph.slice(1).map((point, index) => (
                <div
                  key={index}
                  className="flex items-start text-sm sm:text-base md:text-lg leading-relaxed text-gray-300 font-Viga"
                >
                  <span className="text-purple-400 mr-4 text-xl mt-0.5">•</span>
                  <span className="flex-1">{point}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Animated version for larger screens
          <motion.div
            className="space-y-8 max-w-3xl"
            style={{ y, opacity }}
          >
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 font-semibold font-Viga tracking-wide text-center md:text-left md:items-start"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {textData.intro.paragraph[0]}
            </motion.p>
            <motion.div className="mt-8 space-y-4">
              {textData.intro.paragraph.slice(1).map((point, index) => (
                <motion.div
                  key={index}
                  className="flex items-start text-sm sm:text-base md:text-lg leading-relaxed text-gray-300 font-Viga"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                >
                  <span className="text-purple-400 mr-4 text-xl mt-0.5">•</span>
                  <span className="flex-1">{point}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Video for mobile */}
        <div className="block md:hidden mt-8">
          {/* Gradient overlay for mobile video */}
          <div className="relative rounded-xl shadow-2xl">
            <div className="absolute inset-0 z-[1] rounded-lg bg-gradient-to-t from-black via-transparent to-black opacity-50"></div>
            <div className="absolute inset-0 z-[1] rounded-lg bg-gradient-to-r from-black via-transparent to-black opacity-50"></div>
            <video
              src="/SPjump.mp4"
              className="w-full h-auto rounded-lg"
              autoPlay={true}
              muted={true}
              loop={true}
            />
          </div>
        </div>
        {/* Call to Action Buttons */}
        <div className="flex sm:flex-row gap-8 mt-8 items-center justify-center md:justify-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className=""
          >
            <Link
              href="/historia"
              className={`block  px-8 py-2 text-lg font-bold text-white bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-700 hover:to-purple-500 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_20px_rgba(168,85,247,0.7)] text-center font-Viga tracking-wider transform hover:-translate-y-1`}
            >
              Historia
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
