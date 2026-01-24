
import React, { useState } from 'react';

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  image: string;
  description: string;
}

type ModalStep = 'details' | 'payment' | 'success';

const Shop: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [step, setStep] = useState<ModalStep>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'revolut'>('card');
  const [showHelp, setShowHelp] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      title: "Álomnapló",
      category: "Digitális Termék",
      price: "3 490 Ft",
      image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=500",
      description: "Interaktív útmutató az álmok elemzéséhez. A vásárlás után e-mailben küldjük a hozzáférést."
    },
    {
      id: 2,
      title: "Esküvői tervező",
      category: "Digitális Csomag",
      price: "4 890 Ft",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=500",
      description: "Teljes körű digitális szervezőfüzet. Biztonságos e-mail kézbesítéssel a fizetést követően."
    },
    {
      id: 3,
      title: "Minimál Határidőnapló",
      category: "2024 Digitális",
      price: "2 990 Ft",
      image: "https://images.unsplash.com/photo-1506784919141-9358404bb05a?q=80&w=500",
      description: "Letisztult digitális tervező. Nincs közvetlen letöltés, a fájlt személyre szabva küldjük."
    }
  ];

  const handleOrderInit = () => {
    if (!email || !email.includes('@')) {
      alert('Kérlek adj meg egy érvényes e-mail címet!');
      return;
    }
    setStep('payment');
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
    }, 2000);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setStep('details');
    setEmail('');
  };

  return (
    <section id="shop" className="py-20 md:py-32 px-6 bg-[#F5E1D2]/5 relative overflow-hidden">
      {/* Háttér dekoráció */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#8BA888]/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] text-[#C87941] font-bold mb-4">Digitális Bolt</h2>
          <p className="serif text-3xl md:text-6xl text-[#4A403A]">Kész termékek</p>
          <div className="w-20 h-1 bg-[#C87941]/20 mx-auto mt-6 rounded-full"></div>
          <p className="mt-6 text-[#8C827D] text-[10px] md:text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-4">
            <span>Automata kézbesítés</span>
            <span className="w-1 h-1 bg-[#C87941] rounded-full"></span>
            <span>Biztonságos fizetés</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-[40px] p-4 shadow-sm hover:shadow-xl transition-all duration-500 border border-[#F5E1D2]/30 flex flex-col"
            >
              <div className="aspect-square rounded-[30px] overflow-hidden mb-6 relative">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                  <span className="text-sm font-bold text-[#C87941]">{product.price}</span>
                </div>
              </div>
              
              <div className="px-2 flex-grow">
                <span className="text-[10px] uppercase tracking-widest text-[#8C827D] font-bold">{product.category}</span>
                <h3 className="serif text-2xl text-[#4A403A] mt-1 mb-3">{product.title}</h3>
                <p className="text-sm text-[#7A7A7A] leading-relaxed mb-6">
                  {product.description}
                </p>
              </div>

              <button 
                onClick={() => setSelectedProduct(product)}
                className="w-full py-4 rounded-3xl bg-[#4A403A] text-white font-bold text-sm uppercase tracking-widest transition-all hover:bg-[#C87941] active:scale-95"
              >
                Megveszem
              </button>
            </div>
          ))}
        </div>

        {/* FAQ / SEGÍTSÉG SZEKCIÓ - Hogy ne legyen reklamáció */}
        <div className="max-w-3xl mx-auto bg-white/50 backdrop-blur-sm rounded-[40px] p-8 md:p-12 border border-white">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-[#C87941]/10 rounded-full flex items-center justify-center text-[#C87941]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="serif text-2xl text-[#4A403A]">Hogyan kapom meg a terméket?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#C87941] mb-2">Azonnali hozzáférés</h4>
              <p className="text-sm text-[#7A7A7A] leading-relaxed">
                A sikeres fizetés után rendszerünk automatikusan küld egy e-mailt a letöltési linkkel. Ez általában 1-5 percet vesz igénybe.
              </p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#C87941] mb-2">Elveszett link?</h4>
              <p className="text-sm text-[#7A7A7A] leading-relaxed">
                Ne aggódj! Ha véletlenül kitörölted az e-mailt, írj a <span className="font-bold">rekaklima@gmail.com</span> címre a rendelésszámoddal, és újra kiküldjük.
              </p>
            </div>
          </div>
          
          <div className="mt-10 pt-8 border-t border-[#F5E1D2]/30 text-center">
            <button 
              onClick={() => alert("Hamarosan elérhető funkció: Automata link-újraküldő.")}
              className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C87941] hover:underline"
            >
              Nem kaptam meg a fájlt. Újraküldést kérek →
            </button>
          </div>
        </div>
      </div>

      {/* MODAL (Ugyanaz a logika, de Apple Pay vizualizációval) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#4A403A]/60 backdrop-blur-md" onClick={closeModal}></div>
          <div className="bg-[#F9F5F1] w-full max-w-lg rounded-[40px] shadow-2xl z-10 overflow-hidden relative border border-white">
            
            <div className="p-8 md:p-12">
              {step === 'details' && (
                <div className="space-y-6">
                  <h2 className="serif text-3xl text-[#4A403A]">{selectedProduct.title}</h2>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail címed a kézbesítéshez" 
                    className="w-full bg-white border border-[#F5E1D2] py-4 px-6 rounded-2xl text-sm focus:outline-none focus:border-[#C87941]"
                  />
                  <button onClick={handleOrderInit} className="w-full bg-[#4A403A] text-white py-5 rounded-2xl text-sm font-bold uppercase tracking-[0.2em]">
                    Tovább a fizetéshez
                  </button>
                </div>
              )}

              {step === 'payment' && (
                <div className="space-y-6">
                  <h2 className="serif text-3xl text-[#4A403A]">Fizetési mód</h2>
                  <div className="space-y-3">
                    <button 
                      onClick={() => setPaymentMethod('card')}
                      className={`w-full p-5 rounded-3xl border-2 flex items-center justify-between ${paymentMethod === 'card' ? 'border-[#C87941] bg-white shadow-md' : 'border-[#F5E1D2] bg-white/40'}`}
                    >
                      <span className="font-bold text-[#4A403A] text-sm uppercase">Bankkártya / Apple Pay</span>
                      <div className="flex gap-2">
                        <div className="w-8 h-5 bg-black rounded flex items-center justify-center"><span className="text-[7px] text-white font-bold">Pay</span></div>
                        <div className="w-8 h-5 bg-[#4285F4] rounded flex items-center justify-center"><span className="text-[7px] text-white font-bold">GPay</span></div>
                      </div>
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('transfer')}
                      className={`w-full p-5 rounded-3xl border-2 flex items-center gap-4 ${paymentMethod === 'transfer' ? 'border-[#C87941] bg-white shadow-md' : 'border-[#F5E1D2] bg-white/40'}`}
                    >
                      <span className="font-bold text-[#4A403A] text-sm uppercase">Banki átutalás</span>
                    </button>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep('details')} className="w-1/3 text-xs font-bold uppercase text-[#7A7A7A]">Vissza</button>
                    <button onClick={handleFinalSubmit} disabled={isSubmitting} className="w-2/3 bg-[#D97706] text-white py-5 rounded-2xl text-sm font-bold uppercase tracking-[0.2em]">
                      {isSubmitting ? 'Kapcsolódás...' : 'Fizetés indítása'}
                    </button>
                  </div>
                </div>
              )}

              {step === 'success' && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-[#8BA888]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#6B8369]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="serif text-3xl text-[#4A403A] mb-4">Sikeres teszt!</h2>
                  <p className="text-sm text-[#7A7A7A] mb-8">
                    Az éles rendszerben a fájl már úton lenne a <span className="font-bold">{email}</span> címre.
                  </p>
                  <button onClick={closeModal} className="bg-[#4A403A] text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest">
                    Bezárás
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Shop;
