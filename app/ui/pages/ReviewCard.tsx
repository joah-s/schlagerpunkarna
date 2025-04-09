import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ReviewCardProps {
  name: string;
  role: string;
  description: string;
  imgSrc: string;
  index: number;
}

export default function ReviewCard({ name, role, description, imgSrc, index }: ReviewCardProps) {
  const { scrollYProgress } = useScroll();
  
  // Different animation delays based on index
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [100 * (index + 1), -100 * (index + 1)]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  return (
    <motion.div 
      className="w-full max-w-[420px] relative flex-shrink-0"
      style={{ y, opacity }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <div className="bg-black/80 shadow-lg h-full transition-all duration-300 hover:shadow-xl flex flex-col items-center backdrop-blur-sm">
        {/* Review header */}
        <div className="bg-gradient-to-r from-purple-900 to-purple-800 p-4 flex items-center w-full">
          <div className="w-12 h-12 overflow-hidden mr-4  ">
            <img
              className="w-full h-full object-cover"
              src={imgSrc}
              alt={name}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white font-Viga tracking-wide">{name}</h3>
            <p className="text-sm text-purple-200 font-Viga tracking-wider">{role}</p>
          </div>
        </div>
        
        {/* Review content */}
        <div className="p-8 w-full">
          <p className="text-gray-200 text-base leading-relaxed font-Viga tracking-wide">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
} 