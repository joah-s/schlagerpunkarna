"use client";

import React, { useRef } from "react";
import { textData } from "@/app/lib/textData";
import ReviewCard from './ReviewCard';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';

export default function Reviews() {
  const containerRef = useRef(null);

  return (
    <div className="bg-gradient-to-b from-black to-gray-800 flex flex-col items-center justify-center relative overflow-hidden antialiased min-h-screen">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src="/backgrounds/reviewBackground.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          quality={75}
          className="object-cover saturate-0 opacity-20"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 py-16">
        <motion.div 
          ref={containerRef}
          className="flex flex-col items-center space-y-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {textData.reviews.reviewer.map((review, i) => (
            <div key={i} className="w-full flex justify-center">
              <ReviewCard
                index={i}
                name={review.name}
                role={review.role}
                description={review.description}
                imgSrc={review.imgSrc}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}