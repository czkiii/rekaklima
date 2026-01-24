
import React from 'react';
import WaveDivider from './WaveDivider';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-28 pb-0 overflow-hidden flex flex-col">
      {/* Decorative watercolor patches */}
      <div className="absolute top-20 -left-20 w-[600px] h-[600px] bg-[#F5E1D2]/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-40 -right-20 w-[400px] h-[400px] bg-[#8BA888]/10 rounded-full blur-[100px] -z-10" />

      <div className="px-6 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 z-10 flex-grow">
        
        {/* TEXT CONTENT */}
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
            <a 
              href="#portfolio" 
              className="inline-flex items-center gap-4 bg-[#D97706] text-white px-8 md:px-14 py-4 md:py-6 rounded-full text-sm md:text-base font-bold shadow-xl shadow-orange-900/10 hover:shadow-orange-900/20 transition-all hover:-translate-y-1 active:scale-95 group"
            >
              Munkáim megtekintése
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* IMAGE CONTENT */}
        <div className="relative w-full md:w-1/2 flex justify-center md:justify-end order-1 md:order-2">
          <div className="relative">
            <div className="animate-float">
              <div className="w-[200px] sm:w-[280px] md:w-[450px] aspect-[4/5] squircle overflow-hidden shadow-[0_30px_60px_-15px_rgba(200,121,65,0.2)] border-[8px] md:border-[20px] border-white bg-white relative z-20">
                <img 
                  src="./reka_hero.jpg" 
                  alt="Réka portré" 
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                  onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800"; }}
                />
              </div>
            </div>
            
            {/* Dots decoration */}
            <div className="absolute -left-6 md:-left-12 bottom-20 opacity-40 z-30">
              <div className="grid grid-cols-2 gap-2">
                {[...Array(6)].map((_, i) => <div key={i} className="w-2 h-2 md:w-3 md:h-3 bg-[#8BA888] rounded-full"></div>)}
              </div>
            </div>

            {/* Watercolor glow behind image */}
            <div className="absolute inset-0 z-10 bg-[#C87941]/10 blur-[80px] rounded-full transform scale-150" />
          </div>
        </div>
      </div>

      <div className="w-full z-20 mt-12">
        <WaveDivider fill="#F5E1D2" className="h-[40px] md:h-[120px]" />
      </div>
    </section>
  );
};

export default Hero;
