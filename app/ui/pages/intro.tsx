"use client";

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ContainerScroll } from "../container-scroll-animation";
import { textData } from '../../lib/textData';

// Remove the space addition since the words already have spaces in the text
const words = textData.intro.heading.split(' ');

export default function Intro() {
  const targetRef = useRef(null);
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: false, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  // Modified opacity transform but keeping scale at 1 to prevent size changes
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  return (
    <div className="px-[2%] md:px-[5rem] lg:px-16 relative overflow-hidden" ref={targetRef}>
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

      <section className="py-12 md:py-16 lg:py-20 rounded-lg relative z-10 " ref={inViewRef}>
        <motion.h2 
          style={{ opacity, scale }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 md:mb-8 uppercase tracking-wider text-white bg-clip-text text-transparent font-Viga "
        >
          {words.map((word, i) => (
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
        </motion.h2>
        <motion.div 
          className="space-y-5 max-w-3xl "
          style={{ y, opacity }}
        >
          {/* Display the first element as normal text */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 font-semibold font-Viga tracking-wide"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {textData.intro.paragraph[0]}
          </motion.p>
          {/* Map over the rest of the paragraph array to display each point */}
          <motion.div className="mt-6 space-y-3 ">
            {textData.intro.paragraph.slice(1).map((point, index) => (
              <motion.div 
                key={index} 
                className="flex items-start text-sm sm:text-base md:text-lg leading-relaxed text-gray-300 font-Viga"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
              >
                <span className="text-purple-400 mr-3 text-xl mt-0.5">•</span> 
                <span className="flex-1">{point}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        {/* Video for mobile */}
        <div className="block md:hidden mt-8 ">
          {/* Gradient overlay for mobile video */}
          <div className="relative rounded-xl  shadow-2xl">
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
      </section>

      {/* Quote Section */}
    </div>
  );
}
