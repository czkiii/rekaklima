
import React from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Portfolio from './components/Portfolio.tsx';
import Shop from './components/Shop.tsx';
import Pricing from './components/Pricing.tsx';
import Clients from './components/Clients.tsx';
import Footer from './components/Footer.tsx';
import ScrollingLeaf from './components/ScrollingLeaf.tsx';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FDF9F6] text-[#2D2D2D] overflow-x-hidden relative">
      <ScrollingLeaf />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Shop />
        <Pricing />
        <Clients />
      </main>
      <Footer />
    </div>
  );
};

export default App;
