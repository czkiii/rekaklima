
import React, { useState } from 'react';
import LegalModals from './LegalModals.tsx';

const Footer: React.FC = () => {
  const [activeLegal, setActiveLegal] = useState<'impresszum' | 'adatvedelem' | 'aszf' | null>(null);

  return (
    <footer id="kapcsolat" className="bg-[#F9F5F1] pt-24 pb-12 px-8 text-center border-t border-[#F5E1D2]/30">
      <h2 className="text-[11px] tracking-[0.5em] uppercase text-[#4A403A] mb-12 font-black">Kapcsolat</h2>
      
      <div className="flex flex-col gap-4 text-sm text-[#5A5A5A] font-medium mb-20">
        <p className="hover:text-[#C87941] transition-colors">+36 20 593 3928</p>
        <p className="hover:text-[#C87941] transition-colors underline underline-offset-4 decoration-[#F5E1D2]">rekaklima@gmail.com</p>
      </div>

      <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16">
        <button onClick={() => setActiveLegal('impresszum')} className="text-[10px] uppercase tracking-widest text-[#8C827D] hover:text-[#C87941] transition-colors">Impresszum</button>
        <button onClick={() => setActiveLegal('adatvedelem')} className="text-[10px] uppercase tracking-widest text-[#8C827D] hover:text-[#C87941] transition-colors">Adatkezelés</button>
        <button onClick={() => setActiveLegal('aszf')} className="text-[10px] uppercase tracking-widest text-[#8C827D] hover:text-[#C87941] transition-colors">ÁSZF</button>
      </div>

      <div className="pt-8 border-t border-[#F5E1D2]/20">
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">
          © 2026 Opoczki-Klima Ádám EV – Minden jog fenntartva
        </p>
        <p className="text-[9px] text-gray-300 mt-2 uppercase tracking-widest">
            Handcrafted with soul by Klima Réka
        </p>
      </div>

      <LegalModals type={activeLegal} onClose={() => setActiveLegal(null)} />
    </footer>
  );
};

export default Footer;
