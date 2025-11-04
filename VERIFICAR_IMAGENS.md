# 🔍 Verificar Imagens - Instruções de Debug

## 📁 **Estrutura Correta dos Arquivos:**

```
nandi-dev/
├── public/
│   └── logo/
│       ├── logo.png                    # Logo da Nandi Dev
│       ├── psipro-login.jpg           # PsiPro - Login
│       ├── psipro-dasboard.jpg        # PsiPro - Dashboard
│       ├── psipro-agenda.jpg          # PsiPro - Agenda
│       ├── psipro-financeiro.jpg      # PsiPro - Financeiro
│       ├── psipro-fichapaciente.jpg   # PsiPro - Ficha do Paciente
│       ├── psipro-configuracoes.jpg   # PsiPro - Configurações
│       ├── conferencia-main.jpg       # Conferência - Imagem Principal
│       ├── conferencia-hero.jpg       # Conferência - Screenshot 1
│       ├── conferencia-programacao.jpg # Conferência - Screenshot 2
│       └── conferencia-inscricoes.jpg  # Conferência - Screenshot 3
└── src/
    └── components/
        ├── Cases.js
        └── Portfolio.js
```

## 🔧 **Verificações Necessárias:**

### **1. Verificar se a pasta existe:**
```powershell
dir public\logo\
```

### **2. Verificar se os arquivos estão lá:**
```powershell
dir public\logo\*.jpg
```

### **3. Verificar nomes exatos:**
- `conferencia-main.jpg` (não `conferencia-main.jpeg`)
- `conferencia-hero.jpg` (não `conferencia-hero.jpeg`)
- `conferencia-programacao.jpg` (não `conferencia-programacao.jpeg`)
- `conferencia-inscricoes.jpg` (não `conferencia-inscricoes.jpeg`)

## 🚀 **Para Testar:**

### **1. Reiniciar o servidor:**
```bash
# Parar o servidor (Ctrl+C)
npm start
```

### **2. Limpar cache do navegador:**
- Pressione `Ctrl + F5` para recarregar sem cache
- Ou abra uma aba anônima/privada

### **3. Verificar no console do navegador:**
- Pressione `F12`
- Vá para a aba "Console"
- Procure por erros de "404" ou "Failed to load"

## 🔍 **Possíveis Problemas:**

### **1. Nomes de arquivos incorretos:**
- Verificar se não há espaços extras
- Verificar se a extensão é `.jpg` (não `.jpeg`)
- Verificar se não há caracteres especiais

### **2. Localização incorreta:**
- Arquivos devem estar em `public/logo/`
- Não em `src/logo/` ou `public/images/`

### **3. Permissões:**
- Verificar se os arquivos não estão corrompidos
- Verificar se são imagens válidas

## 📋 **Checklist de Verificação:**

- [ ] Pasta `public/logo/` existe
- [ ] Arquivo `conferencia-main.jpg` existe
- [ ] Arquivo `conferencia-hero.jpg` existe
- [ ] Arquivo `conferencia-programacao.jpg` existe
- [ ] Arquivo `conferencia-inscricoes.jpg` existe
- [ ] Todos os arquivos são `.jpg` (não `.jpeg`)
- [ ] Nomes não têm espaços extras
- [ ] Servidor foi reiniciado
- [ ] Cache do navegador foi limpo

## 🆘 **Se ainda não funcionar:**

### **Teste com uma imagem simples:**
1. Coloque qualquer imagem na pasta `public/logo/`
2. Renomeie para `conferencia-main.jpg`
3. Teste se aparece

### **Verificar no navegador:**
1. Acesse diretamente: `http://localhost:3000/logo/conferencia-main.jpg`
2. Se não carregar, o problema é com o arquivo
3. Se carregar, o problema é com o código

---

**Dica**: O problema mais comum é o nome do arquivo ou a localização! 🎯✨





