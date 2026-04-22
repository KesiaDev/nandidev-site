import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Bot, Database, MessageSquare, Workflow, GitBranch } from 'lucide-react';

const AICapabilities = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const capabilities = [
    {
      icon: Brain,
      title: 'Integração com LLMs',
      description: 'Integração com OpenAI e outras APIs de LLM para assistentes, copilotos e fluxos específicos do negócio.'
    },
    {
      icon: Bot,
      title: 'Sistemas Multi-Agente',
      description: 'Orquestração de agentes para tarefas complexas, fluxos multifuncionais e cadeias de execução autônoma.'
    },
    {
      icon: Database,
      title: 'Pipelines RAG',
      description: 'Geração aumentada por recuperação com bases de conhecimento, embeddings e respostas contextualizadas.'
    },
    {
      icon: MessageSquare,
      title: 'Aplicações de NLP',
      description: 'Classificação de texto, extração e interfaces conversacionais para operações, suporte e vendas.'
    },
    {
      icon: Workflow,
      title: 'Automação Inteligente',
      description: 'Automação de processos aprimorada com IA, integrando regras de negócio e suporte à decisão.'
    },
    {
      icon: GitBranch,
      title: 'Pipelines de Dados',
      description: 'Pipelines confiáveis que conectam sistemas, estruturam informações e potencializam decisões baseadas em dados.'
    }
  ];

  return (
    <section id="ai-capabilities" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="space-y-14"
        >
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Capacidades de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">IA</span>
            </h2>
            <p className="text-lg text-slate-600">
              Capacidades técnicas que usamos para projetar sistemas inteligentes prontos para produção em operações reais de negócio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AICapabilities;
