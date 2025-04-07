'use client';

import { useRef, useState, useEffect } from 'react';
import Header from '../../header';
import Footer from './footer';
import Link from 'next/link';
import { Search, SendHorizontal, CheckCircle } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import EmailForm from '../components/EmailForm';
import { textData } from "@/app/lib/textData";
export default function Boka() {
    const inViewRef = useRef(null);
    const isInView = useInView(inViewRef, { once: true, amount: 0.3 });
    const [isMobile, setIsMobile] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        // Check if window is available (client-side)
        if (typeof window !== 'undefined') {
            // Set initial state
            setIsMobile(window.innerWidth < 640);

            // Add resize listener
            const handleResize = () => {
                setIsMobile(window.innerWidth < 640);
            };

            window.addEventListener('resize', handleResize);

            // Clean up
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form submission logic would go here
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setIsSubmitting(false);
            setIsSuccess(true);
            // Reset form after submission
            setFormData({ name: '', email: '', message: '' });

            // Reset success state after 3 seconds
            setTimeout(() => {
                setIsSuccess(false);
            }, 3000);
        }, 1000);
    };

    // Split the heading into words for animation
    const headingWords = "Boka Oss".split(' ');

    // Styling constants from NameCollector
    const inputStyles = "bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-white placeholder-gray-400";
    const buttonStyles = "w-full p-4 rounded-lg font-medium text-white transition-all transform";
    const buttonColorStyles = "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-Viga";

    return (
        <main className="relative text-white">
            <Header />
            <div className="relative min-h-screen bg-gradient-to-b from-purple-900 to-black">


                <div className="relative py-16 px-4 max-w-6xl mx-auto">
                    <section className="py-16" ref={inViewRef}>
                        {isMobile ? (
                            <h2 className="flex items-center justify-center text-5xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-Viga tracking-tight mb-4 sm:mb-6 md:mb-8 uppercase tracking-tight text-white">
                                {textData.boka.heading}
                            </h2>
                        ) : (
                            <h2 className="flex items-center justify-center text-5xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-Viga tracking-tight mb-4 sm:mb-6 md:mb-8 uppercase tracking-tight text-white">
                                {headingWords.map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        className="inline-block mr-4"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </h2>
                        )}

                        {isMobile ? (
                            <div className="mb-8">
                                <p className="flex items-center justify-center text-center text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 font-semibold font-Viga">
                                    {textData.boka.subheading}
                                </p>
                            </div>
                        ) : (
                            <motion.div
                                className="mb-8"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                <p className="text-base text-center sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 font-semibold font-Viga tracking-wide">
                                    {textData.boka.subheading}
                                </p>
                            </motion.div>
                        )}
                    </section>

                    {/* Contact Methods Section */}
                    <EmailForm />
                    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="bg-black/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300"
                        >
                            <h3 className="text-2xl font-bold text-white mb-4 font-Viga">
                                {textData.boka.heading}
                            </h3>
                            <div className="space-y-4">
                                <a
                                    href="mailto:schlagerpunkarna@gmail.com"
                                    className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-Viga text-lg flex items-center gap-4"
                                >
                                    <SendHorizontal className="w-6 h-6" />
                                    {textData.footer.links.email}
                                </a>
                                <a
                                    href="https://facebook.com/schlagerpunkarna"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-Viga text-lg flex items-center gap-4"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    {textData.boka.contact.social.facebook}
                                </a>
                                <a
                                    href="https://instagram.com/schlagerpunkarna"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-Viga text-lg flex items-center gap-4"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                    </svg>
                                    {textData.boka.contact.social.instagram}
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}