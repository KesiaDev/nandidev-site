# 🌐 Configurar www.nandidev.com.br

## 🎯 **OBJETIVO**
Fazer com que o site funcione com **www.nandidev.com.br** como URL principal.

---

## 📋 **PASSO 1: CONFIGURAR NO REGISTROBR**

### **A. Acessar RegistroBR:**
1. Ir para https://registro.br
2. Fazer login
3. Ir em **"Meus Domínios"**
4. Selecionar `nandidev.com.br`
5. Clicar em **"DNS"** ou **"Gerenciar DNS"**

### **B. Configurar DNS no MODO AVANÇADO:**

#### **⚠️ IMPORTANTE:**
O RegistroBR **NÃO aceita** o caractere `@` no campo "Nome" no modo avançado. Por isso, vamos configurar primeiro o `www` e depois o domínio raiz.

#### **1. Aguardar transição (se aparecer aviso):**
Se aparecer "Domínio em transição", aguarde alguns minutos e recarregue a página.

#### **2. Configurar registro CNAME para www:**

**Clique em "Adicionar" ou botão similar e configure:**

```
Tipo: CNAME
Nome: www
Dados: ybymrl0b.up.railway.app
```

#### **3. Para o domínio raiz (nandidev.com.br):**
Como não pode usar `@` no modo avançado, você tem 2 opções:

**Opção A - Usar modo simples (recomendado):**
1. Voltar para o modo simples do RegistroBR
2. Configurar como "Nome Alternativo (CNAME)"
3. Valor: `ybymrl0b.up.railway.app`

**Opção B - Usar registro A (se Railway fornecer IP):**
1. No modo avançado, adicionar:
```
Tipo: A
Nome: (deixar vazio ou usar o domínio completo)
Dados: [IP do Railway]
```

### **C. Salvar:**
1. Clicar em **"SALVAR ALTERAÇÕES"**
2. Aguardar confirmação

---

## 🚀 **PASSO 2: CONFIGURAR NO RAILWAY**

### **A. Acessar Railway:**
1. Ir para https://railway.app
2. Fazer login
3. Selecionar o projeto `nandidev-site`

### **B. Adicionar AMBOS os domínios:**

#### **1. Adicionar domínio sem www:**
1. Ir em **"Settings"** → **"Domains"**
2. Clicar em **"Add Custom Domain"**
3. Digitar: `nandidev.com.br`
4. Clicar em **"Add"**

#### **2. Adicionar domínio com www:**
1. Ainda em **"Settings"** → **"Domains"**
2. Clicar em **"Add Custom Domain"** novamente
3. Digitar: `www.nandidev.com.br`
4. Clicar em **"Add"**

### **C. Railway irá:**
- ✅ Verificar configuração DNS para ambos
- ✅ Gerar certificado SSL para ambos
- ✅ Ativar HTTPS para ambos
- ✅ Configurar redirecionamento (opcional)

---

## ⚙️ **PASSO 3: CONFIGURAR REDIRECIONAMENTO (OPCIONAL)**

### **Se quiser que nandidev.com.br redirecione para www.nandidev.com.br:**

Você pode configurar isso no Railway ou no código do site. O Railway geralmente permite configurar redirecionamento nas configurações de domínio.

---

## ⏱️ **PASSO 4: AGUARDAR PROPAGAÇÃO**

### **Tempo:**
- **Mínimo**: 15-30 minutos
- **Máximo**: 24-48 horas
- **Média**: 1-2 horas

### **Verificar propagação:**
- Ferramenta: https://www.whatsmydns.net/
- Digite: `www.nandidev.com.br`
- Verifique se os registros estão corretos

---

## ✅ **PASSO 5: TESTAR**

### **A. Após 15-30 minutos:**
1. Acessar: `https://www.nandidev.com.br` ✅
2. Verificar se abre o site
3. Verificar se tem SSL (🔒 verde)
4. Testar: `https://nandidev.com.br` (deve redirecionar ou abrir também)

---

## 🎯 **RESULTADO FINAL**

### **URLs funcionando:**
- ✅ `https://www.nandidev.com.br` (principal)
- ✅ `https://nandidev.com.br` (também funciona)
- ✅ SSL automático (🔒)
- ✅ Site carregando perfeitamente

---

## 📋 **CHECKLIST COMPLETO**

### **RegistroBR:**
- [ ] Acessar DNS do domínio
- [ ] Clicar em "MODO AVANÇADO"
- [ ] Configurar CNAME para `@` → `ybymrl0b.up.railway.app`
- [ ] Configurar CNAME para `www` → `ybymrl0b.up.railway.app`
- [ ] Salvar alterações

### **Railway:**
- [ ] Adicionar: `nandidev.com.br`
- [ ] Adicionar: `www.nandidev.com.br`
- [ ] Verificar status de ambos

### **Teste:**
- [ ] Aguardar 15-30 minutos
- [ ] Acessar `https://www.nandidev.com.br`
- [ ] Verificar SSL (🔒)
- [ ] Testar `https://nandidev.com.br`

---

## ⚠️ **IMPORTANTE**

### **Por que configurar ambos?**

1. **nandidev.com.br** (sem www):
   - Alguns usuários acessam sem www
   - Precisa funcionar também

2. **www.nandidev.com.br** (com www):
   - URL principal que você quer
   - Mais profissional
   - Melhor para SEO

### **Configuração no RegistroBR:**
- **@** = domínio raiz (nandidev.com.br)
- **www** = subdomínio (www.nandidev.com.br)
- Ambos apontam para o mesmo lugar (Railway)

---

## 🚀 **PRONTO!**

Agora seu site funcionará com **www.nandidev.com.br** como URL principal! ✨

