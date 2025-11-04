# Nandi Dev - Website

Site moderno e profissional para apresentar os serviços da **Nandi Dev**, empresa especializada em desenvolvimento de sites, aplicativos e sistemas web personalizados.

## 🚀 Características

- **Design Moderno**: Interface limpa e profissional com animações suaves
- **Totalmente Responsivo**: Adaptado para todos os dispositivos
- **Performance Otimizada**: Carregamento rápido e experiência fluida
- **SEO Friendly**: Otimizado para mecanismos de busca
- **Animações**: Transições suaves com Framer Motion
- **Cores da Marca**: Azul (#007BFF), Laranja (#FF5722) e Verde (#4CAF50)

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca principal
- **Tailwind CSS** - Framework de estilos
- **Framer Motion** - Animações e transições
- **Lucide React** - Ícones modernos
- **Responsive Design** - Mobile-first approach

## 📦 Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/nandidev/website.git
   cd website
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto**
   ```bash
   npm start
   ```

4. **Acesse no navegador**
   ```
   http://localhost:3000
   ```

## 🏗️ Build para Produção

```bash
npm run build
```

## 📱 Seções do Site

### 1. **Header**
- Logo da Nandi Dev
- Menu de navegação responsivo
- Botão "Solicitar Orçamento" com integração WhatsApp

### 2. **Hero Section**
- Frase principal impactante
- Botões de ação (Ver Portfólio / Fale Conosco)
- Estatísticas da empresa
- Animações de fundo

### 3. **Sobre a Nandi Dev**
- Apresentação da empresa
- Diferenciais competitivos
- Cards com características principais

### 4. **Serviços**
- Cards com ícones para cada serviço:
  - 🌐 Desenvolvimento de Sites
  - 🛒 Lojas Virtuais (E-commerce)
  - 📱 Aplicativos Mobile
  - ⚙️ Sistemas Web Personalizados
  - 🔧 Manutenção e Otimização

### 5. **Portfólio**
- Grade de projetos com filtros
- Modal para visualização detalhada
- Links para projetos e código

### 6. **Depoimentos**
- Avaliações de clientes satisfeitos
- Sistema de avaliação com estrelas
- Estatísticas da empresa

### 7. **Chamada Final (CTA)**
- Seção de contato com múltiplas opções
- Processo de trabalho explicado
- Botões de ação destacados

### 8. **Rodapé**
- Links sociais (WhatsApp, Instagram, GitHub, E-mail)
- Informações de contato
- Links de navegação

## 🎨 Personalização

### Cores
As cores podem ser alteradas no arquivo `tailwind.config.js`:

```javascript
colors: {
  primary: '#007BFF',    // Azul principal
  secondary: '#FF5722',  // Laranja
  accent: '#4CAF50',     // Verde
}
```

### Conteúdo
- **Textos**: Edite diretamente nos componentes
- **Imagens**: Substitua as URLs das imagens nos componentes
- **Links**: Atualize os links de contato e redes sociais

### Animações
As animações podem ser personalizadas nos componentes usando Framer Motion.

## 📞 Integração de Contato

### WhatsApp
```javascript
const handleWhatsApp = () => {
  window.open('https://wa.me/5511999999999?text=Mensagem', '_blank');
};
```

### E-mail
```javascript
const handleEmail = () => {
  window.open('mailto:contato@nandidev.com', '_blank');
};
```

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente se necessário
3. Deploy automático a cada push

### Netlify
1. Conecte o repositório ao Netlify
2. Configure o build command: `npm run build`
3. Configure o publish directory: `build`

### GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build
npx gh-pages -d build
```

## 📈 SEO e Performance

- Meta tags otimizadas
- Imagens com lazy loading
- Animações performáticas
- Código limpo e otimizado
- Estrutura semântica HTML

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato:

- **WhatsApp**: +55 11 99999-9999
- **E-mail**: contato@nandidev.com
- **Instagram**: @nandidev
- **GitHub**: @nandidev

---

**Nandi Dev** - Transformando ideias em experiências digitais incríveis! 🚀





