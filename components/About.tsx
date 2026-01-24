
import React from 'react';

const About: React.FC = () => {
  const rekaAbout = "/assets/portrait/reka_about.jpg";

  return (
    <section id="rolam" className="py-24 md:py-48 px-6 relative overflow-hidden bg-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-32">
        
        <div className="flex flex-col gap-6 md:gap-10 text-left reveal flex-grow">
          <h2 className="text-6xl md:text-[140px] script text-[#4A403A] font-normal leading-[0.8]">Rólam</h2>
          
          <div className="text-xl md:text-4xl leading-tight text-[#5A5A5A] italic serif max-w-3xl">
            <p className="relative">
              <span className="absolute -left-8 -top-4 text-7xl text-[#C87941]/10 serif">"</span>
              A design lényege számomra a történetmesélés és a lélekkel teli alkotás.
              <span className="absolute -right-4 bottom-0 text-7xl text-[#C87941]/10 serif">"</span>
            </p>
          </div>
          
          <div className="text-sm md:text-xl leading-relaxed text-[#7A7A7A] space-y-6 font-medium max-w-xl">
            <p>
              Grafikus vagyok, aki rajong az organikus formákért és a természetes textúrákért. Minden projektbe beleadom a szívem-lelkem.
            </p>
          </div>
          
          <div className="pt-6 flex items-center gap-6">
             <div className="w-16 md:w-24 h-[1.5px] bg-[#C87941]"></div>
             <span className="text-[11px] md:text-sm uppercase tracking-[0.5em] text-[#C87941] font-bold">Klima Réka</span>
          </div>
        </div>

        <div className="shrink-0 relative reveal" style={{ transitionDelay: '200ms' }}>
          <div className="w-[180px] sm:w-[250px] md:w-[450px] aspect-[2/3] rounded-full overflow-hidden shadow-xl border-[8px] md:border-[20px] border-white bg-white">
            <img 
              src={rekaAbout} 
              alt="Réka" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="absolute -bottom-16 -right-16 w-64 h-64 opacity-20 transform rotate-12 hidden md:block text-[#8BA888]">
            <svg viewBox="0 0 100 100" fill="currentColor">
               <path d="M30 100C30 70 0 60 0 30C30 0 70 0 100 30C100 60 70 70 70 100C50 90 40 90 30 100Z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
