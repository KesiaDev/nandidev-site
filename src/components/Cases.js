import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Smartphone, Globe, Star, ArrowRight, X } from 'lucide-react';

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
    }
  ];

  const handleExternalLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
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
              Cases de <span className="text-gradient">Sucesso</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Projetos que transformaram negócios e geraram resultados excepcionais 
              para nossos clientes.
            </p>
          </motion.div>

          {/* Cases Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {cases.map((caseItem) => (
              <motion.div
                key={caseItem.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Case Header */}
                <div className={`h-64 bg-gradient-to-r ${caseItem.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <img
                    src={caseItem.image}
                    alt={caseItem.title}
                    className="w-full h-full object-cover"
                  />
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
                  <div className="flex space-x-4">
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
              <div className="flex space-x-4">
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
