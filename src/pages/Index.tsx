
import React from 'react';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Services from '../components/home/Services';
import GlobalPresence from '../components/home/GlobalPresence';
import Testimonials from '../components/home/Testimonials';
import HomeCalculator from '../components/home/HomeCalculator';
import StaticMarketIndices from '../components/market/StaticMarketIndices';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <GlobalPresence />
      <HomeCalculator />
      <Testimonials />
    </div>
  );
};

export default Index;
