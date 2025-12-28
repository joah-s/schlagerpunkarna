'use client';
import { textData } from "@/app/lib/textData";
import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isSubPage = pathname === '/timeline' || pathname === '/book';

  // Function to handle smooth scrolling
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Check if the href is for a subpage
    if (href === '#timeline' || href === '#book') {
      const pageName = href.replace('#', '');
      router.push(`/${pageName}`);
      return;
    }
    
    // If we're on a subpage and want to go to the main page with an anchor
    if (isSubPage) {
      // Navigate to main page with anchor
      router.push(`/${href}`);
      return;
    }
    
    // Handle smooth scrolling on main page
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'Intro', href: '#about', id: 'about' },
    { name: 'Boka oss', href: '#book', id: 'book' },
    { name: 'Medlemmar', href: '#members', id: 'members' },
    { name: 'Historia', href: '#timeline', id: 'timeline' },
    { name: 'Recensioner', href: '#reviews', id: 'reviews' },
    { name: 'Musik', href: '#music', id: 'music' },
    { name: 'Filmer', href: '#videos', id: 'videos' },
    { name: 'Namninsamling', href: '#petition', id: 'petition' }
  ];

  const subNavLinks = [
    // About section
    { name: 'Intro', href: '#about', parent: 'about' },
    { name: 'Medlemmar', href: '#members', parent: 'about' },
    { name: 'Recensioner', href: '#reviews', parent: 'about' },
    // Discography section
    { name: 'Musik', href: '#music', parent: 'discography' },
    { name: 'Filmer', href: '#videos', parent: 'discography' },
    // Contact section
    { name: 'Namninsamling', href: '#petition', parent: 'contact' }
  ];

  return (
    <footer id="footer" className="font-Viga bg-black py-16 px-4 sm:px-8 lg:px-16">
      <div className="container mx-auto max-w-7xl space-y-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4 mx-auto text-center md:text-left md:mx-0">
            <h3 className="text-2xl font-semibold border-b border-gray-800 pb-4">Kontakt</h3>
            <p className="text-gray-400">{textData.footer.sections.contact.email}</p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4 justify-center md:justify-start">
              {/* Facebook */}
              <motion.a 
                href={textData.footer.sections.contact.social.facebook.url} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
                  </svg>
                </div>
              </motion.a>

              {/* Spotify */}
              <motion.a 
                href={textData.footer.sections.contact.social.spotify.url} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Spotify"
                className="text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,0C5.4,0,0,5.4,0,12s5.4,12,12,12s12-5.4,12-12S18.6,0,12,0z M17.5,17.3c-0.2,0.3-0.6,0.4-0.9,0.2 c-2.5-1.5-5.6-1.9-9.3-1c-0.4,0.1-0.7-0.1-0.8-0.5c-0.1-0.4,0.1-0.7,0.5-0.8c4-0.9,7.5-0.5,10.2,1.2C17.6,16.6,17.7,17,17.5,17.3z M19,14c-0.3,0.4-0.8,0.5-1.2,0.3c-2.8-1.7-7.1-2.2-10.4-1.2c-0.4,0.1-0.9-0.1-1-0.5c-0.1-0.4,0.1-0.9,0.5-1 c3.8-1.1,8.5-0.6,11.7,1.3C19.1,13.1,19.2,13.6,19,14z M19.1,10.7c-3.4-2-9-2.2-12.2-1.2c-0.5,0.2-1.1-0.1-1.3-0.6 c-0.2-0.5,0.1-1.1,0.6-1.3c3.7-1.1,9.9-0.9,13.8,1.4c0.5,0.3,0.6,0.9,0.3,1.4C20,10.9,19.4,11,19.1,10.7z"/>
                  </svg>
                </div>
              </motion.a>

              {/* YouTube */}
              <motion.a 
                href={textData.footer.sections.contact.social.youtube.url} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.5,6.2c-0.3-1-1.1-1.8-2.1-2.1C19.5,3.6,12,3.6,12,3.6s-7.5,0-9.4,0.5c-1,0.3-1.8,1.1-2.1,2.1C0,8.1,0,12,0,12 s0,3.9,0.5,5.8c0.3,1,1.1,1.8,2.1,2.1c1.9,0.5,9.4,0.5,9.4,0.5s7.5,0,9.4-0.5c1-0.3,1.8-1.1,2.1-2.1c0.5-1.9,0.5-5.8,0.5-5.8 S24,8.1,23.5,6.2z M9.6,15.6V8.4l6.3,3.6L9.6,15.6z"/>
                  </svg>
                </div>
              </motion.a>
 
              {/* Instagram */}
              <motion.a 
                href={textData.footer.sections.contact.social.instagram.url} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2.2c3.2,0,3.6,0,4.9,0.1c3.3,0.1,4.8,1.7,4.9,4.9c0.1,1.3,0.1,1.6,0.1,4.8c0,3.2,0,3.6-0.1,4.8c-0.1,3.2-1.7,4.8-4.9,4.9 c-1.3,0.1-1.6,0.1-4.9,0.1c-3.2,0-3.6,0-4.8-0.1c-3.3-0.1-4.8-1.7-4.9-4.9c-0.1-1.3-0.1-1.6-0.1-4.8c0-3.2,0-3.6,0.1-4.8 c0.1-3.2,1.7-4.8,4.9-4.9C8.4,2.2,8.8,2.2,12,2.2z M12,0C8.7,0,8.3,0,7.1,0.1c-4.4,0.2-6.8,2.6-7,7C0,8.3,0,8.7,0,12 c0,3.3,0,3.7,0.1,4.9c0.2,4.4,2.6,6.8,7,7C8.3,24,8.7,24,12,24c3.3,0,3.7,0,4.9-0.1c4.4-0.2,6.8-2.6,7-7C24,15.7,24,15.3,24,12 c0-3.3,0-3.7-0.1-4.9c-0.2-4.4-2.6-6.8-7-7C15.7,0,15.3,0,12,0z M12,5.8c-3.4,0-6.2,2.8-6.2,6.2c0,3.4,2.8,6.2,6.2,6.2 c3.4,0,6.2-2.8,6.2-6.2C18.2,8.6,15.4,5.8,12,5.8z M12,16c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4s4,1.8,4,4C16,14.2,14.2,16,12,16z M18.4,4.2c-0.8,0-1.4,0.6-1.4,1.4c0,0.8,0.6,1.4,1.4,1.4c0.8,0,1.4-0.6,1.4-1.4C19.8,4.8,19.2,4.2,18.4,4.2z"/>
                  </svg>
                </div>
              </motion.a>
            </div>
          </div>
          
          {/* Navigation Links - Only visible on larger screens */}
          <div className="hidden md:block">
            <h3 className="text-2xl font-semibold border-b border-gray-800 pb-4 text-white">Navigera</h3>
            <div className="mt-4 grid grid-cols-2 gap-x-4">
              {navLinks.map((link) => (
                <div key={link.id} className="mb-2">
                  {isSubPage ? (
                    link.href === '#timeline' || link.href === '#book' ? (
                      <Link 
                        href={`/${link.href.replace('#', '')}`}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <Link 
                        href={`/${link.href}`}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    )
                  ) : (
                    link.href === '#timeline' || link.href === '#book' ? (
                      <Link 
                        href={`/${link.href.replace('#', '')}`}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a 
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        {/* Logo and Description */}
        <div className="flex flex-col gap-1 items-center text-center mx-auto py-8">
          <div className="flex items-center">
            <h2 className="text-2xl sm:text-3xl font-bold">{textData.footer.heading}</h2>
          </div>
          <p className="text-gray-400 max-w-xs">{textData.footer.description}</p>
          
          {/* Developer Credits */}
          <div className="mt-6 text-gray-500 text-sm">
            <p>Webbsidan programmerad av Jonathan Ahlström</p>
            <div className="flex justify-center space-x-4 mt-2">
              <motion.a 
                href={textData.footer.sections.developer.links.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </div>
              </motion.a>
              <motion.a 
                href={textData.footer.sections.developer.links.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </div>
              </motion.a>
              <motion.a 
                href={textData.footer.sections.developer.links.email.url}
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  Email
                </div>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;