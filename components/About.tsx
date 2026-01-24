import React from 'react';
import LeafIllustration from './LeafIllustration';

const About: React.FC = () => {
  return (
    <section id="rolam" className="py-24 md:py-48 px-6 relative overflow-hidden bg-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-32">
        
        {/* TEXT CONTENT */}
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
              Grafikus vagyok, aki rajong az organikus formákért és a természetes textúrákért. Legyen szó egy márka születéséről vagy egy esküvő vizuális világáról, minden projektbe beleadom a szívem-lelkem.
            </p>
            <p className="hidden md:block">
              Munkáim során arra törekszem, hogy az esztétika és a funkcionalitás tökéletes egyensúlyba kerüljön, így teremtve maradandó értéket számodra.
            </p>
          </div>
          
          <div className="pt-6 flex items-center gap-6">
             <div className="w-16 md:w-24 h-[1.5px] bg-[#C87941]"></div>
             <span className="text-[11px] md:text-sm uppercase tracking-[0.5em] text-[#C87941] font-bold">Klima Réka</span>
          </div>
        </div>

        {/* IMAGE CONTENT */}
        <div className="shrink-0 relative reveal" style={{ transitionDelay: '200ms' }}>
          <div className="w-[180px] sm:w-[250px] md:w-[450px] aspect-[2/3] rounded-full overflow-hidden shadow-[0_40px_80px_-20px_rgba(139,168,136,0.3)] border-[8px] md:border-[20px] border-white ring-1 ring-[#F5E1D2]/30 bg-white">
            <img 
              src="./reka_about.jpg" 
              alt="Réka alkotás közben" 
              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600"; }}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Decorative Leaf */}
          <div className="absolute -bottom-16 -right-16 opacity-10 hidden md:block scale-150 transform rotate-45">
             <LeafIllustration className="w-64 h-64 text-[#8BA888]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;