
import React from 'react';

const Clients: React.FC = () => {
  const clients = [
    { name: 'Fleur & Ballon', logo: '/assets/logos/fleurballon_logo.svg' },
    { name: 'Fontor', logo: '/assets/logos/fontor_logo.svg' },
    { name: 'Garden', logo: '/assets/logos/GARDEN_fasorfenntarto-logo.svg' },
    { name: 'Lounge by Coco', logo: '/assets/logos/Lounge_by_Coco.svg' },
    { name: 'Mopark', logo: '/assets/logos/MOPARK_LOGO.svg' },
    { name: 'Pirogda', logo: '/assets/logos/Pirogda_logo.svg' },
    { name: 'Portos', logo: '/assets/logos/portos_logo.svg' },
    { name: 'Rizmajer', logo: '/assets/logos/rizmajer_logo.svg' },
    { name: 'Stadt', logo: '/assets/logos/stadt_uj_vektoros_logo.svg' },
    { name: 'Klima Design', logo: '/assets/logos/rekaklima_logo.svg' }
  ];

  return (
    <section className="py-24 bg-white/30 border-t border-[#F5E1D2]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal active">
          <h2 className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] font-bold text-[#8C827D] mb-4">Akikkel eddig együtt dolgoztam</h2>
          <div className="w-12 h-0.5 bg-[#C87941]/30 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 items-center justify-items-center opacity-60">
          {clients.map((client, idx) => (
            <div 
              key={idx} 
              className="reveal active h-12 md:h-16 w-full flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 hover:opacity-100 group"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="h-full w-auto object-contain max-w-full" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
