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
    <section id="shop" className="py-32 md:py-48 px-6 bg-[#F5E1D2]/5 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#8BA888]/10 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 reveal">
          <h2 className="text-[11px] md:text-[13px] uppercase tracking-[0.5em] text-[#C87941] font-bold mb-4">Digitális Bolt</h2>
          <p className="serif text-4xl md:text-7xl text-[#4A403A]">Kész termékek</p>
          <div className="w-16 h-1.5 bg-[#C87941]/20 mx-auto mt-10 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {products.map((product, idx) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-[50px] p-6 shadow-sm hover:shadow-[0_50px_100px_-20px_rgba(74,64,58,0.1)] transition-all duration-700 border border-[#F5E1D2]/20 flex flex-col reveal"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="aspect-square rounded-[40px] overflow-hidden mb-8 relative">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-6 py-3 rounded-full shadow-lg">
                  <span className="text-base font-bold text-[#C87941] tracking-tight">{product.price}</span>
                </div>
              </div>
              
              <div className="px-4 flex-grow">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C827D] font-bold">{product.category}</span>
                <h3 className="serif text-3xl text-[#4A403A] mt-2 mb-4 group-hover:text-[#C87941] transition-colors">{product.title}</h3>
                <p className="text-sm text-[#7A7A7A] leading-relaxed mb-8">
                  {product.description}
                </p>
              </div>

              <button 
                onClick={() => setSelectedProduct(product)}
                className="w-full py-5 rounded-[25px] bg-[#4A403A] text-white font-bold text-xs uppercase tracking-[0.2em] transition-all hover:bg-[#C87941] active:scale-95 shadow-lg shadow-gray-200"
              >
                Kosárba teszem
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section with cleaner aesthetic */}
        <div className="max-w-4xl mx-auto glass rounded-[60px] p-10 md:p-16 border border-white/50 shadow-sm reveal">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
            <div className="w-16 h-16 bg-[#C87941]/10 rounded-[25px] flex items-center justify-center text-[#C87941]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
                <h3 className="serif text-3xl md:text-4xl text-[#4A403A] mb-2">Hogyan kapom meg?</h3>
                <p className="text-[#8C827D] font-medium tracking-wide text-sm uppercase">Pár egyszerű lépés az alkotásig</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#C87941]">Azonnali elérés</h4>
              <p className="text-sm text-[#7A7A7A] leading-relaxed">
                A sikeres fizetést követően percek alatt megérkezik hozzád a visszaigazoló e-mail, benne a letölthető fájlokkal.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#C87941]">Biztonságos fájlok</h4>
              <p className="text-sm text-[#7A7A7A] leading-relaxed">
                Minden digitális termékünk kiváló minőségű, PDF formátumban érkezik, így bármilyen eszközön könnyen megnyitható.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#4A403A]/60 backdrop-blur-xl transition-opacity animate-in fade-in" onClick={closeModal}></div>
          <div className="bg-[#F9F5F1] w-full max-w-lg rounded-[50px] shadow-2xl z-10 overflow-hidden relative border border-white animate-in zoom-in slide-in-from-bottom-10 duration-500">
            <button onClick={closeModal} className="absolute top-8 right-8 text-[#4A403A] hover:text-[#C87941] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="p-10 md:p-14">
              {step === 'details' && (
                <div className="space-y-8">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8C827D] font-bold mb-1 block">{selectedProduct.category}</span>
                    <h2 className="serif text-4xl text-[#4A403A]">{selectedProduct.title}</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm text-[#7A7A7A] leading-relaxed">{selectedProduct.description}</p>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail címed a kézbesítéshez" 
                        className="w-full bg-white border border-[#F5E1D2] py-5 px-8 rounded-3xl text-sm focus:outline-none focus:border-[#C87941] shadow-inner transition-all"
                    />
                  </div>
                  <button onClick={handleOrderInit} className="w-full bg-[#4A403A] text-white py-6 rounded-[25px] text-sm font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-[#C87941] transition-all active:scale-95">
                    Tovább a fizetéshez
                  </button>
                </div>
              )}

              {step === 'payment' && (
                <div className="space-y-8">
                  <h2 className="serif text-3xl text-[#4A403A]">Fizetési mód</h2>
                  <div className="space-y-4">
                    <button 
                      onClick={() => setPaymentMethod('card')}
                      className={`w-full p-6 rounded-[30px] border-2 flex items-center justify-between transition-all duration-300 ${paymentMethod === 'card' ? 'border-[#C87941] bg-white shadow-xl' : 'border-transparent bg-white/40 opacity-60'}`}
                    >
                      <span className="font-bold text-[#4A403A] text-sm uppercase tracking-widest">Kártya / Pay</span>
                      <div className="flex gap-2">
                        <div className="px-3 py-1 bg-black rounded-lg flex items-center"><span className="text-[8px] text-white font-bold"> Pay</span></div>
                        <div className="px-3 py-1 bg-[#4285F4] rounded-lg flex items-center"><span className="text-[8px] text-white font-bold">G Pay</span></div>
                      </div>
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('transfer')}
                      className={`w-full p-6 rounded-[30px] border-2 flex items-center gap-4 transition-all duration-300 ${paymentMethod === 'transfer' ? 'border-[#C87941] bg-white shadow-xl' : 'border-transparent bg-white/40 opacity-60'}`}
                    >
                      <span className="font-bold text-[#4A403A] text-sm uppercase tracking-widest">Banki átutalás</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-6">
                    <button onClick={() => setStep('details')} className="text-xs font-bold uppercase text-[#7A7A7A] hover:text-[#4A403A]">Vissza</button>
                    <button onClick={handleFinalSubmit} disabled={isSubmitting} className="flex-grow bg-[#D97706] text-white py-6 rounded-[25px] text-sm font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-[#B45309] transition-all">
                      {isSubmitting ? 'Kapcsolódás...' : `Fizetés: ${selectedProduct.price}`}
                    </button>
                  </div>
                </div>
              )}

              {step === 'success' && (
                <div className="text-center py-10 animate-in zoom-in duration-700">
                  <div className="w-24 h-24 bg-[#8BA888]/20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#6B8369]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="serif text-4xl text-[#4A403A] mb-4">Sikeres rendelés!</h2>
                  <p className="text-sm text-[#7A7A7A] leading-relaxed mb-10 max-w-xs mx-auto">
                    A fájlt elküldtük a <span className="font-bold text-[#C87941]">{email}</span> címre. Nézd meg a promóciók fülön is!
                  </p>
                  <button onClick={closeModal} className="bg-[#4A403A] text-white px-12 py-5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                    Vissza a főoldalra
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