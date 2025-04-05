'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > innerHeight;
      setScrolled(isScrolled);

      // Determine which section is currently in view
      const sections = ['omoss', 'diskografi', 'kontakt'];
      
      // Check if we're above the "omoss" section
      const omossElement = document.getElementById('omoss');
      if (omossElement && omossElement.getBoundingClientRect().top > window.innerHeight / 2) {
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

  // Function to handle smooth scrolling with offset for specific sections
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Apply different offsets based on section
      let offset = 0;
      if (targetId === 'omoss') offset = -100;
      if (targetId === 'medlemmar') offset = -50;
      if (targetId === 'filmer') offset = -50;
      
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'Om oss', href: '#omoss', id: 'omoss' },
    { name: 'Diskografi', href: '#diskografi', id: 'diskografi' },
    { name: 'Kontakt', href: '#kontakt', id: 'kontakt' }
  ];

  const subNavLinks = [
    // Om oss section
    { name: 'Intro', href: '#omoss', parent: 'omoss' },
    { name: 'Medlemmar', href: '#medlemmar', parent: 'omoss' },
    { name: 'Recensioner', href: '#recensioner', parent: 'omoss' },
    // Diskografi section
    { name: 'Musik', href: '#musik', parent: 'diskografi' },
    { name: 'Filmer', href: '#filmer', parent: 'diskografi' },
    // Kontakt section
    { name: 'Form', href: '#form', parent: 'kontakt' },
    { name: 'Kontakt', href: '#footer', parent: 'kontakt' }
  ];

  return (
    <nav className={`font-Viga fixed w-full z-50 transition-all duration-500 backdrop-blur-sm bg-black/80 py-4 
      ${scrolled ? '' : ' bg-black/80 sm:bg-transparent'}
      sm:top-0 bottom-auto`}>
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
                  onClick={(e) => handleNavClick(e, link.href)}
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
          <div className="sm:block">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-50 relative p-2 touch-manipulation"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-10 w-10 sm:h-8 sm:w-8 transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] rotate-0 hover:rotate-90" />
              ) : (
                <Menu className="h-10 w-10 sm:h-8 sm:w-8 transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-110" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Full Screen with Animations */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-md z-40 top-0 left-0 right-0 bottom-0 h-screen overflow-y-auto"
            >
              <div className="mt-[15vh] px-4 pt-2 pb-3 space-y-1 flex flex-col items-center">
                {/* Main navigation links */}
                {navLinks.map((link, index) => (
                  <motion.div 
                    key={link.name} 
                    className="mb-4 w-full max-w-xs"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ 
                      delay: 0.1 + index * 0.1,
                      type: 'spring',
                      stiffness: 300,
                      damping: 24
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="flex items-center text-xl font-bold text-gray-200 hover:text-white transition-colors duration-200 py-3"
                    >
                      <div 
                        className={`h-3 w-3 mr-3 ${activeSection === link.id ? 'bg-yellow-400' : 'bg-gray-600'}`}
                      ></div>
                      {link.name}
                    </a>
                    
                    {/* Sub-navigation links */}
                    <div className="ml-6 mt-2 space-y-2">
                      {subNavLinks
                        .filter(subLink => subLink.parent === link.id)
                        .map((subLink, subIndex) => (
                          <motion.div
                            key={subLink.name}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ 
                              delay: 0.2 + index * 0.1 + subIndex * 0.05,
                              type: 'spring',
                              stiffness: 300,
                              damping: 24
                            }}
                          >
                            <a
                              href={subLink.href}
                              onClick={(e) => handleNavClick(e, subLink.href)}
                              className="flex items-center text-lg text-gray-400 hover:text-white transition-colors duration-200 py-2 px-1"
                            >
                              <div className="h-2 w-2 mr-3 bg-gray-500"></div>
                              {subLink.name}
                            </a>
                          </motion.div>
                        ))
                      }
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Header;