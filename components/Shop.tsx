
import React from 'react';

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  image: string;
  description: string;
  stripeLink: string;
}

const Shop: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      title: "Álomnapló",
      category: "Digitális Termék",
      price: "3 490 Ft",
      image: "/assets/shop/alomnaplo_hun.jpg",
      description: "Interaktív útmutató az álmok elemzéséhez.",
      stripeLink: "https://buy.stripe.com/test_6oUaEWftO6A2gj2dYt"
    },
    {
      id: 2,
      title: "Esküvői tervező",
      category: "Digitális Csomag",
      price: "4 890 Ft",
      image: "/assets/shop/eskuvoi_tervezo_01.jpg",
      description: "Teljes körű digitális szervezőfüzet.",
      stripeLink: "https://buy.stripe.com/test_dRm7sK4Pa3nQ6Isg6B"
    }
  ];

  const handleCheckout = (product: Product) => {
    if (!product.stripeLink) {
      alert('Ez a termék még nem elérhető a vásárláshoz.');
      return;
    }
    window.open(product.stripeLink, '_blank');
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

              <button 
                onClick={() => handleCheckout(product)}
                className="w-full py-5 rounded-[25px] bg-[#4A403A] text-white font-bold text-xs uppercase tracking-[0.2em] transition-all hover:bg-[#C87941] active:scale-95 shadow-lg shadow-gray-200"
              >
                Megvásárlás
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop;

