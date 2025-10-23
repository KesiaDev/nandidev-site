import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Globe, 
  ShoppingCart, 
  Smartphone, 
  Settings, 
  Wrench,
  ArrowRight,
  CheckCircle,
  Palette,
  Cloud
} from 'lucide-react';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  const services = [
    {
      icon: Globe,
      title: "Desenvolvimento de Sites Profissionais",
      description: "Criamos sites modernos, responsivos e otimizados para conversão, utilizando as melhores práticas de UX/UI e SEO.",
      features: [
        "Design responsivo",
        "Otimização SEO",
        "Performance otimizada",
        "Integração com redes sociais"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: ShoppingCart,
      title: "Lojas Virtuais e Sistemas de Pagamento",
      description: "Desenvolvemos lojas virtuais completas com sistema de pagamento, gestão de estoque e painel administrativo.",
      features: [
        "Sistema de pagamento",
        "Gestão de estoque",
        "Painel administrativo",
        "Relatórios de vendas"
      ],
      color: "from-green-500 to-green-600"
    },
    {
      icon: Smartphone,
      title: "Aplicativos",
      description: "Desenvolvemos aplicativos nativos e híbridos para Android e iOS, com foco na experiência do usuário.",
      features: [
        "Apps nativos e híbridos",
        "Interface intuitiva",
        "Notificações push",
        "Integração com APIs"
      ],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Settings,
      title: "Sistemas Web e Dashboards",
      description: "Criamos sistemas web sob medida e dashboards interativos para atender às necessidades específicas do seu negócio.",
      features: [
        "Desenvolvimento sob medida",
        "Dashboards interativos",
        "Segurança avançada",
        "Escalabilidade"
      ],
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Palette,
      title: "Design UI/UX e Identidade Visual",
      description: "Criamos identidades visuais completas e interfaces de usuário que encantam e convertem.",
      features: [
        "Identidade visual completa",
        "Design de interfaces",
        "Prototipagem interativa",
        "Testes de usabilidade"
      ],
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: Cloud,
      title: "Hospedagem e Manutenção",
      description: "Oferecemos serviços de hospedagem, manutenção, atualizações e otimização para manter seu projeto sempre atualizado.",
      features: [
        "Hospedagem segura",
        "Manutenção preventiva",
        "Atualizações de segurança",
        "Suporte técnico 24/7"
      ],
      color: "from-cyan-500 to-cyan-600"
    }
  ];

  const handleWhatsApp = () => {
    window.open('https://wa.me/54996246565?text=Olá! Gostaria de saber mais sobre os serviços da Nandi Dev.', '_blank');
  };

  return (
    <section id="services" className="py-20 bg-white">
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
              Nossos <span className="text-gradient">Serviços</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Oferecemos soluções completas em desenvolvimento web e mobile, 
              desde a concepção até a entrega e manutenção.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Service Header */}
                <div className={`h-32 bg-gradient-to-r ${service.color} flex items-center justify-center`}>
                  <service.icon className="w-12 h-12 text-white" />
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWhatsApp}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Saiba Mais</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 md:p-12 text-center text-white"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para começar seu projeto?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Entre em contato conosco e vamos transformar sua ideia em realidade.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsApp}
              className="bg-white text-primary font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
            >
              <span>Solicitar Orçamento</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
