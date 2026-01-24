
import React, { useState } from 'react';
import LeafIllustration from './LeafIllustration';
import WaveDivider from './WaveDivider';

const Pricing: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const prices = [
    { title: "Logótervezés", price: "45 000 Ft-tól", desc: "Egyedi logó ami illusztrálja a márkádat", icon: "🎨" },
    { title: "Arculattervezés", price: "85 000 Ft-tól", desc: "Logó, színpaletta + iránymutatás", icon: "📐" },
    { title: "Étlap tervezés", price: "30 000 Ft-tól", desc: "Éttermi étlapok, árlisták tervezése", icon: "🍽️" },
    { title: "Esküvői design", price: "25 000 Ft-tól", desc: "Esküvői meghívó, ültetőkártyák", icon: "✉️" },
    { title: "Egyedi portré", price: "20 000 Ft-tól", desc: "Fotóból készült egyedi illusztráció", icon: "✏️" }
  ];

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Kérlek töltsd ki az összes mezőt!');
      return;
    }

    const mailtoLink = `mailto:info@rekaklima.com?subject=Üzenet: ${encodeURIComponent(formData.name)}&body=Név: ${encodeURIComponent(formData.name)}%0AEmail: ${encodeURIComponent(formData.email)}%0A%0AÜzenet:%0A${encodeURIComponent(formData.message)}`;
    
    window.location.href = mailtoLink;
    
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section id="arak" className="py-0 relative bg-[#F5E1D2]/10 overflow-hidden">
      {/* Wave at the top */}
      <WaveDivider fill="#F5E1D2" flip={true} />

      <div className="px-6 py-10">
        <div className="text-center mb-12 relative">
          <h2 className="text-2xl uppercase tracking-[0.4em] serif text-[#C87941] font-bold">Árlista</h2>
          <p className="text-[11px] text-[#8C827D] italic mt-4 px-10 leading-relaxed">
            Az árak tájékoztató jellegűek, minden projekt egyedi igények alapján készül.
          </p>
          <div className="absolute -top-6 right-1/4 opacity-15 transform scale-75">
            <LeafIllustration className="w-14 h-14 text-[#8BA888]" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 max-w-sm mx-auto">
          {prices.map((item, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-sm p-5 rounded-[32px] border border-[#C87941]/10 flex flex-col items-center text-center card-shadow group transition-all hover:border-[#C87941]/30">
              <span className="text-2xl mb-2 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all">{item.icon}</span>
              <h3 className="text-lg serif font-bold text-[#4A403A] mb-2">{item.title}</h3>
              <span className="text-lg font-bold text-[#C87941] tracking-tight">{item.price}</span>
              <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-wide font-medium leading-tight px-2">{item.desc}</p>
            </div>
          ))}

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-[35px] border border-[#C87941]/15 mt-8 shadow-md">
            <h3 className="text-xl serif font-bold text-center mb-6 text-[#4A403A]">Üzenj nekem!</h3>
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#8BA888]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#6B8369]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-[#6B8369] font-bold">Az email program megnyílt!</p>
                <p className="text-xs text-gray-400 mt-2">Küld el az üzeneted!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Név" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-[#F5E1D2] py-2 px-1 text-sm focus:outline-none focus:border-[#C87941] transition-colors placeholder:text-gray-300" 
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-[#F5E1D2] py-2 px-1 text-sm focus:outline-none focus:border-[#C87941] transition-colors placeholder:text-gray-300" 
                />
                <textarea 
                  placeholder="Üzenet" 
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-[#F5E1D2] py-2 px-1 text-sm focus:outline-none focus:border-[#C87941] transition-colors placeholder:text-gray-300 resize-none" 
                ></textarea>
                <button 
                  onClick={handleSubmit}
                  className="w-full bg-[#D97706] text-white py-3.5 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] shadow-lg hover:bg-[#B45309] transition-all active:scale-95 mt-4">
                  Küldés
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Wave at the bottom */}
      <WaveDivider fill="#F9F5F1" />
    </section>
  );
};

export default Pricing;
