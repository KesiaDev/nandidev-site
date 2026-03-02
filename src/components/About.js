import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, Sparkles, Users, Zap } from 'lucide-react';

const About = () => {
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

  const highlights = [
    {
      icon: Briefcase,
      title: "Gestão Comercial",
      desc: "Coordenação e gerência comercial em players nacionais. Experiência e prática para dominar processos, entender as dores e as estratégias."
    },
    {
      icon: GraduationCap,
      title: "Formação em Tech",
      desc: "Bacharelado em Engenharia de Software + cursos em IA e engenharia de prompts."
    },
    {
      icon: Users,
      title: "Perfil Comportamental",
      desc: "Especialização pela plataforma Sólides para potencializar talentos e reduzir turnover."
    },
    {
      icon: Zap,
      title: "Diferencial",
      desc: "Tecnologia sob medida + capacitação de times. Não adianta comprar ferramenta sem letramento digital."
    }
  ];

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Quem está por trás da <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">NandiDev</span>
            </h2>
            <p className="text-lg text-slate-600">
              A Inteligência por trás da IA
            </p>
          </motion.div>

          {/* Main content - Photo + Story */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-2xl blur-xl" />
                <img
                  src="/logo/kesia-nandi-about.png"
                  alt="Késia Nandi"
                  className="relative w-full max-w-sm rounded-2xl shadow-xl object-cover aspect-[3/4] object-center"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-2 text-amber-600">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Trajetória</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Mais de uma década em coordenação e gerência comercial em players como Magazine Luiza e Cielo. 
                Especialização em Perfil Comportamental para recrutamento e seleção pois nada melhor do que 
                conhecer pessoas para potencializar talentos e reduzir custos com turnover.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Késia entendeu que o futuro passa pela tecnologia: cursou Engenharia de Software e se aprofundou 
                em IA e prompts. Desde 2023 atua em empresas de tech que operam sistemas de gestão para 
                empresas nacionais e em startups de retail e SDR automatizado.
              </p>
              <p className="text-slate-600 leading-relaxed">
                A partir de 2025 empreendeu com a NandiDev, desenvolvendo soluções sob medida e atuando como 
                consultora e mentora para capacitar times a usar IA no dia a dia. O foco: virada de chave na 
                cultura organizacional de pequenas e médias empresas. Menos trabalho operacional e mais 
                produtividade para alavancar negócios.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToContact}
                className="btn-primary"
              >
                Falar com a Késia
              </motion.button>
            </motion.div>
          </div>

          {/* Highlights grid */}
          <motion.div variants={itemVariants} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                  <h.icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{h.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
