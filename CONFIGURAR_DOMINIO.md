# 🌐 Configurar Domínio nandidev.com.br no Railway

## 📋 **Passo a Passo Completo**

---

## 🎯 **1. OBTER INFORMAÇÕES DO RAILWAY**

### **A. Acessar Railway Dashboard:**
1. Ir para https://railway.app
2. Fazer login
3. Selecionar o projeto `nandidev-site`

### **B. Obter informações de DNS:**
1. Ir em **"Settings"** → **"Domains"**
2. Clicar em **"Custom Domain"** ou **"Add Domain"**
3. Digitar: `nandidev.com.br`
4. Railway mostrará as configurações DNS necessárias

---

## 🔧 **2. CONFIGURAR DNS NO REGISTROBR**

### **A. Acessar RegistroBR:**
1. Ir para https://registro.br
2. Fazer login
3. Ir em **"Meus Domínios"**
4. Selecionar `nandidev.com.br`
5. Clicar em **"DNS"** ou **"Gerenciar DNS"**

### **B. Configurar Registros DNS:**

#### **Opção 1 - CNAME (Recomendado):**
```
Tipo: CNAME
Nome: www
Valor: [URL do Railway - exemplo: nandidev-site-production.up.railway.app]
TTL: 3600
```

#### **Opção 2 - A Record (Se Railway fornecer IP):**
```
Tipo: A
Nome: @
Valor: [IP fornecido pelo Railway]
TTL: 3600
```

#### **Opção 3 - Ambos (Recomendado):**
```
Tipo: CNAME
Nome: www
Valor: [URL do Railway]

Tipo: A
Nome: @
Valor: [IP do Railway] OU usar CNAME também
```

---

## 🚀 **3. CONFIGURAR NO RAILWAY**

### **A. Adicionar Domínio:**
1. No Railway Dashboard
2. Ir em **"Settings"** → **"Domains"**
3. Clicar em **"Add Custom Domain"**
4. Digitar: `nandidev.com.br`
5. Clicar em **"Add"**

### **B. Railway irá:**
- ✅ Verificar configuração DNS
- ✅ Gerar certificado SSL automaticamente
- ✅ Configurar redirecionamento www
- ✅ Ativar HTTPS

---

## ⏱️ **4. AGUARDAR PROPAGAÇÃO DNS**

### **Tempo de propagação:**
- **Mínimo**: 5-15 minutos
- **Máximo**: 24-48 horas
- **Média**: 1-2 horas

### **Verificar propagação:**
- **Ferramenta**: https://www.whatsmydns.net/
- **Digite**: `nandidev.com.br`
- **Verifique**: Se os registros estão corretos

---

## ✅ **5. VERIFICAR SE ESTÁ FUNCIONANDO**

### **A. Testar acesso:**
1. Aguardar 15-30 minutos após configurar
2. Acessar: `https://nandidev.com.br`
3. Verificar se abre o site
4. Verificar se tem 🔒 (SSL)

### **B. Testar www:**
1. Acessar: `https://www.nandidev.com.br`
2. Deve redirecionar para `nandidev.com.br`
3. Ou abrir diretamente

---

## 🔒 **6. SSL AUTOMÁTICO**

### **Railway configura automaticamente:**
- ✅ Certificado SSL gratuito
- ✅ HTTPS habilitado
- ✅ Renovação automática
- ✅ 🔒 Verde no navegador

---

## 📱 **7. CONFIGURAÇÕES ADICIONAIS**

### **A. Redirecionamento www:**
Railway geralmente configura automaticamente:
- `www.nandidev.com.br` → `nandidev.com.br`
- Ou ambos funcionam

### **B. Verificar no Railway:**
1. Dashboard → Settings → Domains
2. Deve mostrar: `nandidev.com.br` ✅
3. Status: "Active" ou "Verified"

---

## 🎯 **8. CONFIGURAÇÃO ESPECÍFICA DO RAILWAY**

### **A. Railway geralmente usa:**
- **CNAME** para domínios personalizados
- **URL**: `[projeto]-production.up.railway.app`

### **B. Configuração no RegistroBR:**
```
Tipo: CNAME
Nome: @
Valor: [URL do Railway]

Tipo: CNAME  
Nome: www
Valor: [URL do Railway]
```

**OU se Railway fornecer IP:**
```
Tipo: A
Nome: @
Valor: [IP do Railway]

Tipo: CNAME
Nome: www
Valor: [URL do Railway]
```

---

## 🔍 **9. VERIFICAR CONFIGURAÇÃO**

### **A. No RegistroBR:**
1. Verificar se os registros DNS estão salvos
2. Status deve mostrar: "Ativo"
3. DNS deve estar configurado

### **B. No Railway:**
1. Dashboard → Settings → Domains
2. Domínio deve aparecer listado
3. Status deve ser "Active" ou "Pending"

### **C. Online:**
1. https://www.whatsmydns.net/
2. Digitar: `nandidev.com.br`
3. Verificar propagação global

---

## ⚠️ **10. PROBLEMAS COMUNS**

### **A. DNS não propagou:**
- **Solução**: Aguardar mais tempo (até 48h)
- **Verificar**: Se os registros estão corretos
- **Testar**: Em diferentes locais

### **B. SSL não funciona:**
- **Solução**: Aguardar Railway gerar certificado
- **Tempo**: 5-15 minutos após DNS propagar
- **Verificar**: Status no Railway

### **C. www não funciona:**
- **Solução**: Configurar CNAME para www também
- **Ou**: Configurar redirecionamento no Railway

---

## 🚀 **11. RESULTADO FINAL**

### **URLs funcionando:**
- ✅ `https://nandidev.com.br`
- ✅ `https://www.nandidev.com.br`
- ✅ SSL automático (🔒)
- ✅ Site carregando perfeitamente

### **Benefícios:**
- ✅ Domínio profissional
- ✅ SSL gratuito
- ✅ SEO otimizado
- ✅ Credibilidade

---

## 📋 **12. CHECKLIST**

### **Configuração DNS:**
- [ ] Acessar RegistroBR
- [ ] Ir em DNS do domínio
- [ ] Adicionar registros CNAME ou A
- [ ] Salvar configurações

### **Railway:**
- [ ] Adicionar domínio no Railway
- [ ] Verificar status
- [ ] Aguardar SSL

### **Teste:**
- [ ] Acessar `https://nandidev.com.br`
- [ ] Verificar SSL (🔒)
- [ ] Testar www
- [ ] Verificar todas as páginas

---

**🚀 Pronto para configurar! Vamos começar?** ✨




