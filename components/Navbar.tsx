
import React, { useState, useEffect } from 'react';
import Logo from './Logo.tsx';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled && !isOpen ? 'py-0 md:py-0 glass border-b border-[#F5E1D2]/30 shadow-sm' : 'py-0 md:py-1 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-24 overflow-visible">
        
        <a href="#" className="flex items-center gap-2 group transition-transform hover:scale-105 duration-300 -my-4 md:-my-6 relative z-[110]">
          <Logo className="h-[138px] md:h-56 w-auto transition-all duration-500" />
        </a>

        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {[
            { n: 'Portfólió', h: '#portfolio' },
            { n: 'Shop', h: '#shop' },
            { n: 'Árak', h: '#arak' },
            { n: 'Kapcsolat', h: '#kapcsolat' }
          ].map((item) => (
            <a 
              key={item.n}
              href={item.h} 
              className="text-[12px] uppercase tracking-[0.25em] font-extrabold text-[#4A403A] hover:text-[#C87941] transition-all relative group"
            >
              {item.n}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#C87941] transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-[#C87941] md:hidden z-[110] relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-[#F9F5F1]/98 backdrop-blur-md z-[105] flex flex-col items-center justify-center gap-10 transition-all duration-500 md:hidden">
          {['Portfólió', 'Shop', 'Árak', 'Kapcsolat'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase().replace('ó', 'o').replace('á', 'a')}`} 
              onClick={() => setIsOpen(false)}
              className="text-3xl serif font-bold text-[#4A403A] hover:text-[#C87941] transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
