'use client';
import { SparklesCore } from "@/app/ui/sparkles";
import { textData } from '../../lib/textData';
import { ArrowDown } from 'lucide-react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Land() {
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    // Lazy load video
    if (videoRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            videoRef.current?.play();
          }
        });
      }, { threshold: 0.1 });

      observer.observe(videoRef.current);
      return () => observer.disconnect();
    }
  }, []);

  const scrollToNextSection = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight,
      behavior: 'smooth'
    });
  };

  const headingWords = textData.landPage.heading.split(' ');
  const paragraphWords = textData.landPage.paragraph.split(' ');

  return (
    <div>
      {/* Background Video */}
      <div className="absolute z--10 w-full h-screen overflow-hidden">
        <video
          ref={videoRef}
          src="/backgrounds/SPvid.mp4"
          className="inset-0 w-full h-full object-cover opacity-20"
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          aria-label="Schlagerpunkarna live performance background video"
          preload="metadata"
        />
      </div>

      {/* Main Content */}
      <div className="bg-gradient-to-b from-black via-transparent to-black relative min-h-20 h-screen flex items-center justify-center">
        <div className="h-screen relative w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
          {/* Sparkles Effect */}
          <div className="w-full absolute inset-0 h-screen">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.2}
              maxSize={3.4}
              particleDensity={20}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
          </div>

          {/* Content Container */}
          <div className="absolute w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 text-center">
            {/* Mobile Logo */}
            <img
              className="mx-auto sm:hidden block h-32 py-4 transform hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              src="icons/spLogo.png"
              alt="Schlagerpunkarna band logo"
            />

            {/* Heading with Chromatic Aberration only on sm screens and above */}
            <div className="mb-8">
              <h1 className="font-TypoGraphica relative
                text-[2.2rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] 
                leading-none mb-4 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                {isMobile ? (
                  <span className="text-white">{textData.landPage.heading}</span>
                ) : (
                  <LazyMotion features={domAnimation}>
                    {headingWords.map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="inline-block mr-4 relative"
                      >
                        <span className="absolute left-[-2px] top-[2px] text-red-500 opacity-70 blur-[0.5px]">{word}</span>
                        <span className="absolute left-[2px] top-[-2px] text-blue-500 opacity-70 blur-[0.5px]">{word}</span>
                        <span className="relative text-white">{word}</span>
                      </motion.span>
                    ))}
                  </LazyMotion>
                )}
              </h1>
              <div className="mx-auto text-md md:text-lg lg:text-2xl text-gray-300 mb-8 font-Viga
                 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                {isMobile ? (
                  <span>{textData.landPage.paragraph}</span>
                ) : (
                  <LazyMotion features={domAnimation}>
                    {paragraphWords.map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 + (i * 0.05) }}
                        className="inline-block mr-2"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </LazyMotion>
                )}
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex sm:flex-row gap-8 justify-center items-center mt-8">
              <LazyMotion features={domAnimation}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/book"
                    className={`block px-8 py-2 text-lg font-bold text-white bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-700 hover:to-purple-500 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_20px_rgba(168,85,247,0.7)] text-center font-Viga tracking-wider transform hover:-translate-y-1`}
                    role="button"
                    aria-label="Book Schlagerpunkarna for an event"
                  >
                    Boka Nu!
                  </Link>
                </motion.div>
              </LazyMotion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}