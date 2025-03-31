"use client";

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

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
        <div
            className={`font-Viga relative group ${clickable ? 'cursor-pointer' : ''}`}
            onMouseEnter={() => clickable && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Year display */}
            <div className=" absolute -top-12 left-0 w-full">
                <div className="relative inline-flex flex-col items-center">
                    <span className="text-2xl font-bold text-white mb-2 opacity-90">
                        {year}
                    </span>
                </div>
            </div>

            <div className={`overflow-hidden transform transition-all duration-100 ${clickable ? 'hover:scale-[1.02]' : ''} relative`}>
                {/* Image container with hover effect */}
                <div className={`block group relative ${clickable ? 'cursor-pointer' : ''}`} onClick={clickable ? () => window.open(link, '_blank') : undefined}>
                    <div className="sm:aspect-[3/4] aspect-square relative">
                        {/* Hover overlay */}
                        {clickable && (
                            <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <ArrowUpRight className="w-8 h-8 text-white transform -translate-y-2 translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-100" />
                            </div>
                        )}

                        <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent ${clickable ? 'opacity-0 group-hover:opacity-20' : 'opacity-0'} transition-opacity duration-100`}></div>
                        <img
                            src={src}
                            alt={title}
                            className={`object-cover w-full h-full transition-transform duration-200 ease-out ${clickable ? 'group-hover:scale-105' : ''}`}
                        />
                    </div>
                </div>
                {/* Songs Table (shown on hover) */}
                {isHovered && (
                    <div className="absolute top-0 left-0 w-full text-white p-4 overflow-auto hidden md:block">
                        <table className="w-full bg-black bg-opacity-50 text-sm">
                            <tbody>
                                {(songs || []).map((song) => (
                                    <tr key={song.number} className="border-b border-gray-700">
                                        <td>{song.number}</td>
                                        <td>{song.title}</td>
                                        <td className="text-right">{song.length}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {/* Description */}
                <div className="py-4 transform  transition-all duration-100">
                    <div className="flex items-center gap-2">
                        <h3 className={`text-xl font-bold text-white mb-2 ${clickable ? 'group-hover:text-purple-400' : ''} transition-colors`}>
                            {title}
                        </h3>
                        <ArrowUpRight className={`w-4 h-4 text-purple-400 ${clickable ? 'opacity-0 group-hover:opacity-100' : 'opacity-0' } transition-opacity duration-300`} />
                    </div>
                    {description && (
                        <p className={`text-gray-300 text-sm opacity-80 ${clickable ? 'group-hover:opacity-100' : ''} transition-opacity duration-100`}>
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AlbumCard;
