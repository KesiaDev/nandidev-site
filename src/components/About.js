import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Target, Users, Award } from 'lucide-react';

const About = () => {
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

  const features = [
    {
      icon: Code2,
      title: "Tecnologia de Ponta",
      description: "Utilizamos as mais modernas tecnologias e frameworks para garantir performance e qualidade."
    },
    {
      icon: Target,
      title: "Foco em Resultados",
      description: "Cada projeto é desenvolvido com foco em atingir os objetivos do seu negócio."
    },
    {
      icon: Users,
      title: "Atendimento Personalizado",
      description: "Oferecemos suporte dedicado e acompanhamento durante todo o processo."
    },
    {
      icon: Award,
      title: "Qualidade Garantida",
      description: "Comprometimento com a excelência e entrega de soluções que superam expectativas."
    }
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-20 bg-gray-50">
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
              Sobre a <span className="text-gradient">Nandi Dev</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Somos uma empresa especializada em desenvolvimento web e mobile, 
              apaixonados por transformar ideias em soluções digitais inovadoras. 
              Nossa missão é ajudar empresas a crescer através da tecnologia.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                Experiência e Paixão por Tecnologia
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Com experiência no mercado, a Nandi Dev se destaca 
                pela qualidade dos projetos entregues e pelo relacionamento próximo 
                com nossos clientes. Acreditamos que cada projeto é único e merece 
                atenção especial.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Nossa equipe é formada por desenvolvedores apaixonados por tecnologia 
                e sempre em busca das melhores práticas e inovações do mercado. 
                Trabalhamos com metodologias ágeis para garantir entregas rápidas 
                e de alta qualidade.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="btn-primary"
              >
                Saiba Mais
              </motion.button>
            </motion.div>

            {/* Visual Element */}
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-primary to-accent rounded-2xl p-8 text-white">
                <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
                <div className="relative z-10">
                  <h4 className="text-2xl font-bold mb-4">Nossa Missão</h4>
                  <p className="text-lg leading-relaxed">
                    Democratizar o acesso à tecnologia de qualidade, 
                    oferecendo soluções digitais que impulsionam o 
                    crescimento dos nossos clientes. Somos capazes de 
                    criar qualquer coisa que o cliente imagine ou necessite, 
                    com prazos rápidos e excelência na entrega. 
                    Transformamos ideias em realidade em poucos dias.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
