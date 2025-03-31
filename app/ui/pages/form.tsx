"use client";

import React, { useState } from "react";
import { textData } from "@/app/lib/textData";
import { SendHorizontal, CheckCircle } from "lucide-react";

export default function Form() {
  const [formData, setFormData] = useState({
    email: "",
    title: "",
    message: ""
  });
  
  const [errors, setErrors] = useState({
    email: "",
    title: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    const newErrors = {
      email: !formData.email ? "Email är obligatorisk" : 
             !validateEmail(formData.email) ? "Ogiltig email adress" : "",
      title: !formData.title ? "Titel är obligatorisk" : "",
      message: !formData.message ? "Meddelande är obligatorisk" : ""
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== "")) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({ email: "", title: "", message: "" });
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-Viga relative py-20 flex flex-col antialiased items-center justify-center overflow-hidden">
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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-white mb-4">
            {textData.form.heading}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-200"
            >
              Din email-adress
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 bg-gray-900/50 border ${
                errors.email ? 'border-red-500' : 'border-gray-600'
              } rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors`}
              placeholder="roger.punkare@hotmail.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-200"
            >
              Titel
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-3 bg-gray-900/50 border ${
                errors.title ? 'border-red-500' : 'border-gray-600'
              } rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-200"
            >
              Skriv
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`w-full p-3 bg-gray-900/50 border ${
                errors.message ? 'border-red-500' : 'border-gray-600'
              } rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none`}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
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
                  Skickat!
                </>
              ) : isSubmitting ? (
                "Skickar..."
              ) : (
                <>
                  <SendHorizontal className="w-5 h-5" />
                  Skicka
                </>
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}