import TeamMemberCard from "../dashboard/TeamMemberCard";
import { textData } from '../../lib/textData';
import { useRef } from 'react';

export default function Characters() {
    const targetRef = useRef(null);
    
    return (
      <div className="relative px-[2%] md:px-[5rem] lg:px-16" ref={targetRef}>
        <section className="py-12 md:py-16 lg:py-20 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 md:mb-8 uppercase tracking-wider text-purple-400 font-Viga">
            {textData.characters.heading}
          </h2>
          <div className="space-y-5 max-w-3xl">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 font-semibold font-Viga tracking-wide">
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

        <img className="absolute -z-10 inset-0 w-full h-full object-cover opacity-100 mix-blend-color-burn" src="/icons/spAnarkist.png" alt="Background Image" />
      </div>
    );
  }