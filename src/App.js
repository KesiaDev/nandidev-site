import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Platforms from './components/Platforms';
import AICapabilities from './components/AICapabilities';
import Portfolio from './components/Portfolio';
import Products from './components/Products';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Products />
      <Portfolio />
      <Services />
      <AICapabilities />
      <Platforms />
      <About />
      <CTA />
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;