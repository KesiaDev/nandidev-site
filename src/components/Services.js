import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Zap,
  Bot,
  Smartphone,
  Globe,
  Settings,
  GraduationCap,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Services = () => {
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

  const services = [
    {
      icon: Bot,
      title: "Sistemas de IA & Automação",
      description: "Criação e implantação de sistemas com IA, integração de LLMs, agentes inteligentes e automação de processos para fluxos críticos do negócio.",
      features: [
        "Integração com LLMs (OpenAI APIs)",
        "Orquestração de fluxos multi-agente",
        "Automação inteligente de processos",
        "Eficiência operacional em escala"
      ],
      color: "from-violet-500 to-blue-600",
      highlight: true,
      bento: 'wide'
    },
    {
      icon: GraduationCap,
      title: "Treinamento & Implementação de IA",
      description: "Programas práticos para equipes adotarem ferramentas de IA, implantarem casos de uso e construírem capacidade interna de operação com IA.",
      features: [
        "Workshops executivos e técnicos",
        "Frameworks de adoção de IA",
        "Engenharia de prompts e fluxos",
        "Playbooks de implementação"
      ],
      color: "from-emerald-500 to-teal-500",
      highlight: true
    },
    {
      icon: Globe,
      title: "Sites e Portais",
      description: "Sites profissionais, institucionais e portais sob medida, responsivos e otimizados para conversão.",
      features: [
        "Design moderno",
        "SEO e performance",
        "Integração com ferramentas",
        "Manutenção contínua"
      ],
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Smartphone,
      title: "Aplicativos",
      description: "Apps mobile e web para gestão, atendimento e automação. Soluções feitas sob medida, não de prateleira.",
      features: [
        "React Native",
        "Interface intuitiva",
        "Funciona offline quando necessário",
        "Integração com APIs"
      ],
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: Settings,
      title: "Plataformas de Dados & IA",
      description: "Plataformas orientadas a dados, dashboards de analytics e sistemas com IA que transformam dados do negócio em inteligência operacional.",
      features: [
        "Dashboards de inteligência de decisão",
        "Pipelines e integrações de dados",
        "Métricas de desempenho em tempo real",
        "Arquitetura segura e escalável"
      ],
      color: "from-rose-500 to-pink-600"
    },
    {
      icon: Zap,
      title: "Estratégia & Arquitetura de IA",
      description: "Consultoria estratégica para transformação com IA, design de arquitetura e execução de roadmap com foco em impacto mensurável no negócio.",
      features: [
        "Mapeamento de oportunidades com IA",
        "Design de arquitetura RAG e agentes",
        "Priorização de roadmap técnico",
        "Rastreamento de ROI e impacto"
      ],
      color: "from-cyan-500 to-sky-600"
    }
  ];

  const handleWhatsApp = () => {
    window.open('https://wa.me/5554996246565?text=Olá! Gostaria de conhecer os serviços da NandiDev.', '_blank');
  };

  return (
    <section id="services" className="relative py-20 lg:py-28 bg-[#0a0f1e] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Serviços de Tecnologia e IA da <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400">NandiDev</span>
            </h2>
            <p className="text-lg text-slate-400">
              De integração com LLMs a sistemas multi-agente e pipelines RAG, construímos soluções inteligentes sob medida para o seu negócio.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 lg:grid-flow-dense gap-6">
            {services.map((service, index) => {
              const cardInner = (
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  className={`relative h-full bg-white/5 backdrop-blur-sm rounded-2xl border hover:border-white/20 transition-all overflow-hidden ${
                    service.bento === 'wide' ? '' : service.highlight ? 'border-violet-500/30 ring-1 ring-violet-500/20' : 'border-white/10'
                  }`}
                >
                  <div className={`h-28 bg-gradient-to-r ${service.color} flex items-center justify-center`}>
                    <service.icon className="w-12 h-12 text-white" />
                    {service.highlight && (
                      <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/20 text-white text-xs font-medium">
                        Destaque
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">{service.description}</p>
                    <ul className={`gap-2 mb-5 ${service.bento === 'wide' ? 'grid sm:grid-cols-2 space-y-0' : 'space-y-2'}`}>
                      {service.features.map((f, i) => (
                        <li key={i} className="flex items-center text-sm text-slate-400">
                          <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleWhatsApp}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors"
                    >
                      Conversar
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              );

              // The bento-wide highlight card gets an animated gradient-border ring
              return service.bento === 'wide' ? (
                <div key={index} className="lg:col-span-2 gradient-border rounded-2xl p-[1.5px]">
                  {cardInner}
                </div>
              ) : (
                <React.Fragment key={index}>{cardInner}</React.Fragment>
              );
            })}
          </div>

          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-cyan-500/10 p-8 md:p-12 text-center text-white"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Pronto para a virada de chave?
            </h3>
            <p className="text-slate-300 mb-6 max-w-xl mx-auto">
              Agende uma apresentação comercial e veja como podemos ajudar sua empresa
              a automatizar processos e capacitar seu time com IA.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold py-4 px-8 rounded-xl transition-colors"
            >
              Agendar Apresentação
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
