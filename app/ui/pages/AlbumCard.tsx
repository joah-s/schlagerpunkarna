"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

interface AlbumCardProps {
    src: string;
    title: string;
    description: string;
    year: string;
    link: string;
    songs: { number: number; title: string; length: string }[] | undefined;
    clickable?: boolean;
}

const AlbumCard = ({ src, title, description, year, link, songs, clickable = true }: AlbumCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className={`font-Viga relative group ${clickable ? 'cursor-pointer' : ''} w-full`}
            onMouseEnter={() => clickable && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className={`overflow-hidden transform transition-all duration-300 ${clickable ? '0' : ''} relative w-full`}
            >
                <div 
                    className={`block group relative ${clickable ? 'cursor-pointer' : ''} w-full`} 
                    onClick={clickable ? () => window.open(link, '_blank') : undefined}
                >
                    <div className="aspect-[8/5] md:aspect-[3/4] relative overflow-hidden w-full">
                        <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent ${clickable ? 'opacity-0 group-hover:opacity-40' : 'opacity-0'} transition-opacity duration-300 z-[5]`}></div>
                        <img
                            src={src}
                            alt={title}
                            className={`object-cover w-full h-full object-top transition-transform duration-500 ease-out ${clickable ? 'group-hover:scale-110 group-hover:translate-y-[-5%]' : ''} `}
                        />
                    </div>
                </div>
                
                <div className="py-4 transform transition-all duration-300">
                    <div className="w-full">
                        <h3 className={`text-xl font-bold text-white mb-1 ${clickable ? 'group-hover:text-purple-400' : ''} transition-colors w-full`}>
                            {title}
                        </h3>
                        <span className="text-sm font-medium text-gray-400 block mb-2">
                            {year}
                        </span>
                    </div>
                    {description && (
                        <p className={`text-gray-300 text-sm opacity-80 ${clickable ? 'group-hover:opacity-100' : ''} transition-opacity duration-300 w-full`}>
                            {description}
                        </p>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AlbumCard;
