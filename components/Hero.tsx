
import React from 'react';
import WaveDivider from './WaveDivider.tsx';

const Hero: React.FC = () => {
  const rekaHero = "/assets/portrait/reka_hero.jpg";

  return (
    <section className="relative min-h-screen pt-48 pb-0 overflow-hidden flex flex-col">
      <div className="absolute top-20 -left-20 w-[600px] h-[600px] bg-[#F5E1D2]/20 rounded-full blur-[120px] -z-10" />
      
      <div className="absolute top-60 right-10 w-32 h-32 opacity-10 rotate-45 -z-10 pointer-events-none text-[#6B8369]">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0C60 30 90 40 100 50C70 60 60 90 50 100C40 70 10 60 0 50C30 40 40 10 50 0Z" />
        </svg>
      </div>

      <div className="px-6 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 z-10 flex-grow">
        <div className="w-full md:w-1/2 space-y-6 md:space-y-10 order-2 md:order-1 reveal active">
          <div className="inline-block px-4 py-1.5 bg-white/50 backdrop-blur-sm rounded-full border border-[#8BA888]/30 shadow-sm">
            <span className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] font-bold text-[#6B8369]">Elérhető szabadúszó projektekre</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-[90px] leading-[0.95] serif text-[#C87941] font-bold tracking-tight">
            Szia, Réka <br />
            <span className="text-[#4A403A]">vagyok –</span> <br />
            <span className="script italic text-[#4A403A] text-6xl sm:text-7xl md:text-[130px] font-normal lowercase tracking-tight block -mt-2 md:-mt-8 ml-2">grafikus.</span>
          </h1>
          
          <p className="text-[#5A5A5A] text-sm md:text-xl leading-relaxed font-medium max-w-md">
            Lélekkel teli vizuális történetek, organikus formák és maradandó arculatok tervezése.
          </p>

          <div className="pt-6">
            <a href="#portfolio" className="inline-flex items-center gap-4 bg-[#D97706] text-white px-8 md:px-14 py-4 md:py-6 rounded-full text-sm md:text-base font-bold shadow-xl transition-all hover:-translate-y-1 group">
              Munkáim megtekintése
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        <div className="relative w-full md:w-1/2 flex justify-center md:justify-end order-1 md:order-2">
          <div className="relative">
            <div className="animate-float rounded-full">
              <div className="w-[200px] sm:w-[280px] md:w-[450px] aspect-[4/5] shadow-[0_30px_60px_-15px_rgba(200,121,65,0.2)] bg-white relative z-20 rounded-full">
                <img 
                  src={rekaHero} 
                  alt="Réka portré" 
                  className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-1000 rounded-full"
                />
                <img 
                  src="/assets/portrait/frame.svg" 
                  alt="frame" 
                  className="absolute inset-0 w-full h-full object-contain top-[44%] transform -translate-y-1/2 pointer-events-none scale-125"
                />
              </div>
            </div>
            <div className="absolute inset-0 z-10 bg-[#C87941]/10 blur-[80px] rounded-full transform scale-150" />
          </div>
        </div>
      </div>

      <div className="w-full z-20 mt-12">
        <WaveDivider fill="#F5E1D2" className="h-[40px] md:h-[120px]" stretch={true} />
      </div>
    </section>
  );
};

export default Hero;
