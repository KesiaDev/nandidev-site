const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Permitir requisições sem origin (mobile apps, Postman, etc)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'https://www.nandidev.com.br',
      'https://nandidev.com.br',
      process.env.FRONTEND_URL
    ].filter(Boolean);
    
    // Permitir qualquer origem em desenvolvimento ou se não houver restrições
    if (process.env.NODE_ENV !== 'production' || allowedOrigins.length === 0) {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Log para debug
      console.log('CORS bloqueado para origem:', origin);
      callback(null, true); // Permitir temporariamente para debug
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Garantir que a pasta de dados existe
const dataDir = path.join(__dirname, 'data');
const leadsFile = path.join(dataDir, 'leads.json');
const appointmentsFile = path.join(dataDir, 'appointments.json');
const diagnosticsFile = path.join(dataDir, 'diagnostics.json');
const proposalsFile = path.join(dataDir, 'proposals.json');

async function ensureDataDir() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    const files = [leadsFile, appointmentsFile, diagnosticsFile, proposalsFile];
    for (const file of files) {
      try {
        await fs.access(file);
      } catch {
        await fs.writeFile(file, JSON.stringify([], null, 2));
      }
    }
  } catch (error) {
    console.error('Erro ao criar diretório de dados:', error);
  }
}

// Prompt do sistema para o chatbot
const systemPrompt = `Você é um Assistente Comercial Inteligente (SDR) da NandiDev, uma empresa de desenvolvimento web e mobile em Caxias do Sul - RS.

🎯 SUA MISSÃO:
Descobrir quem é o cliente e qual problema ele quer resolver em poucos minutos, qualificar, coletar dados importantes, mapear dores e direcionar para a solução ideal.

🧠 TOM DE VOZ:
- Profissional, amigável e claro
- Nada de respostas longas demais
- Sempre faça perguntas inteligentes para aprofundar a necessidade
- Responda com clareza, objetividade, empatia e linguagem simples

⚙️ FLUXO BASE DO SUPER SDR:

1. ENTRADA - Cumprimente e inicie diagnóstico:
"Olá! 👋 Sou o assistente inteligente da NandiDev.
Para te ajudar da melhor forma, posso entender qual tipo de solução você está buscando hoje?"

2. LISTE OS CAMINHOS (se necessário):
- Desenvolvimento de aplicativo
- Desenvolvimento de site
- Consultoria ou diagnóstico
- App personalizado para empresas
- Solução para órgãos públicos / prefeituras
- Projetos especiais

3. PERGUNTAS DE DIAGNÓSTICO OBRIGATÓRIAS (faça de forma natural, uma de cada vez):
- "Qual é o objetivo principal desse projeto?"
- "Quem vai usar esse sistema/app/site?"
- "Quais problemas você deseja resolver com essa solução?"
- "O projeto já está em qual estágio? (ideia inicial / algo já estruturado / reestruturação)"
- "Qual é a sua urgência para começar?"
- "Você já possui um orçamento aproximado para o projeto? (não precisa ser exato, apenas uma faixa)"
- "Tem alguma referência que gostaria de seguir?"
- "Qual é o nome da sua empresa e seu segmento?"
- "Me informe seu WhatsApp para envio da proposta completa."

4. SE O CLIENTE ESTIVER PERDIDO:
"Sem problemas! Vou te ajudar.
Com base no que você me disse, o que você quer alcançar é _______.
Para isso, o melhor caminho seria ________.
Posso te fazer algumas perguntas rápidas para definir a solução perfeita?"

5. VALIDAÇÃO DE FIT (classifique mentalmente, mas nunca diga ao cliente):
- FIT A: projeto claro, orçamento, urgência → Direcionar para proposta/agendamento
- FIT B: dúvida sobre escopo, mas com intenção real → Fazer mais perguntas e depois proposta
- FIT C: só curiosidade → Informar sobre serviços e manter contato

6. FECHAMENTO E CTA FINAL (sempre encaminhe para uma ação):
- "Perfeito! Com essas informações, já consigo montar sua proposta. Me envie seu WhatsApp e e-mail para te enviar tudo organizado."
- "Posso agendar uma conversa rápida com a Kesia para você entender os próximos passos. Qual horário é melhor para você?"
- "Vou gerar um diagnóstico completo e uma proposta personalizada. Me confirme seu WhatsApp para enviar."

7. REGRAS IMPORTANTES:
- Nunca responda apenas com "ok" - sempre conduza com novas perguntas
- Se o cliente pedir valores genéricos, responda com faixas iniciais e peça escopo detalhado
- Identifique empresas e projetos complexos rapidamente e ofereça reunião
- Sempre resuma antes de enviar proposta: "Confirmando: você precisa de ______ com foco em ______. Correto?"

FORMATO DE RESPOSTA JSON (quando identificar informações):
{
  "needsLeadInfo": true/false,
  "needsDiagnostic": true/false,
  "needsProposal": true/false,
  "needsAppointment": true/false,
  "leadData": {
    "name": "nome se mencionado",
    "phone": "telefone se mencionado",
    "email": "email se mencionado",
    "company": "empresa se mencionado",
    "segment": "segmento identificado",
    "businessType": "tipo de negócio",
    "needs": ["lista de necessidades: app, site, consultoria, etc"],
    "objectives": "objetivo principal do projeto",
    "users": "quem vai usar",
    "problems": "problemas que quer resolver",
    "stage": "estágio: ideia inicial / estruturado / reestruturação",
    "urgency": "urgência",
    "budget": "orçamento aproximado",
    "references": "referências mencionadas",
    "challenges": "desafios mencionados"
  }
}

Seja proativo, faça perguntas estratégicas uma de cada vez e guie o cliente até uma ação concreta (proposta, agendamento ou contato direto).`;

// Função para chamar API de IA (OpenAI ou alternativa)
async function getAIResponse(message, conversationHistory, leadData) {
  try {
    // Se tiver OpenAI API Key, usar OpenAI
    if (process.env.OPENAI_API_KEY) {
      const OpenAI = require('openai');
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });

      const messages = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory.slice(-10), // Últimas 10 mensagens para contexto
        { role: 'user', content: message }
      ];

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini', // ou 'gpt-3.5-turbo' para economia
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      });

      let response = completion.choices[0].message.content;
      
      // Tentar extrair JSON da resposta se houver
      let parsedData = { needsLeadInfo: false, leadData: {} };
      try {
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedData = JSON.parse(jsonMatch[0]);
          // Remover JSON da resposta de texto
          response = response.replace(/\{[\s\S]*\}/, '').trim();
        }
      } catch (e) {
        // Se não conseguir parsear JSON, continuar com resposta normal
      }

      return {
        response: response || "Desculpe, não consegui processar sua mensagem.",
        leadData: parsedData.leadData || {},
        needsLeadInfo: parsedData.needsLeadInfo || false
      };
    } else {
      // Resposta padrão sem IA (fallback)
      return getDefaultResponse(message, leadData);
    }
  } catch (error) {
    console.error('Erro ao chamar API de IA:', error);
    return getDefaultResponse(message, leadData);
  }
}

// Resposta padrão quando não há API de IA configurada
function getDefaultResponse(message, leadData) {
  const lowerMessage = message.toLowerCase();
  
  // Detectar intenções básicas
  if (lowerMessage.includes('olá') || lowerMessage.includes('oi') || lowerMessage.includes('bom dia') || lowerMessage.includes('boa tarde')) {
    return {
      response: "Olá! Fico feliz em ajudar. Você está procurando por desenvolvimento de site, aplicativo ou sistema?",
      leadData: {},
      needsLeadInfo: false
    };
  }

  if (lowerMessage.includes('site') || lowerMessage.includes('website') || lowerMessage.includes('página')) {
    return {
      response: "Ótimo! Desenvolvemos sites profissionais, institucionais e e-commerce. Qual é o segmento do seu negócio? (ex: clínica, loja, empresa, startup)",
      leadData: { needs: ['Site'] },
      needsLeadInfo: false
    };
  }

  if (lowerMessage.includes('app') || lowerMessage.includes('aplicativo') || lowerMessage.includes('mobile')) {
    return {
      response: "Perfeito! Criamos aplicativos para Android e iOS. Qual é a finalidade do app? (ex: gestão de pacientes, e-commerce, delivery)",
      leadData: { needs: ['Aplicativo'] },
      needsLeadInfo: false
    };
  }

  if (lowerMessage.includes('sistema') || lowerMessage.includes('software') || lowerMessage.includes('gestão')) {
    return {
      response: "Excelente! Desenvolvemos sistemas web personalizados. Que tipo de sistema você precisa? (ex: CRM, gestão comercial, controle financeiro)",
      leadData: { needs: ['Sistema'] },
      needsLeadInfo: false
    };
  }

  if (lowerMessage.includes('preço') || lowerMessage.includes('quanto') || lowerMessage.includes('orçamento') || lowerMessage.includes('valor')) {
    return {
      response: "Os valores variam conforme a complexidade do projeto. Para te passar um orçamento preciso, preciso saber mais sobre seu projeto. Qual seu nome e telefone para entrarmos em contato?",
      leadData: {},
      needsLeadInfo: true
    };
  }

  if (lowerMessage.includes('prazo') || lowerMessage.includes('tempo') || lowerMessage.includes('quando')) {
    return {
      response: "Os prazos dependem da complexidade, mas geralmente entregamos sites em 7-15 dias e aplicativos em 30-60 dias. Qual é a urgência do seu projeto?",
      leadData: {},
      needsLeadInfo: false
    };
  }

  // Detectar informações do lead
  const phoneMatch = message.match(/(\+?55\s?)?(\d{2}\s?)?(\d{4,5}[-.\s]?\d{4})/);
  const emailMatch = message.match(/[\w\.-]+@[\w\.-]+\.\w+/);
  
  let detectedLeadData = { ...leadData };
  
  if (phoneMatch) {
    detectedLeadData.phone = phoneMatch[0].replace(/\s/g, '');
  }
  
  if (emailMatch) {
    detectedLeadData.email = emailMatch[0];
  }

  // Detectar nome (palavras que começam com maiúscula e não são palavras comuns)
  const words = message.split(' ');
  const possibleName = words.find(w => w.length > 2 && w[0] === w[0].toUpperCase() && !['Olá', 'Oi', 'Bom', 'Boa', 'Preciso', 'Quero', 'Gostaria'].includes(w));
  if (possibleName && !detectedLeadData.name) {
    detectedLeadData.name = possibleName;
  }

  return {
    response: "Entendi! Para te ajudar melhor, você poderia me informar:\n\n1. Seu nome\n2. Telefone/WhatsApp\n3. Tipo de projeto que precisa\n4. Prazo desejado\n\nAssim posso preparar uma proposta personalizada!",
    leadData: detectedLeadData,
    needsLeadInfo: Object.keys(detectedLeadData).length > 0 && detectedLeadData.needs?.length > 0
  };
}

// Função para gerar diagnóstico automático
async function generateDiagnostic(leadData) {
  const needs = leadData.needs || [];
  const segment = leadData.segment || leadData.businessType || 'Não especificado';
  const objectives = leadData.objectives || 'Não informado';
  const challenges = leadData.challenges || 'Não informado';
  const currentSystem = leadData.currentSystem || 'Não possui';
  const users = leadData.users || 'Não informado';
  const budget = leadData.budget || 'Não informado';
  const timeline = leadData.timeline || 'Não informado';

  // Análise do negócio
  let businessAnalysis = '';
  if (segment.toLowerCase().includes('clínica') || segment.toLowerCase().includes('médico') || segment.toLowerCase().includes('saúde')) {
    businessAnalysis = 'Negócio do setor de saúde. Recomendamos soluções com foco em privacidade de dados (LGPD), agendamento online e gestão de pacientes.';
  } else if (segment.toLowerCase().includes('e-commerce') || segment.toLowerCase().includes('loja') || segment.toLowerCase().includes('venda')) {
    businessAnalysis = 'Negócio de vendas online. Recomendamos plataforma de e-commerce completa com gestão de estoque, pagamentos e logística.';
  } else if (segment.toLowerCase().includes('startup') || segment.toLowerCase().includes('tech')) {
    businessAnalysis = 'Negócio tecnológico/startup. Recomendamos soluções escaláveis e modernas, com foco em performance e experiência do usuário.';
  } else {
    businessAnalysis = `Negócio do segmento ${segment}. Análise personalizada baseada nas necessidades específicas do cliente.`;
  }

  // Recomendações técnicas
  const recommendations = [];
  if (needs.includes('Site') || needs.includes('Website')) {
    recommendations.push({
      item: 'Site Profissional',
      description: 'Desenvolvimento de site responsivo, otimizado para SEO e com design moderno',
      priority: 'Alta'
    });
  }
  if (needs.includes('E-commerce') || needs.includes('Loja')) {
    recommendations.push({
      item: 'E-commerce Completo',
      description: 'Plataforma de vendas online com gestão de produtos, carrinho, checkout e integração com gateways de pagamento',
      priority: 'Alta'
    });
  }
  if (needs.includes('Aplicativo') || needs.includes('App') || needs.includes('Mobile')) {
    recommendations.push({
      item: 'Aplicativo Mobile',
      description: 'App nativo para Android e iOS com funcionalidades específicas do negócio',
      priority: 'Alta'
    });
  }
  if (needs.includes('Sistema') || needs.includes('Gestão')) {
    recommendations.push({
      item: 'Sistema de Gestão',
      description: 'Sistema web personalizado para gestão de processos, clientes e operações',
      priority: 'Alta'
    });
  }

  // Pontos de atenção
  const attentionPoints = [];
  if (currentSystem === 'Não possui') {
    attentionPoints.push('Cliente não possui sistema atual - oportunidade de implementação completa');
  }
  if (budget === 'Não informado' || !budget) {
    attentionPoints.push('Orçamento não informado - necessário alinhar expectativas');
  }
  if (timeline === 'Não informado' || !timeline) {
    attentionPoints.push('Prazo não informado - necessário definir cronograma');
  }

  const diagnostic = {
    id: Date.now(),
    leadId: leadData.id || Date.now(),
    createdAt: new Date().toISOString(),
    businessInfo: {
      segment: segment,
      businessType: leadData.businessType || segment,
      company: leadData.company || 'Não informado',
      users: users
    },
    needs: needs,
    objectives: objectives,
    currentSituation: {
      hasSystem: currentSystem !== 'Não possui',
      currentSystem: currentSystem,
      challenges: challenges
    },
    businessAnalysis: businessAnalysis,
    recommendations: recommendations,
    attentionPoints: attentionPoints,
    budget: budget,
    timeline: timeline,
    nextSteps: [
      'Revisar diagnóstico com cliente',
      'Gerar proposta comercial detalhada',
      'Agendar reunião de apresentação',
      'Definir cronograma de desenvolvimento'
    ]
  };

  return diagnostic;
}

// Função para gerar proposta automática
async function generateProposal(diagnostic, leadData) {
  const needs = diagnostic.needs || [];
  let basePrice = 0;
  let items = [];
  let totalPrice = 0;

  // Calcular preços baseado nas necessidades
  if (needs.includes('Site') || needs.includes('Website')) {
    const sitePrice = 2500;
    basePrice += sitePrice;
    items.push({
      description: 'Site Profissional Responsivo',
      includes: [
        'Design moderno e personalizado',
        'Layout responsivo (mobile, tablet, desktop)',
        'Otimização SEO',
        'Formulário de contato',
        'Integração com redes sociais',
        'Painel administrativo',
        'Hospedagem e domínio (1º ano)'
      ],
      price: sitePrice,
      delivery: '15-20 dias úteis'
    });
  }

  if (needs.includes('E-commerce') || needs.includes('Loja')) {
    const ecommercePrice = 5000;
    basePrice += ecommercePrice;
    items.push({
      description: 'E-commerce Completo',
      includes: [
        'Catálogo de produtos ilimitado',
        'Carrinho de compras',
        'Checkout seguro',
        'Integração com gateways de pagamento',
        'Gestão de estoque',
        'Painel administrativo completo',
        'Relatórios de vendas',
        'Hospedagem e domínio (1º ano)'
      ],
      price: ecommercePrice,
      delivery: '30-45 dias úteis'
    });
  }

  if (needs.includes('Aplicativo') || needs.includes('App') || needs.includes('Mobile')) {
    const appPrice = 8000;
    basePrice += appPrice;
    items.push({
      description: 'Aplicativo Mobile (Android + iOS)',
      includes: [
        'App nativo para Android e iOS',
        'Design moderno e intuitivo',
        'Notificações push',
        'Integração com APIs',
        'Publicação nas lojas (Google Play + App Store)',
        'Manutenção (3 meses)'
      ],
      price: appPrice,
      delivery: '60-90 dias úteis'
    });
  }

  if (needs.includes('Sistema') || needs.includes('Gestão')) {
    const systemPrice = 6000;
    basePrice += systemPrice;
    items.push({
      description: 'Sistema Web Personalizado',
      includes: [
        'Desenvolvimento sob medida',
        'Módulos conforme necessidade',
        'Painel administrativo',
        'Relatórios e dashboards',
        'Integração com APIs externas',
        'Hospedagem e domínio (1º ano)',
        'Treinamento da equipe'
      ],
      price: systemPrice,
      delivery: '45-60 dias úteis'
    });
  }

  // Se não tiver nenhum item, criar proposta básica
  if (items.length === 0) {
    items.push({
      description: 'Solução Personalizada',
      includes: [
        'Análise de necessidades',
        'Desenvolvimento sob medida',
        'Suporte e manutenção'
      ],
      price: 3000,
      delivery: 'A definir'
    });
    basePrice = 3000;
  }

  totalPrice = basePrice;

  // Desconto para múltiplos serviços
  if (items.length > 1) {
    const discount = Math.round(totalPrice * 0.15); // 15% de desconto
    totalPrice = totalPrice - discount;
    items.push({
      description: 'Desconto por múltiplos serviços',
      includes: [],
      price: -discount,
      delivery: '-'
    });
  }

  const proposal = {
    id: Date.now(),
    diagnosticId: diagnostic.id,
    leadId: leadData.id || diagnostic.leadId,
    createdAt: new Date().toISOString(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 dias
    client: {
      name: leadData.name || 'Cliente',
      company: leadData.company || 'Não informado',
      email: leadData.email || '',
      phone: leadData.phone || ''
    },
    items: items,
    subtotal: basePrice,
    discount: items.length > 1 ? Math.round(basePrice * 0.15) : 0,
    total: totalPrice,
    paymentTerms: [
      '50% no início do projeto',
      '25% na aprovação do design/protótipo',
      '25% na entrega final'
    ],
    delivery: diagnostic.timeline || 'A definir',
    warranty: '3 meses de garantia e suporte',
    notes: 'Proposta gerada automaticamente. Valores podem ser ajustados conforme especificações detalhadas do projeto.'
  };

  return proposal;
}

// Função para verificar horários disponíveis
function getAvailableSlots(date) {
  const slots = [];
  const startHour = 9; // 9h
  const endHour = 18; // 18h
  
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      available: true
    });
    if (hour < endHour - 1) {
      slots.push({
        time: `${hour.toString().padStart(2, '0')}:30`,
        available: true
      });
    }
  }
  
  return slots;
}

// Rota raiz para verificar se está funcionando
app.get('/', (req, res) => {
  res.json({ 
    status: 'online',
    message: 'Backend do Chatbot Nandi Dev está funcionando!',
    endpoints: {
      chat: 'POST /api/chat',
      leads: 'GET /api/leads',
      stats: 'GET /api/stats',
      diagnostic: 'POST /api/diagnostic',
      proposal: 'POST /api/proposal',
      appointments: 'GET /api/appointments'
    }
  });
});

// Rota para chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory, leadData } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Mensagem é obrigatória' });
    }

    const aiResponse = await getAIResponse(message, conversationHistory || [], leadData || {});
    
    res.json(aiResponse);
  } catch (error) {
    console.error('Erro no endpoint /api/chat:', error);
    res.status(500).json({ error: 'Erro ao processar mensagem' });
  }
});

// Rota para salvar leads
app.post('/api/leads', async (req, res) => {
  try {
    await ensureDataDir();
    
    const lead = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };

    let leads = [];
    try {
      const data = await fs.readFile(leadsFile, 'utf8');
      leads = JSON.parse(data);
    } catch {
      leads = [];
    }

    leads.push(lead);
    await fs.writeFile(leadsFile, JSON.stringify(leads, null, 2));

    res.json({ success: true, lead });
  } catch (error) {
    console.error('Erro ao salvar lead:', error);
    res.status(500).json({ error: 'Erro ao salvar lead' });
  }
});

// Rota para listar leads (dashboard)
app.get('/api/leads', async (req, res) => {
  try {
    await ensureDataDir();
    
    let leads = [];
    try {
      const data = await fs.readFile(leadsFile, 'utf8');
      leads = JSON.parse(data);
    } catch {
      leads = [];
    }

    // Ordenar por data (mais recentes primeiro)
    leads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(leads);
  } catch (error) {
    console.error('Erro ao listar leads:', error);
    res.status(500).json({ error: 'Erro ao listar leads' });
  }
});

// Rota para obter estatísticas
app.get('/api/stats', async (req, res) => {
  try {
    await ensureDataDir();
    
    let leads = [];
    try {
      const data = await fs.readFile(leadsFile, 'utf8');
      leads = JSON.parse(data);
    } catch {
      leads = [];
    }

    const stats = {
      total: leads.length,
      today: leads.filter(l => {
        const leadDate = new Date(l.createdAt);
        const today = new Date();
        return leadDate.toDateString() === today.toDateString();
      }).length,
      thisWeek: leads.filter(l => {
        const leadDate = new Date(l.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return leadDate >= weekAgo;
      }).length,
      segments: {},
      needs: {}
    };

    leads.forEach(lead => {
      if (lead.segment) {
        stats.segments[lead.segment] = (stats.segments[lead.segment] || 0) + 1;
      }
      if (lead.needs && Array.isArray(lead.needs)) {
        lead.needs.forEach(need => {
          stats.needs[need] = (stats.needs[need] || 0) + 1;
        });
      }
    });

    res.json(stats);
  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    res.status(500).json({ error: 'Erro ao obter estatísticas' });
  }
});

// Rota para gerar diagnóstico
app.post('/api/diagnostic', async (req, res) => {
  try {
    await ensureDataDir();
    const { leadData } = req.body;

    if (!leadData) {
      return res.status(400).json({ error: 'Dados do lead são obrigatórios' });
    }

    const diagnostic = await generateDiagnostic(leadData);

    // Salvar diagnóstico
    let diagnostics = [];
    try {
      const data = await fs.readFile(diagnosticsFile, 'utf8');
      diagnostics = JSON.parse(data);
    } catch {
      diagnostics = [];
    }

    diagnostics.push(diagnostic);
    await fs.writeFile(diagnosticsFile, JSON.stringify(diagnostics, null, 2));

    res.json({ success: true, diagnostic });
  } catch (error) {
    console.error('Erro ao gerar diagnóstico:', error);
    res.status(500).json({ error: 'Erro ao gerar diagnóstico' });
  }
});

// Rota para gerar proposta
app.post('/api/proposal', async (req, res) => {
  try {
    await ensureDataDir();
    const { diagnostic, leadData } = req.body;

    if (!diagnostic || !leadData) {
      return res.status(400).json({ error: 'Diagnóstico e dados do lead são obrigatórios' });
    }

    const proposal = await generateProposal(diagnostic, leadData);

    // Salvar proposta
    let proposals = [];
    try {
      const data = await fs.readFile(proposalsFile, 'utf8');
      proposals = JSON.parse(data);
    } catch {
      proposals = [];
    }

    proposals.push(proposal);
    await fs.writeFile(proposalsFile, JSON.stringify(proposals, null, 2));

    res.json({ success: true, proposal });
  } catch (error) {
    console.error('Erro ao gerar proposta:', error);
    res.status(500).json({ error: 'Erro ao gerar proposta' });
  }
});

// Rota para obter horários disponíveis
app.get('/api/appointments/available', async (req, res) => {
  try {
    const { date } = req.query;
    const targetDate = date ? new Date(date) : new Date();
    
    const slots = getAvailableSlots(targetDate);
    
    // Verificar agendamentos existentes
    let appointments = [];
    try {
      const data = await fs.readFile(appointmentsFile, 'utf8');
      appointments = JSON.parse(data);
    } catch {
      appointments = [];
    }

    // Marcar horários ocupados
    const dateStr = targetDate.toISOString().split('T')[0];
    const dayAppointments = appointments.filter(apt => {
      const aptDate = new Date(apt.dateTime).toISOString().split('T')[0];
      return aptDate === dateStr;
    });

    slots.forEach(slot => {
      const slotTime = `${dateStr}T${slot.time}:00`;
      const isOccupied = dayAppointments.some(apt => {
        const aptTime = new Date(apt.dateTime).toTimeString().substring(0, 5);
        return aptTime === slot.time;
      });
      if (isOccupied) {
        slot.available = false;
      }
    });

    res.json({ date: dateStr, slots });
  } catch (error) {
    console.error('Erro ao obter horários:', error);
    res.status(500).json({ error: 'Erro ao obter horários disponíveis' });
  }
});

// Rota para criar agendamento
app.post('/api/appointments', async (req, res) => {
  try {
    await ensureDataDir();
    const { leadData, dateTime, type = 'video' } = req.body;

    if (!leadData || !dateTime) {
      return res.status(400).json({ error: 'Dados do lead e data/hora são obrigatórios' });
    }

    const appointment = {
      id: Date.now(),
      leadId: leadData.id || Date.now(),
      clientName: leadData.name || 'Cliente',
      clientPhone: leadData.phone || '',
      clientEmail: leadData.email || '',
      company: leadData.company || '',
      dateTime: new Date(dateTime).toISOString(),
      type: type, // 'video', 'presencial', 'phone'
      status: 'scheduled', // 'scheduled', 'completed', 'cancelled'
      createdAt: new Date().toISOString(),
      meetingLink: type === 'video' ? `https://meet.google.com/${Math.random().toString(36).substring(7)}` : null
    };

    // Salvar agendamento
    let appointments = [];
    try {
      const data = await fs.readFile(appointmentsFile, 'utf8');
      appointments = JSON.parse(data);
    } catch {
      appointments = [];
    }

    appointments.push(appointment);
    await fs.writeFile(appointmentsFile, JSON.stringify(appointments, null, 2));

    res.json({ success: true, appointment });
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    res.status(500).json({ error: 'Erro ao criar agendamento' });
  }
});

// Rota para listar agendamentos
app.get('/api/appointments', async (req, res) => {
  try {
    await ensureDataDir();
    
    let appointments = [];
    try {
      const data = await fs.readFile(appointmentsFile, 'utf8');
      appointments = JSON.parse(data);
    } catch {
      appointments = [];
    }

    // Ordenar por data
    appointments.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

    res.json(appointments);
  } catch (error) {
    console.error('Erro ao listar agendamentos:', error);
    res.status(500).json({ error: 'Erro ao listar agendamentos' });
  }
});

// Rota para obter diagnóstico por leadId
app.get('/api/diagnostic/:leadId', async (req, res) => {
  try {
    await ensureDataDir();
    const { leadId } = req.params;

    let diagnostics = [];
    try {
      const data = await fs.readFile(diagnosticsFile, 'utf8');
      diagnostics = JSON.parse(data);
    } catch {
      diagnostics = [];
    }

    const diagnostic = diagnostics.find(d => d.leadId === parseInt(leadId));
    
    if (!diagnostic) {
      return res.status(404).json({ error: 'Diagnóstico não encontrado' });
    }

    res.json(diagnostic);
  } catch (error) {
    console.error('Erro ao obter diagnóstico:', error);
    res.status(500).json({ error: 'Erro ao obter diagnóstico' });
  }
});

// Rota para obter proposta por leadId
app.get('/api/proposal/:leadId', async (req, res) => {
  try {
    await ensureDataDir();
    const { leadId } = req.params;

    let proposals = [];
    try {
      const data = await fs.readFile(proposalsFile, 'utf8');
      proposals = JSON.parse(data);
    } catch {
      proposals = [];
    }

    const proposal = proposals.find(p => p.leadId === parseInt(leadId));
    
    if (!proposal) {
      return res.status(404).json({ error: 'Proposta não encontrada' });
    }

    res.json(proposal);
  } catch (error) {
    console.error('Erro ao obter proposta:', error);
    res.status(500).json({ error: 'Erro ao obter proposta' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 API disponível em http://localhost:${PORT}/api`);
  if (!process.env.OPENAI_API_KEY) {
    console.log('⚠️  OPENAI_API_KEY não configurada. Usando respostas padrão.');
  }
});

