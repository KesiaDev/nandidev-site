import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Smartphone, Globe } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/54996246565?text=Olá! Gostaria de solicitar um orçamento.', '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary opacity-90"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
          className="absolute top-40 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            Implementamos soluções digitais inteligentes usando{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              IA para empresas crescerem
            </span>
            , atrair clientes e automatizar processos.
          </motion.h1>

          {/* Slogan */}
          <motion.p
            variants={itemVariants}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white/95 max-w-4xl mx-auto leading-relaxed italic mb-8"
          >
            NandiDev — criatividade, tecnologia e inteligência para impulsionar seu negócio.
          </motion.p>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            Desenvolvimento de sites profissionais, e-commerce, aplicativos mobile e sistemas web.
          </motion.p>

          {/* Feature highlights */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 text-white/80"
          >
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Sites Profissionais</span>
            </div>
            <div className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5" />
              <span>Apps Mobile</span>
            </div>
            <div className="flex items-center space-x-2">
              <Code className="w-5 h-5" />
              <span>Sistemas Web</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#portfolio')}
              className="bg-white text-primary font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            >
              <span>Ver Portfólio</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsApp}
              className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-primary transition-all duration-300 flex items-center space-x-2"
            >
              <span>Fale Conosco</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">100%</div>
              <div className="text-white/80">Dedicação Total</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">24/7</div>
              <div className="text-white/80">Suporte Disponível</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">∞</div>
              <div className="text-white/80">Paixão por Tecnologia</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
