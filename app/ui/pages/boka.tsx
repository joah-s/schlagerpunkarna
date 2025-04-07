'use client';

import { useRef, useState, useEffect } from 'react';
import Header from '../../header';
import Footer from './footer';
import Link from 'next/link';
import { Search, SendHorizontal, CheckCircle } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import EmailForm from '../components/EmailForm';
import { textData } from "@/app/lib/textData";
import Reviews from './reviews';
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
                        
                    </div>
                </div>

            </div>
            <Reviews />
            <Footer />
        </main>
    );
}