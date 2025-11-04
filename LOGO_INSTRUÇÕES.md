# 🎨 Instruções para a Logo da Nandi Dev

## 📁 Estrutura de Arquivos

Sua logo deve estar localizada em:
```
public/
└── logo/
    └── logo.png
```

## 📋 Formatos Suportados

- **PNG** (recomendado) - com transparência
- **JPG** - sem transparência
- **SVG** - vetorial (melhor qualidade)

## 🎯 Especificações Recomendadas

### Dimensões
- **Altura**: 48px (3rem)
- **Largura**: Proporcional (será ajustada automaticamente)
- **Resolução**: 2x para telas de alta densidade (96px de altura)

### Características
- **Fundo**: Transparente (PNG) ou branco
- **Estilo**: Moderno e limpo
- **Cores**: Harmonizar com as cores da marca (azul, laranja, verde)

## 🔧 Como Alterar a Logo

### 1. Substituir o Arquivo
1. Coloque sua nova logo em `public/logo/`
2. Mantenha o nome `logo.png` (ou altere o código)
3. O site irá carregar automaticamente

### 2. Alterar o Nome do Arquivo
Se quiser usar um nome diferente, edite os arquivos:

**Header** (`src/components/Header.js`):
```javascript
src="/logo/SEU_NOME_AQUI.png"
```

**Footer** (`src/components/Footer.js`):
```javascript
src="/logo/SEU_NOME_AQUI.png"
```

### 3. Suporte a Múltiplos Formatos
Para suporte automático a diferentes formatos, você pode:

1. **PNG**: `logo.png`
2. **JPG**: `logo.jpg` 
3. **SVG**: `logo.svg`

E alterar o código para:
```javascript
src="/logo/logo.png" // ou .jpg, .svg
```

## 🛡️ Sistema de Fallback

O site possui um sistema de fallback que:
- ✅ Tenta carregar sua logo primeiro
- ✅ Se falhar, mostra o ícone "N" com gradiente
- ✅ Garante que sempre haverá uma identidade visual

## 📱 Responsividade

A logo se adapta automaticamente:
- **Desktop**: 48px de altura
- **Mobile**: 40px de altura
- **Tablet**: 44px de altura

## 🎨 Personalização Avançada

### Alterar Tamanho
No arquivo CSS, você pode ajustar:
```css
.logo-header {
  height: 3rem; /* 48px */
}

.logo-footer {
  height: 3rem; /* 48px */
}
```

### Adicionar Efeitos
```css
.logo {
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}
```

## ✅ Checklist da Logo

- [ ] Logo salva em `public/logo/logo.png`
- [ ] Dimensões adequadas (48px altura)
- [ ] Fundo transparente (PNG) ou branco
- [ ] Qualidade boa para telas de alta resolução
- [ ] Testado em desktop e mobile
- [ ] Fallback funcionando (ícone "N" aparece se logo falhar)

## 🚀 Próximos Passos

1. **Teste**: Execute `npm start` e verifique se a logo aparece
2. **Mobile**: Teste em diferentes tamanhos de tela
3. **Performance**: Verifique se a logo carrega rapidamente
4. **Fallback**: Teste removendo a logo temporariamente para ver o fallback

---

**Dica**: Se sua logo for muito grande, use ferramentas online como TinyPNG para otimizar o tamanho sem perder qualidade! 🎨





