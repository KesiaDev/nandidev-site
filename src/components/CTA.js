import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Mail, MessageCircle } from 'lucide-react';
import AuroraBackground from './effects/AuroraBackground';

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
    window.open('https://wa.me/5554996246565?text=Olá! Gostaria de uma apresentação comercial da NandiDev.', '_blank');
  };

  const handleEmail = () => {
    window.open('mailto:ianandidev@gmail.com?subject=Solicitação de Orçamento', '_blank');
  };


  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated aurora background */}
      <AuroraBackground variant="cta" />

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
              Pronto para construir{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400">
                seu sistema de IA?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Agende uma conversa estratégica para mapear oportunidades de alto impacto com LLMs, automação inteligente e arquitetura de sistemas orientada a dados.
            </p>

            {/* Main CTA Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWhatsApp}
              className="gradient-border bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 text-white font-bold py-6 px-12 rounded-2xl shadow-xl shadow-blue-500/25 hover:from-violet-500 hover:via-blue-500 hover:to-cyan-400 transition-all flex items-center space-x-3 mx-auto text-xl"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Agendar Apresentação</span>
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
              <p className="text-gray-300 mb-4">Resposta rápida para tirar dúvidas e descobrir a solução certa para o seu negócio</p>
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
              <p className="text-gray-300 mb-4">Envie o contexto do seu negócio e os requisitos do projeto por e-mail</p>
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
              Como executamos
            </h3>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Diagnóstico", description: "Mapeamos objetivos, restrições e oportunidades de IA no seu negócio" },
                { step: "02", title: "Arquitetura", description: "Definimos a arquitetura de LLM, agentes e dados para o seu caso de uso" },
                { step: "03", title: "Construção", description: "Implementamos e integramos fluxos inteligentes prontos para produção" },
                { step: "04", title: "Escala", description: "Medimos impacto, otimizamos performance e expandimos a adoção" }
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
              Da ideia à execução inteligente
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Quanto antes começarmos, mais rápido o seu time opera com eficiência orientada por IA e melhores decisões.
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

