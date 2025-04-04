import React from "react";
import { motion } from "framer-motion";

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
  // Split description into words for animation
  const descriptionWords = description.split(' ');
  
  return (
    <div className="group relative overflow-hidden py-6 transition-all hover:shadow-xl">
      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
        {/* Image container with overlay effect */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="overflow-hidden">
            <img
              className="h-64 w-64 object-cover transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 
                         sm:h-40 sm:w-40 
                         md:h-48 md:w-48 
                         lg:h-56 lg:w-56 
                         xl:h-64 xl:w-64"
              src={imgSrc}
              alt={name}
            />
          </div>
        </motion.div>

        {/* Text content */}
        <div className="flex-1 space-y-3">
          <div>
            <motion.h3 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-Viga text-xl font-bold text-white sm:text-2xl md:text-3xl transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            >
              {name}
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-Viga text-md text-indigo-400 sm:text-lg md:text-xl py-1 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            >
              {role}
            </motion.p>
          </div>
          <div className="font-Viga text-sm sm:text-base md:text-lg text-gray-300 text-base max-w-3xl transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
            {descriptionWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + (i * 0.05) }}
                className="inline-block mr-1"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" 
      />
    </div>
  );
};

export default TeamMemberCard;