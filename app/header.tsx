'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > innerHeight;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Om oss', href: '#about' },
    { name: 'Diskografi', href: '#music' },
    { name: 'Kontakt', href: '#contact' }

  ];

  return (
    <nav className={`font-Viga fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-sm py-4' : 'bg-black/80 sm:bg-transparent py-4'
      }`}>
      <div className=" mx-auto px-6 sm:px-10 lg:px-8 lg:py-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="icons/spLogo.png"
              alt="Logo"
              className="w-8 h-8 mb-1  object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className=" text-sm py-2 w-32 text-center  rounded-2xl border border-gray-600  text-lg text-gray-300 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              {isOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="sm:hidden ">
            <div className="mt-[30vh] px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block  text-lg text-gray-300   hover:text-white transition-colors duration-200 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;