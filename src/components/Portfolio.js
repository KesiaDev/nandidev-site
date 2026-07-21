import React, { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

const categoryMeta = {
  all:       { label: 'Todos',      color: 'text-white',         bg: 'bg-white/10 border-white/20'          },
  website:   { label: 'Sites',      color: 'text-cyan-400',      bg: 'bg-cyan-500/10 border-cyan-500/30'    },
  ecommerce: { label: 'E-commerce', color: 'text-amber-400',     bg: 'bg-amber-500/10 border-amber-500/30'  },
  mobile:    { label: 'Mobile',     color: 'text-violet-400',    bg: 'bg-violet-500/10 border-violet-500/30'},
  system:    { label: 'Sistemas',   color: 'text-emerald-400',   bg: 'bg-emerald-500/10 border-emerald-500/30'},
};

const filters = ['all', 'website', 'ecommerce', 'mobile', 'system'];

const projects = [
  {
    id: 5,
    title: 'Checklist para Gestantes',
    category: 'mobile',
    description: 'Aplicativo de cuidado materno com arquitetura offline-first, orientação inteligente e acompanhamento estruturado da gestação e da primeira infância.',
    image: '/logo/checklist-gestantes-hero.png',
    technologies: ['React Native', 'Offline-first', 'IA de Apoio'],
    liveUrl: '#',
  },
  {
    id: 6,
    title: 'FoolApp – App de Entregas',
    category: 'mobile',
    description: 'Plataforma completa de entregas com orquestração em tempo real para motoristas, clientes e administradores.',
    image: '/logo/foolapp-hero.png',
    technologies: ['React Native', 'Node.js', 'Google Maps', 'Real-time'],
    liveUrl: '#',
  },
  {
    id: 7,
    title: 'Cláudia Cruz Terapeuta',
    category: 'website',
    description: 'Presença digital profissional para clínica de psicoterapia, estruturada para qualificação de leads e engajamento escalável de clientes.',
    image: '/logo/terapeuta-claudia-hero.png',
    technologies: ['React', 'Tailwind CSS', 'SEO'],
    liveUrl: '#',
  },
  {
    id: 9,
    title: 'Yummi Cukie',
    category: 'ecommerce',
    description: 'Plataforma de marca estilo e-commerce com fluxos de conversão automatizados e pontos de contato prontos para geração de demanda.',
    image: '/logo/yummicukie-hero.png',
    technologies: ['React', 'Tailwind CSS', 'WhatsApp'],
    liveUrl: '#',
  },
  {
    id: 8,
    title: 'Gigi Pet Sitter',
    category: 'website',
    description: 'Plataforma de pet care com rastreamento de visitas orientado a dados, identidade do pet via QR Code e dashboards operacionais.',
    image: '/logo/gigipetsitter-hero.png',
    technologies: ['React', 'Dashboard', 'QR Code'],
    liveUrl: 'https://gigipetsitter.com.br/',
  },
  {
    id: 1,
    title: 'PsiPro – Gestão para Psicólogos',
    category: 'mobile',
    description: 'Aplicativo completo de gestão clínica para psicólogos, unificando prontuários, agenda, financeiro e automação de comunicação.',
    image: '/logo/psipro-dasboard.jpg',
    technologies: ['React Native', 'Firebase', 'WhatsApp API'],
    liveUrl: '#',
  },
  {
    id: 2,
    title: 'Conferência Internacional de Turismo',
    category: 'website',
    description: 'Plataforma para evento internacional com arquitetura multilíngue e entrega de informações de alta performance.',
    image: '/logo/conferencia-hero.png',
    technologies: ['Next.js', 'i18n', 'SEO'],
    liveUrl: 'https://turismocinematografico.com.br/',
  },
  {
    id: 3,
    title: 'Sistema de Prestação de Contas',
    category: 'system',
    description: 'Sistema de inteligência comercial com fechamento diário automatizado, monitoramento de desempenho e relatórios gerenciais.',
    image: '/logo/prestacao-contas.png',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    liveUrl: '#',
  },
  {
    id: 4,
    title: 'Sistema de Gestão Empresarial',
    category: 'system',
    description: 'Sistema de gestão empresarial integrando CRM, vendas e inteligência financeira em uma única plataforma operacional.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
    technologies: ['Vue.js', 'Laravel', 'MySQL'],
    liveUrl: '#',
  },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit:    { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="relative py-20 lg:py-28 bg-[#060b16] overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-1/3 -left-64 w-[500px] h-[500px] bg-violet-500/6 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/3 -right-64 w-[500px] h-[500px] bg-cyan-500/6 blur-[120px] rounded-full" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium">
            Portfólio
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Projetos que{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400">
              geram resultado
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Produtos com IA e sistemas inteligentes entregues em diferentes segmentos — cada um pensado para impacto real de negócio.
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2.5"
        >
          {filters.map((f) => {
            const m = categoryMeta[f];
            const isActive = activeFilter === f;
            return (
              <motion.button
                key={f}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  isActive
                    ? `${m.color} ${m.bg}`
                    : 'text-slate-400 border-white/10 bg-white/5 hover:bg-white/10 hover:text-white'
                }`}
              >
                {m.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const cat = categoryMeta[project.category];
              const hasLink = project.liveUrl && project.liveUrl !== '#';
              return (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-2xl border border-white/10 bg-[#0d1526]/80 backdrop-blur-sm overflow-hidden cursor-default hover:border-white/20 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gradient overlay always */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1526] via-transparent to-transparent" />

                    {/* Category badge */}
                    <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${cat.color} ${cat.bg} backdrop-blur-sm`}>
                      {cat.label}
                    </div>

                    {/* External link on hover */}
                    {hasLink && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.a>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-white font-semibold text-base leading-snug">{project.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{project.description}</p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-400 text-[11px] font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-cyan-500/5 p-10 space-y-4"
        >
          <h3 className="text-2xl font-bold text-white">Gostou do que viu?</h3>
          <p className="text-slate-400 max-w-md mx-auto">
            Vamos projetar o seu próximo produto com IA — com arquitetura clara e resultados reais para o negócio.
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              const el = document.querySelector('#contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 hover:from-violet-500 hover:via-blue-500 hover:to-cyan-400 text-white font-semibold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-blue-500/20"
          >
            Iniciar Projeto
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default Portfolio;
