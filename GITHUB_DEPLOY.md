# 🚀 Guia Completo: GitHub + Deploy Automático

## 📋 **Passo a Passo para Colocar no GitHub e Deployar**

---

## 🎯 **1. PREPARAR O PROJETO**

### **A. Verificar se está tudo funcionando:**
```bash
# No terminal do projeto:
cd C:\Users\User\Desktop\nandi-dev
npm start
```

### **B. Gerar build de produção:**
```bash
npm run build
```

### **C. Verificar se a pasta 'build' foi criada:**
```bash
dir build
```

---

## 🔧 **2. CONFIGURAR GIT (Se não estiver configurado)**

### **A. Inicializar repositório:**
```bash
# No terminal do projeto:
git init
```

### **B. Configurar usuário (se necessário):**
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@gmail.com"
```

### **C. Criar .gitignore:**
```bash
# Criar arquivo .gitignore com:
node_modules/
build/
.env
.DS_Store
*.log
```

---

## 📁 **3. CRIAR REPOSITÓRIO NO GITHUB**

### **A. Acessar GitHub:**
1. Ir para https://github.com
2. Fazer login na sua conta
3. Clicar em "New repository"

### **B. Configurar repositório:**
- **Repository name**: `nandi-dev-website`
- **Description**: `Site profissional da Nandi Dev - Desenvolvimento de sites, aplicativos e sistemas web`
- **Public** ✅ (para deploy gratuito)
- **Add README** ❌ (já temos arquivos)
- **Add .gitignore** ❌ (já temos)
- **Choose a license** ❌ (opcional)

### **C. Criar repositório:**
- Clicar em "Create repository"

---

## 🔄 **4. CONECTAR PROJETO LOCAL COM GITHUB**

### **A. Adicionar arquivos:**
```bash
# No terminal do projeto:
git add .
```

### **B. Primeiro commit:**
```bash
git commit -m "🚀 Site Nandi Dev - Versão inicial com SEO otimizado"
```

### **C. Conectar com GitHub:**
```bash
# Substituir 'seu-usuario' pelo seu username do GitHub:
git remote add origin https://github.com/SEU-USUARIO/nandi-dev-website.git
```

### **D. Enviar para GitHub:**
```bash
git branch -M main
git push -u origin main
```

---

## 🚀 **5. DEPLOY AUTOMÁTICO COM VERCEL**

### **A. Acessar Vercel:**
1. Ir para https://vercel.com
2. Clicar em "Sign up with GitHub"
3. Autorizar Vercel no GitHub

### **B. Importar projeto:**
1. Clicar em "Import Project"
2. Selecionar `nandi-dev-website`
3. Clicar em "Import"

### **C. Configurar deploy:**
- **Framework Preset**: Create React App
- **Root Directory**: `./` (padrão)
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

### **D. Deploy:**
- Clicar em "Deploy"
- Aguardar build (2-3 minutos)
- Site estará no ar! 🎉

---

## 🌐 **6. CONFIGURAR DOMÍNIO PERSONALIZADO**

### **A. Comprar domínio:**
1. Ir para https://registro.br
2. Pesquisar: `nandidev.com.br`
3. Comprar (R$ 40/ano)

### **B. Configurar no Vercel:**
1. No dashboard do Vercel
2. Ir em "Settings" > "Domains"
3. Adicionar: `nandidev.com.br`
4. Adicionar: `www.nandidev.com.br`

### **C. Configurar DNS no RegistroBR:**
```
Tipo: A
Nome: @
Valor: 76.76.19.61 (IP do Vercel)

Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
```

---

## 🔄 **7. DEPLOY AUTOMÁTICO (Futuro)**

### **A. A cada mudança no código:**
```bash
# 1. Fazer alterações no código
# 2. Commit das mudanças:
git add .
git commit -m "✨ Nova funcionalidade adicionada"
git push origin main

# 3. Vercel detecta automaticamente e faz novo deploy! 🚀
```

### **B. URLs do site:**
- **Temporária**: `https://nandi-dev-website.vercel.app`
- **Personalizada**: `https://nandidev.com.br` (após configurar domínio)

---

## 📱 **8. TESTAR DEPLOY**

### **A. Verificar se está funcionando:**
1. Acessar URL do Vercel
2. Testar todas as seções
3. Verificar responsividade
4. Testar links e botões
5. Verificar SEO

### **B. Verificar performance:**
- **Lighthouse**: https://pagespeed.web.dev/
- **SEO**: https://www.seobility.net/
- **SSL**: Deve aparecer 🔒 verde

---

## 🎯 **9. VANTAGENS DO GITHUB + VERCEL**

### **✅ Deploy Automático:**
- A cada push no GitHub
- Deploy instantâneo
- Sem configuração manual

### **✅ Performance:**
- CDN global
- SSL automático
- Otimização automática

### **✅ Facilidade:**
- Interface simples
- Configuração automática
- Suporte ao React

### **✅ Gratuito:**
- Sem custos de hospedagem
- Domínio personalizado
- Analytics básico

---

## 🚀 **10. COMANDOS RESUMIDOS**

### **Para colocar no GitHub:**
```bash
# 1. Preparar projeto
npm run build

# 2. Inicializar git (se necessário)
git init
git add .
git commit -m "🚀 Site Nandi Dev - Versão inicial"

# 3. Conectar com GitHub
git remote add origin https://github.com/SEU-USUARIO/nandi-dev-website.git
git branch -M main
git push -u origin main
```

### **Para deploy no Vercel:**
1. Acessar https://vercel.com
2. Conectar com GitHub
3. Importar projeto
4. Deploy automático! 🎉

---

## 📋 **11. CHECKLIST COMPLETO**

### **Antes do GitHub:**
- [ ] Site funcionando localmente
- [ ] Build gerado (`npm run build`)
- [ ] Pasta `build` criada
- [ ] Git inicializado
- [ ] Arquivos adicionados

### **GitHub:**
- [ ] Repositório criado
- [ ] Projeto conectado
- [ ] Primeiro commit
- [ ] Push realizado
- [ ] Código no GitHub

### **Deploy:**
- [ ] Conta Vercel criada
- [ ] Projeto importado
- [ ] Deploy realizado
- [ ] Site acessível
- [ ] Performance verificada

### **Domínio (Opcional):**
- [ ] Domínio comprado
- [ ] DNS configurado
- [ ] SSL funcionando
- [ ] Redirecionamento www

---

## 🎉 **RESULTADO FINAL**

### **URLs do Site:**
- **Temporária**: `https://nandi-dev-website.vercel.app`
- **Personalizada**: `https://nandidev.com.br` (após domínio)

### **Benefícios:**
- ✅ **Deploy automático** a cada mudança
- ✅ **Performance excelente** (CDN global)
- ✅ **SSL gratuito** e automático
- ✅ **Backup automático** no GitHub
- ✅ **Versionamento** do código
- ✅ **Colaboração** fácil
- ✅ **Profissional** e confiável

---

**🚀 Pronto para começar? Vamos colocar seu site no GitHub!** ✨



