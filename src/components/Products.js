import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MessageCircle, Zap, Brain, BarChart3, Users, Smartphone,
  ArrowRight, CheckCircle, Star, ExternalLink,
  Headphones, Bot, ListFilter, FileText, Tag, Shield, Inbox, TrendingUp,
  Share2, CalendarDays, Wand2, Lightbulb, GalleryHorizontal, PieChart,
  UserCheck, Clock, Mic, Target,
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

/* ─── Automação de Redes Sociais data ───────────────────────────────────── */

const socialFeatures = [
  { icon: CalendarDays,       label: "Agendamento multi-plataforma", desc: "Programe posts para Instagram, TikTok, LinkedIn, X e mais em um só lugar" },
  { icon: Wand2,              label: "Criação de visuais com IA",    desc: "Gere imagens, carrosséis e vídeos curtos automaticamente com IA generativa" },
  { icon: Bot,                label: "Autopilot IA",                 desc: "Crie, aprove e publique conteúdo no piloto automático sem intervenção manual" },
  { icon: Lightbulb,          label: "Insights estratégicos IA",     desc: "Sugestões de pauta e horários baseados em dados de engajamento da sua conta" },
  { icon: GalleryHorizontal,  label: "Galeria de criações",          desc: "Biblioteca organizada de todo o conteúdo produzido por marca e plataforma" },
  { icon: PieChart,           label: "Analytics avançado",           desc: "Relatórios de alcance, engajamento e crescimento por rede social" },
];

const socialPlans = [
  { name: "Criador", price: "R$197", detail: "1 marca · 30 posts/mês",    instances: "Agendamento + Galeria",           highlight: false },
  { name: "Pro",     price: "R$397", detail: "3 marcas · Posts ilimitados", instances: "Autopilot IA + Insights",         highlight: true  },
  { name: "Agência", price: "R$797", detail: "10 marcas · Posts ilimitados",instances: "Analytics + Suporte prioritário", highlight: false },
];

/* ─── SDR Humanizada data ────────────────────────────────────────────────── */

const sdrFeatures = [
  { icon: Clock,       label: "Responde em segundos, 24/7",         desc: "Nenhum lead fica sem resposta, mesmo fora do horário comercial" },
  { icon: Bot,         label: "8 camadas de humanização",           desc: "Voz, gatilhos, intenção contextual — o cliente não sabe que é IA" },
  { icon: UserCheck,   label: "Qualificação automática",            desc: "Score, perfil e urgência definidos sem intervenção humana" },
  { icon: CalendarDays,label: "Agendamento automático",             desc: "Integra ao calendário e agenda reuniões sem fricção" },
  { icon: Mic,         label: "Voz clonada (ElevenLabs)",           desc: "SDR com voz natural da sua marca nos planos Gold e Black" },
  { icon: Target,      label: "Prospecção Outbound",                desc: "Inicia contato com leads frios de forma humanizada e escalável" },
];

const sdrPlans = [
  { name: "Silver", price: "R$1,49", detail: "/lead · a partir de 500/mês", instances: "WhatsApp + Qualificação + Agenda",  highlight: false },
  { name: "Gold",   price: "R$1,99", detail: "/lead · plano mais popular",  instances: "Silver + Instagram + Voz + Outbound", highlight: true  },
  { name: "Black",  price: "R$2,99", detail: "/lead · alto volume",         instances: "Gold + Telefonia IA + Dashboard RT", highlight: false },
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
  { id: 'disparo',    label: 'Disparo.AI',               accent: 'cyan'   },
  { id: 'multiagente',  label: 'Atendimento Multi-Agentes', accent: 'green'  },
  { id: 'social',     label: 'Automação de Redes Sociais', accent: 'violet' },
  { id: 'sdr',        label: 'SDR IA Humanizada',          accent: 'orange' },
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

/* ─── Automação de Redes Sociais card ───────────────────────────────────── */

function SocialCard() {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-violet-500/20 bg-[#0d0a18]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-violet-500/5 blur-3xl rounded-full pointer-events-none" />
      <div className="relative grid lg:grid-cols-2 gap-0">
        {/* Left — Features */}
        <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-violet-500/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Share2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Automação de Redes Sociais</h3>
              <p className="text-slate-400 text-sm">Social Media Automation Platform</p>
            </div>
          </div>

          <p className="text-slate-300 text-sm mb-6 leading-relaxed">
            Plataforma completa para criar, agendar e publicar conteúdo nas principais redes sociais com IA.
            Você traz sua conta Blotato e nós cuidamos do restante — do visual ao autopilot.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {socialFeatures.map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <f.icon className="w-4 h-4 text-violet-400" />
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
              href="https://megaautomacao.lovable.app/#planos"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Quero automatizar minhas redes <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              href="https://megaautomacao.lovable.app"
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
            <Star className="w-4 h-4 text-violet-400" /> Planos disponíveis
          </h4>
          <div className="space-y-3">
            {socialPlans.map((plan, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  plan.highlight ? "bg-violet-500/10 border-violet-500/30" : "bg-white/5 border-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className={`w-4 h-4 shrink-0 ${plan.highlight ? "text-violet-400" : "text-slate-500"}`} />
                  <div>
                    <p className={`font-semibold text-sm ${plan.highlight ? "text-violet-400" : "text-white"}`}>
                      Plano {plan.name}
                      {plan.highlight && <span className="ml-2 text-xs bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full">Popular</span>}
                    </p>
                    <p className="text-slate-500 text-xs">{plan.detail}</p>
                    <p className="text-slate-600 text-xs">{plan.instances}</p>
                  </div>
                </div>
                <span className={`font-bold text-sm ${plan.highlight ? "text-violet-400" : "text-slate-300"}`}>
                  {plan.price}<span className="text-xs font-normal text-slate-500">/mês</span>
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl bg-violet-500/5 border border-violet-500/15">
            <p className="text-violet-300 text-sm font-medium mb-1">Blotato por conta do cliente</p>
            <p className="text-slate-400 text-xs">
              A plataforma utiliza a API Blotato para publicação. O cliente mantém sua própria conta Blotato — você paga apenas pela plataforma NandiDev.
            </p>
          </div>

          <motion.a
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            href="https://megaautomacao.lovable.app/#planos"
            target="_blank" rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Contratar plano <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </div>
  );
}

/* ─── SDR IA Humanizada card ─────────────────────────────────────────────── */

function SdrCard() {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-orange-500/20 bg-[#130e05]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-orange-500/5 blur-3xl rounded-full pointer-events-none" />
      <div className="relative grid lg:grid-cols-2 gap-0">
        {/* Left — Features */}
        <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-orange-500/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">SDR IA Humanizada</h3>
              <p className="text-slate-400 text-sm">AI-Powered Sales Development Representative</p>
            </div>
          </div>

          <p className="text-slate-300 text-sm mb-6 leading-relaxed">
            Agente SDR com IA ultra-humanizada que atende, qualifica e agenda leads automaticamente.
            Responde em segundos, 24h por dia — enquanto custa uma fração de um SDR humano.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {sdrFeatures.map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <f.icon className="w-4 h-4 text-orange-400" />
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
              href="https://human-hearted-ai.lovable.app/#planos"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Quero um SDR com IA <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              href="https://human-hearted-ai.lovable.app"
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
            <Star className="w-4 h-4 text-orange-400" /> Planos disponíveis
          </h4>
          <div className="space-y-3">
            {sdrPlans.map((plan, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  plan.highlight ? "bg-orange-500/10 border-orange-500/30" : "bg-white/5 border-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className={`w-4 h-4 shrink-0 ${plan.highlight ? "text-orange-400" : "text-slate-500"}`} />
                  <div>
                    <p className={`font-semibold text-sm ${plan.highlight ? "text-orange-400" : "text-white"}`}>
                      Plano {plan.name}
                      {plan.highlight && <span className="ml-2 text-xs bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full">Popular</span>}
                    </p>
                    <p className="text-slate-500 text-xs">{plan.detail}</p>
                    <p className="text-slate-600 text-xs">{plan.instances}</p>
                  </div>
                </div>
                <span className={`font-bold text-sm ${plan.highlight ? "text-orange-400" : "text-slate-300"}`}>
                  {plan.price}<span className="text-xs font-normal text-slate-500">/lead</span>
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl bg-orange-500/5 border border-orange-500/15">
            <p className="text-orange-300 text-sm font-medium mb-1">Simulador de orçamento incluso</p>
            <p className="text-slate-400 text-xs">
              Configure agentes, volume de leads e tipo de contrato. Gere uma proposta personalizada em segundos com implementação inclusa.
            </p>
          </div>

          <motion.a
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            href="https://human-hearted-ai.lovable.app/#planos"
            target="_blank" rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Fazer um orçamento <ArrowRight className="w-4 h-4" />
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
                : tab.accent === 'green'
                ? 'bg-green-500/15 border-green-500/40 text-green-400'
                : tab.accent === 'violet'
                ? 'bg-violet-500/15 border-violet-500/40 text-violet-400'
                : 'bg-orange-500/15 border-orange-500/40 text-orange-400';
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
                  {tab.id === 'disparo'    && <MessageCircle className="w-4 h-4" />}
                  {tab.id === 'multiagente' && <Headphones    className="w-4 h-4" />}
                  {tab.id === 'social'      && <Share2         className="w-4 h-4" />}
                  {tab.id === 'sdr'         && <Bot            className="w-4 h-4" />}
                  {tab.label}
                  {isActive && (
                    <span className={`w-1.5 h-1.5 rounded-full ${tab.accent === 'cyan' ? 'bg-cyan-400' : tab.accent === 'green' ? 'bg-green-400' : tab.accent === 'violet' ? 'bg-violet-400' : 'bg-orange-400'}`} />
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
            {activeTab === 'disparo'     && <DisparoCard />}
            {activeTab === 'multiagente' && <MultiAgenteCard />}
            {activeTab === 'social'      && <SocialCard />}
            {activeTab === 'sdr'         && <SdrCard />}
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
