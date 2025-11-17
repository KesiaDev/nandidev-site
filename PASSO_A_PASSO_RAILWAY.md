# 🚀 Passo a Passo - Deploy Backend no Railway

## 📋 Resumo Rápido

Vamos criar um **novo serviço no Railway** apenas para o backend do chatbot, separado do frontend.

---

## 🔧 PASSO 1: Preparar o Código

✅ **Já está pronto!** Os arquivos necessários foram criados:
- `server/package.json` ✅
- `server/railway.json` ✅
- `server/Procfile` ✅
- `server/nixpacks.toml` ✅

---

## 📦 PASSO 2: Criar Novo Serviço no Railway

### 2.1. Acessar Railway

1. Vá para https://railway.app
2. Faça login com sua conta GitHub

### 2.2. Criar Novo Projeto (se ainda não tiver)

1. Clique em **"New Project"**
2. Selecione **"Deploy from GitHub repo"**
3. Escolha o repositório do seu site (`nandidev-site` ou similar)
4. Clique em **"Deploy Now"**

### 2.3. Adicionar Serviço Backend

1. No projeto criado, clique em **"+ New"** (canto superior direito)
2. Selecione **"GitHub Repo"**
3. Escolha o **mesmo repositório** do frontend
4. Clique em **"Deploy Now"**

### 2.4. Configurar o Serviço Backend

1. Clique no serviço recém-criado
2. Vá em **"Settings"**
3. Em **"Root Directory"**, digite: `server`
4. Em **"Build Command"**, deixe vazio (ou `npm install`)
5. Em **"Start Command"**, digite: `npm start`

**OU** use a interface visual:
- Clique em **"Settings"** → **"Service"**
- **Root Directory:** `server`
- **Start Command:** `npm start`

---

## 🔐 PASSO 3: Configurar Variáveis de Ambiente

1. No serviço do backend, clique em **"Variables"** (menu lateral)
2. Clique em **"+ New Variable"**
3. Adicione as seguintes variáveis:

**Variável 1:**
- **Name:** `PORT`
- **Value:** `3001`
- **Description:** Porta do servidor (Railway pode sobrescrever)

**Variável 2 (Opcional - se tiver chave OpenAI):**
- **Name:** `OPENAI_API_KEY`
- **Value:** `sk-sua-chave-aqui`
- **Description:** Chave da API OpenAI para IA avançada

**Variável 3 (Recomendado):**
- **Name:** `FRONTEND_URL`
- **Value:** `https://www.nandidev.com.br`
- **Description:** URL do frontend para CORS

---

## 🌐 PASSO 4: Obter URL do Backend

1. No serviço do backend, vá em **"Settings"**
2. Role até **"Networking"**
3. Clique em **"Generate Domain"**
4. **COPIE A URL GERADA** (exemplo: `https://backend-production-xxxx.up.railway.app`)
5. **ANOTE ESTA URL** - você precisará dela no próximo passo!

---

## 🔄 PASSO 5: Atualizar Frontend

### 5.1. Adicionar Variável no Frontend

1. No Railway, vá para o **serviço do frontend** (seu site atual)
2. Clique em **"Variables"**
3. Clique em **"+ New Variable"**
4. Adicione:

**Variável:**
- **Name:** `REACT_APP_API_URL`
- **Value:** `https://backend-production-xxxx.up.railway.app` (cole a URL do backend que você copiou)
- **Description:** URL da API do chatbot

### 5.2. Redeploy do Frontend

1. Após adicionar a variável, o Railway vai fazer **redeploy automático**
2. **OU** clique em **"Deployments"** → **"Redeploy"** manualmente
3. Aguarde o deploy terminar (pode levar 2-5 minutos)

---

## ✅ PASSO 6: Verificar se Está Funcionando

### 6.1. Testar Backend

1. Abra a URL do backend no navegador: `https://seu-backend.up.railway.app/api/stats`
2. Deve aparecer um JSON com estatísticas (mesmo que vazio):
```json
{
  "total": 0,
  "today": 0,
  "thisWeek": 0,
  "segments": {},
  "needs": {}
}
```

Se aparecer isso, o backend está funcionando! ✅

### 6.2. Testar Frontend

1. Acesse seu site: `https://www.nandidev.com.br`
2. Clique no **botão de chat** (canto inferior direito)
3. Digite: "Olá, preciso de um site"
4. O chatbot deve responder!

### 6.3. Verificar Logs (se não funcionar)

**Backend:**
1. No serviço do backend, clique em **"Deployments"**
2. Clique no último deploy
3. Clique em **"View Logs"**
4. Verifique se há erros

**Frontend:**
1. Mesmo processo no serviço do frontend

---

## 🐛 Problemas Comuns

### ❌ Erro: "Cannot GET /api/chat"

**Solução:**
1. Verifique se `REACT_APP_API_URL` está configurada no frontend
2. Verifique se a URL está correta (sem barra no final)
3. Faça redeploy do frontend

### ❌ Erro: "Connection refused"

**Solução:**
1. Verifique os logs do backend
2. Verifique se o `Root Directory` está como `server`
3. Verifique se o `Start Command` está como `npm start`

### ❌ Chatbot não aparece

**Solução:**
1. Abra o console do navegador (F12)
2. Veja se há erros
3. Verifique se o componente ChatBot está no App.js

### ❌ CORS Error

**Solução:**
1. Verifique se adicionou `FRONTEND_URL` no backend
2. Verifique se a URL está correta
3. Faça redeploy do backend

---

## 📊 Estrutura Final no Railway

```
Projeto Railway
│
├── Serviço 1: Frontend (nandidev.com.br)
│   ├── Root: / (raiz)
│   ├── Build: npm run build
│   ├── Start: serve -s build
│   └── Variables:
│       └── REACT_APP_API_URL=https://backend.up.railway.app
│
└── Serviço 2: Backend (Chatbot API)
    ├── Root: /server
    ├── Build: (vazio ou npm install)
    ├── Start: npm start
    └── Variables:
        ├── PORT=3001
        ├── OPENAI_API_KEY=sk-... (opcional)
        └── FRONTEND_URL=https://www.nandidev.com.br
```

---

## ✅ Checklist Final

- [ ] Backend deployado no Railway
- [ ] Root Directory configurado como `server`
- [ ] Start Command configurado como `npm start`
- [ ] Variáveis de ambiente configuradas no backend
- [ ] URL do backend copiada
- [ ] Variável `REACT_APP_API_URL` adicionada no frontend
- [ ] Frontend redeployado
- [ ] Backend respondendo em `/api/stats`
- [ ] Chatbot funcionando no site
- [ ] Testado envio de mensagem

---

## 🎉 Pronto!

Seu chatbot estará funcionando 24/7 no seu site!

**Dúvidas?** Verifique os logs ou me chame! 🚀



