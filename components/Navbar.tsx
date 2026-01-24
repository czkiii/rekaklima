
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 bg-transparent">
      <div className="max-w-7xl mx-auto flex items-start justify-between">
        <div className="relative group">
          <div className="flex flex-col">
            <span className="text-3xl font-bold serif text-[#C87941] leading-none">Reka</span>
            <div className="flex items-center -mt-1 ml-4">
              <span className="text-2xl script font-bold text-[#4A403A]">Klima.</span>
            </div>
          </div>
          {/* Logo Icons - Overlapping circles as seen in Figma */}
          <div className="absolute -top-1 left-16 flex items-end">
             <div className="w-6 h-6 rounded-full bg-[#E9B48C] opacity-90 -mr-2"></div>
             <div className="w-5 h-5 rounded-full bg-[#8BA888] opacity-80 mb-1"></div>
          </div>
        </div>

        <button className="p-2 bg-[#F5E1D2]/30 rounded-lg text-[#C87941]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-12 6h12" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
