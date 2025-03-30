import { textData } from "@/app/lib/textData";
import VideoCard from "../dashboard/videoCard";

export default function Videos() {
  return (
    <div className=" relative px-[2%] md:px-[5rem] lg:px-16">
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
    </div>
  );
}