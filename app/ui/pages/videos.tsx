import { textData } from "@/app/lib/textData";
import VideoCard from "../dashboard/videoCard";

export default function Videos() {
  return (
    <div className="font-Viga relative px-[2%] md:px-[5rem] lg:px-16">
      <section className="py-16 ">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-wider text-purple-400">
          {textData.video.heading}
        </h2>
        <div className="space-y-6 max-w-3xl">
          <p className="text-sm font-bold md:text-xl leading-relaxed text-gray-300">
            {textData.video.paragraph}
          </p>
        </div>
      </section>
      <div className="">
        {textData.video.videos.map((vid, index) => (
          <VideoCard 
            key={index}
            title={vid.name} 
            genre={vid.genre} 
            description={vid.description} 
            link={vid.videoURL} 
            videoUrl={vid.videoURL}
          />
        ))}
      </div>
      
      {/* YouTube Channel Button */}
      <div className="flex justify-center mt-12 mb-16">
        <a 
          href="https://www.youtube.com/channel/schlagerpunkarna" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          Se alla våra videos på YouTube
        </a>
      </div>
    </div>
  );
}