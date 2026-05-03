import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';

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
      id: 5,
      title: "Checklist para Gestantes",
      category: "mobile",
      description: "Aplicativo de cuidado materno com arquitetura offline-first, orientação inteligente e acompanhamento estruturado da gestação e da primeira infância.",
      image: "/logo/checklist-gestantes-hero.png",
      technologies: ["React Native", "Offline-first", "IA de Apoio", "Documentos", "Emocional"],
      liveUrl: "#",
      githubUrl: "#",
      screenshots: [
        "/logo/checklist-gestantes-hero.png",
        "/logo/checklist-gestantes-1.png",
        "/logo/checklist-gestantes-2.png"
      ],
      technicalDescription: "Aplicativo completo para gestantes com checklists semanais, linha do tempo da gestação, galeria da barriga, cartas para o bebê, contador de contrações e chutes, calculadora DPP, lembrete de consultas e vacinas. Inclui Lumi, assistente com IA para apoio emocional, e suporte à gestação adotiva (Gestação do Coração). Ecossistema do bebê com diário, documentos, histórico e acompanhamento de crescimento."
    },
    {
      id: 6,
      title: "FoolApp – App de Entregas",
      category: "mobile",
      description: "Plataforma completa de entregas com orquestração em tempo real para motoristas, clientes e administradores, otimizando despacho e nível de serviço.",
      image: "/logo/foolapp-hero.png",
      technologies: ["React Native", "Node.js", "Google Maps", "Real-time"],
      liveUrl: "#",
      githubUrl: "#",
      screenshots: [
        "/logo/foolapp-hero.png",
        "/logo/foolapp-criar-conta.png",
        "/logo/foolapp-motorista-mapa.png",
        "/logo/foolapp-admin.png",
        "/logo/foolapp-cliente.png",
        "/logo/foolapp-avaliacoes.png",
        "/logo/foolapp-rastreamento.png"
      ],
      technicalDescription: "Plataforma de entregas com app para motoristas (cadastro com CNH, mapa, corridas, saldos), app para clientes (solicitar corrida, pagamento Cartão/PIX/Dinheiro) e painel administrativo (gerenciar motoristas, empresas, taxas, parâmetros). Inclui rastreamento em tempo real com Google Maps e sistema de avaliações bidirecional."
    },
    {
      id: 7,
      title: "Cláudia Cruz Terapeuta",
      category: "website",
      description: "Presença digital profissional para clínica de psicoterapia, estruturada para qualificação de leads, comunicação de serviços e engajamento escalável de clientes.",
      image: "/logo/terapeuta-claudia-hero.png",
      technologies: ["React", "Tailwind CSS", "Responsive Design", "SEO"],
      liveUrl: "#",
      githubUrl: "#",
      screenshots: [
        "/logo/terapeuta-claudia-hero.png",
        "/logo/terapeuta-claudia-servicos.png",
        "/logo/terapeuta-claudia-situacoes.png",
        "/logo/terapeuta-claudia-pratica.png",
        "/logo/terapeuta-claudia-como-funciona.png",
        "/logo/terapeuta-claudia-abordagem.png",
        "/logo/terapeuta-claudia-conteudos.png"
      ],
      technicalDescription: "Site institucional para psicoterapeuta com hero, atendimentos (Famílias, Casais, Adolescentes, Empresas), seção de situações (ansiedade, conflitos, burnout, perda de propósito), abordagem TCC, processo em 5 etapas e área de conteúdos com filtros e busca. Integração WhatsApp e agendamento. Design responsivo com paleta verde e laranja."
    },
    {
      id: 9,
      title: "Yummi Cukie",
      category: "ecommerce",
      description: "Plataforma de marca estilo e-commerce com fluxos de conversão automatizados e pontos de contato prontos para geração de demanda e gestão de pedidos.",
      image: "/logo/yummicukie-hero.png",
      technologies: ["React", "Tailwind CSS", "WhatsApp", "Responsive Design"],
      liveUrl: "#",
      githubUrl: "#",
      screenshots: [
        "/logo/yummicukie-hero.png",
        "/logo/yummicukie-momento.png",
        "/logo/yummicukie-oferta.png",
        "/logo/yummicukie-essencia.png"
      ],
      technicalDescription: "Site para confeitaria artesanal de cookies proteicos. Hero com foco em 'doce sem culpa', seção 'O que nos move' (Nossa essência), 'O que oferecemos' (Cookies Proteicos, Opções Sem Glúten, Sem Açúcar Adicionado). Integração WhatsApp para pedidos, links para Instagram. Design em tons rosa, vermelho e bege."
    },
    {
      id: 8,
      title: "Gigi Pet Sitter",
      category: "website",
      description: "Plataforma de serviços de pet care com rastreamento de visitas orientado a dados, identidade do pet via QR Code e dashboards operacionais para entrega de serviço transparente.",
      image: "/logo/gigipetsitter-hero.png",
      technologies: ["React", "Dashboard", "QR Code", "WhatsApp"],
      liveUrl: "https://gigipetsitter.com.br/",
      githubUrl: "#",
      screenshots: [
        "/logo/gigipetsitter-hero.png",
        "/logo/gigipetsitter-sobre.png",
        "/logo/gigipetsitter-servicos.png",
        "/logo/gigipetsitter-veterinario.png",
        "/logo/gigipetsitter-depoimentos.png",
        "/logo/gigipetsitter-dashboard.png",
        "/logo/gigipetsitter-dashboard-dark.png"
      ],
      technicalDescription: "Site profissional para Giovanna Pet Sitter — pet sitter e dog walker em Londrina com formação em Medicina Veterinária. Inclui ecossistema Gigi Care: cartão digital do pet com QR Code, dashboard de status de saúde, relatórios por visita, integração WhatsApp e protocolo de cuidado em 6 etapas."
    },
    {
      id: 1,
      title: "PsiPro – Aplicativo para Psicólogos",
      category: "mobile",
      description: "Aplicativo completo de gestão clínica para psicólogos, unificando prontuários, agenda, financeiro e automação de comunicação com os pacientes.",
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
      description: "Plataforma para evento internacional com arquitetura multilíngue e entrega de informações de alta performance para inscrições, programação e comunicação com o público.",
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
      description: "Sistema de inteligência comercial orientado a dados com fechamento diário automatizado, monitoramento de desempenho e relatórios gerenciais para acelerar decisões.",
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
      description: "Sistema de gestão empresarial integrando CRM, vendas e inteligência financeira em uma única plataforma operacional.",
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
    <section id="portfolio" className="py-20 lg:py-28 bg-slate-50">
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
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Nosso <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Portfólio</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Produtos com IA e sistemas inteligentes entregues em diferentes segmentos.
              <br />
              Cada projeto é pensado para gerar impacto operacional e de negócio mensurável.
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
              Vamos projetar o seu próximo produto com IA — com arquitetura clara e resultados reais para o negócio.
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
