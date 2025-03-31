"use client";

import React from "react";
import { InfiniteMovingCards } from "../infinite-moving-cards";
import { textData } from "@/app/lib/textData";

export default function Reviews() {
    return (
      <div className=" py-20 bg-gradient-to-b from-black to-gray-800 flex flex-col items-center justify-center relative overflow-hidden antialiased">
        

        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img 
            src="/backgrounds/reviewBackground.png" 
            className="w-full h-full object-cover opacity-10" 
            alt="Background"
          />
        </div>
        
        <div className="font-Viga flex flex-col items-center space-y-6 z-20">
          <InfiniteMovingCards
            items={textData.reviews.reviewer.slice(0, 3)}
            direction="left"
            speed="slow"
            pauseOnHover={false}
          />
        </div>
      </div>
    );
}