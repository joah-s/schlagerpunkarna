import TeamMemberCard from "../dashboard/TeamMemberCard";
import { textData } from '../../lib/textData';
import { useRef } from 'react';

export default function Characters() {
    const targetRef = useRef(null);
    
    return (
      <div className="relative px-4 md:px-16 lg:px-16" ref={targetRef}>
        <section className="py-12 md:py-16 lg:py-16 relative z-10">
          <h2 className="text-5xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-Viga tracking-tight mb-8 md:mb-8 uppercase flex items-center justify-center md:justify-start font-extrabold font-Viga tracking-tight mb-4 sm:mb-6 md:mb-8 uppercase tracking-tight text-purple-400 font-Viga text-center">
            {textData.characters.heading}
          </h2>
          <div className="space-y-8 max-w-3xl">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 font-semibold font-Viga tracking-wide flex items-center justify-center md:justify-start">
              {textData.characters.paragraph}
            </p>
          </div>
        </section>
         
        <div>
          {textData.characters.punkare.map((character, index) => (
            <div key={index}>
              <TeamMemberCard
                imgSrc={character.imgSrc}
                iconSrc={character.iconSrc}
                name={character.name}
                role={character.role}
                description={character.description}
              />
            </div>
          ))}
        </div>

        <img className="absolute -z-10 inset-0 w-full h-full object-cover opacity-100 mix-blend-color-burn" 
          src="/backgrounds/reviewBackground.jpg" 
          alt=""
          aria-hidden="true"
        />
      </div>
    );
  }