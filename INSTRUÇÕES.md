# 🚀 Instruções para Executar o Site da Nandi Dev

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior)
- **npm** (geralmente vem com o Node.js)

## 🛠️ Instalação e Execução

### 1. Instalar Dependências
```bash
npm install
```

### 2. Executar o Projeto
```bash
npm start
```

### 3. Acessar o Site
Abra seu navegador e acesse: `http://localhost:3000`

## 🎨 Personalização Rápida

### Alterar Informações de Contato

**WhatsApp**: Edite o número em todos os componentes que contêm `handleWhatsApp`
```javascript
// Exemplo: src/components/Header.js
window.open('https://wa.me/5511999999999?text=...', '_blank');
```

**E-mail**: Edite o e-mail nos componentes
```javascript
// Exemplo: src/components/Footer.js
window.open('mailto:contato@nandidev.com', '_blank');
```

### Alterar Cores da Marca

Edite o arquivo `tailwind.config.js`:
```javascript
colors: {
  primary: '#007BFF',    // Azul principal
  secondary: '#FF5722',  // Laranja
  accent: '#4CAF50',     // Verde
}
```

### Adicionar Logo

1. Coloque sua logo na pasta `public/`
2. Edite os componentes Header e Footer para referenciar sua logo

## 📱 Funcionalidades Implementadas

✅ **Header Responsivo** com menu mobile
✅ **Hero Section** com animações
✅ **Seção Sobre** com cards de características
✅ **Serviços** com ícones e descrições
✅ **Portfólio** com filtros e projetos
✅ **Depoimentos** de clientes
✅ **CTA** com múltiplas opções de contato
✅ **Footer** com links sociais
✅ **Animações** suaves com Framer Motion
✅ **Design Responsivo** para todos os dispositivos

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Deploy automático

### Netlify
1. Conecte o repositório
2. Build command: `npm run build`
3. Publish directory: `build`

## 📞 Suporte

Para dúvidas ou personalizações adicionais, entre em contato:

- **WhatsApp**: +55 11 99999-9999
- **E-mail**: contato@nandidev.com

---

**Nandi Dev** - Transformando ideias em experiências digitais incríveis! 🚀





