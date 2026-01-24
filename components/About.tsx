
import React from 'react';
import LeafIllustration from './LeafIllustration';

const About: React.FC = () => {
  return (
    <section id="rolam" className="py-16 md:py-32 px-6 relative overflow-hidden bg-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-24">
        
        {/* SZÖVEG - Bal oldalon */}
        <div className="flex flex-col gap-4 md:gap-8 text-left order-2 md:order-1 flex-grow">
          <h2 className="text-5xl md:text-9xl script text-[#4A403A] font-normal leading-tight">Rólam</h2>
          
          <div className="text-sm md:text-3xl leading-snug text-[#5A5A5A] italic serif max-w-2xl">
            <p>
              "A design lényege számomra a történetmesélés és a lélekkel teli alkotás."
            </p>
          </div>
          
          <div className="text-xs md:text-lg leading-relaxed text-[#7A7A7A] space-y-3 md:space-y-6 font-normal max-w-lg">
            <p>
              Grafikus vagyok, aki rajong az organikus formákért és a természetes textúrákért. Legyen szó egy márka születéséről vagy egy esküvő vizuális világáról, minden projektbe beleadom a szívem-lelkem.
            </p>
            <p className="hidden md:block">
              Munkáim során arra törekszem, hogy az esztétika és a funkcionalitás tökéletes egyensúlyba kerüljön, így teremtve maradandó értéket számodra.
            </p>
          </div>
          
          <div className="pt-4 md:pt-10 flex items-center gap-4">
             <div className="w-10 md:w-20 h-[1.5px] bg-[#C87941]"></div>
             <span className="text-[10px] md:text-sm uppercase tracking-[0.4em] text-[#C87941] font-bold">Klima Réka</span>
          </div>
        </div>

        {/* OVÁLIS KÉP - Jobb oldalon */}
        <div className="shrink-0 relative order-1 md:order-2">
          <div className="w-[150px] sm:w-[200px] md:w-[350px] aspect-[2/3] rounded-full overflow-hidden shadow-2xl border-[6px] md:border-[15px] border-white ring-1 ring-[#F5E1D2]/30 bg-white">
            <img 
              src="./reka_about.jpg" 
              alt="Réka alkotás közben" 
              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600"; }}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Dekoratív levél - Mint a kézműves stílusban */}
          <div className="absolute -bottom-10 -right-10 opacity-20 hidden md:block scale-150 transform rotate-12">
             <LeafIllustration className="w-48 h-48 text-[#8BA888]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
