import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Eye, Filter } from 'lucide-react';

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState('all');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'website', label: 'Sites' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'system', label: 'Sistemas' }
  ];

  const projects = [
    {
      id: 1,
      title: "PsiPro – Aplicativo para Psicólogos",
      category: "mobile",
      description: "Aplicativo completo para gestão de pacientes, agenda, prontuário e financeiro, com modo claro/escuro e integração com WhatsApp.",
      image: "/logo/psipro-dasboard.jpg",
      technologies: ["React Native", "Firebase", "WhatsApp API", "Dark Mode"],
      liveUrl: "#",
      githubUrl: "#",
      screenshots: [
        "/logo/psipro-login.jpg",
        "/logo/psipro-dasboard.jpg",
        "/logo/psipro-agenda.jpg",
        "/logo/psipro-financeiro.jpg",
        "/logo/psipro-fichapaciente.jpg",
        "/logo/psipro-configuracoes.jpg"
      ],
      technicalDescription: "Aplicativo desenvolvido com React Native para gestão completa de consultórios psicológicos. Inclui sistema de agenda, prontuário digital com anamnese, controle financeiro avançado, importação de dados via Excel e integração com WhatsApp para comunicação com pacientes."
    },
    {
      id: 2,
      title: "Conferência Internacional de Turismo Cinematográfico",
      category: "website",
      description: "Site institucional com design elegante, multilíngue e responsivo, desenvolvido para um evento internacional.",
      image: "/logo/conferencia-hero.png",
      technologies: ["Next.js", "Tailwind CSS", "i18n", "Responsive Design"],
      liveUrl: "https://turismocinematografico.com.br/",
      githubUrl: "#",
      screenshots: [
        "/logo/conferencia-hero.png",
        "/logo/conferencia-programacao.png",
        "/logo/conferencia-inscricoes.png"
      ],
      technicalDescription: "Site institucional desenvolvido com Next.js e Tailwind CSS, com suporte multilíngue (PT/EN) e design responsivo. Inclui contador regressivo para o evento, sistema de inscrições online, agenda de palestras interativa e otimização completa para SEO."
    },
    {
      id: 3,
      title: "Sistema de Prestação de Contas",
      category: "system",
      description: "Sistema completo para acompanhamento comercial de equipes, com fechamento diários, acompanhamento de resultados e relatórios gerenciais.",
      image: "/logo/prestacao-contas.png",
      technologies: ["React", "Node.js", "PostgreSQL", "Chart.js"],
      liveUrl: "#",
      githubUrl: "#",
      screenshots: [
        "/logo/prestacao-contas.png"
      ],
      technicalDescription: "Sistema desenvolvido para gestão comercial de equipes, com dashboard interativo, relatórios de vendas, acompanhamento de metas e fechamento diário de resultados. Inclui módulos de CRM, vendas e relatórios gerenciais."
    },
    {
      id: 4,
      title: "Sistema de Gestão Empresarial",
      category: "system",
      description: "Sistema web completo para gestão de clientes, vendas e relatórios financeiros.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      technologies: ["Vue.js", "Laravel", "MySQL", "Chart.js"],
      liveUrl: "#",
      githubUrl: "#",
      screenshots: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      ],
      technicalDescription: "Sistema de gestão empresarial desenvolvido com Vue.js e Laravel, com dashboard interativo e relatórios em tempo real. Inclui módulos de CRM, vendas, financeiro e RH."
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nosso <span className="text-gradient">Portfólio</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Conheça alguns dos projetos que desenvolvemos para nossos clientes. 
              Cada projeto é único e desenvolvido com foco na experiência do usuário.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  activeFilter === filter.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>{filter.label}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.liveUrl}
                      className="bg-white text-primary p-3 rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.githubUrl}
                      className="bg-white text-gray-700 p-3 rounded-full hover:bg-gray-700 hover:text-white transition-colors duration-300"
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>


                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            variants={itemVariants}
            className="text-center bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Gostou do que viu?
            </h3>
            <p className="text-gray-600 mb-6">
              Vamos criar algo incrível juntos! Entre em contato e vamos discutir seu projeto.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-primary"
            >
              Iniciar Projeto
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
