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
  role : string;
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

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

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
          "flex min-w-full shrink-0 gap-4 py-10 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[350px] max-w-full relative flex-shrink-0 px-8 py-6 md:w-[450px]"
            key={item.name}
          >
            <blockquote>
              <section className="py-8">
                <div className="max-w-4xl mx-auto px-4">
                  <div className="overflow-hidden">
                    <div className="px-6 py-8 flex flex-col items-center">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-indigo-300">{item.name}</h3>
                        <p className="text-base uppercase mt-1 mb-10 text-gray-200">{item.role}</p>
                      </div>
                      <img
                        className="w-48 h-48 object-cover rounded-full mb-4" // Increased size from w-32 h-32 to w-48 h-48
                        src={item.imgSrc}
                        alt={item.name}
                      />
                      <div className="mt-6">
                        <p className="text-base leading-relaxed text-gray-300">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
