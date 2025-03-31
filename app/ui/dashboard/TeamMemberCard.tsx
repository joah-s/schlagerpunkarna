import React from "react";

interface TeamMemberCardProps {
  imgSrc: string;
  iconSrc: string;
  name: string;
  role: string;
  description: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  imgSrc,
  iconSrc,
  name,
  role,
  description,
}) => {
  return (
    <div className="group relative overflow-hidden py-6 transition-all hover:shadow-xl">
      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
        {/* Image container with overlay effect */}
        <div className="relative">
          <div className="overflow-hidden">
            <img
              className="h-64 w-64 object-cover transition-transform duration-300 group-hover:scale-110 
                         sm:h-40 sm:w-40 
                         md:h-48 md:w-48 
                         lg:h-56 lg:w-56 
                         xl:h-64 xl:w-64"
              src={imgSrc}
              alt={name}
            />
          </div>
        </div>

        {/* Text content */}
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-Viga text-xl  font-bold text-white sm:text-2xl md:text-3xl">{name}</h3>
            <p className="font-Viga text-md  text-indigo-400   sm:text-lg md:text-xl py-1">{role}</p>
          </div>
          <p className="font-Viga text-gray-300 text-sm  max-w-xl">{description}</p>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
};

export default TeamMemberCard;