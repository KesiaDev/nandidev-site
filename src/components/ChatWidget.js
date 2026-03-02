import React, { useState, useEffect, useRef } from 'react';

const ChatWidget = () => {
  const AVATAR_URL = "https://softwareplay.com.br/wp-content/uploads/2025/06/bia.png";
  const WEBHOOK_URL = "https://drybee-n8n.cloudfy.live/webhook/32610611-454c-4640-9816-93f3a432ea54-asdseeeedsd";
  const INITIAL_RESPONSE = "Pronto! Agora posso te ajudar\nQual serviço você gostaria de conhecer?\n\n- Criação de Sites\n- Gestão de Tráfego\n- Automações";

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('welcome'); // welcome, nome, whatsapp, chat
  const [userData, setUserData] = useState({ nome: '', whatsapp: '', session: 'softwareplay-usuario' });
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [inputNome, setInputNome] = useState('');
  const [inputWhatsapp, setInputWhatsapp] = useState('');
  const chatlogRef = useRef(null);
  const chatInputRef = useRef(null);

  useEffect(() => {
    if (chatlogRef.current) {
      chatlogRef.current.scrollTop = chatlogRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const startChat = () => {
    setStep('nome');
  };

  const enviarNome = () => {
    const nome = inputNome.trim();
    if (!nome) {
      alert('Digite seu nome!');
      return;
    }
    setUserData(prev => ({ ...prev, nome }));
    setStep('whatsapp');
    setTimeout(() => {
      if (chatInputRef.current) {
        chatInputRef.current.focus();
      }
    }, 100);
  };

  const formatWhatsApp = (value) => {
    let digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) {
      return digits.replace(/(\d{0,2})/, '($1');
    } else if (digits.length <= 7) {
      return digits.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    } else {
      return digits.replace(/(\d{2})(\d{1})(\d{0,4})(\d{0,4})/, '($1) $2 $3-$4');
    }
  };

  const handleWhatsappChange = (e) => {
    const formatted = formatWhatsApp(e.target.value);
    setInputWhatsapp(formatted);
  };

  const enviarWhatsapp = async () => {
    const raw = inputWhatsapp.trim();
    const digits = raw.replace(/\D/g, '');
    if (digits.length < 10) {
      alert('Digite um número válido com DDD!');
      return;
    }

    const whatsapp = `+55${digits}`;
    setUserData(prev => ({ ...prev, whatsapp }));

    // Adicionar mensagem de confirmação
    setMessages(prev => [...prev, {
      type: 'bot',
      text: '👩‍💼 Bia: Obrigada! Vou começar seu atendimento agora 😊'
    }]);

    setStep('chat');

    // Adicionar loading
    setMessages(prev => [...prev, {
      type: 'loading',
      text: 'Bia está digitando...'
    }]);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userData, whatsapp })
      });

      const data = await response.json();

      // Remover loading
      setMessages(prev => prev.filter(msg => msg.type !== 'loading'));

      const resposta = data.resposta || INITIAL_RESPONSE;
      const regexWa = /(https:\/\/wa\.me\/[0-9?=]+)/;
      const match = resposta.match(regexWa);

      if (match) {
        const link = match[1];
        const textoSemLink = resposta.replace(link, '').trim();
        setMessages(prev => [...prev, {
          type: 'bot',
          text: textoSemLink,
          link: link,
          linkText: '💬 Falar no WhatsApp'
        }]);
      } else {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: resposta
        }]);
      }
    } catch (err) {
      setMessages(prev => prev.filter(msg => msg.type !== 'loading'));
      setMessages(prev => [...prev, {
        type: 'bot',
        text: '❌ Erro ao iniciar atendimento.'
      }]);
    }
  };

  const sendChat = async () => {
    const message = inputMessage.trim();
    if (!message) return;

    // Adicionar mensagem do usuário
    setMessages(prev => [...prev, {
      type: 'user',
      text: message
    }]);

    setInputMessage('');

    const payload = { message, session: userData.session };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      const respostas = Array.isArray(data) ? data : [data];

      for (let i = 0; i < respostas.length; i++) {
        // Adicionar loading
        setMessages(prev => [...prev, {
          type: 'loading',
          text: 'Bia está digitando...'
        }]);

        await new Promise(res => setTimeout(res, 1000 + i * 300));

        // Remover loading
        setMessages(prev => prev.filter(msg => msg.type !== 'loading'));

        const texto = respostas[i].resposta || '';

        if (texto.trim()) {
          const regexWa = /(https:\/\/wa\.me\/[0-9?=]+)/;
          const match = texto.match(regexWa);

          if (match) {
            const link = match[1];
            const textoSemLink = texto.replace(link, '').trim();
            setMessages(prev => [...prev, {
              type: 'bot',
              text: textoSemLink,
              link: link,
              linkText: '💬 Continuar no WhatsApp'
            }]);
          } else {
            setMessages(prev => [...prev, {
              type: 'bot',
              text: texto
            }]);
          }
        }
      }
    } catch (err) {
      setMessages(prev => prev.filter(msg => msg.type !== 'loading'));
      setMessages(prev => [...prev, {
        type: 'bot',
        text: '❌ Erro ao se comunicar com a IA.'
      }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (step === 'chat') {
        sendChat();
      } else if (step === 'nome') {
        enviarNome();
      } else if (step === 'whatsapp') {
        enviarWhatsapp();
      }
    }
  };

  return (
    <>
      {/* Botão Flutuante */}
      <div
        id="chat-launcher"
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          display: 'flex',
          alignItems: 'center',
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '50px',
          padding: '10px 16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
          zIndex: 9999,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 14px rgba(0, 0, 0, 0.25)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        }}
      >
        <div style={{ marginRight: '12px' }}>
          <img
            src={AVATAR_URL}
            alt="Avatar"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: '14px',
          color: '#333',
          fontFamily: "'Segoe UI', sans-serif",
          textAlign: 'left'
        }}>
          <div style={{ fontWeight: 600, fontSize: '15px', color: '#0073e6' }}>
            Olá 👋
          </div>
          <div>Possui alguma dúvida?</div>
        </div>
      </div>

      {/* Chatbox */}
      {isOpen && (
        <div
          id="chat-container"
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '20px',
            width: '380px',
            height: 'auto',
            minHeight: '500px',
            maxHeight: '60vh',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: "'Segoe UI', sans-serif",
            zIndex: 9999
          }}
        >
          {/* Header */}
          <div style={{
            background: '#0073e6',
            color: 'white',
            padding: '16px',
            fontWeight: 'bold',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={AVATAR_URL}
                alt="Avatar"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  marginRight: '10px',
                  objectFit: 'cover'
                }}
              />
              Software Play - Bia
            </span>
            <span
              style={{ cursor: 'pointer', fontSize: '20px' }}
              onClick={toggleChat}
            >
              ✖
            </span>
          </div>

          {/* Body */}
          <div
            ref={chatlogRef}
            style={{
              padding: '16px',
              flex: 1,
              overflowY: 'auto',
              fontSize: '14px',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#fafafa'
            }}
          >
            {/* Welcome */}
            {step === 'welcome' && (
              <div style={{
                background: '#f1f1f1',
                borderRadius: '14px',
                padding: '12px 14px',
                marginBottom: '10px',
                maxWidth: '85%',
                fontSize: '14px',
                lineHeight: 1.4
              }}>
                <strong>Oi! 👋</strong><br />
                Eu sou a <strong>Bia</strong>, assistente da Software Play. Posso te ajudar com sites, lojas ou tráfego pago.<br />
                <button
                  onClick={startChat}
                  style={{
                    marginTop: '12px',
                    padding: '10px 16px',
                    border: 'none',
                    background: '#0073e6',
                    color: 'white',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: 'none'
                  }}
                >
                  Sim, conversar agora
                </button>
              </div>
            )}

            {/* Step Nome */}
            {step === 'nome' && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                background: '#f1f1f1',
                borderRadius: '14px',
                padding: '12px 14px',
                marginBottom: '10px',
                maxWidth: '85%'
              }}>
                <label style={{ fontWeight: 500, fontSize: '15px', marginBottom: '4px', color: '#333' }}>
                  <strong>Qual seu nome?</strong>
                </label>
                <input
                  type="text"
                  value={inputNome}
                  onChange={(e) => setInputNome(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite seu nome..."
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    fontSize: '14px'
                  }}
                />
                <button
                  onClick={enviarNome}
                  style={{
                    marginTop: '12px',
                    padding: '10px 16px',
                    border: 'none',
                    background: '#0073e6',
                    color: 'white',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Continuar
                </button>
              </div>
            )}

            {/* Step WhatsApp */}
            {step === 'whatsapp' && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                background: '#f1f1f1',
                borderRadius: '14px',
                padding: '12px 14px',
                marginBottom: '10px',
                maxWidth: '85%'
              }}>
                <label style={{ fontWeight: 500, fontSize: '15px', marginBottom: '4px', color: '#333' }}>
                  <strong>Qual seu WhatsApp (com DDD)?</strong>
                </label>
                <input
                  ref={chatInputRef}
                  type="text"
                  value={inputWhatsapp}
                  onChange={handleWhatsappChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Ex: (xx) xxxxx-xxxx"
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    fontSize: '14px'
                  }}
                />
                <button
                  onClick={enviarWhatsapp}
                  style={{
                    marginTop: '12px',
                    padding: '10px 16px',
                    border: 'none',
                    background: '#0073e6',
                    color: 'white',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Iniciar Atendimento
                </button>
              </div>
            )}

            {/* Messages */}
            {step === 'chat' && messages.map((msg, index) => {
              if (msg.type === 'loading') {
                return (
                  <div
                    key={index}
                    style={{
                      background: '#f1f1f1',
                      borderRadius: '14px',
                      padding: '12px 14px',
                      marginBottom: '10px',
                      maxWidth: '85%',
                      fontSize: '14px',
                      lineHeight: 1.4
                    }}
                  >
                    {msg.text}
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  style={{
                    background: msg.type === 'user' ? '#0073e6' : '#f1f1f1',
                    color: msg.type === 'user' ? 'white' : '#333',
                    borderRadius: '14px',
                    padding: '12px 14px',
                    marginBottom: '10px',
                    maxWidth: '85%',
                    fontSize: '14px',
                    lineHeight: 1.4,
                    alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  {msg.type === 'bot' && '👩‍💼 Bia: '}
                  {msg.text}
                  {msg.link && (
                    <a
                      href={msg.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        marginTop: '8px',
                        padding: '8px 16px',
                        backgroundColor: '#25D366',
                        color: 'white',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '14px'
                      }}
                    >
                      {msg.linkText}
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          {step === 'chat' && (
            <div style={{
              borderTop: '1px solid #eee',
              padding: '12px',
              display: 'flex',
              gap: '8px',
              background: '#fff'
            }}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <button
                onClick={sendChat}
                style={{
                  background: '#0073e6',
                  color: 'white',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '14px'
                }}
              >
                Enviar
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;

