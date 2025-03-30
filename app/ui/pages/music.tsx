import { textData } from "@/app/lib/textData";
import AlbumCard from "./AlbumCard";

export default function Music() {
  return (
    <div className="relative px-[2%]  md:px-[5rem] min-h-screen bg-gradient-to-t from-black to-purple-900">
      <div className="relative py-16 px-6">
        {/* Header section */}
        <section className="py-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-wider text-purple-400">
            <span className="relative z-10">{textData.timeline.heading}</span>
          </h2>
          <div className="max-w-3xl mb-12">
            <p className="text-lg md:text-xl leading-relaxed text-gray-300 opacity-90">
              {textData.timeline.paragraph}
            </p>
          </div>
        </section>

        <div className="relative">
          {/* Desktop Version with horizontal scroll */}
          <div className="hidden md:block relative">
            <div className="overflow-x-auto scrollbar-thin scrollbar-track-gray-800/30 scrollbar-thumb-purple-500/50 hover:scrollbar-thumb-purple-500 pb-4 pt-8">
              <div className="inline-flex gap-4 py-4">
                {textData.timeline.discografi.map((album, i) => (
                  <div key={i} className="flex-shrink-0 w-60">
                    <AlbumCard
                      src={album.imgSrc}
                      title={album.name}
                      description={album.description}
                      year={album.year}
                      link={album.link ? album.link : "#"}
                      songs={album.songs} 
                      clickable={album.clickable} 
                    />
                  </div>
                ))}
              </div>
             
            </div>
          </div>

          {/* Mobile Version with vertical timeline */}
          <div className="md:hidden space-y-12 ">
            <div className="relative ">
              {textData.timeline.discografi.map((album, i) => (
                <div key={i} className="mb-24  w-full">
                  <AlbumCard
                    src={album.imgSrc}
                    title={album.name}
                    description={album.description}
                    year={album.year}
                    link={album.link ? album.link : "#"}
                    songs={album.songs}
                    clickable={album.clickable}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
