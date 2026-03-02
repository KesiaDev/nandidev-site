import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Smartphone, Globe, Star, ArrowRight, X, FileText, Users } from 'lucide-react';

const Cases = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCase, setSelectedCase] = useState(null);

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

  const cases = [
    {
      id: 4,
      title: "Checklist para Gestantes",
      category: "Mobile App",
      description: "Aplicativo mobile offline-first para organização da gestação e acompanhamento da primeira infância, com recursos emocionais, documentais e inteligência artificial de apoio (Lumi).",
      image: "/logo/checklist-gestantes-hero.png",
      technologies: ["React Native", "Offline-first", "IA de Apoio", "Documentos", "Emocional"],
      features: [
        "Checklists semanais da gestação",
        "Linha do tempo e marcos",
        "Galeria da barriga e cartas para o bebê",
        "Contador de contrações e chutes",
        "Calculadora DPP e lembrete de vacinas",
        "Lumi – assistente com IA para apoio emocional",
        "Gestação do Coração (apoio à adoção)",
        "Ecossistema do bebê: diário, documentos, crescimento"
      ],
      icon: Smartphone,
      color: "from-pink-500 to-rose-600",
      screenshots: [
        "/logo/checklist-gestantes-hero.png",
        "/logo/checklist-gestantes-1.png",
        "/logo/checklist-gestantes-2.png",
        "/logo/checklist-gestantes-3.png",
        "/logo/checklist-gestantes-4.png",
        "/logo/checklist-gestantes-5.png"
      ]
    },
    {
      id: 5,
      title: "FoolApp – App de Entregas",
      category: "Mobile App",
      description: "Aplicativo completo de entregas com painel para motoristas, clientes e administração. Sua entrega sempre na hora certa.",
      image: "/logo/foolapp-hero.png",
      technologies: ["React Native", "Node.js", "Google Maps", "Real-time"],
      features: [
        "Cadastro de motoristas (CPF/CNPJ, CNH, veículo)",
        "Painel motorista: mapa, novas corridas, saldos, histórico",
        "Painel cliente: solicitar corrida, pagamento (Cartão, PIX, Dinheiro)",
        "Painel admin: motoristas, empresas, taxas, parâmetros do sistema",
        "Rastreamento em tempo real com velocidade e direção",
        "Sistema de avaliações motorista-cliente por corrida",
        "Notificações e controle de corridas em andamento"
      ],
      icon: Smartphone,
      color: "from-red-600 to-red-700",
      screenshots: [
        "/logo/foolapp-hero.png",
        "/logo/foolapp-criar-conta.png",
        "/logo/foolapp-motorista-mapa.png",
        "/logo/foolapp-admin.png",
        "/logo/foolapp-cliente.png",
        "/logo/foolapp-avaliacoes.png",
        "/logo/foolapp-rastreamento.png"
      ]
    },
    {
      id: 6,
      title: "Cláudia Cruz Terapeuta",
      category: "Website Institucional",
      description: "Site profissional para psicoterapeuta com design acolhedor, seções de atendimentos, processo terapêutico e conteúdos sobre saúde emocional.",
      image: "/logo/terapeuta-claudia-hero.png",
      technologies: ["React", "Tailwind CSS", "Responsive", "SEO"],
      features: [
        "Hero com proposta de valor e CTA Agendar Consulta",
        "Atendimentos: Famílias, Casais, Adolescentes, Empresas",
        "Seção situações (ansiedade, conflitos, burnout, propósito)",
        "Terapia Familiar, Adolescentes e Soluções Corporativas",
        "Como Funciona: 5 etapas do processo terapêutico",
        "Abordagem TCC e metodologia",
        "Conteúdos com filtros e busca (Relações, Adolescência, Trabalho, Autocuidado)",
        "Integração WhatsApp e agenda"
      ],
      icon: Globe,
      color: "from-teal-600 to-emerald-600",
      screenshots: [
        "/logo/terapeuta-claudia-hero.png",
        "/logo/terapeuta-claudia-servicos.png",
        "/logo/terapeuta-claudia-situacoes.png",
        "/logo/terapeuta-claudia-pratica.png",
        "/logo/terapeuta-claudia-como-funciona.png",
        "/logo/terapeuta-claudia-abordagem.png",
        "/logo/terapeuta-claudia-conteudos.png"
      ]
    },
    {
      id: 7,
      title: "Gigi Pet Sitter",
      category: "Website + Ecossistema Digital",
      description: "Site para pet sitter com base veterinária em Londrina. Inclui ecossistema Gigi Care: cartão digital do pet com QR Code, dashboard e relatórios por visita.",
      image: "/logo/gigipetsitter-hero.png",
      technologies: ["React", "Dashboard", "QR Code", "WhatsApp"],
      features: [
        "Site institucional com proposta de valor clara",
        "Serviços para cães e gatos (visitas, dog walker)",
        "Cartão digital do pet com QR Code exclusivo",
        "Dashboard Gigi Care Admin com métricas e cartões",
        "Relatório completo por visita",
        "Integração WhatsApp para agendamento",
        "Protocolo em 6 etapas (visita prévia, anamnese, etc.)"
      ],
      icon: Globe,
      color: "from-amber-500 to-orange-600",
      liveUrl: "https://gigipetsitter.com.br/",
      screenshots: [
        "/logo/gigipetsitter-hero.png",
        "/logo/gigipetsitter-sobre.png",
        "/logo/gigipetsitter-servicos.png",
        "/logo/gigipetsitter-veterinario.png",
        "/logo/gigipetsitter-depoimentos.png",
        "/logo/gigipetsitter-dashboard.png",
        "/logo/gigipetsitter-dashboard-dark.png"
      ]
    },
    {
      id: 1,
      title: "PsiPro – Aplicativo para Psicólogos",
      category: "Mobile App",
      description: "Aplicativo completo para gestão de pacientes, agenda, prontuário e financeiro, com modo claro/escuro e integração com WhatsApp.",
      image: "/logo/psipro-dasboard.jpg", // Imagem do dashboard principal
      technologies: ["React Native", "Firebase", "WhatsApp API", "Dark Mode"],
      features: [
        "Gestão completa de pacientes",
        "Sistema de agenda integrado", 
        "Prontuário digital com anamnese",
        "Controle financeiro avançado",
        "Modo claro/escuro",
        "Integração WhatsApp",
        "Importação de dados via Excel",
        "Sistema de notificações"
      ],
      icon: Smartphone,
      color: "from-purple-500 to-purple-600",
      screenshots: [
        "/logo/psipro-login.jpg",
        "/logo/psipro-dasboard.jpg", 
        "/logo/psipro-agenda.jpg",
        "/logo/psipro-financeiro.jpg",
        "/logo/psipro-fichapaciente.jpg",
        "/logo/psipro-configuracoes.jpg"
      ]
    },
    {
      id: 2,
      title: "Conferência Internacional de Turismo Cinematográfico",
      category: "Website Institucional",
      description: "Site institucional com design elegante, multilíngue e responsivo, desenvolvido para um evento internacional.",
      image: "/logo/conferencia-hero.png", // Imagem principal da conferência
      technologies: ["Next.js", "Tailwind CSS", "i18n", "Responsive Design"],
      features: [
        "Design elegante e profissional",
        "Suporte multilíngue (PT/EN)",
        "Totalmente responsivo",
        "SEO otimizado",
        "Contador regressivo para o evento",
        "Sistema de inscrições online",
        "Agenda de palestras interativa",
        "Integração com redes sociais"
      ],
      icon: Globe,
      color: "from-blue-500 to-blue-600",
      liveUrl: "https://turismocinematografico.com.br/",
      screenshots: [
        "/logo/conferencia-hero.png",
        "/logo/conferencia-programacao.png",
        "/logo/conferencia-inscricoes.png"
      ]
    },
    {
      id: 3,
      title: "ConectaQ – Plataforma para Igreja Quadrangular",
      category: "Plataforma Web",
      description: "Plataforma completa desenvolvida para a Igreja Quadrangular, oferecendo soluções digitais integradas para gestão, comunicação e engajamento da comunidade.",
      image: "/logo/conectaq-hero.jpg", // Imagem da primeira página do PDF/Preview
      technologies: ["React", "Node.js", "Database", "API Integration"],
      features: [
        "Gestão de membros e comunidade",
        "Sistema de comunicação integrado",
        "Agenda de eventos e atividades",
        "Portal de informações e notícias",
        "Gestão de grupos e células",
        "Sistema de doações e contribuições",
        "Área administrativa completa",
        "Interface responsiva e intuitiva"
      ],
      icon: Users,
      color: "from-green-500 to-emerald-600",
      pdfUrl: "/docs/ConectaQ.pdf",
      screenshots: [
        "/logo/conectaq-hero.jpg",
        "/logo/conectaq-dashboard.jpg",
        "/logo/conectaq-comunidade.jpg"
      ]
    }
  ];

  const handleExternalLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <section id="cases" className="py-20 bg-gradient-to-br from-slate-50 to-white">
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
              Cases de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Sucesso</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Soluções reais para empresas reais — automação, apps, sites e sistemas sob medida.
            </p>
          </motion.div>

          {/* Cases Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((caseItem) => (
              <motion.div
                key={caseItem.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Case Header */}
                <div className={`h-64 bg-gradient-to-r ${caseItem.color} relative overflow-hidden`}>
                  {caseItem.image ? (
                    <>
                      <img
                        src={caseItem.image}
                        alt={caseItem.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/10"></div>
                      {/* Fallback se imagem não carregar */}
                      <div className="hidden w-full h-full items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600">
                        <caseItem.icon className="w-24 h-24 text-white/50" />
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <caseItem.icon className="w-24 h-24 text-white/50" />
                    </div>
                  )}
                  <div className="absolute top-6 left-6">
                    <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
                      <caseItem.icon className="w-5 h-5 text-white" />
                      <span className="text-white font-semibold">{caseItem.category}</span>
                    </div>
                  </div>
                  <div className="absolute top-6 right-6">
                    <div className="flex items-center space-x-1 bg-yellow-400 rounded-full px-3 py-1">
                      <Star className="w-4 h-4 text-yellow-600 fill-current" />
                      <span className="text-yellow-800 font-bold text-sm">Destaque</span>
                    </div>
                  </div>
                </div>

                {/* Case Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {caseItem.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {caseItem.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Principais Funcionalidades:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {caseItem.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>


                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-3">
                    {caseItem.liveUrl && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleExternalLink(caseItem.liveUrl)}
                        className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Ver Online</span>
                      </motion.button>
                    )}
                    
                    {caseItem.pdfUrl && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleExternalLink(caseItem.pdfUrl)}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Ver Apresentação</span>
                      </motion.button>
                    )}
                    
                    {/* Botão Ver Detalhes apenas para PsiPro */}
                    {caseItem.id === 1 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCase(caseItem)}
                        className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center space-x-2"
                      >
                        <span>Ver Detalhes</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>

      {/* Modal para mostrar detalhes */}
      {selectedCase && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCase(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-2xl font-bold text-gray-900">{selectedCase.title}</h3>
              <button
                onClick={() => setSelectedCase(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6">
              {/* Screenshots */}
              {selectedCase.screenshots && selectedCase.screenshots.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Screenshots do Projeto:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCase.screenshots.map((screenshot, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="relative overflow-hidden rounded-lg shadow-lg"
                      >
                        <img
                          src={screenshot}
                          alt={`${selectedCase.title} - Screenshot ${index + 1}`}
                          className="w-full h-auto object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div 
                          className="hidden w-full h-48 bg-gray-200 items-center justify-center text-gray-500"
                        >
                          <span>Imagem não encontrada</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Descrição */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Sobre o Projeto:</h4>
                <p className="text-gray-600 leading-relaxed">{selectedCase.description}</p>
              </div>

              {/* Funcionalidades */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Principais Funcionalidades:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedCase.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                {selectedCase.liveUrl && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(selectedCase.liveUrl, '_blank')}
                    className="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Ver Online</span>
                  </motion.button>
                )}
                
                {selectedCase.pdfUrl && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(selectedCase.pdfUrl, '_blank')}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Ver Apresentação PDF</span>
                  </motion.button>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCase(null)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                >
                  Fechar
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Cases;
