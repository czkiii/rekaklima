import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-3 glass border-b border-[#F5E1D2]/30 shadow-sm' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="flex flex-col">
              <span className="text-2xl font-bold serif text-[#C87941] leading-none">Reka</span>
              <div className="flex items-center -mt-1 ml-3">
                <span className="text-xl script font-bold text-[#4A403A]">Klima.</span>
              </div>
            </div>
            <div className="absolute -top-1 -right-6 flex">
               <div className="w-4 h-4 rounded-full bg-[#E9B48C] opacity-90 -mr-1.5 group-hover:scale-125 transition-transform duration-500"></div>
               <div className="w-3 h-3 rounded-full bg-[#8BA888] opacity-80 mt-2 group-hover:scale-125 transition-transform duration-500 delay-75"></div>
            </div>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {['Portfólió', 'Shop', 'Árak', 'Kapcsolat'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase().replace('ó', 'o').replace('á', 'a')}`} 
              className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#4A403A] hover:text-[#C87941] transition-all relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#C87941] transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-[#C87941] md:hidden z-[110]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} />
          </svg>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 glass z-[105] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
          {['Portfólió', 'Shop', 'Árak', 'Kapcsolat'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase().replace('ó', 'o').replace('á', 'a')}`} 
              onClick={() => setIsOpen(false)}
              className="text-2xl serif font-bold text-[#4A403A] hover:text-[#C87941]"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;