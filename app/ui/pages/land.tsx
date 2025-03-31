
'use client';
import { SparklesCore } from "@/app/ui/sparkles";
import { textData } from '../../lib/textData';
import { ArrowRight } from 'lucide-react';

export default function Land() {
  return (
    <div>
      {/* Background Video */}
      <div className="absolute z--10 w-full h-screen overflow-hidden">
        <video
          src="/backgrounds/SPvid.mp4"
          className="inset-0 w-full h-full object-cover opacity-20"
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
        />
      </div>

      {/* Main Content */}
      <div className="bg-gradient-to-b from-black via-transparent to-black relative min-h-20 h-screen flex items-center justify-center">
        <div className="h-screen relative w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
          {/* Sparkles Effect */}
          <div className="w-full absolute inset-0 h-screen">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.2}
              maxSize={1.4}
              particleDensity={20}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
          </div>

          {/* Content Container */}
          <div className="absolute w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Mobile Logo */}
            <img
              className="mx-auto sm:hidden block h-32 py-3 transform hover:scale-105 transition-transform duration-300"
              src="icons/spLogo.png"
              alt="Logo"
            />

            {/* Heading */}
            <div className="mb-8">
              <h1 className="animate-pulse bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-TypoGraphica
                text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 
                 leading-none mb-4 transition-all duration-300">
                {textData.landPage.heading}
              </h1>

              {/* Subheading */}
              <text className="mx-auto max-w-3xl  sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed
                 transition-all duration-300 font-exo ">
                {textData.landPage.paragraph}
              </text>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <button className="group relative inline-flex items-center justify-center px-8 py-3 
                text-lg font-medium text-white bg-purple-600 hover:bg-purple-700
                rounded-full overflow-hidden transition-all duration-300
                transform hover:scale-105 hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900">
                Explore Music
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>

              <button className="group relative inline-flex items-center justify-center px-8 py-3
                text-lg font-medium text-purple-400 border-2 border-purple-400
                hover:text-white hover:border-purple-500
                rounded-full overflow-hidden transition-all duration-300
                transform hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900">
                About Us
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <button
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 
            p-4 rounded-full hover:bg-white/5 transition-colors duration-300"
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight - 30,
                behavior: 'smooth'
              });
            }}
          >
            <svg
              fill="#ffffff"
              height="20px"
              width="20px"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 330 330"
              className="opacity-70 hover:opacity-100 transition-opacity duration-300 animate-[updown_1.5s_ease-in-out_infinite]"
            >
              <path
                id="XMLID_222_"
                d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"
              />
            </svg>
            <style jsx global>{`
              @keyframes updown {
                0%, 100% { transform: translateY(0) rotate(90deg); }
                50% { transform: translateY(-3px) rotate(90deg); }
              }
            `}</style>
          </button>
        </div>
      </div>
    </div>
  );
}