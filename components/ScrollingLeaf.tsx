
import React, { useEffect, useState } from 'react';

const ScrollingLeaf: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Számítások a bal oldali levélhez (Sötétebb zsálya)
  const leftMoveX = Math.sin(scrollY / 300) * 30;
  const leftRotate = scrollY / 15;
  
  // Számítások a jobb oldali levélhez (Aranyos/Barackos)
  const rightMoveX = Math.cos(scrollY / 250) * 40;
  const rightRotate = -(scrollY / 12);

  return (
    <>
      {/* Bal oldali levél */}
      <div 
        className="fixed pointer-events-none z-[90]"
        style={{
          top: '30%',
          left: `calc(2% + ${leftMoveX}px)`,
          transform: `translateY(${scrollY * 0.15}px) rotate(${leftRotate}deg)`,
          transition: 'transform 0.15s ease-out',
          opacity: 0.25
        }}
      >
        <img src="/assets/leaf1.svg" alt="leaf" className="w-12 h-12 md:w-24 md:h-24" style={{ color: '#6B8369' }} />
      </div>

      {/* Jobb oldali levél */}
      <div 
        className="fixed pointer-events-none z-[90]"
        style={{
          top: '15%',
          right: `calc(3% + ${rightMoveX}px)`,
          transform: `translateY(${scrollY * 0.25}px) rotate(${rightRotate}deg)`,
          transition: 'transform 0.1s ease-out',
          opacity: 0.2
        }}
      >
        <img src="/assets/leaf2.svg" alt="leaf" className="w-10 h-10 md:w-20 md:h-20" style={{ color: '#D97706' }} />
      </div>

      {/* Egy harmadik, nagyon halvány levél, ami mélyebbről indul */}
      <div 
        className="fixed pointer-events-none z-[90] hidden md:block"
        style={{
          top: '60%',
          right: `calc(15% + ${Math.sin(scrollY / 400) * 60}px)`,
          transform: `translateY(${scrollY * 0.05}px) rotate(${scrollY / 20}deg)`,
          transition: 'transform 0.2s ease-out',
          opacity: 0.1
        }}
      >
        <img src="/assets/leaf3.svg" alt="leaf" className="w-16 h-16" style={{ color: '#8BA888' }} />
      </div>
    </>
  );
};

export default ScrollingLeaf;
