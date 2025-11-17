# 🔗 Integração com Google Meet - Guia Futuro

## 📋 Status Atual

Atualmente, o sistema gera links do Google Meet com formato aleatório (`meet.google.com/xxx-xxxx-xxx`). Esses links **não são reais** e não criam reuniões no Google Calendar.

## 🎯 Integração Completa com Google Meet

Para criar reuniões reais do Google Meet que apareçam no Google Calendar, é necessário:

### 1. Configurar Google Cloud Project

1. Acesse: https://console.cloud.google.com
2. Crie um novo projeto ou selecione um existente
3. Ative a **Google Calendar API**
4. Ative a **Google Meet API** (se disponível)

### 2. Criar Credenciais OAuth 2.0

1. Vá em **APIs & Services** → **Credentials**
2. Clique em **Create Credentials** → **OAuth client ID**
3. Configure:
   - **Application type**: Web application
   - **Authorized redirect URIs**: `https://friendly-exploration-production.up.railway.app/api/auth/google/callback`
4. Baixe o arquivo JSON com as credenciais

### 3. Instalar Dependências

```bash
cd server
npm install googleapis
```

### 4. Implementar Autenticação

```javascript
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Obter URL de autorização
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events'
  ]
});
```

### 5. Criar Reunião no Google Calendar

```javascript
const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

async function createGoogleMeetEvent(appointment) {
  const event = {
    summary: `Reunião NandiDev - ${appointment.clientName}`,
    description: `Reunião agendada via chatbot NandiDev`,
    start: {
      dateTime: appointment.dateTime,
      timeZone: 'America/Sao_Paulo',
    },
    end: {
      dateTime: new Date(new Date(appointment.dateTime).getTime() + 60 * 60 * 1000).toISOString(), // +1 hora
      timeZone: 'America/Sao_Paulo',
    },
    attendees: [
      { email: appointment.clientEmail },
    ],
    conferenceData: {
      createRequest: {
        requestId: `meet-${appointment.id}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 }, // 1 dia antes
        { method: 'popup', minutes: 15 }, // 15 min antes
      ],
    },
  };

  const response = await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    resource: event,
  });

  return {
    meetingLink: response.data.hangoutLink,
    calendarLink: response.data.htmlLink,
    eventId: response.data.id,
  };
}
```

### 6. Variáveis de Ambiente

Adicione no `.env` do servidor:

```env
GOOGLE_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=seu-client-secret
GOOGLE_REDIRECT_URI=https://friendly-exploration-production.up.railway.app/api/auth/google/callback
GOOGLE_REFRESH_TOKEN=token-gerado-apos-primeira-autorizacao
```

### 7. Atualizar Rota de Agendamento

```javascript
app.post('/api/appointments', async (req, res) => {
  // ... código existente ...
  
  // Criar reunião no Google Calendar
  try {
    const meetData = await createGoogleMeetEvent(appointment);
    appointment.meetingLink = meetData.meetingLink;
    appointment.calendarLink = meetData.calendarLink;
    appointment.googleEventId = meetData.eventId;
  } catch (error) {
    console.error('Erro ao criar reunião no Google:', error);
    // Continuar mesmo se falhar (usar link aleatório como fallback)
  }
  
  // ... resto do código ...
});
```

## ⚠️ Considerações Importantes

1. **Autenticação**: É necessário autorizar o app uma vez e salvar o `refresh_token`
2. **Quotas**: Google Calendar API tem limites de requisições
3. **Custos**: Google Calendar API é gratuita até certo limite
4. **Segurança**: Nunca commite credenciais no Git

## 🔄 Alternativas Mais Simples

### Opção 1: Calendly (Pago)
- Integração mais fácil
- Interface pronta
- Custo: ~$10-15/mês

### Opção 2: Google Calendar Embed
- Embed do calendário no site
- Cliente agenda diretamente
- Gratuito, mas menos automático

### Opção 3: Zoom API
- Similar ao Google Meet
- Pode ser mais simples de integrar
- Requer conta Zoom Pro

## 📚 Recursos

- [Google Calendar API Docs](https://developers.google.com/calendar/api/v3/reference)
- [Google Meet API](https://developers.google.com/meet/api)
- [OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)

---

**Nota**: A implementação atual funciona para testes, mas os links gerados não são reais. Para produção, recomenda-se implementar a integração completa com Google Calendar API.

