
import React from 'react';
import LeafIllustration from './LeafIllustration';
import WaveDivider from './WaveDivider';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] pt-20 pb-0 overflow-hidden flex flex-col justify-between">
      {/* Watercolor background patch behind text */}
      <div className="absolute top-20 left-0 w-1/2 h-full bg-[#F5E1D2]/10 rounded-full blur-3xl -z-10 transform -translate-x-1/4" />

      <div className="px-6 max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-8 md:gap-12 z-10 flex-grow pt-10">
        
        {/* SZÖVEG - Bal oldalon */}
        <div className="w-full md:w-3/5 space-y-4 md:space-y-8 text-left order-2 md:order-1">
          <div className="inline-block px-3 py-1 bg-[#8BA888]/10 rounded-full border border-[#8BA888]/20">
            <span className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-[#6B8369]">Elérhető projektekre</span>
          </div>
          
          <h1 className="text-[32px] sm:text-[42px] md:text-[76px] leading-[1.05] serif text-[#C87941] font-bold tracking-tight">
            Szia, Réka <br />
            <span className="text-[#4A403A]">vagyok –</span> <br />
            <span className="script italic text-[#4A403A] text-5xl sm:text-6xl md:text-9xl font-normal lowercase tracking-tight block -mt-2 md:-mt-6 ml-1">grafikus.</span>
          </h1>
          
          <p className="text-[#5A5A5A] text-xs md:text-xl leading-relaxed font-medium max-w-[280px] md:max-w-lg">
            Egyedi arculatok, nyomtatványok és kreatív grafikák vállalkozásoknak és magánszemélyeknek.
          </p>

          <div className="pt-4 md:pt-10">
            <a 
              href="#portfolio" 
              className="inline-flex items-center gap-3 md:gap-4 bg-[#D97706] text-white px-6 md:px-12 py-3.5 md:py-5 rounded-full text-xs md:text-base font-bold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 active:scale-95 w-auto"
            >
              Munkáim megtekintése
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* KÉP - Jobb oldalon */}
        <div className="relative w-full md:w-2/5 flex justify-center md:justify-end order-1 md:order-2">
          <div className="relative">
            <div className="w-[140px] sm:w-[180px] md:w-[380px] aspect-[4/5] squircle overflow-hidden shadow-2xl border-[4px] md:border-[15px] border-white bg-white">
              <img 
                src="./reka_hero.jpg" 
                alt="Réka portré" 
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800"; }}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Pöttyök dekoráció a kép alatt/mellett (mint a mintán) */}
            <div className="absolute -right-4 md:-right-8 top-1/2 transform -translate-y-1/2 opacity-30">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2">
                {[...Array(6)].map((_, i) => <div key={i} className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 bg-[#8BA888] rounded-full"></div>)}
              </div>
            </div>

            {/* Watercolor effect around image */}
            <div className="absolute inset-0 -z-10 bg-[#C87941]/5 blur-2xl rounded-full transform scale-125" />
          </div>
        </div>
      </div>

      <div className="w-full z-20 mt-8 md:mt-16">
        <WaveDivider fill="#F5E1D2" className="h-[30px] md:h-[120px]" />
      </div>
    </section>
  );
};

export default Hero;
