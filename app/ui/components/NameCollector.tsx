"use client";

import { useState, useEffect } from "react";
import { SendHorizontal, CheckCircle } from "lucide-react";
import { textData } from "@/app/lib/textData";

export default function NameCollector() {
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        // Check if window is available (client-side)
        if (typeof window !== 'undefined') {
            // Set initial state
            setIsMobile(window.innerWidth < 768);

            // Add resize listener
            const handleResize = () => {
                setIsMobile(window.innerWidth < 768);
            };

            window.addEventListener('resize', handleResize);

            // Clean up
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || hasSubmitted) return;

        setIsSubmitting(true);
        setStatus("");

        try {
            const webhookUrl = "https://script.google.com/macros/s/AKfycbzq0YWXSvGFt6B_qJaGuI83GKQEEnviLzgP9fjEGawUK2a9qWCAO7WNRxVoCqeA9s85MA/exec";

            const res = await fetch(webhookUrl, {
                method: "POST",
                body: new URLSearchParams({ name }),
            });

            if (res.ok) {
                setIsSuccess(true);
                setHasSubmitted(true);
                setStatus("Tack! Ditt namn har lagts listan! #Mello26");
                setName("");
                
                // No longer reset isSuccess state
                // The button will stay in "Tillagt" mode
            } else {
                setStatus("Det gick inte att skicka namnet. Försök igen.");
            }
        } catch (err) {
            console.error(err);
            setStatus("Ett fel inträffade. Försök igen senare.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Common button styles
    const buttonStyles = `
        px-8 py-2 text-lg font-bold text-white 
        transition-all duration-300 transform hover:-translate-y-1
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        text-center font-Viga tracking-wider
    `;

    // Success or default button styles
    const buttonColorStyles = isSuccess
        ? 'bg-green-500 hover:bg-green-600 shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:shadow-[0_0_20px_rgba(34,197,94,0.7)]'
        : 'bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-700 hover:to-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_20px_rgba(168,85,247,0.7)]';

    // Common input styles
    const inputStyles = "bg-gray-900/50 focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-colors text-white placeholder-gray-400";

    return (
        <div className="font-Viga relative py-16 max-w-4xl mx-auto flex flex-col items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <img
                    src="/backgrounds/formBackground.jpg"
                    className="w-full h-full object-cover saturate-0 opacity-20"
                    alt="Background"
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="w-full max-w-4xl mx-auto">
                {isMobile ? (
                    // Mobile layout (stacked)
                    <div className="flex flex-col">
                        {/* Header */}
                        <div className="text-center    text-white">
                            <h2 className="text-3xl md:text-4xl uppercase  lg:text-5xl font-bold text-white">
                                {textData.nameCollector.heading}
                            </h2>
                            <p className="text-gray-300 mb-8 text-center mt-4 text-left px-4 max-w-md mx-auto">
                                {textData.nameCollector.paragraph}
                            </p>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div>
                                    <label
                                        htmlFor="name-mobile"
                                        className="block mb-4 text-xl text-center font-medium text-white"
                                    >
                                        {textData.nameCollector.form.nameLabel}
                                    </label>
                                    <div className="relative flex justify-center">
                                        <input
                                            type="text"
                                            id="name-mobile"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className={`w-full max-w-md mx-auto px-4 py-2 ${inputStyles}`}
                                            disabled={hasSubmitted}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || hasSubmitted || !name.trim()}
                                        className={`${buttonStyles} ${buttonColorStyles}`}
                                    >
                                        <span className="flex items-center justify-center gap-4">
                                            {isSuccess ? (
                                                <>
                                                    <CheckCircle className="w-5 h-5" />
                                                    {textData.nameCollector.form.submitButton.success}
                                                </>
                                            ) : isSubmitting ? (
                                                textData.nameCollector.form.submitButton.submitting
                                            ) : (
                                                <>
                                                    <SendHorizontal className="w-5 h-5" />
                                                    {textData.nameCollector.form.submitButton.default}
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    // Desktop layout (side by side)
                    <div className="flex flex-row">
                        {/* Left column - Info */}
                        <div className="w-1/2 p-8 flex flex-col justify-center">
                            <div className="text-left font-extrabold uppercase tracking-wider text-white">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                                    {textData.nameCollector.heading}
                                </h2>
                            </div>
                            <p className="text-gray-300 mt-6 text-left">
                                {textData.nameCollector.paragraph}
                            </p>
                        </div>

                        {/* Right column - Form */}
                        <div className="w-1/2 p-8 flex flex-col justify-center">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div>
                                    <label
                                        htmlFor="name-desktop"
                                        className="block mb-4 text-xl text-left font-medium text-white"
                                    >
                                        Ditt namn 
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="name-desktop"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className={`w-full px-4 py-2 ${inputStyles}`}
                                            disabled={hasSubmitted}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || hasSubmitted || !name.trim()}
                                        className={`${buttonStyles} ${buttonColorStyles}`}
                                    >
                                        <span className="flex items-center justify-center gap-4">
                                            {isSuccess ? (
                                                <>
                                                    <CheckCircle className="w-5 h-5" />
                                                    Tillagt!
                                                </>
                                            ) : isSubmitting ? (
                                                "Skickar..."
                                            ) : (
                                                <>
                                                    <SendHorizontal className="w-5 h-5" />
                                                    Lägg till
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Status message */}
                {status && (
                    <div className={`mt-4 p-4 mx-8 text-center text-sm ${isSuccess ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
                        {status}
                    </div>
                )}
            </div>
        </div>
    );
}