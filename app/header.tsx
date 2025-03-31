'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > innerHeight;
      setScrolled(isScrolled);

      // Determine which section is currently in view
      const sections = ['about', 'music', 'contact'];
      
      // Check if we're above the "about" section
      const aboutElement = document.getElementById('about');
      if (aboutElement && aboutElement.getBoundingClientRect().top > window.innerHeight / 2) {
        setActiveSection('');
        return;
      }
      
      // Otherwise check which section is in view
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Om oss', href: '#about', id: 'about' },
    { name: 'Diskografi', href: '#music', id: 'music' },
    { name: 'Kontakt', href: '#contact', id: 'contact' }
  ];

  return (
    <nav className={`font-Viga fixed w-full z-50 transition-all  duration-500 backdrop-blur-sm bg-black/80 ${scrolled  ? ' py-4' : 'sm:bg-transparent py-4'
      }`}>
      <div className="mx-auto px-6 sm:px-10 lg:px-8 lg:py-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 transition-transform duration-500 ease-in-out hover:scale-110">
            <img
              src="icons/spLogo.png"
              alt="Logo"
              className="w-8 h-8 mb-1 object-contain transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center justify-center space-x-4 w-full">
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col items-center">
                <a
                  href={link.href}
                  className="hover:scale-105 text-sm py-1 w-32 text-center rounded-2xl text-lg text-gray-300 hover:text-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col items-center"
                >
                  {link.name}
                  <div 
                    className={`h-2 w-2 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] mt-1 ${activeSection === link.id ? 'bg-yellow-400 scale-125' : 'bg-white'}`}
                  ></div>
                </a>
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-50 relative"
            >
              {isOpen ? (
                <X className="h-8 w-8 transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] rotate-0 hover:rotate-90" />
              ) : (
                <Menu className="h-8 w-8 transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-110" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Full Screen */}
        {isOpen && (
          <div className="sm:hidden ">
            <div className="mt-[30vh] px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <div key={link.name} className="flex items-center">
                  <a
                    href={link.href}
                    className="flex items-center text-lg text-gray-300 hover:text-white transition-colors duration-200 py-2 w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <div 
                      className={`h-2 w-2 mr-2 ${activeSection === link.id ? 'bg-yellow-400' : 'bg-gray-600'}`}
                    ></div>
                    {link.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;