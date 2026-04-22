import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Headphones, Share2, CheckCircle, ArrowRight, Scale, Target } from 'lucide-react';

const platforms = [
  {
    id: 'disparo',
    icon: Send,
    label: 'Automação de Disparos',
    color: 'from-cyan-500 to-teal-500',
    colorLight: 'bg-cyan-50',
    colorText: 'text-cyan-600',
    colorBorder: 'border-cyan-200',
    colorRing: 'ring-cyan-100',
    headline: 'Disparo inteligente de mensagens no WhatsApp',
    description:
      'Plataforma completa para automação de campanhas no WhatsApp com API não oficial. Gerencie listas, crie mensagens com voz de IA, configure follow-ups automáticos e acompanhe resultados em tempo real.',
    features: [
      'Campanhas em massa com personalização',
      'Mensagens de voz geradas por IA',
      'Follow-up automático multi-etapas',
      'Motor de disparo com controle de ritmo',
      'Pipeline de prospecção integrado',
      'Teste A/B de mensagens',
    ],
    screenshot: '/screenshots/disparo.png',
    cta: 'Quero automatizar meus disparos',
  },
  {
    id: 'atendimento',
    icon: Headphones,
    label: 'Atendimento Multi-Agente',
    color: 'from-violet-500 to-purple-600',
    colorLight: 'bg-violet-50',
    colorText: 'text-violet-600',
    colorBorder: 'border-violet-200',
    colorRing: 'ring-violet-100',
    headline: 'CS, Suporte e Vendas num só lugar',
    description:
      'Plataforma de atendimento omnichannel com múltiplos agentes, sugestões de resposta por IA, análise de sentimento e resumos automáticos. Seu time atende mais rápido, com mais qualidade.',
    features: [
      'Caixa de entrada unificada multi-agente',
      'Sugestões de resposta com IA (Formal, Amigável, Direto)',
      'Análise de sentimento em tempo real',
      'Resumos automáticos de conversa',
      'Fila e triagem inteligente',
      'Tópicos e categorização automática',
    ],
    screenshot: '/screenshots/atendimento.png',
    cta: 'Quero melhorar meu atendimento',
  },
  {
    id: 'redes-sociais',
    icon: Share2,
    label: 'Automação de Redes Sociais',
    color: 'from-pink-500 to-rose-500',
    colorLight: 'bg-pink-50',
    colorText: 'text-pink-600',
    colorBorder: 'border-pink-200',
    colorRing: 'ring-pink-100',
    headline: 'Crie, agende e publique com IA',
    description:
      'Plataforma completa de automação de redes sociais. Gere posts, carrosséis e vídeos com IA, agende em múltiplas redes e acompanhe analytics — tudo em um único painel.',
    features: [
      'Criação de posts e carrosséis com IA',
      'Agendamento em Instagram, TikTok, LinkedIn e mais',
      'Geração de visuais e vídeos automatizada',
      'Analytics e insights por IA',
      'Motor Autopilot para publicação contínua',
      'Galeria de templates visuais',
    ],
    screenshot: '/screenshots/redes-sociais.png',
    cta: 'Quero automatizar minhas redes',
  },
  {
    id: 'sdr-juridico',
    icon: Scale,
    label: 'SDR Jurídico Inteligente',
    color: 'from-amber-500 to-orange-500',
    colorLight: 'bg-amber-50',
    colorText: 'text-amber-600',
    colorBorder: 'border-amber-200',
    colorRing: 'ring-amber-100',
    headline: 'SDR que qualifica leads jurídicos com IA ultra-humanizada',
    description:
      'Plataforma especializada em prospecção e qualificação de leads para escritórios e prestadores jurídicos. Um agente de IA com 8 camadas de humanização conduz o atendimento, qualifica o lead e agenda automaticamente.',
    features: [
      'SDR com IA que qualifica leads 24h por dia',
      '8 funções ultra-humanizadas (Voz, Gatilhos, Prompts, Intenções e mais)',
      'Funil por área do direito (cível, trabalhista, família etc.)',
      'Agenda integrada com confirmação automática',
      'Banco de mídia e follow-up inteligente',
      'Exportação de dados e relatórios de conversão',
    ],
    screenshot: '/screenshots/sdr-juridico.png',
    cta: 'Quero um SDR Jurídico com IA',
  },
  {
    id: 'radar-comercial',
    icon: Target,
    label: 'Radar Comercial',
    color: 'from-emerald-500 to-green-600',
    colorLight: 'bg-emerald-50',
    colorText: 'text-emerald-600',
    colorBorder: 'border-emerald-200',
    colorRing: 'ring-emerald-100',
    headline: 'Prospecção de leads B2B com inteligência artificial',
    description:
      'Plataforma completa de prospecção ativa com IA. Encontre empresas ideais para o seu negócio, qualifique automaticamente por score e gerencie todo o pipeline de oportunidades em um só lugar.',
    features: [
      'Prospecção IA com score de qualificação (0–100)',
      'Leads Quentes (85+), Mornos (60–84) e Frios (<60)',
      'Growth Radar e Market Scanner por segmento',
      'Local Leads e Lead Generators integrados',
      'Self-Driving Sales com AI Suggestions',
      'Pipeline, Oportunidades e Relatórios em tempo real',
    ],
    screenshot: '/screenshots/radar-comercial.png',
    cta: 'Quero prospectar com IA',
  },
];

export default function Platforms() {
  const [active, setActive] = useState(0);
  const platform = platforms[active];

  const handleWhatsApp = (cta) => {
    const msg = encodeURIComponent(`Olá! ${cta} — vi no site da NandiDev.`);
    window.open(`https://wa.me/5554996246565?text=${msg}`, '_blank');
  };

  return (
    <section id="plataformas" className="py-20 lg:py-28 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-slate-300 text-sm font-medium mb-4">
            Plataformas NandiDev
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tecnologia que você{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              vê funcionando
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            Não vendemos promessa — entregamos plataformas reais, em uso, gerando resultado agora.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {platforms.map((p, i) => {
            const Icon = p.icon;
            const isActive = i === active;
            return (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                  isActive
                    ? `bg-gradient-to-r ${p.color} text-white border-transparent shadow-lg`
                    : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={16} />
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="grid lg:grid-cols-2 gap-10 items-center"
          >
            {/* Left: info */}
            <div className="space-y-6">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${platform.colorLight} ${platform.colorText} text-sm font-semibold`}>
                <platform.icon size={16} />
                {platform.label}
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-white leading-snug">
                {platform.headline}
              </h3>

              <p className="text-slate-400 text-lg leading-relaxed">
                {platform.description}
              </p>

              <ul className="space-y-3">
                {platform.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-slate-300 text-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleWhatsApp(platform.cta)}
                className={`inline-flex items-center gap-2 bg-gradient-to-r ${platform.color} text-white font-semibold py-3.5 px-7 rounded-xl shadow-lg transition-all`}
              >
                {platform.cta}
                <ArrowRight size={18} />
              </motion.button>
            </div>

            {/* Right: screenshot in browser frame */}
            <div className="relative">
              {/* Glow */}
              <div className={`absolute -inset-4 bg-gradient-to-r ${platform.color} opacity-10 blur-2xl rounded-3xl`} />

              {/* Browser frame */}
              <div className="relative bg-slate-800 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <div className="flex-1 mx-4 bg-slate-700 rounded-md px-3 py-1 text-xs text-slate-500">
                    app.nandidev.com.br
                  </div>
                </div>

                {/* Screenshot */}
                <div className="relative bg-slate-800" style={{ aspectRatio: '16/10' }}>
                  <img
                    src={platform.screenshot}
                    alt={platform.label}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback enquanto imagem não está disponível */}
                  <div
                    className={`hidden w-full h-full bg-gradient-to-br ${platform.color} opacity-20 items-center justify-center`}
                    style={{ display: 'none', aspectRatio: '16/10' }}
                  >
                    <div className="text-center">
                      <platform.icon className="w-16 h-16 text-white/40 mx-auto mb-3" />
                      <p className="text-white/40 text-sm">Screenshot em breve</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
