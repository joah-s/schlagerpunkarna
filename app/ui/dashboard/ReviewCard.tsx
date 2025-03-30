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
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8 flex flex-col items-center">
            <img
              className="w-32 h-32 object-cover rounded-full border-4 border-gray-200 mb-4"
              src={imgSrc}
              alt={name}
            />
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
              <p className="text-sm text-gray-600 uppercase mt-1">{role}</p>
            </div>
            <div className="mt-8">
              <p className="text-base text-gray-700 leading-relaxed">
                {quote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewCard;
