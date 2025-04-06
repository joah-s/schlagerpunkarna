"use client";

import { useState } from 'react';
import { ArrowUpRight, Music, ExternalLink } from 'lucide-react';
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
            className={`font-Viga relative group ${clickable ? 'cursor-pointer' : ''}`}
            onMouseEnter={() => clickable && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="absolute -top-12 left-0 w-full">
                <motion.div 
                    className="relative inline-flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                >
                    <span className="text-2xl font-bold text-white mb-4 opacity-90 bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
                        {year}
                    </span>
                </motion.div>
            </div>

            <motion.div 
                className={`overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 ${clickable ? 'hover:scale-[1.02] border-2 border-transparent hover:border-purple-500' : ''} relative`}
                whileHover={clickable ? { scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" } : {}}
            >
                <div 
                    className={`block group relative ${clickable ? 'cursor-pointer' : ''}`} 
                    onClick={clickable ? () => window.open(link, '_blank') : undefined}
                >
                    <div className="aspect-[8/5] md:aspect-[3/4] relative overflow-hidden">
                        {clickable && (
                            <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
                                <motion.div
                                    whileHover={{ rotate: 45 }}
                                    className="bg-purple-600 rounded-full p-4"
                                >
                                    <ArrowUpRight className="w-8 h-8 text-white" />
                                </motion.div>
                            </div>
                        )}

                        <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent ${clickable ? 'opacity-0 group-hover:opacity-40' : 'opacity-0'} transition-opacity duration-300 z-[5]`}></div>
                        <img
                            src={src}
                            alt={title}
                            className={`object-cover w-full h-full transition-transform duration-500 ease-out ${clickable ? 'group-hover:scale-110 group-hover:translate-y-[-5%]' : ''} rounded-t-lg`}
                        />
                    </div>
                </div>
                
                <div className="py-4 px-4 transform transition-all duration-300 bg-gradient-to-b from-gray-900 to-black">
                    <div className="flex items-center gap-4">
                        <h3 className={`text-xl font-bold text-white mb-4 ${clickable ? 'group-hover:text-purple-400' : ''} transition-colors`}>
                            {title}
                        </h3>
                        {clickable && (
                            <ExternalLink className="w-4 h-4 text-purple-400 transition-opacity duration-300 -mt-2" />
                        )}
                    </div>
                    {description && (
                        <p className={`text-gray-300 text-sm opacity-80 ${clickable ? 'group-hover:opacity-100' : ''} transition-opacity duration-300 line-clamp-3`}>
                            {description}
                        </p>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AlbumCard;
