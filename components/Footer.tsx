
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="kapcsolat" className="bg-[#F9F5F1] pt-16 pb-12 px-8 text-center border-t border-[#F5E1D2]/30">
      <h2 className="text-[11px] tracking-[0.5em] uppercase text-[#4A403A] mb-8 font-black">Kapcsolat</h2>
      
      <div className="flex flex-col gap-3 text-sm text-[#5A5A5A] font-medium">
        <p className="hover:text-[#C87941] transition-colors">+36 20 593 3928</p>
        <p className="hover:text-[#C87941] transition-colors underline underline-offset-4 decoration-[#F5E1D2]">rekaklima@gmail.com</p>
      </div>

      <div className="mt-16 flex justify-center gap-6 opacity-20 hover:opacity-40 transition-opacity">
        <div className="w-5 h-5 bg-[#4A403A] rounded-full"></div>
        <div className="w-5 h-5 bg-[#4A403A] rounded-full"></div>
        <div className="w-5 h-5 bg-[#4A403A] rounded-full"></div>
      </div>

      <div className="mt-12 pt-8 border-t border-[#F5E1D2]/20 text-[9px] text-gray-400 uppercase tracking-[0.3em] font-bold">
        © {new Date().getFullYear()} Réka Klima &bull; Grafikus
      </div>
    </footer>
  );
};

export default Footer;
