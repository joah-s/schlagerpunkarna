import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ContainerScroll } from "../container-scroll-animation";
import { textData } from '../../lib/textData';

const words = textData.intro.heading.split(' ').map(word => word + ' ');


export default function Intro() {
  return (
    
    <div className=" px-[2%] md:px-[5rem] " >
{/* About Section */}
<section className="py-16 px-6">
        <h2 className="text-2xl md:text-4xl font-bold mb-6 uppercase tracking-wider text-purple-400">
          LÅT SCHLANARKISMEN BÖRJA!
        </h2>
        <div className="space-y-6 max-w-3xl">
          <p className="text-lg md:text-xl leading-relaxed text-gray-300">
            We're not your typical student band. We're a fusion of traditional Swedish schlager 
            and raw punk energy, creating a unique sound that's taking the student scene by storm.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-gray-300">
            Born in the practice rooms of our university, we've grown into a phenomenon 
            that bridges generations and genres.
          </p>
        </div>
        <video
            src="/SPjump.mp4"
            className=" mt-10 w-fit h-full  "
            autoPlay={true}
            muted={true}
            loop={true}
          />
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-gradient-to-r from-purple-900 to-pink-900">
        <h2 className="text-2xl md:text-6xl font-black mb-6 text-center">
          LÅT SCHLANARKISMEN BÖRJA!
        </h2>
        <p className="text-xl md:text-2xl text-center text-gray-300 max-w-2xl mx-auto">
          Follow us on social media for behind-the-scenes content, upcoming shows, 
          and the latest releases.
        </p>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-6">
        <blockquote className="text-2xl md:text-4xl italic font-light text-center max-w-4xl mx-auto text-gray-400">
          "The most refreshing thing to happen to the student music scene in years"
          <footer className="text-lg md:text-xl font-normal text-purple-400 mt-4">
            — Student Magazine
          </footer>
        </blockquote>
      </section>

    
      <h2 className="font-Viga py-[10%] text-center sm:text-left  text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
        <ContainerScroll

          titleComponent={
            
            <>
              {words.map((word, index) => (
                <span key={index} className={index === Math.floor(words.length / 2) ? "text-pri" : ""}>
                  {word}
                </span>

              ))}
              <p className="mt-[5%]  dark:text-white  text-sm sm:text-lg ">
                {textData.intro.paragraph}
              </p>
            </>
          }
        >
          <video
            src="/SPjump.mp4"
            className=" mt-10 w-fit h-full rounded-[2rem] "
            autoPlay={true}
            muted={true}
            loop={true}
          />
        </ContainerScroll>


      </h2>

    </div>
  );
}
