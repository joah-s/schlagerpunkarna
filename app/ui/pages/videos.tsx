import { textData } from "@/app/lib/textData";
import VideoCard from "../dashboard/videoCard";

export default function Videos() {
  return (
    <div className="relative px-[2%] md:px-[5rem]">
      <section className="py-16 px-6">
        <h2 className="text-2xl md:text-4xl font-bold mb-6 uppercase tracking-wider text-purple-400">
          {textData.video.heading}
        </h2>
        <div className="space-y-6 max-w-3xl">
          <p className="text-lg md:text-xl leading-relaxed text-gray-300">
            {textData.video.paragraph}
          </p>
        </div>
      </section>
      <div className="text-sm">
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
    </div>
  );
}