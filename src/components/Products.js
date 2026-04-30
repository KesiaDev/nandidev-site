import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MessageCircle, Zap, Brain, BarChart3, Users, Smartphone,
  ArrowRight, CheckCircle, Star, ExternalLink,
  Headphones, Bot, ListFilter, FileText, Tag, Shield, Inbox, TrendingUp,
} from 'lucide-react';

/* ─── Disparo.AI data ────────────────────────────────────────────────────── */

const disparoFeatures = [
  { icon: Zap,           label: "Motor de Disparo em Massa",  desc: "Envio automatizado para listas de contatos no WhatsApp" },
  { icon: Brain,         label: "Follow-up com IA",           desc: "Respostas e acompanhamentos automáticos inteligentes" },
  { icon: BarChart3,     label: "Análises e Relatórios",      desc: "Dashboard com métricas de abertura e conversão" },
  { icon: Users,         label: "Gestão de Contatos",         desc: "CRM integrado com pipeline de vendas visual" },
  { icon: Smartphone,    label: "Multi-instâncias WhatsApp",  desc: "Gerencie múltiplos números em um só lugar" },
  { icon: MessageCircle, label: "Campanhas Segmentadas",      desc: "Envie a mensagem certa para a audiência certa" },
];

const disparoPlans = [
  { name: "Start",    price: "R$197",   dispatches: "1.000 disparos/mês",  instances: "1 instância",    highlight: false },
  { name: "Growth",   price: "R$397",   dispatches: "2.000 disparos/mês",  instances: "2 instâncias",   highlight: false },
  { name: "Pro",      price: "R$697",   dispatches: "5.000 disparos/mês",  instances: "5 instâncias",   highlight: true  },
  { name: "Business", price: "R$1.297", dispatches: "10.000 disparos/mês", instances: "Ilimitadas",     highlight: false },
];

/* ─── Atendimento Multi-Agentes data ─────────────────────────────────────────────────────── */

const multiagenteFeatures = [
  { icon: Inbox,       label: "Caixa de entrada multi-agente", desc: "Vários atendentes operando ao mesmo tempo na mesma conta WhatsApp sem conflito" },
  { icon: Bot,         label: "Sugestões de resposta com IA",  desc: "Respostas automáticas no tom certo: Formal, Amigável ou Direto — em segundos" },
  { icon: TrendingUp,  label: "Análise de sentimento",         desc: "Saiba se o cliente está satisfeito ou frustrado antes mesmo de responder" },
  { icon: FileText,    label: "Resumos automáticos",           desc: "IA gera um resumo do histórico a qualquer momento, sem precisar reler tudo" },
  { icon: ListFilter,  label: "Fila e triagem inteligente",    desc: "Distribuição automática por agente, departamento ou carga de trabalho" },
  { icon: Shield,      label: "Segurança e auditoria",         desc: "Log completo de ações, controle de acesso por papel e webhook com validação" },
];

const multiagentePlans = [
  { name: "Conexão", price: "R$197", detail: "1.000 conversas/mês", instances: "1 instância · 3 agentes",  highlight: false },
  { name: "Equipe",  price: "R$497", detail: "5.000 conversas/mês", instances: "5 instâncias · 10 agentes", highlight: true  },
  { name: "Escala",  price: "R$997", detail: "20.000 conversas/mês",instances: "20 instâncias · 30 agentes",highlight: false },
];

/* ─── Shared animations ──────────────────────────────────────────────────── */

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

/* ─── Product tabs ───────────────────────────────────────────────────────── */

const TABS = [
  { id: 'disparo',    label: 'Disparo.AI',               accent: 'cyan'  },
  { id: 'multiagente',  label: 'Atendimento Multi-Agentes', accent: 'green' },
];

/* ─── Disparo.AI card ────────────────────────────────────────────────────── */

function DisparoCard() {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-[#1a2744] bg-[#0d1526]">
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
            {disparoFeatures.map((f, i) => (
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
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              href="https://intelligentwhatsapp.up.railway.app"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Ver planos e preços <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              href="https://intelligentwhatsapp.up.railway.app"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3 px-6 rounded-xl transition-colors"
            >
              Acessar plataforma <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
        </div>

        {/* Right — Plans */}
        <div className="p-8 md:p-12">
          <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
            <Star className="w-4 h-4 text-cyan-400" /> Planos disponíveis
          </h4>
          <div className="space-y-3">
            {disparoPlans.map((plan, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  plan.highlight ? "bg-cyan-500/10 border-cyan-500/30" : "bg-white/5 border-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className={`w-4 h-4 shrink-0 ${plan.highlight ? "text-cyan-400" : "text-slate-500"}`} />
                  <div>
                    <p className={`font-semibold text-sm ${plan.highlight ? "text-cyan-400" : "text-white"}`}>
                      Plano {plan.name}
                      {plan.highlight && <span className="ml-2 text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full">Popular</span>}
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
    </div>
  );
}

/* ─── Atendimento Multi-Agentes card ─────────────────────────────────────────────────────── */

function MultiAgenteCard() {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-green-500/20 bg-[#0a110d]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-green-500/5 blur-3xl rounded-full pointer-events-none" />
      <div className="relative grid lg:grid-cols-2 gap-0">
        {/* Left — Features */}
        <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-green-500/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Atendimento Multi-Agentes</h3>
              <p className="text-slate-400 text-sm">Multi-Agent Customer Platform</p>
            </div>
          </div>

          {/* Hero mini — checklist style igual ao Disparo.AI */}
          <p className="text-slate-300 text-sm mb-6 leading-relaxed">
            Plataforma de atendimento omnichannel com múltiplos agentes, sugestões de resposta por IA,
            análise de sentimento e resumos automáticos. Seu time atende mais rápido, com mais qualidade.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {multiagenteFeatures.map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <f.icon className="w-4 h-4 text-green-400" />
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
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              href="https://multiagentesplataforma.lovable.app/#planos"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Quero melhorar meu atendimento <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              href="https://multiagentesplataforma.lovable.app"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3 px-6 rounded-xl transition-colors"
            >
              Conhecer a plataforma <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
        </div>

        {/* Right — Plans */}
        <div className="p-8 md:p-12">
          <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
            <Star className="w-4 h-4 text-green-400" /> Planos disponíveis
          </h4>
          <div className="space-y-3">
            {multiagentePlans.map((plan, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  plan.highlight ? "bg-green-500/10 border-green-500/30" : "bg-white/5 border-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className={`w-4 h-4 shrink-0 ${plan.highlight ? "text-green-400" : "text-slate-500"}`} />
                  <div>
                    <p className={`font-semibold text-sm ${plan.highlight ? "text-green-400" : "text-white"}`}>
                      Plano {plan.name}
                      {plan.highlight && <span className="ml-2 text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">Popular</span>}
                    </p>
                    <p className="text-slate-500 text-xs">{plan.detail} · {plan.instances}</p>
                  </div>
                </div>
                <span className={`font-bold text-sm ${plan.highlight ? "text-green-400" : "text-slate-300"}`}>
                  {plan.price}<span className="text-xs font-normal text-slate-500">/mês</span>
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl bg-green-500/5 border border-green-500/15">
            <p className="text-green-300 text-sm font-medium mb-1">Implementação inclusa</p>
            <p className="text-slate-400 text-xs">
              Todos os planos incluem setup, integração WhatsApp, treinamento da equipe, suporte e atualizações gerenciadas pela NandiDev.
            </p>
          </div>

          <motion.a
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            href="https://multiagentesplataforma.lovable.app/#planos"
            target="_blank" rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Contratar plano <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </div>
  );
}

/* ─── Main section ───────────────────────────────────────────────────────── */

const Products = () => {
  const [activeTab, setActiveTab] = useState('disparo');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="produtos" className="py-20 lg:py-28 bg-[#080d1a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={item} className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
              Produtos SaaS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Conheça nossas{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
                plataformas
              </span>
            </h2>
            <p className="text-lg text-slate-400">
              Soluções desenvolvidas pela NandiDev para automatizar e escalar seu negócio com inteligência artificial.
            </p>
          </motion.div>

          {/* Product tabs — estilo Disparo.AI */}
          <motion.div variants={item} className="flex items-center justify-center gap-2 flex-wrap">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const accentActive = tab.accent === 'cyan'
                ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400'
                : 'bg-green-500/15 border-green-500/40 text-green-400';
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all ${
                    isActive
                      ? accentActive
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  {tab.id === 'disparo'   && <MessageCircle className="w-4 h-4" />}
                  {tab.id === 'multiagente' && <Headphones className="w-4 h-4" />}
                  {tab.label}
                  {isActive && (
                    <span className={`w-1.5 h-1.5 rounded-full ${tab.accent === 'cyan' ? 'bg-cyan-400' : 'bg-green-400'}`} />
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* Product card */}
          <motion.div
            key={activeTab}
            variants={item}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {activeTab === 'disparo'   && <DisparoCard />}
            {activeTab === 'multiagente' && <MultiAgenteCard />}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div variants={item} className="text-center">
            <p className="text-slate-500 text-sm">
              Quer uma solução personalizada para o seu negócio?{" "}
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
