
import React, { useState } from 'react';

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  image: string;
  description: string;
  detailedDescription: string;
  detailedImages?: string[];
  features?: string[];
  howItWorks?: string[];
  benefits?: string[];
  stripeLink?: string;
  isWebApp?: boolean;
  webAppUrl?: string;
}

const Shop: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    {
      id: 1,
      title: "Álomnapló",
      category: "Digitális Termék",
      price: "3 490 Ft",
      image: "/assets/shop/alomnaplo_hun.jpg",
      description: "Interaktív útmutató az álmok elemzéséhez.",
      detailedDescription: `★ Fedezd Fel Elméd Mélységeit a Prémium Digitális Álomnaplóval ★

Indulj el egy megvilágító önismereti utazásra, amely személyes fejlődést és mély betekintést nyújt a tudatalattidba. A Digitális Álomnapló intim menedéked az álmaid rögzítésére, értelmezésére és megfejtésére. Napi vezetett kérdésekkel segít feltárni az éjszakai kalandok rejtett üzeneteit és jelentéseit. Álmaid vágynak arra, hogy megosszák történeteiket.

Ez az interaktív, letisztult digitális napló tökéletes eszköz az álmok megfigyeléséhez, mintázatok felismeréséhez és mélyebb önismeretre jutáshoz. Használd folyamatosan, dátumozás nélkül, akár GoodNotes-ban vagy más digitális jegyzetelő alkalmazásban.`,
      detailedImages: [
        "/assets/shop/shop_bovebben/alomnaplo/alomnaplo-1.jpg",
        "/assets/shop/shop_bovebben/alomnaplo/alomnaplo-2.jpg",
        "/assets/shop/shop_bovebben/alomnaplo/alomnaplo-3.jpg"
      ],
      features: [
        "Napi álomnapló részletes rögzítéshez ✩",
        "Napi reflexió és értelmezés mélyreható elemzéshez ✩",
        "Dátumozatlan oldalak – korlátlan ideig használható! ✩",
        "Modern, letisztult dizájn ✩",
        "Kompatibilis GoodNotes és hasonló appokkal ✩",
        "Intuitív navigáció és felhasználóbarát felület ✩",
        "Azonnali letöltés ✩"
      ],
      howItWorks: [
        "Vásárlás után azonnal megkapod a letöltési linket emailben (7 napig érvényes)",
        "Töltsd le a PDF-et és importáld a GoodNotes vagy más jegyzetelő appba",
        "Kezdd el rögzíteni álmaidat és fedezd fel tudatalattid üzeneteit 🌙✨"
      ],
      benefits: [
        "Serkenti a kreativitást és problémamegoldó képességet ✓",
        "Elősegíti az önismeretet és a személyes fejlődést ✓",
        "Javítja a memóriát és a felidézést ✓",
        "Megvilágítja a tudatalatti gondolatokat és vágyakat ✓",
        "Segít szembenézni félelmekkel és szorongásokkal ✓",
        "Támogatja az érzelmi feldolgozást és gyógyulást ✓"
      ],
      stripeLink: "https://buy.stripe.com/test_6oUaEWftO6A2gj2dYtfIs01"
    },
    {
      id: 2,
      title: "Esküvői tervező",
      category: "Digitális Csomag",
      price: "4 890 Ft",
      image: "/assets/shop/eskuvoi_tervezo_01.jpg",
      description: "Teljes körű digitális szervezőfüzet.",
      detailedDescription: `Váltsd valóra álomesküvődet a mi átfogó Nyomtatható Esküvői Tervezőnkkel, amelyet úgy terveztünk, hogy könnyedén szervezhesd meg nagy napod minden részletét. Ez nemcsak egy újabb digitális sablon – ez egy teljes esküvőszervező eszközkészlet, amelyet azok számára alkottunk meg, akik az eleganciát és a személyes érintést részesítik előnyben egy fizikai esküvői dossziéban. 💖👰🤵

Ebben a csomagban olyan alapvető tervezőeszközök találhatók, mint a fogadási menütervezés, feladatütemezés, esküvői idővonalak és még sok más.

Ez a nyomtatható esküvői tervező gondosan megtervezett annak érdekében, hogy az esküvői tervezési útja stresszmentes és élvezetes legyen. Ideális azok számára, akik szívesen rendelkeznének egy kézzelfogható, gyönyörűen szervezett tervezővel.

Egyszerűen vásárolj, töltsd le, nyomtasd ki és készítsd el saját személyre szabott esküvői dossziédet. Testreszabhatod a kedvenc papír- és dossziétípusoddal egy valóban egyedi tervezési élményért. Az esküvői tervező nyomtatható most két méretben is elérhető: A4 és A5`,
      detailedImages: [
        "/assets/shop/shop_bovebben/eskuvoi_tervezo/eskuvoi_tervezo-01.jpg",
        "/assets/shop/shop_bovebben/eskuvoi_tervezo/eskuvoi_tervezo-02.jpg",
        "/assets/shop/shop_bovebben/eskuvoi_tervezo/eskuvoi_tervezo-03.jpg"
      ],
      features: [
        "2 PDF azonnal kinyomtatható listával 📄✨",
        "A4 és A5 formátum",
        "Személyes használatra",
        "Azonnali letöltés vásárlás után"
      ],
      howItWorks: [
        "Vásárlás után azonnal megkapod a letöltési linket emailben (7 napig érvényes)",
        "Töltsd le a PDF-et számítógépedre vagy telefonodra",
        "Nyomtasd ki otthon, vagy mentsd el digitálisan 🖨️📱"
      ],
      stripeLink: "https://buy.stripe.com/test_dRm7sK4Pa3nQ6Isg6BfIs00"
    },
    {
      id: 3,
      title: "Munkanapló Web App",
      category: "Web Alkalmazás",
      price: "Ingyenes",
      image: "/assets/shop/munkanaplo_01.jpg",
      description: "Professzionális munkaidő nyilvántartó alkalmazás böngészőben.",
      detailedDescription: `📱 Munkanapló Pro - Szakmai Munkaidő Nyilvántartó 📱

Tökéletes megoldás szabadúszóknak, vállalkozóknak és projektmenedzsereknek, akik hatékonyan szeretnék nyomon követni munkaidejüket és projektjeiket.

Ez egy teljes körű webes alkalmazás, amely segít megszervezni napi munkádat, nyomon követni projektjeidet és pontos időkimutatásokat készíteni. Használd böngészőből bárhonnan, bármikor - nincs szükség telepítésre!

✨ Próbáld ki ingyen 30 napig, aztán csak 1 200 Ft/hó!`,
      detailedImages: [
        "/assets/shop/munkanaplo_01.jpg",
        "/assets/shop/munkanaplo_01.jpg",
        "/assets/shop/munkanaplo_01.jpg"
      ],
      features: [
        "Munkák és projektek kezelése 💼",
        "Időkövetés stopperórával ⏱️",
        "Heti összesítések és statisztikák 📊",
        "Excel exportálás (XLSX) 📑",
        "Google Calendar integráció 📅",
        "Sötét és világos mód 🌙☀️",
        "Google OAuth bejelentkezés 🔐",
        "Modern, mobilbarát design 📱",
        "Böngésző alapú adattárolás (IndexedDB) 💾",
        "Több eszközön használható 📱💻"
      ],
      howItWorks: [
        "Kattints a 'Hamarosan' gombra - az alkalmazás készülőben",
        "Jelentkezz be Google fiókkal vagy email címmel",
        "Hozz létre munkákat és projekteket",
        "Kövesd nyomon idődet a beépített stopperrel",
        "Exportálj Excel riportokat vagy szinkronizálj Google Calendar-ral!"
      ],
      benefits: [
        "Első 30 nap ingyenes próbaidőszak ✓",
        "Utána csak 1 200 Ft/hó előfizetéssel ✓",
        "Nincs telepítés, csak böngésző kell ✓",
        "Biztonságos helyi adattárolás ✓",
        "Google OAuth bejelentkezés ✓",
        "Sötét mód a szemkímélésért ✓",
        "Automatikus mentés ✓",
        "Mobilon és asztali gépen egyaránt működik ✓"
      ],
      isWebApp: true,
      webAppUrl: "/munkanaplo-web-app/index.html"
    }
  ];

  const handleCheckout = (product: Product) => {
    if (product.isWebApp && product.webAppUrl) {
      window.open(product.webAppUrl, '_blank');
      return;
    }
    if (!product.stripeLink) {
      alert('Ez a termék még nem elérhető a vásárláshoz.');
      return;
    }
    window.open(product.stripeLink, '_blank');
  };

  return (
    <section id="shop" className="py-32 md:py-48 px-6 bg-[#F5E1D2]/5 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#8BA888]/10 rounded-full blur-[100px] -z-10"></div>
      
      {/* Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 md:p-6 overflow-y-auto pt-32 md:pt-36"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="bg-white rounded-[40px] md:rounded-[60px] max-w-4xl w-full mt-4 mb-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#4A403A] hover:bg-[#C87941] hover:text-white transition-all shadow-lg z-10"
              >
                ✕
              </button>

              {/* Main Product Image */}
              <div className="aspect-[3/2] rounded-t-[40px] md:rounded-t-[60px] overflow-hidden">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 md:p-12">
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#C87941] font-bold">{selectedProduct.category}</span>
                <h3 className="serif text-4xl md:text-6xl text-[#4A403A] mt-3 mb-6">{selectedProduct.title}</h3>
                
                <p className="text-[#5A5A5A] text-base md:text-lg leading-relaxed mb-8 whitespace-pre-line">
                  {selectedProduct.detailedDescription}
                </p>

                {/* Additional Images */}
                {selectedProduct.detailedImages && selectedProduct.detailedImages.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {selectedProduct.detailedImages.map((img, idx) => (
                      <div key={idx} className="aspect-[4/3] rounded-3xl overflow-hidden shadow-md">
                        <img 
                          src={img} 
                          alt={`${selectedProduct.title} ${idx + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Features */}
                {selectedProduct.features && selectedProduct.features.length > 0 && (
                  <div className="mb-8 p-6 bg-[#F9F5F1] rounded-3xl">
                    <h4 className="text-sm uppercase tracking-[0.2em] text-[#C87941] font-bold mb-4">Mit tartalmaz:</h4>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feature, idx) => (
                        <li key={idx} className="text-[#5A5A5A] flex items-start gap-2">
                          <span className="text-[#C87941] mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* How It Works */}
                {selectedProduct.howItWorks && selectedProduct.howItWorks.length > 0 && (
                  <div className="mb-8 p-6 bg-[#F5E1D2]/30 rounded-3xl">
                    <h4 className="text-sm uppercase tracking-[0.2em] text-[#4A403A] font-bold mb-4">Hogyan működik:</h4>
                    <ol className="space-y-3">
                      {selectedProduct.howItWorks.map((step, idx) => (
                        <li key={idx} className="text-[#5A5A5A] flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#C87941] text-white text-xs flex items-center justify-center font-bold">
                            {idx + 1}
                          </span>
                          <span className="pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Benefits */}
                {selectedProduct.benefits && selectedProduct.benefits.length > 0 && (
                  <div className="mb-8 p-6 bg-[#8BA888]/10 rounded-3xl border border-[#8BA888]/20">
                    <h4 className="text-sm uppercase tracking-[0.2em] text-[#8BA888] font-bold mb-4">Az álomnapló használatának előnyei:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedProduct.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-[#5A5A5A] flex items-start gap-2">
                          <span className="text-[#8BA888] mt-1">•</span>
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Notice */}
                {!selectedProduct.isWebApp && (
                  <div className="mb-8 p-4 bg-[#8BA888]/5 rounded-2xl border border-[#8BA888]/20">
                    <p className="text-xs text-[#5A5A5A] leading-relaxed">
                      <strong className="text-[#4A403A]">Fontos:</strong> Nincs fizikai termék szállítva. A színek kissé eltérhetnek a különböző monitorok miatt. Ez a vásárlás csak személyes használatra szolgál, nem kereskedelmi célra vagy újraértékesítésre.
                    </p>
                  </div>
                )}

                {/* Price & Buy Button */}
                <div className="flex items-center justify-between gap-6 pt-6 border-t border-[#F5E1D2]">
                  <div>
                    <span className="text-sm text-[#8C827D] uppercase tracking-wider font-bold block mb-1">Ár</span>
                    <span className="serif text-3xl md:text-4xl text-[#C87941] font-bold">{selectedProduct.price}</span>
                  </div>
                  <button 
                    onClick={() => handleCheckout(selectedProduct)}
                    className="px-8 md:px-12 py-4 md:py-5 rounded-[25px] bg-[#C87941] text-white font-bold text-xs md:text-sm uppercase tracking-[0.2em] transition-all hover:bg-[#B86A2E] active:scale-95 shadow-xl"
                  >
                    {selectedProduct.isWebApp ? 'Kipróbálom' : 'Megvásárlás'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 reveal">
          <h2 className="text-[11px] md:text-[13px] uppercase tracking-[0.5em] text-[#C87941] font-bold mb-4">Digitális Bolt</h2>
          <p className="serif text-4xl md:text-7xl text-[#4A403A]">Kész termékek</p>
          <div className="w-16 h-1.5 bg-[#C87941]/20 mx-auto mt-10 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto gap-12 mb-32">
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

              <div className="flex gap-3">
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="flex-1 py-5 rounded-[25px] bg-[#F5E1D2] text-[#4A403A] font-bold text-xs uppercase tracking-[0.2em] transition-all hover:bg-[#E0D5CC] active:scale-95"
                >
                  Bővebben
                </button>
                <button 
                  onClick={() => handleCheckout(product)}
                  className="flex-1 py-5 rounded-[25px] bg-[#4A403A] text-white font-bold text-xs uppercase tracking-[0.2em] transition-all hover:bg-[#C87941] active:scale-95 shadow-lg shadow-gray-200"
                >
                  {product.isWebApp ? 'Hamarosan' : 'Megvásárlás'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop;

