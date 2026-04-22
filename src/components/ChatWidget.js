import React, { useState, useEffect, useRef, useCallback } from 'react';

const WEBHOOK_URL = 'https://n8n-railway-production-f85d.up.railway.app/webhook/nina-nandi';
const WA_NUMBER   = '5554996246565';
const WA_MSG      = 'Oi Nina! Vim pelo site da NandiDev e quero saber mais.';

const wait = (min, max) =>
  new Promise(res => setTimeout(res, min + Math.random() * (max - min)));

const NINA_CONTEXT = `Você é a Nina, consultora de tecnologia e IA da NandiDev. Você é simpática, direta e humanizada.

A NandiDev oferece as seguintes soluções:
1. Automação de Disparos WhatsApp — campanhas em massa, voz com IA, follow-up automático, teste A/B
2. Atendimento Multi-Agente — omnichannel, sugestões por IA, análise de sentimento, fila inteligente
3. Automação de Redes Sociais — posts e carrosséis com IA, agendamento Instagram/TikTok/LinkedIn, analytics
4. SDR Jurídico Inteligente — SDR com IA para escritórios jurídicos, 8 funções ultra-humanizadas, funil por área do direito, agenda integrada
5. SDR Humanizada (qualquer segmento) — SDR com IA que se adapta a qualquer empresa que precise qualificar leads e atender com IA
6. Radar Comercial — prospecção B2B com IA, score de leads (quentes/mornos/frios), Growth Radar, Market Scanner, pipeline completo
7. Projetos sob medida — desenvolvimento de sistemas, apps, sites, integrações com LLMs, arquitetura de IA personalizada

Se o cliente não se identificar com nenhuma das soluções acima, diga que a NandiDev também faz projetos 100% sob medida para qualquer necessidade.

Seu objetivo é entender a dor do cliente e indicar a solução mais adequada. Seja calorosa, faça perguntas abertas e direcione para o WhatsApp quando o interesse estiver claro.`;

export default function ChatWidget() {
  const [open, setOpen]       = useState(false);
  const [msgs, setMsgs]       = useState([]);
  const [input, setInput]     = useState('');
  const [typing, setTyping]   = useState(false);
  const [busy, setBusy]       = useState(false);
  const [waCTA, setWaCTA]     = useState(false);
  const [started, setStarted] = useState(false);
  const [imgOk, setImgOk]     = useState(true);

  const endRef     = useRef(null);
  const inputRef   = useRef(null);
  const historyRef = useRef([]);
  const sessionId  = useRef('nina_' + Date.now());

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, typing]);

  useEffect(() => {
    if (!open || started) return;
    setStarted(true);

    (async () => {
      setTyping(true);
      await wait(1200, 2000);
      setTyping(false);
      addNina('Oi! Tudo bem? 😊');

      setTyping(true);
      await wait(1200, 1800);
      setTyping(false);
      addNina('Sou a Nina, consultora da NandiDev!');

      setTyping(true);
      await wait(1800, 2500);
      setTyping(false);
      const abertura = 'Estou aqui pra entender o que você precisa e te mostrar a solução certa — seja automação de WhatsApp, atendimento com IA, SDR inteligente, prospecção de leads ou um projeto do zero. Me conta: qual é o maior desafio hoje no seu negócio?';
      addNina(abertura);

      historyRef.current = [
        { role: 'assistant', content: 'Oi! Tudo bem? 😊' },
        { role: 'assistant', content: 'Sou a Nina, consultora da NandiDev!' },
        { role: 'assistant', content: abertura },
      ];
    })();
  }, [open, started]);

  function addNina(text) {
    setMsgs(prev => [...prev, { id: Date.now() + Math.random(), role: 'nina', text }]);
    historyRef.current.push({ role: 'assistant', content: text });
  }

  function addUser(text) {
    setMsgs(prev => [...prev, { id: Date.now() + Math.random(), role: 'user', text }]);
    historyRef.current.push({ role: 'user', content: text });
  }

  const send = useCallback(async () => {
    if (!input.trim() || typing || busy) return;
    const text = input.trim();
    setInput('');
    setBusy(true);
    addUser(text);

    setTyping(true);
    await wait(1800, 3500);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 60000);

      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          sessionId: sessionId.current,
          message: text,
          history: historyRef.current.slice(-14),
          ninaContext: NINA_CONTEXT,
        }),
      });
      clearTimeout(timeout);

      const data = await res.json();
      setTyping(false);

      const messages = data.messages || [data.message || 'Me conta mais 😊'];
      const delayBetween = data.delay_between ?? 2500;

      for (let i = 0; i < messages.length; i++) {
        if (i > 0) {
          setTyping(true);
          await wait(delayBetween, delayBetween + 3000);
          setTyping(false);
        }
        addNina(messages[i]);
      }

      if (data.whatsappCTA) setWaCTA(true);

    } catch {
      setTyping(false);
      addNina('Tive um probleminha aqui... Que tal a gente continuar no WhatsApp? 😊');
      setWaCTA(true);
    }

    setBusy(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [input, typing, busy]);

  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`;

  const AvatarImg = ({ size = 40, fontSize = 15 }) =>
    imgOk ? (
      <img
        src="/nina.jpg"
        alt="Nina"
        onError={() => setImgOk(false)}
        style={{
          width: size, height: size, borderRadius: '50%',
          objectFit: 'cover', flexShrink: 0,
          border: '2px solid rgba(139,92,246,0.4)',
        }}
      />
    ) : (
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 800, color: '#fff', fontSize, flexShrink: 0,
      }}>N</div>
    );

  return (
    <>
      {open && (
        <div style={styles.window}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerLeft}>
              <div style={{ position: 'relative' }}>
                <AvatarImg size={44} fontSize={16} />
                <span style={styles.onlineBadge} />
              </div>
              <div>
                <p style={styles.name}>Nina</p>
                <p style={styles.subtitle}>Consultora NandiDev · Online agora</p>
              </div>
            </div>
            <button style={styles.closeBtn} onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* Messages */}
          <div style={styles.messages}>
            {msgs.length === 0 && !typing && (
              <div style={styles.empty}>
                <AvatarImg size={64} fontSize={24} />
                <p style={{ marginTop: 14, marginBottom: 4, fontWeight: 600, color: '#c0c0d0' }}>Olá, sou a Nina! 👋</p>
                <p style={{ fontSize: 13, color: '#505060', lineHeight: 1.5 }}>Consultora de tecnologia e IA da NandiDev. Vou te ajudar a encontrar a solução certa!</p>
              </div>
            )}

            {msgs.map(msg => (
              <div key={msg.id} style={{ ...styles.row, ...(msg.role === 'user' ? styles.rowUser : {}) }}>
                {msg.role === 'nina' && (
                  <div style={{ alignSelf: 'flex-end', marginBottom: 2 }}>
                    <AvatarImg size={28} fontSize={10} />
                  </div>
                )}
                <div style={{ ...styles.bubble, ...(msg.role === 'user' ? styles.bubbleUser : styles.bubbleNina) }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {typing && (
              <div style={styles.row}>
                <div style={{ alignSelf: 'flex-end', marginBottom: 2 }}>
                  <AvatarImg size={28} fontSize={10} />
                </div>
                <div style={{ ...styles.bubble, ...styles.bubbleNina, ...styles.typingBubble }}>
                  <span style={styles.dot} />
                  <span style={{ ...styles.dot, animationDelay: '0.18s' }} />
                  <span style={{ ...styles.dot, animationDelay: '0.36s' }} />
                </div>
              </div>
            )}

            {waCTA && (
              <div style={styles.waCTAWrap}>
                <a href={waLink} target="_blank" rel="noopener noreferrer" style={styles.waBtn}>
                  Continuar no WhatsApp 💬
                </a>
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Input */}
          <div style={styles.inputArea}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKey}
              placeholder="Digite sua mensagem..."
              disabled={busy || typing}
              style={{ ...styles.input, opacity: (busy || typing) ? 0.5 : 1 }}
            />
            <button
              onClick={send}
              disabled={busy || typing || !input.trim()}
              style={{ ...styles.sendBtn, opacity: (busy || typing || !input.trim()) ? 0.4 : 1 }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        style={{ ...styles.fab, ...(open ? styles.fabOpen : {}) }}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Fechar chat' : 'Falar com a Nina'}
      >
        {open ? (
          <span style={{ fontSize: 18, color: '#aaa' }}>✕</span>
        ) : imgOk ? (
          <>
            <img
              src="/nina.jpg"
              alt="Nina"
              onError={() => setImgOk(false)}
              style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover' }}
            />
            <span style={styles.pulse} />
          </>
        ) : (
          <>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>N</span>
            <span style={styles.pulse} />
          </>
        )}
      </button>

      <style>{`
        @keyframes nina-pulse {
          0%,100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.3); opacity: 0.7; }
        }
        @keyframes nina-dot {
          0%,80%,100% { transform: translateY(0); opacity: 0.4; }
          40%          { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes nina-appear {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}

const styles = {
  fab: {
    position: 'fixed', bottom: 24, right: 24,
    width: 60, height: 60, borderRadius: '50%',
    background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
    border: 'none', cursor: 'pointer',
    boxShadow: '0 6px 24px rgba(99,102,241,0.45)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 9999, transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    padding: 0, overflow: 'hidden',
  },
  fabOpen: {
    background: '#1e1e2e',
    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
  },
  pulse: {
    position: 'absolute', top: 3, right: 3,
    width: 14, height: 14, background: '#22c55e',
    borderRadius: '50%', border: '2px solid white',
    animation: 'nina-pulse 2.2s ease-in-out infinite',
  },
  window: {
    position: 'fixed', bottom: 96, right: 24,
    width: 370, height: 560,
    background: '#0d0d12', borderRadius: 20,
    border: '1px solid rgba(255,255,255,0.07)',
    boxShadow: '0 24px 72px rgba(0,0,0,0.55)',
    display: 'flex', flexDirection: 'column',
    overflow: 'hidden', zIndex: 9999,
    animation: 'nina-appear 0.22s cubic-bezier(0.34,1.56,0.64,1)',
    fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
  },
  header: {
    padding: '14px 18px',
    background: 'linear-gradient(135deg,#13131f,#1a1a30)',
    borderBottom: '1px solid rgba(255,255,255,0.055)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    flexShrink: 0,
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: 12 },
  onlineBadge: {
    position: 'absolute', bottom: 1, right: 1,
    width: 11, height: 11, background: '#22c55e',
    borderRadius: '50%', border: '2px solid #13131f',
  },
  name:     { margin: 0, fontWeight: 700, fontSize: 15, color: '#f0f0f8', lineHeight: 1.3 },
  subtitle: { margin: 0, fontSize: 11.5, color: '#22c55e', lineHeight: 1.3, fontWeight: 500 },
  closeBtn: { background: 'transparent', border: 'none', color: '#555', fontSize: 15, cursor: 'pointer', padding: 6, borderRadius: 6 },
  messages: {
    flex: 1, overflowY: 'auto', padding: '18px 14px 14px',
    display: 'flex', flexDirection: 'column', gap: 8,
    scrollbarWidth: 'thin', scrollbarColor: '#2a2a3a transparent',
  },
  empty: { textAlign: 'center', color: '#505060', fontSize: 14, padding: '32px 24px', lineHeight: 1.6, display: 'flex', flexDirection: 'column', alignItems: 'center' },
  row:     { display: 'flex', alignItems: 'flex-end', gap: 8 },
  rowUser: { flexDirection: 'row-reverse' },
  bubble:  { maxWidth: '76%', padding: '10px 14px', borderRadius: 18, fontSize: 14, lineHeight: 1.55, wordBreak: 'break-word' },
  bubbleNina: { background: '#1c1c2c', color: '#dddde8', borderBottomLeftRadius: 4 },
  bubbleUser: { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', borderBottomRightRadius: 4 },
  typingBubble: { display: 'flex', alignItems: 'center', gap: 5, minWidth: 50, padding: '12px 14px' },
  dot: {
    display: 'block', width: 7, height: 7, background: '#6366f1', borderRadius: '50%',
    animation: 'nina-dot 1.3s infinite ease-in-out',
  },
  waCTAWrap: { display: 'flex', justifyContent: 'center', padding: '8px 0 4px' },
  waBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 7,
    background: '#25d366', color: '#fff', textDecoration: 'none',
    fontSize: 13.5, fontWeight: 700, padding: '9px 20px', borderRadius: 22,
    boxShadow: '0 3px 12px rgba(37,211,102,0.3)',
  },
  inputArea: {
    display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
    borderTop: '1px solid rgba(255,255,255,0.055)', background: '#0d0d12', flexShrink: 0,
  },
  input: {
    flex: 1, background: '#18182a', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12, padding: '10px 14px', color: '#f0f0f0', fontSize: 14,
    outline: 'none', fontFamily: 'inherit',
  },
  sendBtn: {
    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
    background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none',
    color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: 16,
  },
};
