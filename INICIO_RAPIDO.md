# 🚀 Início Rápido - Chatbot com IA

## ⚡ Passo a Passo para Começar

### 1️⃣ Instalar Dependências

**Terminal 1 - Frontend:**
```powershell
npm install
```

**Terminal 2 - Backend:**
```powershell
cd server
npm install
cd ..
```

### 2️⃣ Configurar API de IA (Opcional)

Crie o arquivo `server/.env`:
```env
PORT=3001
OPENAI_API_KEY=sk-sua-chave-aqui
```

**Como obter chave OpenAI:**
1. Acesse: https://platform.openai.com/api-keys
2. Crie conta ou faça login
3. Gere nova chave
4. Cole no `.env`

**⚠️ IMPORTANTE:** Se não configurar a chave, o chatbot funcionará com respostas inteligentes padrão!

### 3️⃣ Iniciar o Sistema

**Opção A - Dois Terminais (Recomendado):**

**Terminal 1 - Backend:**
```powershell
cd server
npm start
```

**Terminal 2 - Frontend:**
```powershell
npm start
```

**Opção B - Um Terminal (Tudo Junto):**
```powershell
npm install -g concurrently
npm run dev
```

### 4️⃣ Acessar

- **Site com Chatbot:** http://localhost:3000
- **API Backend:** http://localhost:3001
- **Dashboard de Leads:** Criar rota ou usar `AppDashboard.js`

## 📊 Ver Leads Capturados

### Opção 1: Via API Direta
Acesse: http://localhost:3001/api/leads

### Opção 2: Dashboard React
1. Importe `LeadsDashboard` no seu `App.js`
2. Ou crie uma rota separada

### Opção 3: Arquivo JSON
Os leads são salvos em: `server/data/leads.json`

## ✅ Testar o Chatbot

1. Abra http://localhost:3000
2. Clique no botão de chat (canto inferior direito)
3. Digite: "Olá, preciso de um site"
4. O bot vai fazer perguntas e qualificar o lead
5. Quando coletar dados, salvará automaticamente

## 🔧 Problemas Comuns

### ❌ "Cannot GET /api/chat"
**Solução:** Backend não está rodando. Inicie com `cd server && npm start`

### ❌ Chatbot não responde
**Solução:** 
1. Verifique console do navegador (F12)
2. Verifique se backend está na porta 3001
3. Verifique proxy no `package.json`

### ❌ Leads não aparecem
**Solução:**
1. Verifique se `server/data/` existe
2. Verifique permissões de escrita
3. Verifique console do backend para erros

## 🚀 Próximos Passos

1. ✅ Testar o chatbot localmente
2. ✅ Configurar OpenAI API (opcional)
3. ✅ Personalizar mensagens do bot
4. ✅ Fazer deploy do backend
5. ✅ Fazer deploy do frontend
6. ✅ Configurar variáveis de ambiente em produção

## 📞 Precisa de Ajuda?

- Email: nandikesiadevnandi@gmail.com
- WhatsApp: +54 996246565

---

**Pronto para capturar leads automaticamente! 🎉**



