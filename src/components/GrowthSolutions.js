import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Brain, Smartphone, Globe, Rocket, CheckCircle2 } from 'lucide-react';

const GrowthSolutions = () => {
  const pillars = [
    {
      icon: MessageSquare,
      tag: 'Chatbot Vendedor + SDR IA',
      title: 'Conversas inteligentes que qualificam e agendam sem esforço',
      description:
        'Criamos chatbots vendedores e SDRs com IA treinados com o fluxo Premium da NandiDev. Eles entendem intenção, coletam nome + WhatsApp, fazem diagnóstico e levam o lead direto para orçamento ou reunião.',
      bullets: [
        'Fluxos em português com tom consultivo',
        'Integração com WhatsApp e e-mail',
        'Agendamento automático e lembretes',
        'Relatórios com oportunidades e status'
      ],
      gradient: 'from-blue-600 via-indigo-600 to-purple-600'
    },
    {
      icon: Brain,
      tag: 'Automação Comercial Inteligente',
      title: 'Use IA para gerar leads e propostas em minutos',
      description:
        'Automatizamos tarefas repetitivas: diagnóstico, briefings, propostas e follow-ups. Ideal para consultorias, agências, clínicas e negócios que precisam responder rápido sem aumentar o time.',
      bullets: [
        'Geração de diagnósticos e propostas',
        'Regras para níveis de projeto e urgência',
        'Envio automático de resumos e CTA',
        'Dashboards para acompanhar performance'
      ],
      gradient: 'from-emerald-600 via-green-500 to-lime-500'
    },
    {
      icon: Smartphone,
      tag: 'Aplicativos e Portais Sob Medida',
      title: 'Apps e sistemas pensados para operações brasileiras',
      description:
        'Desenvolvemos aplicativos e portais personalizados com stack moderna (React, Node, React Native). Ideal para empresas que precisam escalar atendimento, logística, educação ou serviços.',
      bullets: [
        'Aplicativos Android, iOS e PWA',
        'Integrações com ERPs e gateways locais',
        'Área do cliente, dashboards e notificações',
        'Arquitetura segura e escalável'
      ],
      gradient: 'from-orange-500 via-pink-500 to-rose-500'
    },
    {
      icon: Globe,
      tag: 'Sites e Experiências Digitais com IA',
      title: 'Sites profissionais prontos para ranquear e converter',
      description:
        'Landing pages, sites institucionais e hubs de conteúdo otimizados para SEO focado em Rio Grande do Sul e todo o Brasil. Conteúdo estratégico, formulários inteligentes e integrações com automação.',
      bullets: [
        'Copywriting com palavras-chave “chatbot”, “SDR IA”, “apps e sites”',
        'Performance alta (Lighthouse 90+)',
        'Formulários e chat integrados ao CRM',
        'Planos de conteúdo para blog e cases'
      ],
      gradient: 'from-cyan-500 via-sky-500 to-blue-500'
    }
  ];

  const handleContact = () => {
    window.open(
      'https://wa.me/5554996246565?text=Quero saber mais sobre as soluções inteligentes da NandiDev.',
      '_blank'
    );
  };

  return (
    <section id="growth-solutions" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="uppercase tracking-[0.3em] sm:tracking-[0.4em] text-primary font-semibold text-xs sm:text-sm mb-3 sm:mb-4">
            soluções estratégicas
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
            IA aplicada ao seu negócio no Rio Grande do Sul e no Brasil inteiro
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            Atuamos como parceiro de produto digital: desenhamos a estratégia, construímos o
            software e ativamos campanhas orgânicas para que sua empresa seja encontrada sem precisar
            investir em mídia paga.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.tag}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 flex flex-col overflow-hidden"
            >
              <div className={`p-4 sm:p-6 text-white bg-gradient-to-r ${pillar.gradient}`}>
                <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                  <pillar.icon size={28} className="sm:w-9 sm:h-9 flex-shrink-0 mt-1 sm:mt-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest opacity-80 block mb-1 sm:mb-0">
                      {pillar.tag}
                    </span>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">{pillar.title}</h3>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6 flex-1 flex flex-col gap-4 sm:gap-6">
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{pillar.description}</p>
                <ul className="space-y-2 sm:space-y-3">
                  {pillar.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start text-gray-700">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 bg-gray-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-white text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em]">
            <Rocket size={14} className="sm:w-4 sm:h-4" />
            pronto para crescer
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold px-2">
            Quer aparecer para quem busca chatbots, SDR com IA ou desenvolvimento de apps?
          </h3>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto px-2 leading-relaxed">
            Montamos o plano completo: conteúdo otimizado, páginas estratégicas, integrações com seu
            CRM e testes constantes. Tudo para que seu site gere oportunidades reais no Brasil
            inteiro sem depender de anúncios.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleContact}
            className="bg-white text-gray-900 font-semibold py-3 sm:py-4 px-6 sm:px-10 rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center gap-2 sm:gap-3 mx-auto text-sm sm:text-base"
          >
            Falar com a NandiDev agora
            <MessageSquare size={18} className="sm:w-5 sm:h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default GrowthSolutions;



