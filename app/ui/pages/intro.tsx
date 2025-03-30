import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ContainerScroll } from "../container-scroll-animation";
import { textData } from '../../lib/textData';

const words = textData.intro.heading.split(' ').map(word => word + ' ');

export default function Intro() {
  return (
    <div className="px-[2%] md:px-[5rem] lg:px-16 relative ">

      <div className="hidden md:block ">

        <div className="absolute inset-0 w-full h-screen  ">
          <div className="absolute inset-0 bg-gradient-to-b  from-black to-transparent  opacity-100">

          </div>
          <div className="absolute  inset-0 bg-gradient-to-t  from-black to-transparent  opacity-100">
          </div>
          <video
            className=" w-full h-auto object-cover"
            autoPlay
            loop
            muted
            src="/SPjump.mp4"
          />

        </div>

      </div>


      <section className="py-16 rounded-lg relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 uppercase tracking-wider text-purple-500">
          {textData.intro.heading}
        </h2>
        <div className="space-y-4 max-w-3xl ">
          {/* Display the first element as normal text */}
          <p className="text-base text-sm py-4 md:text-lg lg:text-xl leading-relaxed text-gray-300 font-semibold">
            {textData.intro.paragraph[0]}
          </p>
          {/* Map over the rest of the paragraph array to display each point */}
          {textData.intro.paragraph.slice(1).map((point, index) => (
            <div key={index} className="flex items-center text-base text-sm md:text-md leading-relaxed text-gray-300 ">
              <span className="text-purple-400 mr-2">•</span> {point}
            </div>
          ))}
        </div>
        <div className="block md:hidden">
          <video
            src="/SPjump.mp4"
            className="mt-10 w-full h-auto rounded-lg"
            autoPlay={true}
            muted={true}
            loop={true}
          />
        </div>

      </section>

      {/* Quote Section */}

    </div>
  );
}
