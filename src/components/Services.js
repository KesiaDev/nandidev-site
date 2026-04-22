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
      title: "AI Systems & Automation",
      description: "Design and deployment of AI-powered systems with LLM integration, intelligent agents and process automation for mission-critical workflows.",
      features: [
        "LLM integration (OpenAI APIs)",
        "Multi-agent workflow orchestration",
        "Intelligent process automation",
        "Operational efficiency at scale"
      ],
      color: "from-amber-500 to-orange-500",
      highlight: true
    },
    {
      icon: GraduationCap,
      title: "AI Training & Implementation",
      description: "Hands-on enablement programs to help teams adopt AI tools, deploy use cases and build internal AI operating capability.",
      features: [
        "Executive and technical workshops",
        "AI adoption frameworks",
        "Prompt and workflow engineering",
        "Implementation playbooks"
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
      title: "Data & AI Platforms",
      description: "Data-driven platforms, analytics dashboards and AI-enabled systems that transform business data into operational intelligence.",
      features: [
        "Decision intelligence dashboards",
        "Data pipelines and integrations",
        "Real-time performance metrics",
        "Secure and scalable architecture"
      ],
      color: "from-rose-500 to-pink-600"
    },
    {
      icon: Zap,
      title: "AI Strategy & Architecture",
      description: "Strategic advisory for AI transformation, architecture design and roadmap execution focused on measurable business impact.",
      features: [
        "AI opportunity assessment",
        "RAG and agent architecture design",
        "Technical roadmap prioritization",
        "ROI and impact tracking"
      ],
      color: "from-cyan-500 to-sky-600"
    }
  ];

  const handleWhatsApp = () => {
    window.open('https://wa.me/54996246565?text=Olá! Gostaria de conhecer os serviços da NandiDev.', '_blank');
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              AI Engineering Services by <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">NandiDev</span>
            </h2>
            <p className="text-lg text-slate-600">
              From LLM integration to multi-agent systems and RAG pipelines, we build intelligent systems tailored to your business context.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className={`relative bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-all overflow-hidden ${
                  service.highlight ? 'border-amber-200 ring-1 ring-amber-100' : 'border-slate-100'
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
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2 mb-5">
                    {service.features.map((f, i) => (
                      <li key={i} className="flex items-center text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleWhatsApp}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
                  >
                    Conversar
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-center text-white"
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
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold py-4 px-8 rounded-xl transition-colors"
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
