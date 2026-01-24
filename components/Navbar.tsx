
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/70 backdrop-blur-md border-b border-[#F5E1D2]/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 cursor-pointer group">
          <div className="relative">
            <div className="flex flex-col">
              <span className="text-2xl font-bold serif text-[#C87941] leading-none">Reka</span>
              <div className="flex items-center -mt-1 ml-3">
                <span className="text-xl script font-bold text-[#4A403A]">Klima.</span>
              </div>
            </div>
            <div className="absolute -top-1 -right-6 flex">
               <div className="w-4 h-4 rounded-full bg-[#E9B48C] opacity-90 -mr-1.5 group-hover:scale-110 transition-transform"></div>
               <div className="w-3 h-3 rounded-full bg-[#8BA888] opacity-80 mt-2 group-hover:scale-110 transition-transform delay-75"></div>
            </div>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#portfolio" className="text-[10px] uppercase tracking-widest font-bold text-[#4A403A] hover:text-[#C87941] transition-colors">Portfólió</a>
          <a href="#shop" className="text-[10px] uppercase tracking-widest font-bold text-[#4A403A] hover:text-[#C87941] transition-colors">Shop</a>
          <a href="#arak" className="text-[10px] uppercase tracking-widest font-bold text-[#4A403A] hover:text-[#C87941] transition-colors">Árak</a>
        </div>

        <button className="p-2.5 bg-[#F5E1D2]/40 rounded-full text-[#C87941] active:scale-95 transition-transform md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
