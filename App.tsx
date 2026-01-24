
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FDF9F6] text-[#2D2D2D] overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default App;
