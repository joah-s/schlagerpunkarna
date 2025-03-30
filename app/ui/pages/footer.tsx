import { textData } from "@/app/lib/textData";

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black px-[2%] md:px-[5rem] lg:px-16 py-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          {/* Logo and Description */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{textData.footer.heading}</h2>
            <p className="text-gray-400">{textData.footer.description}</p>
          </div>

          {/* Follow Us Section */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Följ oss</h3>
            <p className="text-gray-400">sclagerpunkarna.gmail.com</p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-2">
              {/* Facebook */}
              <a href={textData.footer.links.facebook} className="text-white hover:text-gray-400 transition-colors">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
                  </svg>
                </div>
              </a>

              {/* Spotify */}
              <a href={textData.footer.links.spotify} className="text-white hover:text-gray-400 transition-colors">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,0C5.4,0,0,5.4,0,12s5.4,12,12,12s12-5.4,12-12S18.6,0,12,0z M17.5,17.3c-0.2,0.3-0.6,0.4-0.9,0.2 c-2.5-1.5-5.6-1.9-9.3-1c-0.4,0.1-0.7-0.1-0.8-0.5c-0.1-0.4,0.1-0.7,0.5-0.8c4-0.9,7.5-0.5,10.2,1.2C17.6,16.6,17.7,17,17.5,17.3z M19,14c-0.3,0.4-0.8,0.5-1.2,0.3c-2.8-1.7-7.1-2.2-10.4-1.2c-0.4,0.1-0.9-0.1-1-0.5c-0.1-0.4,0.1-0.9,0.5-1 c3.8-1.1,8.5-0.6,11.7,1.3C19.1,13.1,19.2,13.6,19,14z M19.1,10.7c-3.4-2-9-2.2-12.2-1.2c-0.5,0.2-1.1-0.1-1.3-0.6 c-0.2-0.5,0.1-1.1,0.6-1.3c3.7-1.1,9.9-0.9,13.8,1.4c0.5,0.3,0.6,0.9,0.3,1.4C20,10.9,19.4,11,19.1,10.7z"/>
                  </svg>
                </div>
              </a>

              {/* YouTube */}
              <a href={textData.footer.links.youtube} className="text-white hover:text-gray-400 transition-colors">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.5,6.2c-0.3-1-1.1-1.8-2.1-2.1C19.5,3.6,12,3.6,12,3.6s-7.5,0-9.4,0.5c-1,0.3-1.8,1.1-2.1,2.1C0,8.1,0,12,0,12 s0,3.9,0.5,5.8c0.3,1,1.1,1.8,2.1,2.1c1.9,0.5,9.4,0.5,9.4,0.5s7.5,0,9.4-0.5c1-0.3,1.8-1.1,2.1-2.1c0.5-1.9,0.5-5.8,0.5-5.8 S24,8.1,23.5,6.2z M9.6,15.6V8.4l6.3,3.6L9.6,15.6z"/>
                  </svg>
                </div>
              </a>
 
              {/* Instagram */}
              <a href={textData.footer.links.instagram} className="text-white hover:text-gray-400 transition-colors">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2.2c3.2,0,3.6,0,4.9,0.1c3.3,0.1,4.8,1.7,4.9,4.9c0.1,1.3,0.1,1.6,0.1,4.8c0,3.2,0,3.6-0.1,4.8c-0.1,3.2-1.7,4.8-4.9,4.9 c-1.3,0.1-1.6,0.1-4.9,0.1c-3.2,0-3.6,0-4.8-0.1c-3.3-0.1-4.8-1.7-4.9-4.9c-0.1-1.3-0.1-1.6-0.1-4.8c0-3.2,0-3.6,0.1-4.8 c0.1-3.2,1.7-4.8,4.9-4.9C8.4,2.2,8.8,2.2,12,2.2z M12,0C8.7,0,8.3,0,7.1,0.1c-4.4,0.2-6.8,2.6-7,7C0,8.3,0,8.7,0,12 c0,3.3,0,3.7,0.1,4.9c0.2,4.4,2.6,6.8,7,7C8.3,24,8.7,24,12,24c3.3,0,3.7,0,4.9-0.1c4.4-0.2,6.8-2.6,7-7C24,15.7,24,15.3,24,12 c0-3.3,0-3.7-0.1-4.9c-0.2-4.4-2.6-6.8-7-7C15.7,0,15.3,0,12,0z M12,5.8c-3.4,0-6.2,2.8-6.2,6.2c0,3.4,2.8,6.2,6.2,6.2 c3.4,0,6.2-2.8,6.2-6.2C18.2,8.6,15.4,5.8,12,5.8z M12,16c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4s4,1.8,4,4C16,14.2,14.2,16,12,16z M18.4,4.2c-0.8,0-1.4,0.6-1.4,1.4c0,0.8,0.6,1.4,1.4,1.4c0.8,0,1.4-0.6,1.4-1.4C19.8,4.8,19.2,4.2,18.4,4.2z"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;