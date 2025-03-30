import TeamMemberCard from "../dashboard/TeamMemberCard";
import { textData } from '../../lib/textData';

export default function Characters() {
    return (
      <div className="relative px-[2%] md:px-[5rem] " >
        <section className="py-16 px-6">
        <h2 className="text-2xl font-bold  md:text-4xl font-bold mb-6 uppercase tracking-wider text-purple-400">
          {textData.characters.heading}
        </h2>
        <div className="space-y-6 max-w-3xl">
          <p className="text-lg md:text-xl leading-relaxed text-gray-300">
          {textData.characters.paragraph}
            
          </p>
          
        </div>
        
      </section>
         

<div>
  {textData.characters.punkare.map((character, index) => (
    <TeamMemberCard
      key={index}
      imgSrc={character.imgSrc}
      iconSrc={character.iconSrc}
      name={character.name}
      role={character.role}
      description={character.description}
    />
  ))}
</div>




<img className="absolute -z-10 inset-0 w-full h-full object-cover  opacity-100 mix-blend-color-burn" src="/icons/spAnarkist.png" alt="Background Image" />

    </div>
    );
  }
  