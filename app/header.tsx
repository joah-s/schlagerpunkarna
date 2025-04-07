'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  // Check if we're on a page that needs a back button
  const isSubPage = pathname === '/historia' || pathname === '/boka';

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
    
    // Add click event listener to close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to handle smooth scrolling with offset for specific sections
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.replace('#', '');
    
    // If we're not on the main page, navigate to main page with hash
    if (window.location.pathname !== '/') {
      window.location.href = `/${href}`;
      return;
    }
    
    // If we're on the main page, scroll to the section
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

  // Function to handle logo click
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(false);
    
    // If we're not on the main page, navigate to main page
    if (window.location.pathname !== '/') {
      window.location.href = '/';
      return;
    }
    
    // If we're on the main page, scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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
      sm:top-0 sm:bottom-auto bottom-0`}>
      <div className="mx-auto px-4 sm:px-8 lg:px-16 lg:py-4">
        <div className="flex justify-between items-center px-2">
          {/* Logo or Back Button */}
          <div className="flex-shrink-0 transition-transform duration-500 ease-in-out hover:scale-110 flex items-center">
            {isSubPage ? (
              <Link href="/" className="flex items-center text-gray-300 hover:text-white">
                <ArrowLeft className="w-8 h-8" />
              </Link>
            ) : (
              <a href="/" onClick={handleLogoClick} className="flex items-center">
                <img
                  src="icons/spLogo.png"
                  alt="Logo"
                  className="w-8 h-8 object-contain transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                />
              </a>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center justify-center space-x-8 w-full">
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col items-center">
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:scale-105 text-sm py-2 w-32 text-center rounded-2xl text-lg text-gray-300 hover:text-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col items-center"
                >
                  {link.name}
                  <div 
                    className={`h-2 w-2 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] mt-2 ${activeSection === link.id ? 'bg-yellow-400 scale-125' : 'bg-white'}`}
                  ></div>
                </a>
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:block relative flex items-center" ref={menuRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-50 relative p-2 touch-manipulation"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-8 w-8 sm:h-8 sm:w-8 transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] rotate-0 hover:rotate-90" />
              ) : (
                <Menu className="h-8 w-8 sm:h-8 sm:w-8 transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-110" />
              )}
            </button>
            
            {/* Mobile Navigation - Dropdown Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="absolute right-0 mb-4 mt-0 sm:mt-2 w-64 bg-black/95 backdrop-blur-md rounded-lg overflow-hidden z-40 origin-top-right bottom-full sm:top-auto sm:bottom-auto shadow-xl shadow-gray-900"
                >
                  <div className="py-4 px-2">
                    {/* Main navigation links */}
                    {navLinks.map((link, index) => (
                      <motion.div 
                        key={link.name} 
                        className="w-full"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ 
                          delay: 0.05 * index,
                          type: 'spring',
                          stiffness: 300,
                          damping: 24
                        }}
                      >
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className="flex items-center text-2xl sm:text-xl font-bold text-gray-200 hover:text-white transition-colors duration-200 py-2 px-4 "
                        >
                          <div 
                            className={`h-3 w-3 mr-3 ${activeSection === link.id ? 'bg-yellow-400' : 'bg-gray-600'}`}
                          ></div>
                          {link.name}
                        </a>
                        
                        {/* Sub-navigation links */}
                        <div className="ml-6">
                          {subNavLinks
                            .filter(subLink => subLink.parent === link.id)
                            .map((subLink, subIndex) => (
                              <motion.div
                                key={subLink.name}
                                initial={{ x: 10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ 
                                  delay: 0.05 * index + 0.03 * subIndex,
                                  type: 'spring',
                                  stiffness: 300,
                                  damping: 24
                                }}
                              >
                                <a
                                  href={subLink.href}
                                  onClick={(e) => handleNavClick(e, subLink.href)}
                                  className="flex items-center text-xl sm:text-sm text-gray-400 hover:text-white transition-colors duration-200 py-1 px-4"
                                >
                                  <div className="h-2 w-2 mr-2 bg-gray-500"></div>
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
        </div>
      </div>
    </nav>
  );
};

export default Header;