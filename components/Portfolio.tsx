
import React, { useState, useEffect } from 'react';

interface PortfolioItem {
  title: string;
  subtitle: string;
  img: string;
  gallery: string[];
  size: string;
}

const Portfolio: React.FC = () => {
  const [selectedGallery, setSelectedGallery] = useState<string[] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Prevent body scroll when gallery is open
  useEffect(() => {
    if (selectedGallery) {
      document.body.style.overflow = 'hidden';
      // Scroll to top when gallery opens
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedGallery]);

  // Handle touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swiped left
      nextImage();
    }

    if (touchStart - touchEnd < -75) {
      // Swiped right
      prevImage();
    }
  };

  const items: PortfolioItem[] = [
    { 
      title: "Esküvői grafika", 
      subtitle: "Meghívók & Kártyák", 
      img: "/assets/portfolio/eskuvoi_kepek/meghivo_minta_1.jpg",
      gallery: [
        "/assets/portfolio/eskuvoi_kepek/meghivo_minta_1.jpg",
        "/assets/portfolio/eskuvoi_kepek/welcome_minta_1_logo nelkul.jpg",
        "/assets/portfolio/eskuvoi_kepek/meghivo_minta_3.jpg",
        "/assets/portfolio/eskuvoi_kepek/menu minta_1.jpg",
        "/assets/portfolio/eskuvoi_kepek/menu_minta_2.jpg",
        "/assets/portfolio/eskuvoi_kepek/menu_minta_4.jpg",
        "/assets/portfolio/eskuvoi_kepek/ultetes_minta_2.jpg",
        "/assets/portfolio/eskuvoi_kepek/welcome_minta_2.jpg",
      ],
      size: "large",
    },
    { 
      title: "Egyedi portré", 
      subtitle: "Digitális Illusztráció", 
      img: "/assets/portfolio/egyediportre_kepek/szofi-01_kicsi.jpg",
      gallery: [
        "/assets/portfolio/egyediportre_kepek/szofi-01_kicsi.jpg",
        "/assets/portfolio/egyediportre_kepek/Liam-01_kicsi.jpg",
        "/assets/portfolio/egyediportre_kepek/Noya-01_kicsi.jpg",
        "/assets/portfolio/egyediportre_kepek/loki_dori-01.jpg",
        "/assets/portfolio/egyediportre_kepek/Manimal2.jpg",
      ],
      size: "small",
    },
    { 
      title: "Éttermi design", 
      subtitle: "Arculat & Étlap", 
      img: "/assets/portfolio/ettermes_kepek/pirogda_etlap_latvany_1.jpg",
      gallery: [
        "/assets/portfolio/ettermes_kepek/pirogda_etlap_latvany_1.jpg",
        "/assets/portfolio/ettermes_kepek/pirogda_etlap_latvany_2.jpg",
        "/assets/portfolio/ettermes_kepek/pirogda_kartya_latvany.jpg",
        "/assets/portfolio/ettermes_kepek/Flying_Leaflet_Mockup_3_stadt.jpg",
        "/assets/portfolio/ettermes_kepek/407_stadt.jpg",
        "/assets/portfolio/ettermes_kepek/italia_delicat oriasplakat_1.jpg",
        "/assets/portfolio/ettermes_kepek/3895069_narmin.jpg",
      ],
      size: "small",
    },
    { 
      title: "Márka arculat", 
      subtitle: "Logótervezés", 
      img: "/assets/portfolio/marka_arculat_kepek/beautyroom_mockup-01.jpg",
      gallery: [
        "/assets/portfolio/marka_arculat_kepek/beautyroom_mockup-01.jpg",
        "/assets/portfolio/marka_arculat_kepek/peaches_logo-01.jpg",
        "/assets/portfolio/marka_arculat_kepek/peaches_logo-02.jpg",
        "/assets/portfolio/marka_arculat_kepek/ep_mesterek_logo-01.jpg",
        "/assets/portfolio/marka_arculat_kepek/rudas_logo-01.jpg",
        "/assets/portfolio/marka_arculat_kepek/TestPercek_logo-01.png",
        "/assets/portfolio/marka_arculat_kepek/hajgyogyasz_plakat_latvany.jpg",
        "/assets/portfolio/marka_arculat_kepek/kalmar_nevjegy.jpg",
        "/assets/portfolio/marka_arculat_kepek/present_system_hungary-05.jpg",
        "/assets/portfolio/marka_arculat_kepek/89.jpg",
        "/assets/portfolio/marka_arculat_kepek/4151350_an.jpg",
        "/assets/portfolio/marka_arculat_kepek/facebook terv-03.jpg",
      ],
      size: "large",
    }
  ];

  const openGallery = (gallery: string[], startIndex: number = 0) => {
    setSelectedGallery(gallery);
    setCurrentImageIndex(startIndex);
  };

  const closeGallery = () => {
    setSelectedGallery(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedGallery) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedGallery.length);
    }
  };

  const prevImage = () => {
    if (selectedGallery) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedGallery.length) % selectedGallery.length);
    }
  };

  return (
    <section id="portfolio" className="py-32 md:py-48 px-6 bg-white/40">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-left reveal active flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[11px] md:text-[13px] uppercase tracking-[0.5em] text-[#C87941] font-bold mb-6">Válogatott munkák</h2>
            <p className="serif text-5xl md:text-8xl text-[#4A403A] leading-tight">Vizuális történetek <br/><span className="script italic font-normal text-[#C87941] lowercase">és alkotások</span></p>
          </div>
          <div className="pb-4">
             <p className="text-[#8C827D] max-w-xs text-sm leading-relaxed font-medium">
               Minden projekt egy új kaland, ahol a cél a letisztult esztétika és a funkció találkozása.
             </p>
          </div>
        </div>
        
        <div className="columns-1 md:columns-2 gap-12 space-y-12">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className="group cursor-pointer reveal active transition-all duration-700 break-inside-avoid" 
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-[40px] md:rounded-[55px] shadow-sm hover:shadow-[0_40px_100px_-20px_rgba(200,121,65,0.15)] transition-all duration-700 border border-[#F5E1D2]/30 bg-[#F9F5F1]">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-auto object-contain transition-transform duration-[2s] group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-[#4A403A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <button
                  onClick={() => openGallery(item.gallery)}
                  className="absolute top-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100"
                >
                  <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#C87941] shadow-lg hover:bg-[#C87941] hover:text-white hover:scale-110 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-[#F9F5F1] via-[#F9F5F1]/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out hidden md:block">
                  <span className="text-[10px] text-[#C87941] uppercase tracking-[0.3em] font-bold mb-2 block">{item.subtitle}</span>
                  <h3 className="serif font-bold text-[#4A403A] text-3xl">{item.title}</h3>
                </div>
              </div>

              <div className="mt-6 md:hidden px-4">
                <h3 className="serif font-bold text-[#4A403A] text-2xl mb-1">{item.title}</h3>
                <p className="text-[10px] text-[#8C827D] uppercase tracking-[0.2em] font-bold">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Gallery Lightbox */}
      {selectedGallery && (
        <div 
          className="fixed inset-0 bg-gradient-to-br from-[#4A403A] via-[#3A322E] to-black z-50 flex flex-col animate-fadeIn overflow-y-auto"
          onClick={closeGallery}
        >
          {/* Header Bar - Sticky */}
          <div 
            className="sticky top-0 z-10 flex items-center justify-center px-4 md:px-8 py-6 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#C87941] animate-pulse"></div>
              <span className="text-white/80 text-sm font-medium">
                {currentImageIndex + 1} <span className="text-white/40">/</span> {selectedGallery.length}
              </span>
            </div>
          </div>

          {/* Main Image Area */}
          <div 
            className="flex-1 flex items-center justify-center px-4 md:px-20 py-8"
            onClick={closeGallery}
          >
            {/* Image with zoom animation */}
            <img 
              key={currentImageIndex}
              src={selectedGallery[currentImageIndex]} 
              alt={`Gallery ${currentImageIndex + 1}`}
              className="max-w-full max-h-[75vh] object-contain rounded-3xl shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8)] cursor-pointer animate-zoomIn"
              onClick={(e) => {
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const mid = rect.width / 2;
                x < mid ? prevImage() : nextImage();
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ 
                animation: 'zoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>

          {/* Thumbnail Strip */}
          <div 
            className="px-4 md:px-8 pb-6 pt-4 bg-gradient-to-t from-black/60 via-black/40 to-transparent backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
              <div className="flex gap-3 mx-auto">
                {selectedGallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`group relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden transition-all duration-300 ${
                      idx === currentImageIndex 
                        ? 'ring-2 ring-[#C87941] ring-offset-2 ring-offset-[#3A322E] scale-110 shadow-lg' 
                        : 'ring-1 ring-white/10 hover:ring-white/30 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {idx === currentImageIndex && (
                      <div className="absolute inset-0 bg-gradient-to-t from-[#C87941]/20 to-transparent"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
