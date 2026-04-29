import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  MessageCircle, Zap, Brain, BarChart3, Users, Smartphone,
  ArrowRight, CheckCircle, Star, ExternalLink
} from 'lucide-react';

const Products = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const features = [
    { icon: Zap, label: "Motor de Disparo em Massa", desc: "Envio automatizado para listas de contatos no WhatsApp" },
    { icon: Brain, label: "Follow-up com IA", desc: "Respostas e acompanhamentos automáticos inteligentes" },
    { icon: BarChart3, label: "Análises e Relatórios", desc: "Dashboard com métricas de abertura e conversão" },
    { icon: Users, label: "Gestão de Contatos", desc: "CRM integrado com pipeline de vendas visual" },
    { icon: Smartphone, label: "Multi-instâncias WhatsApp", desc: "Gerencie múltiplos números em um só lugar" },
    { icon: MessageCircle, label: "Campanhas Segmentadas", desc: "Envie a mensagem certa para a audiência certa" },
  ];

  const plans = [
    { name: "Start", price: "R$197", dispatches: "1.000 disparos/mês", instances: "1 instância", highlight: false },
    { name: "Growth", price: "R$397", dispatches: "2.000 disparos/mês", instances: "2 instâncias", highlight: false },
    { name: "Pro", price: "R$697", dispatches: "5.000 disparos/mês", instances: "5 instâncias", highlight: true },
    { name: "Business", price: "R$1.297", dispatches: "10.000 disparos/mês", instances: "Ilimitadas", highlight: false },
  ];

  return (
    <section id="produtos" className="py-20 lg:py-28 bg-[#080d1a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
              Produto SaaS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Conheça o{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Disparo.AI
              </span>
            </h2>
            <p className="text-lg text-slate-400">
              Plataforma de automação e disparo em massa para WhatsApp, com IA integrada,
              gestão de contatos e campanhas segmentadas. Desenvolvido pela NandiDev.
            </p>
          </motion.div>

          {/* Main Product Card */}
          <motion.div
            variants={itemVariants}
            className="relative rounded-3xl overflow-hidden border border-[#1a2744] bg-[#0d1526]"
          >
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />

            <div className="relative grid lg:grid-cols-2 gap-0">
              {/* Left — Features */}
              <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#1a2744]">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Disparo.AI</h3>
                    <p className="text-slate-400 text-sm">WhatsApp Automation Platform</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0 mt-0.5">
                        <f.icon className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{f.label}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://intelligentwhatsapp.up.railway.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold py-3 px-6 rounded-xl transition-colors"
                  >
                    Ver planos e preços
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://intelligentwhatsapp.up.railway.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3 px-6 rounded-xl transition-colors"
                  >
                    Acessar plataforma
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>

              {/* Right — Plans */}
              <div className="p-8 md:p-12">
                <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                  <Star className="w-4 h-4 text-cyan-400" />
                  Planos disponíveis
                </h4>
                <div className="space-y-3">
                  {plans.map((plan, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                        plan.highlight
                          ? "bg-cyan-500/10 border-cyan-500/30"
                          : "bg-white/5 border-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className={`w-4 h-4 shrink-0 ${plan.highlight ? "text-cyan-400" : "text-slate-500"}`} />
                        <div>
                          <p className={`font-semibold text-sm ${plan.highlight ? "text-cyan-400" : "text-white"}`}>
                            Plano {plan.name}
                            {plan.highlight && (
                              <span className="ml-2 text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full">Popular</span>
                            )}
                          </p>
                          <p className="text-slate-500 text-xs">{plan.dispatches} · {plan.instances}</p>
                        </div>
                      </div>
                      <span className={`font-bold text-sm ${plan.highlight ? "text-cyan-400" : "text-slate-300"}`}>
                        {plan.price}<span className="text-xs font-normal text-slate-500">/mês</span>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <p className="text-purple-300 text-sm font-medium mb-1">Planos anuais disponíveis</p>
                  <p className="text-slate-400 text-xs">Economize até 20% pagando anualmente. Todos os planos incluem suporte, atualizações e infraestrutura gerenciada.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-slate-500 text-sm">
              Quer uma plataforma personalizada para o seu negócio?{" "}
              <button
                onClick={() => {
                  const el = document.querySelector('#contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-cyan-400 hover:underline font-medium"
              >
                Fale com a NandiDev →
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
