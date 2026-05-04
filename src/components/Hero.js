import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Sparkles, CheckCircle, Zap,
  MessageCircle, Headphones, Share2, Bot, Scale, Crosshair,
} from 'lucide-react';

const products = [
  { icon: MessageCircle, name: 'Disparo.AI',       metric: 'Disparos em massa no WhatsApp',  color: 'cyan'   },
  { icon: Headphones,    name: 'Multi-Agentes',     metric: 'CS omnichannel + IA nativa',     color: 'green'  },
  { icon: Share2,        name: 'Automação de Redes Sociais', metric: 'Agendamento e publicação com IA', color: 'violet' },
  { icon: Bot,           name: 'SDR Humanizada',    metric: 'Prospecção e qualificação 24/7', color: 'orange' },
  { icon: Scale,         name: 'SDR Jurídico',      metric: 'Captação para escritórios',      color: 'indigo' },
  { icon: Crosshair,     name: 'Radar Comercial',   metric: 'Prospecção B2B com IA',          color: 'teal'   },
];

const colors = {
  cyan:   { card: 'bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border-cyan-500/30',     iconBg: 'bg-cyan-500/20 border border-cyan-500/30',     icon: 'text-cyan-400',   dot: 'bg-cyan-400',   accent: 'bg-cyan-400',   shadow: 'rgba(6,182,212,0.20)'   },
  green:  { card: 'bg-gradient-to-br from-green-500/20 to-green-500/5 border-green-500/30',   iconBg: 'bg-green-500/20 border border-green-500/30',   icon: 'text-green-400',  dot: 'bg-green-400',  accent: 'bg-green-400',  shadow: 'rgba(34,197,94,0.20)'   },
  violet: { card: 'bg-gradient-to-br from-violet-500/20 to-violet-500/5 border-violet-500/30', iconBg: 'bg-violet-500/20 border border-violet-500/30', icon: 'text-violet-400', dot: 'bg-violet-400', accent: 'bg-violet-400', shadow: 'rgba(139,92,246,0.20)'  },
  orange: { card: 'bg-gradient-to-br from-orange-500/20 to-orange-500/5 border-orange-500/30', iconBg: 'bg-orange-500/20 border border-orange-500/30', icon: 'text-orange-400', dot: 'bg-orange-400', accent: 'bg-orange-400', shadow: 'rgba(249,115,22,0.20)'  },
  indigo: { card: 'bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 border-indigo-500/30', iconBg: 'bg-indigo-500/20 border border-indigo-500/30', icon: 'text-indigo-400', dot: 'bg-indigo-400', accent: 'bg-indigo-400', shadow: 'rgba(99,102,241,0.20)'  },
  teal:   { card: 'bg-gradient-to-br from-teal-500/20 to-teal-500/5 border-teal-500/30',     iconBg: 'bg-teal-500/20 border border-teal-500/30',     icon: 'text-teal-400',   dot: 'bg-teal-400',   accent: 'bg-teal-400',   shadow: 'rgba(20,184,166,0.20)'  },
};

const gridContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};
const cardAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const Hero = () => {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    window.open(
      'https://wa.me/5554996246565?text=Olá! Gostaria de uma apresentação comercial da NandiDev.',
      '_blank'
    );
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#060b16]">

      {/* Background glow blobs */}
      <div className="absolute -top-32 -left-32 w-[480px] h-[480px] bg-amber-500/6 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-[560px] h-[560px] bg-cyan-500/6 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-indigo-500/4 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ─── Left — copy ─── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              6 Plataformas SaaS · Prontas para usar agora
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight">
                Automatize, venda{' '}
                <br className="hidden lg:block" />e atenda mais —{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                  com IA real
                </span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
                A NandiDev constrói plataformas SaaS com inteligência artificial para empresas que querem escalar atendimento, vendas e marketing sem contratar mais pessoas.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollTo('#produtos')}
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-lg shadow-amber-500/20"
              >
                Ver Nossas Plataformas
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-xl transition-all"
              >
                Agendar Apresentação
              </motion.button>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-5 text-slate-400 text-sm">
              {['Pronto para produção', 'Suporte em português', 'Clientes em todo o Brasil'].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ─── Right — product grid ─── */}
          <div className="order-1 lg:order-2">
            <motion.div
              variants={gridContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-3 sm:gap-4"
            >
              {products.map((p, i) => {
                const c = colors[p.color];
                return (
                  <motion.div
                    key={i}
                    variants={cardAnim}
                    whileHover={{ y: -6, scale: 1.03, boxShadow: `0 12px 36px ${c.shadow}` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`relative p-4 sm:p-5 rounded-2xl border ${c.card} backdrop-blur-sm cursor-default select-none overflow-hidden`}
                  >
                    {/* Top accent strip */}
                    <div className={`absolute top-0 left-0 right-0 h-[2px] ${c.accent}`} />

                    {/* Header row */}
                    <div className="flex items-start justify-between mb-3 mt-1">
                      <div className={`w-11 h-11 rounded-xl ${c.iconBg} flex items-center justify-center`}>
                        <p.icon className={`w-5 h-5 ${c.icon}`} />
                      </div>
                      {/* Live dot */}
                      <span className="flex items-center gap-1.5 mt-1">
                        <span className={`w-2 h-2 rounded-full ${c.dot} animate-pulse`} />
                        <span className="text-slate-500 text-[10px] font-medium">ativo</span>
                      </span>
                    </div>
                    <p className="text-white text-sm font-semibold leading-snug mb-1">{p.name}</p>
                    <p className="text-slate-400 text-xs leading-snug">{p.metric}</p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Bottom stat bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="mt-4 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500/8 to-white/5 border border-amber-500/20 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-white text-sm font-semibold">6 plataformas</span>
                <span className="text-slate-500 text-xs hidden sm:inline">prontas para assinar</span>
              </div>
              <button
                onClick={() => scrollTo('#produtos')}
                className="flex items-center gap-1 text-amber-400 text-xs font-medium hover:text-amber-300 transition-colors"
              >
                Explorar tudo <ArrowRight className="w-3 h-3" />
              </button>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
