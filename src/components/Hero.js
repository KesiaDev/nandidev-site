import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/54996246565?text=Olá! Gostaria de uma apresentação comercial da NandiDev.', '_blank');
  };

  return (
    <section id="home" className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background - imagem full width, posicionada para mostrar o rosto */}
      <div
        className="absolute inset-0 w-full bg-cover"
        style={{
          backgroundImage: 'url(/logo/kesia-nandi.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top'
        }}
        aria-hidden="true"
      />

      {/* Overlay em gradiente: mais escuro à esquerda (zona do texto), transição suave para foto à direita */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.2) 100%)'
        }}
        aria-hidden="true"
      />

      {/* Conteúdo alinhado com a logo do header (mesmo container) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex justify-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 lg:space-y-8 text-left max-w-xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-slate-200 text-base font-medium"
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            Sistemas de IA prontos para produção
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
            IA, Automação e Tecnologia para{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              empresas que querem crescer de verdade
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
            Nossas automações com IA já eliminaram centenas de horas de trabalho manual para nossos clientes — integrando LLMs, arquiteturas multi-agente e pipelines RAG para escalar operações e melhorar a qualidade das decisões.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-start">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('#portfolio')}
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/25"
            >
              Ver Portfólio
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWhatsApp}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all"
            >
              Agendar Apresentação
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-8 justify-start text-slate-300 text-sm md:text-base"
          >
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" /> Sistemas LLM + RAG
            </span>
            <span className="flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400" /> Automação Multi-Agente
            </span>
          </motion.div>

          {/* Nome e cargo discretos */}
          <p className="text-slate-400 text-sm pt-2">
            Késia Nandi — CEO & Fundadora
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
