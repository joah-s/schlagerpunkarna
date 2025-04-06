"use client";

import { useState } from "react";
import { SendHorizontal, CheckCircle, Search } from "lucide-react";

export default function NameCollector() {
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsSubmitting(true);
        setStatus("");

        try {
            const webhookUrl = "https://script.google.com/macros/s/AKfycbylC_6gHsPEZerbz05fRy6RvsRtD7h7CCFUI-e7li7ADWPTX9HZGv7ZdvT9Im3tY1jq/exec"; // <- use your URL

            const res = await fetch(webhookUrl, {
                method: "POST",
                body: new URLSearchParams({ name }),
            });

            if (res.ok) {
                setIsSuccess(true);
                setStatus("Ditt namn har lagts till!");
                setName("");

                // Reset success state after 3 seconds
                setTimeout(() => {
                    setIsSuccess(false);
                }, 3000);
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

    return (
        <div className="font-Viga  relative py-20 flex flex-col items-center justify-center overflow-hidden">
            {/* Background with overlay */}
            <div className="absolute inset-0 -z-10">
                <img
                    src="/backgrounds/formBackground.jpg"
                    className="w-full h-full object-cover saturate-0 opacity-20"
                    alt="Background"
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="w-full max-w-2xl mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-12 font-extrabold uppercase tracking-wider text-white ">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl  font-bold text-white mb-4">
                        Namninsamling
                    </h2>
                    <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto" />
                </div>

                <div className="bg-gray-900/70 p-8 rounded-xl border border-gray-700 shadow-2xl">
                    <p className="text-gray-300 mb-6 text-center">
                        Schlagerpunkarna borde få vara med i Melodifestivalen 2026. Skriv in ditt namn för att visa att du stöder schlanarkismens budskap.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-200"
                            >
                                Ditt namn
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ditt namn"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || isSuccess || !name.trim()}
                            className={`w-full p-4 rounded-lg font-medium text-white transition-all transform
                ${isSuccess
                                    ? 'bg-green-500 hover:bg-green-600'
                                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                                } 
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:scale-[1.02] active:scale-[0.98]`}
                        >
                            <span className="flex items-center justify-center gap-2">
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
                    </form>

                    {status && (
                        <div className={`mt-4 p-3 rounded-lg text-center text-sm ${isSuccess ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
                            {status}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}