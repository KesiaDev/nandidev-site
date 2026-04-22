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
      title: 'LLM Integration',
      description: 'OpenAI and API-based LLM integration for assistants, copilots and domain-specific workflows.'
    },
    {
      icon: Bot,
      title: 'Multi-Agent Systems',
      description: 'Agent orchestration for complex tasks, cross-functional workflows and autonomous execution chains.'
    },
    {
      icon: Database,
      title: 'RAG Pipelines',
      description: 'Retrieval-augmented generation with curated knowledge bases, embeddings and contextual responses.'
    },
    {
      icon: MessageSquare,
      title: 'NLP Applications',
      description: 'Text classification, extraction and conversational interfaces for operations, support and sales.'
    },
    {
      icon: Workflow,
      title: 'Intelligent Automation',
      description: 'AI-enhanced process automation integrating business rules, decision support and execution flows.'
    },
    {
      icon: GitBranch,
      title: 'Data Pipelines',
      description: 'Reliable data pipelines that connect systems, structure information and power decision intelligence.'
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
              AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Capabilities</span>
            </h2>
            <p className="text-lg text-slate-600">
              Core technical capabilities used to design production-ready intelligent systems for real business operations.
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
