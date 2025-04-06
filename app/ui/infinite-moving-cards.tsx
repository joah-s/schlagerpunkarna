"use client";

import { cn } from "../lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    name: string;
    role: string;
    description: string;
    imgSrc: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplicate items for continuous scrolling effect
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full py-16 shrink-0 gap-4 w-max flex-nowrap",
          start && "animate-scroll"
        )}
      >
        {items.map((item) => (
          <li
            className="w-[350px] max-w-full relative flex-shrink-0 px-8 md:w-[450px]"
            key={item.name}
          >
            <blockquote 
              className={cn(
                "bg-gray-800/40 h-full shadow-lg p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:border-gray-600/50",
                pauseOnHover && "hover:[animation-play-state:paused]"
              )}
            >
              <div className="flex flex-col items-center">
                {/* Header with name and role */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-indigo-300">{item.name}</h3>
                  <div className="h-1 w-16 bg-indigo-500/50 mx-auto my-2"></div>
                  <p className="text-base uppercase text-gray-300">{item.role}</p>
                </div>
                
                {/* Image with frame */}
                <div className="p-1 mb-6">
                  <img
                    className="w-40 h-40 object-cover rounded-xl"
                    src={item.imgSrc}
                    alt={item.name}
                  />
                </div>
                
                {/* Description with styled quotes */}
                <div className="relative">
                  <span className="absolute -top-4 -left-2 text-4xl text-indigo-500/40">"</span>
                  <p className="text-base leading-relaxed text-gray-200 px-4">
                    {item.description}
                  </p>
                  <span className="absolute -bottom-6 -right-2 text-4xl text-indigo-500/40">"</span>
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
