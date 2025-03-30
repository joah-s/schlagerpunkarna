import React from 'react';

interface VideoCardProps {
    title: string;
    genre: string;
    description: string;
    link: string;
    videoUrl: string;
    hoverText?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, genre, description, link }) => {
  return (
    <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-10 transition-transform transform hover:scale-105">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3">
          <div className="iframe-container">
            <iframe
              className="w-full h-64"
              src={link}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
        <div className="flex flex-col justify-center p-4 md:w-1/2">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-base text-gray-400 uppercase tracking-wide mt-1">{genre}</p>
          <div className="bg-white w-full h-0.5 my-3" />
          <h2 className="text-lg text-gray-300 leading-relaxed">{description}</h2>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
