import React from 'react';

const Portfolio: React.FC = () => {
  const items = [
    { title: "Esküvői grafika", subtitle: "meghívók, kártyák", img: "./portfolio1.jpg", fallback: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=500" },
    { title: "Egyedi portré", subtitle: "illusztráció", img: "./portfolio2.jpg", fallback: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=500" },
    { title: "Éttermi design", subtitle: "étlapok, branding", img: "./portfolio3.jpg", fallback: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=500" }
  ];

  return (
    <section id="portfolio" className="py-24 md:py-40 px-6 bg-white/40">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 text-center reveal">
          <h2 className="text-[11px] md:text-[13px] uppercase tracking-[0.5em] text-[#C87941] font-bold mb-4">Válogatott munkák</h2>
          <p className="serif text-4xl md:text-7xl text-[#4A403A]">Portfólió</p>
          <div className="w-24 h-[1.5px] bg-[#C87941]/30 mx-auto mt-8"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {items.map((item, idx) => (
            <div key={idx} className={`group cursor-pointer reveal transition-all duration-700`} style={{ transitionDelay: `${idx * 150}ms` }}>
              <div className="aspect-[3/4] rounded-[40px] md:rounded-[60px] overflow-hidden shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(74,64,58,0.15)] transition-all duration-500 border border-[#F5E1D2]/50 mb-6 relative">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  onError={(e) => { e.currentTarget.src = item.fallback; }}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A403A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                   <span className="text-white text-xs uppercase tracking-widest font-bold">Részletek megtekintése →</span>
                </div>
              </div>
              <div className="text-center">
                <h3 className="serif font-bold text-[#4A403A] text-2xl md:text-3xl mb-2 group-hover:text-[#C87941] transition-colors">{item.title}</h3>
                <p className="text-[11px] text-[#8C827D] uppercase tracking-[0.3em] font-bold">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;