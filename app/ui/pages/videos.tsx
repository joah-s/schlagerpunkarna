'use client';

import { textData } from "@/app/lib/textData";
import VideoCard from "../dashboard/videoCard";
import { motion, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export default function Videos() {
  const [isMobile, setIsMobile] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: false, amount: 0.3 });
  const headingWords = textData.video.heading.split(' ');

  return (
    <div className="font-Viga relative px-4 md:px-16 lg:px-16">
      <section className="py-16" ref={inViewRef}>
      {isMobile ? (
            // No animation for mobile
            <h2 className="flex items-center justify-center md:justify-start text-5xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-Viga tracking-tight mb-4 sm:mb-6 md:mb-8 uppercase  text-white">
              {textData.timeline.heading}
            </h2>
          ) : (
            // Animated version for larger screens
            <h2 className="flex items-center justify-center md:justify-start text-5xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-Viga tracking-tight mb-4 sm:mb-6 md:mb-8 uppercase text-white">
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
        <div className="mb-8">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 font-semibold tracking-wide max-w-3xl text-center md:text-left">
            {textData.video.paragraph}
          </p>
        </div>
        {/* YouTube Channel Button */}
      <div className="flex items-center justify-center md:justify-start mt-8 mb-16">
        <motion.div className="">
          <a 
            href="https://www.youtube.com/@schlagerpunkarna" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-2 text-lg font-bold text-white bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-700 hover:to-purple-500 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_20px_rgba(168,85,247,0.7)] text-center font-Viga tracking-wider transform hover:-translate-y-1"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Se på YouTube
          </a>
        </motion.div>
      </div>
      </section>
      <div className="">
        {textData.video.videos.map((vid, index) => (
          <VideoCard 
            key={index}
            title={vid.name} 
            genre={vid.genre} 
            description={vid.description} 
            link={vid.videoURL} 
            videoUrl={vid.videoURL}
          />
        ))}
      </div>
      
      
    </div>
  );
}