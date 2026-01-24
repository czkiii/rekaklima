
import React from 'react';
import LeafIllustration from './LeafIllustration';

const About: React.FC = () => {
  return (
    <section id="rolam" className="py-16 px-6 relative">
      <div className="flex flex-col gap-10">
        <div className="flex items-start gap-5">
          {/* Portrait Image (based on provided Image 1 - drawing) */}
          <div className="w-[45%] flex-shrink-0">
            <div className="aspect-[4/5] rounded-[50px] overflow-hidden shadow-md border-2 border-white/50">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600" 
                alt="Réka alkotás közben" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2 flex-1 pt-4">
            <h2 className="text-5xl script text-[#4A403A] font-normal mb-2">Rólam</h2>
            <div className="text-[13px] leading-relaxed text-[#5A5A5A] space-y-3 font-medium">
              <p>
                Grafikus vagyok, aki hisz abban, hogy a jó design nem csak szép, hanem érthető, szerethető és működik.
              </p>
              <p>
                Legyen szó vállalkozásokról, éttermekről, arculatról vagy egy teljesen személyes projektről.
              </p>
            </div>
          </div>
        </div>

        {/* Mini Portfolio Preview Grid */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=400", label: "Esküvői grafika" },
            { img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400", label: "Egyedi portré" },
            { img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400", label: "Éttermi design" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-[#F5E1D2]">
                <img src={item.img} alt={item.label} className="w-full h-full object-cover grayscale-[10%]" />
              </div>
              <span className="text-[9px] text-center font-bold text-[#4A403A] uppercase tracking-tighter">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Botanical detail */}
      <div className="absolute bottom-0 right-4 opacity-10">
        <LeafIllustration className="w-20 h-20 text-[#8BA888]" />
      </div>
    </section>
  );
};

export default About;
