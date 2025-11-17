# 📊 Guia de Configuração do Google Analytics 4 (GA4)

Este guia vai te ajudar a configurar o Google Analytics 4 para monitorar visitantes, comportamento e conversões do site.

## 📋 Pré-requisitos

- Conta Google (Gmail)
- Acesso ao código do site (para adicionar o script)

---

## 🔧 Passo 1: Criar Conta no Google Analytics

1. Acesse: https://analytics.google.com
2. Faça login com sua conta Google
3. Clique em **"Começar a medir"** ou **"Criar conta"**

---

## 🔧 Passo 2: Configurar a Conta

### 2.1 Nome da Conta
- **Nome da conta**: `NandiDev` (ou o nome que preferir)
- Marque as opções de compartilhamento de dados (opcional)
- Clique em **"Avançar"**

### 2.2 Nome da Propriedade
- **Nome da propriedade**: `NandiDev Site`
- Selecione **fuso horário**: `(GMT-03:00) Brasília`
- Selecione **moeda**: `Real brasileiro (R$)`
- Clique em **"Avançar"**

### 2.3 Informações do Negócio
- **Setor**: `Tecnologia` ou `Serviços Profissionais`
- **Tamanho da empresa**: Selecione conforme seu caso
- **Como pretende usar o Google Analytics**: Marque as opções relevantes
- Clique em **"Criar"**

### 2.4 Aceitar Termos
- Leia e aceite os termos de serviço
- Clique em **"Aceitar"**

---

## 🔧 Passo 3: Configurar o Fluxo de Dados

### 3.1 Criar Fluxo de Dados para Web

1. Na tela inicial, clique em **"Adicionar fluxo de dados"** ou **"Web"**
2. **Nome do fluxo**: `NandiDev Website`
3. **URL do site**: `https://www.nandidev.com.br`
4. Marque **"Ativar melhorias de medição"** (recomendado)
5. Clique em **"Criar fluxo"**

### 3.2 Copiar o ID de Medição

1. Após criar o fluxo, você verá uma tela com o **ID de Medição**
2. O ID será algo como: `G-XXXXXXXXXX`
3. **Copie esse ID** (você vai precisar dele)

---

## 🔧 Passo 4: Adicionar o Google Analytics ao Site

### 4.1 Instalar o Script no HTML

1. Abra o arquivo `public/index.html`
2. Adicione o script do Google Analytics dentro da tag `<head>`, **antes do fechamento** `</head>`:

```html
<head>
  <!-- ... outras tags ... -->
  
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>
```

**⚠️ IMPORTANTE**: Substitua `G-XXXXXXXXXX` pelo seu ID de Medição real!

### 4.2 Fazer Commit e Deploy

```bash
git add public/index.html
git commit -m "Adiciona Google Analytics 4"
git push origin main
```

3. Aguarde o deploy no Railway (2-5 minutos)

---

## 🔧 Passo 5: Verificar se Está Funcionando

### Método 1: Google Analytics DebugView

1. No Google Analytics, vá em **"Configurar"** → **"DebugView"**
2. Acesse o site `https://www.nandidev.com.br`
3. Você deve ver eventos aparecendo em tempo real

### Método 2: Extensão do Chrome

1. Instale a extensão [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
2. Ative a extensão
3. Acesse o site
4. Abra o Console (F12) e verifique se há mensagens do GA4

### Método 3: Verificar no Código Fonte

1. Acesse `https://www.nandidev.com.br`
2. Clique com botão direito → **"Ver código-fonte"**
3. Procure por `gtag` ou `G-` - deve aparecer o script

---

## 📊 Passo 6: Configurar Eventos Personalizados (Opcional)

### Eventos Importantes para Monitorar:

1. **Clique no Chatbot**: Quando alguém abre o chatbot
2. **Envio de Formulário**: Quando alguém preenche o SmartForm
3. **Agendamento**: Quando alguém agenda uma reunião
4. **Clique no WhatsApp**: Quando alguém clica no botão do WhatsApp

### Como Adicionar Eventos:

No componente onde você quer rastrear, adicione:

```javascript
// Exemplo: quando o chatbot é aberto
gtag('event', 'chatbot_aberto', {
  'event_category': 'Engajamento',
  'event_label': 'Chatbot'
});

// Exemplo: quando o formulário é enviado
gtag('event', 'formulario_enviado', {
  'event_category': 'Conversão',
  'event_label': 'SmartForm'
});
```

---

## 📈 Passo 7: Configurar Conversões

1. No Google Analytics, vá em **"Configurar"** → **"Eventos"**
2. Clique em **"Marcar como conversão"**
3. Selecione os eventos importantes:
   - `formulario_enviado`
   - `agendamento_realizado`
   - `whatsapp_clicado`

---

## 🎯 Métricas Importantes para Monitorar

### 1. Usuários e Sessões
- **Usuários**: Quantas pessoas únicas visitam o site
- **Sessões**: Quantas visitas ao site
- **Taxa de rejeição**: % de visitantes que saem sem interagir

### 2. Comportamento
- **Páginas mais visitadas**: Quais seções do site são mais populares
- **Tempo na página**: Quanto tempo as pessoas ficam
- **Taxa de saída**: De qual página as pessoas saem

### 3. Conversões
- **Formulários enviados**: Quantos leads foram capturados
- **Chatbot aberto**: Quantas pessoas interagiram com o chatbot
- **Agendamentos**: Quantos agendamentos foram feitos

### 4. Origem do Tráfego
- **Orgânico**: Pessoas que chegaram pelo Google
- **Direto**: Pessoas que digitaram a URL
- **Referência**: Pessoas que vieram de outros sites

---

## 🔔 Passo 8: Configurar Alertas (Opcional)

1. Vá em **"Configurar"** → **"Alertas personalizados"**
2. Crie alertas para:
   - Aumento súbito de tráfego
   - Queda de conversões
   - Erros no site

---

## ⚠️ Dicas Importantes

- **Dados em tempo real**: Aparecem imediatamente
- **Relatórios padrão**: Podem levar até 24-48 horas para aparecer
- **Privacidade**: O GA4 está em conformidade com LGPD quando configurado corretamente
- **Filtros**: Configure filtros para excluir seu próprio tráfego (seu IP)

---

## 🆘 Problemas Comuns

### "Não está coletando dados"
- Verifique se o ID de Medição está correto
- Confirme que o script está no `<head>` do HTML
- Aguarde alguns minutos após o deploy

### "Dados não aparecem"
- Normal nas primeiras 24-48 horas
- Use o DebugView para verificar em tempo real
- Verifique se não há bloqueadores de anúncios ativos

### "Eventos não aparecem"
- Verifique se o código `gtag('event', ...)` está sendo executado
- Use o Console do navegador para verificar erros
- Confirme que o script do GA4 carregou antes de disparar eventos

---

## 📚 Recursos Adicionais

- [Documentação Oficial GA4](https://developers.google.com/analytics/devguides/collection/ga4)
- [Central de Ajuda](https://support.google.com/analytics)
- [Guia de Migração do Universal Analytics](https://support.google.com/analytics/answer/10759417)

---

## 🔗 Integração com Google Search Console

1. No Google Analytics, vá em **"Configurar"** → **"Links de propriedade"**
2. Clique em **"Link"** ao lado de "Search Console"
3. Selecione a propriedade do Search Console
4. Clique em **"Confirmar"**

Isso permite ver dados de busca diretamente no Analytics!

---

**Pronto!** Seu site está configurado no Google Analytics 4. 🎉

Agora você pode monitorar visitantes, comportamento e conversões em tempo real!

