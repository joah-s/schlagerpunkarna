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
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  
  // Check if we're on a page that needs a back button
  const isSubPage = pathname === '/timeline' || pathname === '/book';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > innerHeight;
      setScrolled(isScrolled);

      // Determine which section is currently in view
      const sections = ['about', 'discography', 'contact'];
      
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

  useEffect(() => {
    if (!isOpen) return;

    // Improve keyboard UX: move focus into the opened menu and allow Escape to close
    firstMobileLinkRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

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
      if (targetId === 'about') offset = -100;
      if (targetId === 'members') offset = -50;
      if (targetId === 'videos') offset = -50;
      
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Function to handle logo click
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsOpen(false);

    // If we're on the main page, scroll to top instead of reloading/navigating
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'Om oss', href: '#about', id: 'about' },
    { name: 'Diskografi', href: '#discography', id: 'discography' },
    { name: 'Kontakt', href: '#contact', id: 'contact' }
  ];

  const subNavLinks = [
    // About section
    { name: 'Medlemmar', href: '#members', parent: 'about' },
    { name: 'Recensioner', href: '#reviews', parent: 'about' },
    // Discography section
    { name: 'Musik', href: '#music', parent: 'discography' },
    { name: 'Filmer', href: '#videos', parent: 'discography' },
    // Contact section
    { name: 'Namninsamling', href: '#petition', parent: 'contact' },
    { name: 'Kontakt', href: '#footer', parent: 'contact' }
  ];

  return (
    <nav
      aria-label="Huvudnavigering"
      className={`font-Viga fixed w-full z-50 transition-all duration-500 backdrop-blur-sm bg-black/80 py-4 
      ${scrolled ? '' : ' bg-black/80 sm:bg-transparent'}
      sm:top-0 sm:bottom-auto bottom-0`}
    >
      <div className="mx-auto px-4 sm:px-8 lg:px-16 lg:py-4">
        <div className="flex justify-between items-center px-2">
          {/* Logo or Back Button */}
          <div className="flex-shrink-0 transition-transform duration-500 ease-in-out hover:scale-110 flex items-center">
            {isSubPage ? (
              <Link href="/" aria-label="Tillbaka till startsidan" className="flex items-center text-gray-300 hover:text-white">
                <ArrowLeft className="w-8 h-8" />
              </Link>
            ) : (
              <Link href="/" onClick={handleLogoClick} aria-label="Gå till startsidan" className="flex items-center">
                <img
                  src="icons/spLogo.png"
                  alt="Schlagerpunkarna logotyp"
                  className="w-8 h-8 object-contain transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                />
              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center justify-center space-x-8 w-full">
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col items-center">
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`hover:scale-105 text-sm md:text-lg py-2 w-32 text-center rounded-2xl text-lg transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${activeSection === link.id ? 'text-yellow-400' : 'text-gray-300 hover:text-white'}`}
                  aria-current={activeSection === link.id ? 'location' : undefined}
                >
                  {link.name}
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
              aria-expanded={isOpen}
              aria-controls="primary-navigation"
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
                  id="primary-navigation"
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
                          ref={index === 0 ? firstMobileLinkRef : undefined}
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className={`flex items-center text-2xl sm:text-xl font-bold transition-colors duration-200 py-2 px-4 ${activeSection === link.id ? 'text-yellow-400' : 'text-gray-200 hover:text-white'}`}
                          aria-current={activeSection === link.id ? 'location' : undefined}
                        >
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