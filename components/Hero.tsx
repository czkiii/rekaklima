
import React from 'react';
import LeafIllustration from './LeafIllustration';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-16 px-6 overflow-hidden min-h-[90vh] flex flex-col justify-center">
      {/* Background watercolor blotches */}
      <div className="absolute top-0 right-0 w-full h-[70%] bg-[#F5E1D2]/20 rounded-bl-[120px] -z-10" />
      
      {/* Hand-drawn Leaf Decoration */}
      <div className="absolute top-20 left-0 opacity-40 transform -rotate-12">
        <LeafIllustration className="w-28 h-28 text-[#8BA888]" />
      </div>

      <div className="flex flex-col gap-10 relative z-10">
        <div className="max-w-[75%] space-y-5">
          <h1 className="text-[42px] leading-[1.1] serif text-[#C87941] font-bold">
            Szia, Réka <br />
            <span className="text-[#4A403A]">vagyok –</span> <br />
            <span className="script italic text-[#4A403A] text-4xl font-normal lowercase tracking-tight">grafikus.</span>
          </h1>
          
          <p className="text-[#5A5A5A] text-sm leading-relaxed font-medium pr-10">
            Egyedi arculatok, nyomtatványok és kreatív grafikák vállalkozásoknak és magánszemélyeknek.
          </p>

          <a 
            href="#portfolio" 
            className="inline-flex items-center gap-2 bg-[#D97706] text-white px-8 py-3.5 rounded-full text-sm font-bold shadow-lg btn-hover"
          >
            Munkáim megtekintése &rarr;
          </a>
        </div>

        {/* Hero Image - Smiling Portrait (based on provided Image 2) */}
        <div className="absolute top-[-20px] right-[-45px] w-[55%] h-[420px] overflow-visible pointer-events-none">
          <div className="w-full h-full rounded-l-[120px] overflow-hidden shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
              alt="Réka mosolyog" 
              className="w-full h-full object-cover grayscale-[5%]"
            />
          </div>
          {/* Decorative floating leaf on image */}
          <div className="absolute bottom-10 -left-6 opacity-30 transform rotate-45">
            <LeafIllustration className="w-16 h-16 text-[#C87941]" />
          </div>
        </div>
      </div>

      {/* Subtle watercolor bottom wave */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-[#F5E1D2]/10 watercolor-wave" />
    </section>
  );
};

export default Hero;
