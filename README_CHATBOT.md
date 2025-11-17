# 🤖 Chatbot com IA - Nandi Dev

Sistema completo de chatbot inteligente para captura automática de leads com integração de IA.

## 🚀 Funcionalidades

- ✅ Chatbot com IA (OpenAI GPT-4 ou respostas padrão)
- ✅ Captura automática de leads
- ✅ Identificação de segmento e necessidades do cliente
- ✅ Qualificação inteligente de leads
- ✅ Dashboard completo para visualizar leads
- ✅ Exportação de leads em CSV
- ✅ Integração com WhatsApp
- ✅ Interface moderna e responsiva

## 📋 Pré-requisitos

- Node.js 16+ instalado
- NPM ou Yarn
- (Opcional) Chave da API OpenAI para IA avançada

## 🛠️ Instalação

### 1. Instalar dependências do frontend
```bash
npm install
```

### 2. Instalar dependências do backend
```bash
cd server
npm install
cd ..
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na pasta `server/`:

```env
PORT=3001
OPENAI_API_KEY=sk-sua-chave-aqui
```

**Nota:** Se não configurar a `OPENAI_API_KEY`, o sistema usará respostas inteligentes padrão baseadas em palavras-chave.

### 4. Obter chave da OpenAI (Opcional)

1. Acesse: https://platform.openai.com/api-keys
2. Crie uma conta ou faça login
3. Gere uma nova chave de API
4. Cole no arquivo `.env`

## 🎯 Como Usar

### Desenvolvimento Local

#### Opção 1: Rodar separadamente (recomendado)

**Terminal 1 - Frontend:**
```bash
npm start
```

**Terminal 2 - Backend:**
```bash
cd server
npm start
```

#### Opção 2: Rodar tudo junto
```bash
npm install -g concurrently
npm run dev
```

### Acessar o Chatbot

- **Site:** http://localhost:3000
- **API Backend:** http://localhost:3001
- **Dashboard de Leads:** http://localhost:3000/dashboard (precisa configurar rota)

### Dashboard de Leads

Para acessar o dashboard, você pode:

1. **Criar uma rota no React Router** (recomendado)
2. **Ou acessar diretamente** importando o componente

## 📊 Estrutura do Projeto

```
nandi-dev/
├── src/
│   ├── components/
│   │   ├── ChatBot.js          # Componente do chatbot
│   │   └── LeadsDashboard.js   # Dashboard de leads
│   └── App.js
├── server/
│   ├── index.js                # API do backend
│   ├── package.json
│   ├── .env                    # Variáveis de ambiente
│   └── data/
│       └── leads.json          # Arquivo de leads (criado automaticamente)
└── package.json
```

## 🔧 Configuração do Chatbot

O chatbot está configurado para:

1. **Identificar necessidades:** Site, App, Sistema, E-commerce
2. **Detectar segmento:** Clínica, Loja, Startup, Empresa, etc.
3. **Coletar informações:** Nome, telefone, email, empresa, orçamento, prazo
4. **Qualificar leads:** Fazer perguntas estratégicas
5. **Enviar para WhatsApp:** Após coletar dados, abre conversa no WhatsApp

## 📱 Como o Chatbot Funciona

### Fluxo de Conversação

1. **Usuário inicia conversa** → Bot apresenta serviços
2. **Bot faz perguntas estratégicas:**
   - Tipo de projeto (site, app, sistema)
   - Segmento do negócio
   - Necessidades específicas
   - Prazo e orçamento
3. **Bot identifica informações automaticamente:**
   - Nome (quando mencionado)
   - Telefone (formato detectado)
   - Email (formato detectado)
   - Segmento (baseado nas respostas)
4. **Bot solicita formulário** quando necessário
5. **Lead é salvo** e WhatsApp é aberto automaticamente

### Respostas Inteligentes

O sistema usa:
- **OpenAI GPT-4** (se configurado) - Conversação natural e inteligente
- **Respostas padrão** (fallback) - Baseadas em palavras-chave e padrões

## 📈 Dashboard de Leads

O dashboard permite:

- ✅ Ver todos os leads capturados
- ✅ Filtrar por data (hoje, semana, todos)
- ✅ Buscar por nome, email, telefone
- ✅ Ver estatísticas (total, hoje, semana, segmentos)
- ✅ Exportar leads em CSV
- ✅ Contatar leads diretamente (WhatsApp/Email)

## 🚀 Deploy

### Railway / Vercel / Netlify

1. **Frontend:** Deploy normal do React
2. **Backend:** Deploy separado do servidor Node.js

### Configurar no Railway

1. Crie dois serviços:
   - **Frontend:** Conecte ao repositório, build: `npm run build`
   - **Backend:** Conecte à pasta `server/`, start: `npm start`

2. Configure variáveis de ambiente no backend:
   - `PORT` (Railway define automaticamente)
   - `OPENAI_API_KEY` (se usar)

3. Configure proxy no frontend para apontar para a URL do backend

### Exemplo de configuração no Railway

**Backend:**
- Build Command: (vazio ou `npm install`)
- Start Command: `npm start`
- Port: 3001 (ou variável `$PORT`)

**Frontend:**
- Build Command: `npm run build`
- Start Command: `serve -s build`
- Adicione variável: `REACT_APP_API_URL=https://seu-backend.railway.app`

## 🔒 Segurança

- ✅ Leads armazenados localmente (arquivo JSON)
- ✅ Para produção, considere usar banco de dados (MongoDB, PostgreSQL)
- ✅ API protegida por CORS
- ✅ Validação de dados no backend

## 📝 Personalização

### Modificar o Prompt do Sistema

Edite `server/index.js`, função `systemPrompt`:

```javascript
const systemPrompt = `Seu prompt personalizado aqui...`;
```

### Adicionar Novos Serviços

Edite o `systemPrompt` para incluir novos serviços oferecidos.

### Modificar Interface do Chat

Edite `src/components/ChatBot.js` para personalizar cores, textos, etc.

## 🐛 Troubleshooting

### Chatbot não responde
- Verifique se o backend está rodando na porta 3001
- Verifique o console do navegador para erros
- Verifique se o proxy está configurado no `package.json`

### Leads não aparecem no dashboard
- Verifique se o arquivo `server/data/leads.json` existe
- Verifique permissões de escrita na pasta `server/data/`

### Erro ao chamar OpenAI
- Verifique se a chave API está correta
- Verifique se tem créditos na conta OpenAI
- O sistema usará respostas padrão se houver erro

## 📞 Suporte

Para dúvidas ou problemas, entre em contato:
- Email: nandikesiadevnandi@gmail.com
- WhatsApp: +54 996246565

---

**Desenvolvido por Nandi Dev** 🚀



