'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Header from '../../header';
import Footer from './footer';
import Link from 'next/link';

export default function Boka() {
    const inViewRef = useRef(null);
    const isInView = useInView(inViewRef, { once: true, amount: 0.3 });

    return (
        <main className="relative text-white">
            <Header />
            <div className="relative px-[2%] md:px-[5rem] lg:px-16 min-h-screen bg-gradient-to-t from-black to-purple-900">
                {/* Back Button */}
                <Link
                    href="/"
                    className="fixed bottom-8 left-8 z-50 bg-black/50 backdrop-blur-sm px-6 py-3 rounded-lg hover:bg-black/70 transition-all duration-300 flex items-center gap-2 group border border-purple-500/30 hover:border-purple-500/50"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    <span className="text-white font-Viga">Tillbaka</span>
                </Link>

                <div className="relative py-16">
                    <section className="py-16" ref={inViewRef}>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 md:mb-8 uppercase tracking-wider text-white font-Viga text-center md:text-left"
                        >
                            Boka Oss
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mb-12"
                        >
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 font-semibold font-Viga tracking-wide text-center md:text-left max-w-3xl">
                                Kontakta oss för att boka Schlagerpunkarna till ditt event
                            </p>
                        </motion.div>
                    </section>

                    {/* Contact Methods Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8  mx-auto">
                        {/* Email */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="bg-black/50 backdrop-blur-sm p-6 rounded-lg shadow-xl hover:bg-black/60 transition-colors duration-300 border border-purple-500/30 hover:border-purple-500/50"
                        >
                            <h3 className="text-2xl font-bold text-white mb-4 font-Viga">E-post</h3>
                            <a
                                href="mailto:info@schlagerpunkarna.se"
                                className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-Viga text-lg"
                            >
                                info@schlagerpunkarna.se
                            </a>
                        </motion.div>

                        {/* Phone */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="bg-black/50 backdrop-blur-sm p-6 rounded-lg shadow-xl hover:bg-black/60 transition-colors duration-300 border border-purple-500/30 hover:border-purple-500/50"
                        >
                            <h3 className="text-2xl font-bold text-white mb-4 font-Viga">Telefon</h3>
                            <a
                                href="tel:+46701234567"
                                className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-Viga text-lg"
                            >
                                +46 70 123 45 67
                            </a>
                        </motion.div>

                        {/* Social Media */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="bg-black/50 backdrop-blur-sm p-6 rounded-lg shadow-xl hover:bg-black/60 transition-colors duration-300 border border-purple-500/30 hover:border-purple-500/50"
                        >
                            <h3 className="text-2xl font-bold text-white mb-4 font-Viga">Sociala Medier</h3>
                            <div className="space-y-2">
                                <a
                                    href="https://facebook.com/schlagerpunkarna"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-Viga text-lg block"
                                >
                                    Facebook
                                </a>
                                <a
                                    href="https://instagram.com/schlagerpunkarna"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-Viga text-lg block"
                                >
                                    Instagram
                                </a>
                            </div>
                        </motion.div>

                        {/* Booking Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            className="bg-black/50 backdrop-blur-sm p-6 rounded-lg shadow-xl hover:bg-black/60 transition-colors duration-300 border border-purple-500/30 hover:border-purple-500/50"
                        >
                            <h3 className="text-2xl font-bold text-white mb-4 font-Viga">Bokningsformulär</h3>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-gray-300 font-Viga mb-1">Namn</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full bg-black/30 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50 transition-colors duration-300"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-gray-300 font-Viga mb-1">E-post</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full bg-black/30 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50 transition-colors duration-300"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-gray-300 font-Viga mb-1">Meddelande</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        className="w-full bg-black/30 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50 transition-colors duration-300"
                                        placeholder="Berätta gärna mer om ditt event..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-purple-500 hover:bg-purple-600 text-white font-Viga px-6 py-3 rounded-lg transition-colors duration-300"
                                >
                                    Skicka bokningsförfrågan
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
} 