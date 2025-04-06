import React from "react";

interface ReviewCardProps {
  imgSrc: string;
  name: string;
  role: string;
  quote: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  imgSrc,
  name,
  role,
  quote,
}) => {
  return (
    <section className="md:bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <div
            key={imgSrc}
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-purple-400">
                <img
                  src={imgSrc}
                  alt={name}
                  className="w-full h-full object-cover"
                  
                />
              </div>
              <div>
                <h3 className="font-bold text-xl">{name}</h3>
                <p className="text-purple-300">{role}</p>
              </div>
            </div>
            <div className="relative">
              <div className="text-3xl absolute -top-5 -left-2 text-purple-400">"</div>
              <p className="italic text-gray-100 pl-4">{quote}</p>
              <div className="text-3xl absolute -bottom-8 right-0 text-purple-400">"</div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ReviewCard;
