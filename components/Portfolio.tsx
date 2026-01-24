
import React from 'react';

const Portfolio: React.FC = () => {
  const items = [
    { 
      title: "Esküvői grafika", 
      subtitle: "Meghívók & Kártyák", 
      img: "/assets/portfolio/eskuvo.jpg",
      size: "large",
      fallback: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=500"
    },
    { 
      title: "Egyedi portré", 
      subtitle: "Digitális Illusztráció", 
      img: "/assets/portfolio/portre.jpg",
      size: "small",
      fallback: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=500"
    },
    { 
      title: "Éttermi design", 
      subtitle: "Arculat & Étlap", 
      img: "/assets/portfolio/etterem.jpg",
      size: "small",
      fallback: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=500"
    },
    { 
      title: "Márka arculat", 
      subtitle: "Logótervezés", 
      img: "/assets/portfolio/branding.jpg",
      size: "large",
      fallback: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=500"
    }
  ];

  return (
    <section id="portfolio" className="py-32 md:py-48 px-6 bg-white/40">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-left reveal active flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[11px] md:text-[13px] uppercase tracking-[0.5em] text-[#C87941] font-bold mb-6">Válogatott munkák</h2>
            <p className="serif text-5xl md:text-8xl text-[#4A403A] leading-tight">Vizuális történetek <br/><span className="script italic font-normal text-[#C87941] lowercase">és alkotások</span></p>
          </div>
          <div className="pb-4">
             <p className="text-[#8C827D] max-w-xs text-sm leading-relaxed font-medium">
               Minden projekt egy új kaland, ahol a cél a letisztult esztétika és a funkció találkozása.
             </p>
          </div>
        </div>
        
        <div className="columns-1 md:columns-2 gap-12 space-y-12">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className="group cursor-pointer reveal active transition-all duration-700 break-inside-avoid" 
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-[40px] md:rounded-[55px] shadow-sm hover:shadow-[0_40px_100px_-20px_rgba(200,121,65,0.15)] transition-all duration-700 border border-[#F5E1D2]/30 bg-[#F9F5F1]">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  onError={(e) => { (e.target as HTMLImageElement).src = item.fallback; }}
                  className="w-full h-auto object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-[#4A403A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="absolute top-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#C87941] shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-[#F9F5F1] via-[#F9F5F1]/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out hidden md:block">
                  <span className="text-[10px] text-[#C87941] uppercase tracking-[0.3em] font-bold mb-2 block">{item.subtitle}</span>
                  <h3 className="serif font-bold text-[#4A403A] text-3xl">{item.title}</h3>
                </div>
              </div>

              <div className="mt-6 md:hidden px-4">
                <h3 className="serif font-bold text-[#4A403A] text-2xl mb-1">{item.title}</h3>
                <p className="text-[10px] text-[#8C827D] uppercase tracking-[0.2em] font-bold">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
