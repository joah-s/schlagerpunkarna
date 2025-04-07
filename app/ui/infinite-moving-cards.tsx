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
          "flex min-w-full py-16 shrink-0 gap-8 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li
            className="w-[380px] max-w-full relative flex-shrink-0 px-8 md:w-[480px]"
            key={item.name}
          >
            <div 
              className={cn(
                "bg-black shadow-lg h-full transition-all duration-300 hover:shadow-xl h flex flex-col items-center"
              )}
            >
              {/* Forum post header */}
              <div className="bg-purple-900 p-4 flex items-center  w-full">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    className="w-full h-full object-cover"
                    src={item.imgSrc}
                    alt={item.name}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{item.name}</h3>
                  <p className="text-sm text-gray-400">{item.role}</p>
                </div>
              </div>
              
              {/* Comment content */}
              <div className="p-8 w-full">
                <p className="text-gray-300 text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
