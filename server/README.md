# 🚀 API do Chatbot - Backend

Backend Node.js/Express para o sistema de chatbot com IA.

## 📦 Instalação

```bash
npm install
```

## ⚙️ Configuração

1. Copie `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Edite o `.env` e adicione sua chave da OpenAI (opcional):
```env
PORT=3001
OPENAI_API_KEY=sk-sua-chave-aqui
```

## 🎯 Como Rodar

### Desenvolvimento
```bash
npm start
```

### Com auto-reload (nodemon)
```bash
npm run dev
```

## 📡 Endpoints

### POST `/api/chat`
Envia mensagem para o chatbot e recebe resposta.

**Body:**
```json
{
  "message": "Olá, preciso de um site",
  "conversationHistory": [],
  "leadData": {}
}
```

**Response:**
```json
{
  "response": "Olá! Fico feliz em ajudar...",
  "leadData": {
    "needs": ["Site"]
  },
  "needsLeadInfo": false
}
```

### POST `/api/leads`
Salva um novo lead.

**Body:**
```json
{
  "name": "João Silva",
  "phone": "+54996246565",
  "email": "joao@example.com",
  "company": "Empresa XYZ",
  "segment": "E-commerce",
  "needs": ["Site", "E-commerce"],
  "budget": "R$ 5.000 - R$ 10.000",
  "timeline": "30 dias"
}
```

### GET `/api/leads`
Lista todos os leads capturados.

### GET `/api/stats`
Retorna estatísticas dos leads.

## 📁 Estrutura de Dados

Os leads são salvos em `data/leads.json`:

```json
[
  {
    "id": 1234567890,
    "name": "João Silva",
    "phone": "+54996246565",
    "email": "joao@example.com",
    "company": "Empresa XYZ",
    "segment": "E-commerce",
    "needs": ["Site", "E-commerce"],
    "budget": "R$ 5.000 - R$ 10.000",
    "timeline": "30 dias",
    "conversationHistory": [...],
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

## 🔒 Segurança

- CORS configurado para permitir requisições do frontend
- Validação de dados de entrada
- Para produção, considere adicionar autenticação

## 🚀 Deploy

### Railway
1. Conecte o repositório
2. Configure a pasta raiz como `server/`
3. Start Command: `npm start`
4. Adicione variáveis de ambiente

### Heroku
```bash
heroku create seu-app
heroku config:set OPENAI_API_KEY=sua-chave
git push heroku main
```

### Vercel / Netlify
Configure como função serverless (requer ajustes no código).

