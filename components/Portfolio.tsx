
import React from 'react';

const Portfolio: React.FC = () => {
  const items = [
    { title: "Esküvői grafika", subtitle: "meghívók, kártyák", img: "./portfolio1.jpg", fallback: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=500" },
    { title: "Egyedi portré", subtitle: "illusztráció", img: "./portfolio2.jpg", fallback: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=500" },
    { title: "Éttermi design", subtitle: "étlapok, branding", img: "./portfolio3.jpg", fallback: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=500" }
  ];

  return (
    <section id="portfolio" className="py-16 md:py-24 px-6 bg-white/40">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 md:mb-16 text-center md:text-left">
          <h2 className="text-[9px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#C87941] font-bold mb-2">Válogatott munkák</h2>
          <p className="serif text-2xl md:text-4xl text-[#4A403A]">Portfólió</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {items.map((item, idx) => (
            <div key={idx} className="group cursor-pointer max-w-[280px] mx-auto md:max-w-none">
              <div className="aspect-[4/5] rounded-[30px] md:rounded-[40px] overflow-hidden shadow-md border border-[#F5E1D2] mb-4 relative">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  onError={(e) => { e.currentTarget.src = item.fallback; }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#C87941]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-center md:text-left px-2">
                <h3 className="serif font-bold text-[#4A403A] text-lg md:text-xl group-hover:text-[#C87941] transition-colors">{item.title}</h3>
                <p className="text-[10px] text-[#8C827D] uppercase tracking-wider mt-1 font-bold">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
