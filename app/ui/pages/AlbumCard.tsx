"use client";

import { useState } from 'react';
import { ArrowUpRight, Music } from 'lucide-react';
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
            {/* Year display */}
            <div className="absolute -top-12 left-0 w-full">
                <motion.div 
                    className="relative inline-flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                >
                    <span className="text-2xl font-bold text-white mb-2 opacity-90 bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
                        {year}
                    </span>
                </motion.div>
            </div>

            <motion.div 
                className={`overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 ${clickable ? 'hover:scale-[1.02]' : ''} relative`}
                whileHover={clickable ? { scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" } : {}}
            >
                {/* Image container with hover effect */}
                <div 
                    className={`block group relative ${clickable ? 'cursor-pointer' : ''}`} 
                    onClick={clickable ? () => window.open(link, '_blank') : undefined}
                >
                    <div className="sm:aspect-[3/4] aspect-square relative">
                        {/* Hover overlay */}
                        {clickable && (
                            <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
                                <motion.div
                                    whileHover={{ rotate: 45 }}
                                    className="bg-purple-600 rounded-full p-2"
                                >
                                    <ArrowUpRight className="w-8 h-8 text-white" />
                                </motion.div>
                            </div>
                        )}

                        <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent ${clickable ? 'opacity-0 group-hover:opacity-40' : 'opacity-0'} transition-opacity duration-300 z-[5]`}></div>
                        <img
                            src={src}
                            alt={title}
                            className={`object-cover w-full h-full transition-transform duration-500 ease-out ${clickable ? 'group-hover:scale-110' : ''} rounded-t-lg`}
                        />
                    </div>
                </div>
                
                {/* Songs Table (shown on hover) */}
                {isHovered && songs && songs.length > 0 && (
                    <motion.div 
                        className="absolute top-0 left-0 w-full h-full text-white p-4 overflow-auto hidden md:block bg-black bg-opacity-80 z-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center gap-2 mb-3 border-b border-purple-500 pb-2">
                            <Music className="text-purple-400" size={18} />
                            <h4 className="font-bold text-purple-400">Tracklist</h4>
                        </div>
                        <table className="w-full text-sm">
                            <tbody>
                                {songs.map((song) => (
                                    <tr key={song.number} className="border-b border-gray-700 hover:bg-purple-900/30 transition-colors">
                                        <td className="py-1 pr-2 text-purple-300">{song.number}</td>
                                        <td className="py-1 font-medium">{song.title}</td>
                                        <td className="py-1 text-right text-gray-400">{song.length}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                )}
                
                {/* Description */}
                <div className="py-4 px-3 transform transition-all duration-300 bg-gradient-to-b from-gray-900 to-black">
                    <div className="flex items-center gap-2">
                        <h3 className={`text-xl font-bold text-white mb-2 ${clickable ? 'group-hover:text-purple-400' : ''} transition-colors`}>
                            {title}
                        </h3>
                        <ArrowUpRight className={`w-4 h-4 text-purple-400 ${clickable ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
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
