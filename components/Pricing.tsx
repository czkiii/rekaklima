
import React from 'react';
import LeafIllustration from './LeafIllustration';

const Pricing: React.FC = () => {
  const prices = [
    { title: "Logótervezés", price: "45 000 Ft-tól", desc: "Egyedi logó ami illusztrálja a márkádat", icon: "🎨" },
    { title: "Arculattervezés", price: "85 000 Ft-tól", desc: "Logó, színpaletta + iránymutatás", icon: "📐" },
    { title: "Étlap tervezés", price: "30 000 Ft-tól", desc: "Éttermi étlapok, árlisták tervezése", icon: "🍽️" },
    { title: "Esküvői design", price: "25 000 Ft-tól", desc: "Esküvői meghívó, ültetőkártyák", icon: "✉️" },
    { title: "Egyedi portré", price: "20 000 Ft-tól", desc: "Fotóból készült egyedi illusztráció", icon: "✏️" }
  ];

  return (
    <section id="arak" className="py-20 px-6 relative bg-[#F5E1D2]/10 overflow-hidden">
      {/* Watercolor divider top */}
      <div className="absolute top-0 left-0 w-full h-20 bg-[#F5E1D2]/20 watercolor-wave rotate-180" />

      <div className="text-center mb-12 relative">
        <h2 className="text-2xl uppercase tracking-[0.4em] serif text-[#C87941] font-bold">Árlista</h2>
        <p className="text-[11px] text-[#8C827D] italic mt-4 px-10 leading-relaxed">
          Az árak tájékoztató jellegűek, minden projekt egyedi igények alapján készül.
        </p>
        <div className="absolute -top-6 right-1/4 opacity-15 transform scale-75">
          <LeafIllustration className="w-14 h-14 text-[#8BA888]" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 max-w-sm mx-auto">
        {prices.map((item, idx) => (
          <div key={idx} className="bg-white/80 backdrop-blur-sm p-5 rounded-[32px] border border-[#C87941]/10 flex flex-col items-center text-center card-shadow group transition-all hover:border-[#C87941]/30">
            <span className="text-2xl mb-2 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all">{item.icon}</span>
            <h3 className="text-lg serif font-bold text-[#4A403A] mb-2">{item.title}</h3>
            <span className="text-lg font-bold text-[#C87941] tracking-tight">{item.price}</span>
            <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-wide font-medium leading-tight px-2">{item.desc}</p>
          </div>
        ))}

        {/* Contact Form Integrated in Price List Area */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-[35px] border border-[#C87941]/15 mt-8 shadow-md">
          <h3 className="text-xl serif font-bold text-center mb-6 text-[#4A403A]">Üzenj nekem!</h3>
          <div className="space-y-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Név" 
                className="w-full bg-transparent border-b border-[#F5E1D2] py-2 px-1 text-sm focus:outline-none focus:border-[#C87941] transition-colors placeholder:text-gray-300" 
              />
            </div>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-transparent border-b border-[#F5E1D2] py-2 px-1 text-sm focus:outline-none focus:border-[#C87941] transition-colors placeholder:text-gray-300" 
              />
            </div>
            <div className="relative">
              <textarea 
                placeholder="Üzenet" 
                rows={2}
                className="w-full bg-transparent border-b border-[#F5E1D2] py-2 px-1 text-sm focus:outline-none focus:border-[#C87941] transition-colors placeholder:text-gray-300 resize-none" 
              ></textarea>
            </div>
            <button className="w-full bg-[#D97706] text-white py-3.5 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] shadow-lg btn-hover mt-4">
              Küldés
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
