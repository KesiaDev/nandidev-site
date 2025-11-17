# 🚀 Guia de Deploy - Backend Chatbot no Railway

## 📋 Pré-requisitos

- Conta no Railway (https://railway.app)
- Repositório GitHub com o código
- (Opcional) Chave da API OpenAI

## 🔧 Passo 1: Preparar o Backend

O backend já está configurado com:
- ✅ `server/package.json` com scripts corretos
- ✅ `server/railway.json` para configuração do Railway
- ✅ `server/Procfile` para comando de start
- ✅ Porta configurável via variável de ambiente

## 📦 Passo 2: Deploy do Backend no Railway

### 2.1. Criar Novo Projeto no Railway

1. Acesse https://railway.app
2. Faça login com sua conta GitHub
3. Clique em **"New Project"**
4. Selecione **"Deploy from GitHub repo"**
5. Escolha o repositório `nandidev-site` (ou o nome do seu repo)

### 2.2. Adicionar Serviço Backend

1. No projeto criado, clique em **"+ New"**
2. Selecione **"GitHub Repo"** novamente
3. Escolha o mesmo repositório
4. Na configuração do serviço:
   - **Root Directory**: `/server`
   - **Build Command**: (deixe vazio ou `npm install`)
   - **Start Command**: `npm start`

### 2.3. Configurar Variáveis de Ambiente

No serviço do backend, vá em **"Variables"** e adicione:

```
PORT=3001
OPENAI_API_KEY=sk-sua-chave-aqui (opcional)
```

**Nota:** O Railway define automaticamente a porta via `$PORT`, mas você pode deixar `PORT=3001` como fallback.

### 2.4. Obter URL do Backend

1. No serviço do backend, vá em **"Settings"**
2. Em **"Networking"**, ative **"Generate Domain"**
3. Copie a URL gerada (ex: `https://seu-backend.up.railway.app`)
4. **IMPORTANTE:** Anote esta URL, você precisará dela no próximo passo!

## 🌐 Passo 3: Atualizar Frontend

### 3.1. Adicionar Variável de Ambiente no Frontend

1. No Railway, vá para o serviço do **frontend** (seu site atual)
2. Vá em **"Variables"**
3. Adicione a variável:

```
REACT_APP_API_URL=https://seu-backend.up.railway.app
```

**⚠️ IMPORTANTE:** Substitua `https://seu-backend.up.railway.app` pela URL real do seu backend!

### 3.2. Redeploy do Frontend

1. Após adicionar a variável, o Railway vai fazer redeploy automaticamente
2. Ou você pode clicar em **"Redeploy"** manualmente

## ✅ Passo 4: Verificar se Está Funcionando

### 4.1. Testar Backend

1. Acesse: `https://seu-backend.up.railway.app/api/stats`
2. Deve retornar JSON com estatísticas (mesmo que vazio)

### 4.2. Testar Frontend

1. Acesse seu site: `https://www.nandidev.com.br`
2. Clique no botão de chat (canto inferior direito)
3. Digite uma mensagem
4. O chatbot deve responder

### 4.3. Verificar Logs

Se algo não funcionar:

1. **Backend:** Vá em **"Deployments"** → Clique no último deploy → **"View Logs"**
2. **Frontend:** Mesmo processo

## 🔍 Troubleshooting

### ❌ Erro: "Cannot GET /api/chat"

**Causa:** Frontend não está encontrando o backend

**Solução:**
1. Verifique se `REACT_APP_API_URL` está configurada corretamente no frontend
2. Verifique se a URL do backend está acessível
3. Faça redeploy do frontend após adicionar a variável

### ❌ Erro: "Connection refused"

**Causa:** Backend não está rodando

**Solução:**
1. Verifique os logs do backend no Railway
2. Verifique se o `package.json` do backend tem o script `start`
3. Verifique se a porta está configurada corretamente

### ❌ Erro: "CORS policy"

**Causa:** Backend não está permitindo requisições do frontend

**Solução:**
- O backend já está configurado com CORS, mas verifique se a URL do frontend está correta

### ❌ Chatbot não responde

**Causa:** Backend não está acessível ou variável de ambiente incorreta

**Solução:**
1. Abra o console do navegador (F12)
2. Veja se há erros de rede
3. Verifique se `REACT_APP_API_URL` está correta
4. Teste a URL do backend diretamente no navegador

## 📊 Estrutura Final

```
Railway Project
├── Frontend Service (nandidev.com.br)
│   ├── Root: / (raiz do projeto)
│   ├── Build: npm run build
│   ├── Start: serve -s build
│   └── Variables:
│       └── REACT_APP_API_URL=https://backend.up.railway.app
│
└── Backend Service (Chatbot API)
    ├── Root: /server
    ├── Build: npm install
    ├── Start: npm start
    └── Variables:
        ├── PORT=3001
        └── OPENAI_API_KEY=sk-... (opcional)
```

## 🎯 Checklist Final

- [ ] Backend deployado no Railway
- [ ] URL do backend anotada
- [ ] Variável `REACT_APP_API_URL` configurada no frontend
- [ ] Frontend redeployado
- [ ] Backend respondendo em `/api/stats`
- [ ] Chatbot funcionando no site
- [ ] Testado envio de mensagem
- [ ] Testado geração de diagnóstico
- [ ] Testado geração de proposta
- [ ] Testado agendamento

## 📞 Próximos Passos

Após o deploy:

1. **Monitorar Logs:** Acompanhe os logs do backend para ver leads sendo capturados
2. **Acessar Dashboard:** Crie uma rota para o dashboard de leads (opcional)
3. **Configurar OpenAI:** Adicione a chave da API para melhorar as respostas do bot
4. **Personalizar Preços:** Ajuste os valores na função `generateProposal` se necessário

---

**Pronto! Seu chatbot estará funcionando 24/7 no seu site! 🚀**
