import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/5492448888?text=Olá! Gostaria de uma apresentação comercial da NandiDev.', '_blank');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background - modern gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-12 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left - Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Tecnologia sob medida + Capacitação em IA
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Virada de chave para sua empresa com{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                automação e IA
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed mb-8">
              Soluções personalizadas para pequenas e médias empresas. Não vendemos produto de caixinha, 
              desenvolvemos tecnologia centrada na sua dor e capacitamos sua equipe a usar IA no dia a dia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('#portfolio')}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/25"
              >
                Ver Portfólio
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-semibold py-4 px-6 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all"
              >
                Agendar Apresentação
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-6 text-slate-400 text-sm"
            >
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" /> Automação
              </span>
              <span className="flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" /> IA e Treinamento
              </span>
            </motion.div>
          </motion.div>

          {/* Right - Photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <img
                  src="/logo/kesia-nandi.png"
                  alt="Késia Nandi - CEO NandiDev"
                  className="w-full max-w-sm xl:max-w-md aspect-[3/4] object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white font-semibold text-lg">Késia Nandi</p>
                  <p className="text-amber-400/90 text-sm">CEO & Fundadora</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
