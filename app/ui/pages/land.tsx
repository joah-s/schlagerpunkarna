'use client';
import { SparklesCore } from "@/app/ui/sparkles";
import { textData } from '../../lib/textData';
import { ArrowDown } from 'lucide-react';

export default function Land() {
  const scrollToNextSection = () => {
    // Get the height of the viewport
    const viewportHeight = window.innerHeight;
    // Scroll down by one viewport height
    window.scrollTo({
      top: viewportHeight,
      behavior: 'smooth'
    });
  };

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
          <div className="absolute w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
            {/* Mobile Logo */}
            <img
              className="mx-auto sm:hidden block h-32 py-3 transform hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              src="icons/spLogo.png"
              alt="Logo"
            />

            {/* Heading */}
            <div className="mb-8">
              <h1 className="font-TypoGraphica
                text-[2.2rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] 
                 leading-none mb-4 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                {textData.landPage.heading}
                
              </h1>
              <text className="mx-auto max-w-3xl sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed
                 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] font-Viga">
                {textData.landPage.paragraph}
              </text>

              {/* Subheading */}
              
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <button 
                onClick={scrollToNextSection}
                className="group relative inline-flex items-center justify-center px-8 py-3 
                text-lg font-medium text-white bg-gray-800 hover:bg-gray-700
                rounded-full overflow-hidden transition-all duration-300
                transform hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900">
                Utforska
                <ArrowDown className="ml-2 h-5 w-5 transform group-hover:translate-y-1 transition-transform duration-300" />
              </button>

              
            </div>
          </div>

          {/* Scroll Indicator */}
          
        </div>
      </div>
    </div>
  );
}