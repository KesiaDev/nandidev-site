import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Mail, MessageCircle } from 'lucide-react';

const CTA = () => {
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

  const handleWhatsApp = () => {
    window.open('https://wa.me/54996246565?text=Olá! Gostaria de solicitar um orçamento para meu projeto.', '_blank');
  };

  const handleEmail = () => {
    window.open('mailto:nandikesiadevnandi@gmail.com?subject=Solicitação de Orçamento', '_blank');
  };


  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Main CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Pronto para tirar sua{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                ideia do papel?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Vamos transformar sua visão em uma solução digital incrível. 
              Entre em contato conosco e vamos começar seu projeto hoje mesmo!
            </p>

            {/* Main CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsApp}
              className="bg-gradient-to-r from-primary to-accent text-white font-bold py-6 px-12 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-3 mx-auto text-xl"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Solicitar Projeto Agora</span>
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>

          {/* Contact Options */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
            {/* WhatsApp */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">WhatsApp</h3>
              <p className="text-gray-300 mb-4">Resposta rápida e atendimento personalizado</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsApp}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Conversar Agora
              </motion.button>
            </motion.div>

            {/* Email */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">E-mail</h3>
              <p className="text-gray-300 mb-4">Envie-nos sua proposta detalhada</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEmail}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Enviar E-mail
              </motion.button>
            </motion.div>

          </motion.div>

          {/* Process Steps */}
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-12">
              Como funciona nosso processo
            </h3>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Consulta", description: "Conversamos sobre suas necessidades e objetivos" },
                { step: "02", title: "Proposta", description: "Criamos uma proposta personalizada para seu projeto" },
                { step: "03", title: "Desenvolvimento", description: "Desenvolvemos sua solução com qualidade e agilidade" },
                { step: "04", title: "Entrega", description: "Entregamos seu projeto pronto e funcionando perfeitamente" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">{item.step}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div 
            variants={itemVariants}
            className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Não perca mais tempo!
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Quanto antes começarmos, mais rápido você terá sua solução digital funcionando.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsApp}
              className="bg-gradient-to-r from-primary to-accent text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-2 mx-auto"
            >
              <span>Começar Agora</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;

