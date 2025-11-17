import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader, FileText, DollarSign, Calendar, CheckCircle, Clock, Building, Target, AlertCircle } from 'lucide-react';
import SmartForm from './SmartForm';

// URL da API do backend - prioridade: variável de ambiente > constante
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://friendly-exploration-production.up.railway.app';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Olá! 👋 Sou o Assistente Inteligente da NandiDev.\n\nVou te ajudar a entender a melhor solução para o que você precisa.\n\nPara começarmos, qual é o objetivo principal do projeto que você quer criar ou melhorar?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    segment: '',
    businessType: '',
    needs: [],
    objectives: '',
    currentSystem: '',
    users: '',
    budget: '',
    timeline: '',
    challenges: ''
  });
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showSmartForm, setShowSmartForm] = useState(false);
  const [diagnostic, setDiagnostic] = useState(null);
  const [proposal, setProposal] = useState(null);
  const [showAppointment, setShowAppointment] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [viewportWidth, setViewportWidth] = useState(() => {
    if (typeof window === 'undefined') return 1024;
    return window.innerWidth;
  });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (showAppointment && !selectedDate) {
      const today = new Date().toISOString().split('T')[0];
      loadAvailableSlots(today);
    }
  }, [showAppointment]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = viewportWidth < 640;
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024;

  const widgetDimensionClass = isMobile
    ? 'w-full h-full max-h-screen'
    : isTablet
    ? (showSmartForm ? 'w-[540px] h-[80vh]' : 'w-[420px] h-[640px]')
    : (showSmartForm ? 'w-[600px] h-[700px]' : 'w-96 h-[600px]');

  const widgetPositionClass = isMobile ? 'fixed inset-0' : 'fixed bottom-6 right-6';
  const widgetRadiusClass = isMobile ? 'rounded-none' : 'rounded-2xl';
  const widgetShadowClass = isMobile ? 'shadow-none' : 'shadow-2xl';
  const floatingButtonPositionClass = isMobile ? 'bottom-4 right-4' : 'bottom-6 right-6';

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const apiUrl = API_BASE_URL;
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          conversationHistory: messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
          })),
          leadData: leadData
        }),
      });

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

      // Atualizar dados do lead se o bot identificou informações
      if (data.leadData) {
        setLeadData(prev => {
          const updated = { ...prev, ...data.leadData };
          // Verificar se tem informações suficientes para diagnóstico
          if (updated.name && updated.phone && updated.needs && updated.needs.length > 0 && updated.segment) {
            setTimeout(() => {
              handleGenerateDiagnostic(updated);
            }, 2000);
          }
          return updated;
        });
      }

      // Se o bot identificou que precisa coletar dados do lead
      if (data.needsLeadInfo && !showLeadForm && !showSmartForm) {
        setTimeout(() => {
          // Usar formulário inteligente se tiver poucas informações
          if (!leadData.name || !leadData.phone || !leadData.needs || leadData.needs.length === 0) {
            setShowSmartForm(true);
          } else {
            setShowLeadForm(true);
          }
        }, 1000);
      }

      // Se o bot sugeriu gerar diagnóstico
      if (data.needsDiagnostic && leadData.name && leadData.phone && leadData.needs?.length > 0) {
        setTimeout(() => {
          handleGenerateDiagnostic(leadData);
        }, 2000);
      }

      // Se o bot sugeriu gerar proposta
      if (data.needsProposal && diagnostic) {
        setTimeout(() => {
          handleGenerateProposal();
        }, 2000);
      }

      // Se o bot sugeriu agendar
      if (data.needsAppointment) {
        setTimeout(() => {
          setShowAppointment(true);
          loadAvailableSlots();
        }, 2000);
      }

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      console.error('API URL:', API_BASE_URL);
      console.error('Erro completo:', error.message, error.stack);
      
      let errorText = "Desculpe, ocorreu um erro. Por favor, tente novamente ou entre em contato pelo WhatsApp.";
      
      // Mensagem mais específica para debug
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorText = "Erro de conexão. Verificando configuração do servidor...";
      }
      
      const errorMessage = {
        id: Date.now() + 1,
        text: errorText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleGenerateDiagnostic = async (data) => {
    if (diagnostic) return; // Já tem diagnóstico
    
    setIsLoading(true);
    try {
      const leadDataWithId = { ...data, id: data.id || Date.now() };
      const response = await fetch(`${API_BASE_URL}/api/diagnostic`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadData: leadDataWithId })
      });

      const result = await response.json();
      if (result.success) {
        setDiagnostic(result.diagnostic);
        setLeadData(prev => ({ ...prev, id: leadDataWithId.id }));
        const botMessage = {
          id: Date.now(),
          text: `📊 Diagnóstico Gerado!\n\nAnalisei seu negócio e gerei um diagnóstico completo. Deseja ver os detalhes e gerar uma proposta comercial?`,
          sender: 'bot',
          timestamp: new Date(),
          type: 'diagnostic'
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Erro ao gerar diagnóstico:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateProposal = async () => {
    if (!diagnostic) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/proposal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diagnostic, leadData })
      });

      const result = await response.json();
      if (result.success) {
        setProposal(result.proposal);
        const botMessage = {
          id: Date.now(),
          text: `💰 Proposta Gerada!\n\nCriei uma proposta comercial personalizada para seu projeto. Deseja ver os detalhes e agendar uma reunião?`,
          sender: 'bot',
          timestamp: new Date(),
          type: 'proposal'
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Erro ao gerar proposta:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAvailableSlots = async (date = null) => {
    const targetDate = date || new Date().toISOString().split('T')[0];
    setSelectedDate(targetDate);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/appointments/available?date=${targetDate}`);
      const data = await response.json();
      setAvailableSlots(data.slots || []);
    } catch (error) {
      console.error('Erro ao carregar horários:', error);
    }
  };

  const handleScheduleAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Por favor, selecione data e horário.');
      return;
    }

    setIsLoading(true);
    try {
      const dateTime = `${selectedDate}T${selectedTime}:00`;
      const leadDataWithId = { ...leadData, id: leadData.id || Date.now() };
      const response = await fetch(`${API_BASE_URL}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadData: leadDataWithId,
          dateTime,
          type: 'video'
        })
      });

      const result = await response.json();
      if (result.success) {
        const botMessage = {
          id: Date.now(),
          text: `✅ Agendamento Confirmado!\n\n📅 Data: ${new Date(result.appointment.dateTime).toLocaleDateString('pt-BR')}\n🕐 Horário: ${new Date(result.appointment.dateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}\n\n${result.appointment.meetingLink ? `🔗 Link da reunião: ${result.appointment.meetingLink}` : ''}\n\nEnviarei um lembrete por WhatsApp!`,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setShowAppointment(false);
        
        // Enviar confirmação por WhatsApp
        const whatsappMessage = encodeURIComponent(
          `✅ Agendamento Confirmado!\n\nOlá ${leadData.name}!\n\nConfirmamos seu agendamento:\n📅 ${new Date(result.appointment.dateTime).toLocaleDateString('pt-BR')}\n🕐 ${new Date(result.appointment.dateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}\n\n${result.appointment.meetingLink ? `Link: ${result.appointment.meetingLink}` : 'Aguardamos você!'}`
        );
        window.open(`https://wa.me/${leadData.phone.replace(/\D/g, '')}?text=${whatsappMessage}`, '_blank');
      }
    } catch (error) {
      console.error('Erro ao agendar:', error);
      alert('Erro ao agendar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitLead = async () => {
    if (!leadData.name || !leadData.phone) {
      alert('Por favor, preencha pelo menos o nome e telefone.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...leadData,
          conversationHistory: messages,
          timestamp: new Date()
        }),
      });

      if (response.ok) {
        const botMessage = {
          id: Date.now(),
          text: `Perfeito, ${leadData.name}! ✅ Recebi suas informações. Nossa equipe entrará em contato em breve pelo WhatsApp (${leadData.phone}). Enquanto isso, você pode me fazer mais perguntas!`,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setShowLeadForm(false);
        
        // Enviar para WhatsApp
        const whatsappMessage = encodeURIComponent(
          `Olá ${leadData.name}! 👋\n\nRecebi seu interesse através do nosso site. Vi que você precisa de: ${leadData.needs.join(', ')}\n\nVamos conversar sobre seu projeto?`
        );
        window.open(`https://wa.me/54996246565?text=${whatsappMessage}`, '_blank');
      }
    } catch (error) {
      console.error('Erro ao salvar lead:', error);
      alert('Erro ao salvar informações. Por favor, entre em contato pelo WhatsApp.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSmartFormSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      // Atualizar leadData com dados do formulário
      const updatedLeadData = { ...leadData, ...formData };
      setLeadData(updatedLeadData);

      // Salvar lead
      const response = await fetch(`${API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updatedLeadData,
          conversationHistory: messages,
          timestamp: new Date()
        }),
      });

      if (response.ok) {
        const botMessage = {
          id: Date.now(),
          text: `Perfeito, ${formData.name}! ✅ Recebi todas suas informações. Vou preparar uma proposta personalizada e nossa equipe entrará em contato em breve pelo WhatsApp (${formData.phone}).`,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setShowSmartForm(false);
        
        // Gerar diagnóstico e proposta automaticamente
        setTimeout(() => {
          handleGenerateDiagnostic(updatedLeadData);
        }, 2000);
      }
    } catch (error) {
      console.error('Erro ao salvar lead:', error);
      alert('Erro ao salvar informações. Por favor, entre em contato pelo WhatsApp.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSmartFormSchedule = async (formData) => {
    setIsLoading(true);
    
    try {
      // Atualizar leadData
      const updatedLeadData = { ...leadData, ...formData };
      setLeadData(updatedLeadData);

      // Criar agendamento
      const dateTime = `${formData.appointmentDate}T${formData.appointmentTime}:00`;
      const response = await fetch(`${API_BASE_URL}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadData: { ...updatedLeadData, id: Date.now() },
          dateTime,
          type: 'video'
        })
      });

      const result = await response.json();
      if (result.success) {
        // Salvar lead também
        await fetch(`${API_BASE_URL}/api/leads`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...updatedLeadData,
            conversationHistory: messages,
            timestamp: new Date()
          })
        });

        const botMessage = {
          id: Date.now(),
          text: `✅ Agendamento Confirmado!\n\n📅 Data: ${new Date(result.appointment.dateTime).toLocaleDateString('pt-BR')}\n🕐 Horário: ${new Date(result.appointment.dateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}\n\n${result.appointment.meetingLink ? `🔗 Link: ${result.appointment.meetingLink}` : ''}\n\nEnviarei um lembrete por WhatsApp!`,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setShowSmartForm(false);
        
        // Enviar confirmação por WhatsApp
        const whatsappMessage = encodeURIComponent(
          `✅ Agendamento Confirmado!\n\nOlá ${formData.name}!\n\nConfirmamos seu agendamento:\n📅 ${new Date(result.appointment.dateTime).toLocaleDateString('pt-BR')}\n🕐 ${new Date(result.appointment.dateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}\n\n${result.appointment.meetingLink ? `Link: ${result.appointment.meetingLink}` : 'Aguardamos você!'}`
        );
        window.open(`https://wa.me/${formData.phone.replace(/\D/g, '')}?text=${whatsappMessage}`, '_blank');
      }
    } catch (error) {
      console.error('Erro ao agendar:', error);
      alert('Erro ao agendar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className={`fixed ${floatingButtonPositionClass} z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300`}
            aria-label="Abrir chat"
          >
            <MessageCircle size={28} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
              1
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Widget de Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`${widgetPositionClass} z-50 bg-white ${widgetRadiusClass} ${widgetShadowClass} flex flex-col overflow-hidden transition-all duration-300 ${widgetDimensionClass}`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Nandi Dev Assistant</h3>
                  <p className="text-xs text-white/80">Online agora</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded-full transition-colors"
                aria-label="Fechar chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
                      <Bot size={16} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-800 shadow-md'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  {message.sender === 'user' && (
                    <div className="bg-gray-300 p-2 rounded-full">
                      <User size={16} className="text-gray-600" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-white rounded-2xl px-4 py-2 shadow-md">
                    <Loader size={16} className="animate-spin text-blue-600" />
                  </div>
                </div>
              )}

              {/* Formulário Inteligente */}
              {showSmartForm && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full sm:-mx-4"
                >
                  <div className="px-4">
                    <SmartForm
                      leadData={leadData}
                      onSubmit={handleSmartFormSubmit}
                      onSchedule={handleSmartFormSchedule}
                      isLoading={isLoading}
                    />
                  </div>
                </motion.div>
              )}

              {/* Formulário de Lead (simples) */}
              {showLeadForm && !showSmartForm && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-4 shadow-lg border-2 border-blue-500"
                >
                  <h4 className="font-semibold text-gray-800 mb-3">Vamos coletar algumas informações:</h4>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Seu nome *"
                      value={leadData.name}
                      onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="tel"
                      placeholder="WhatsApp *"
                      value={leadData.phone}
                      onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      placeholder="E-mail"
                      value={leadData.email}
                      onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Empresa/Projeto"
                      value={leadData.company}
                      onChange={(e) => setLeadData({ ...leadData, company: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleSubmitLead}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {isLoading ? 'Enviando...' : 'Enviar Informações'}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Diagnóstico */}
              {diagnostic && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 shadow-lg border-2 border-blue-500"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="text-blue-600" size={20} />
                    <h4 className="font-bold text-gray-800">📊 Diagnóstico do Negócio</h4>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Building size={14} className="text-gray-600" />
                        <span className="font-semibold">Segmento:</span>
                      </div>
                      <p className="text-gray-700 ml-6">{diagnostic.businessInfo.segment}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Target size={14} className="text-gray-600" />
                        <span className="font-semibold">Objetivos:</span>
                      </div>
                      <p className="text-gray-700 ml-6">{diagnostic.objectives}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle size={14} className="text-green-600" />
                        <span className="font-semibold">Recomendações:</span>
                      </div>
                      <ul className="ml-6 space-y-1">
                        {diagnostic.recommendations.map((rec, i) => (
                          <li key={i} className="text-gray-700">• {rec.item}: {rec.description}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {diagnostic.attentionPoints.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <AlertCircle size={14} className="text-orange-600" />
                          <span className="font-semibold">Pontos de Atenção:</span>
                        </div>
                        <ul className="ml-6 space-y-1">
                          {diagnostic.attentionPoints.map((point, i) => (
                            <li key={i} className="text-orange-700">• {point}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={handleGenerateProposal}
                    disabled={isLoading || proposal}
                    className="mt-4 w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <DollarSign size={18} />
                    {proposal ? 'Proposta Já Gerada' : 'Gerar Proposta Comercial'}
                  </button>
                </motion.div>
              )}

              {/* Proposta */}
              {proposal && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 shadow-lg border-2 border-green-500"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="text-green-600" size={20} />
                    <h4 className="font-bold text-gray-800">💰 Proposta Comercial</h4>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    {proposal.items.map((item, i) => (
                      <div key={i} className="bg-white rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-gray-800">{item.description}</span>
                          <span className="font-bold text-green-600">R$ {item.price.toLocaleString('pt-BR')}</span>
                        </div>
                        {item.includes && item.includes.length > 0 && (
                          <ul className="text-xs text-gray-600 space-y-1 mt-2">
                            {item.includes.map((include, j) => (
                              <li key={j}>✓ {include}</li>
                            ))}
                          </ul>
                        )}
                        <div className="text-xs text-gray-500 mt-2">
                          <Clock size={12} className="inline mr-1" />
                          Entrega: {item.delivery}
                        </div>
                      </div>
                    ))}
                    
                    <div className="bg-white rounded-lg p-3 border-t-2 border-green-500">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg text-gray-800">Total:</span>
                        <span className="font-bold text-2xl text-green-600">R$ {proposal.total.toLocaleString('pt-BR')}</span>
                      </div>
                      {proposal.discount > 0 && (
                        <p className="text-xs text-gray-500 mt-1">Desconto de R$ {proposal.discount.toLocaleString('pt-BR')} aplicado</p>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setShowAppointment(true);
                      loadAvailableSlots();
                    }}
                    disabled={isLoading}
                    className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Calendar size={18} />
                    Agendar Reunião
                  </button>
                </motion.div>
              )}

              {/* Agendamento */}
              {showAppointment && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 shadow-lg border-2 border-purple-500"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="text-purple-600" size={20} />
                    <h4 className="font-bold text-gray-800">📅 Agendar Atendimento</h4>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-1 block">Data:</label>
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={selectedDate}
                        onChange={(e) => {
                          setSelectedDate(e.target.value);
                          loadAvailableSlots(e.target.value);
                          setSelectedTime('');
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    
                    {selectedDate && availableSlots.length > 0 && (
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">Horário:</label>
                        <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                          {availableSlots.map((slot, i) => (
                            <button
                              key={i}
                              onClick={() => setSelectedTime(slot.time)}
                              disabled={!slot.available}
                              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                                selectedTime === slot.time
                                  ? 'bg-purple-600 text-white'
                                  : slot.available
                                  ? 'bg-white border-2 border-purple-300 text-gray-700 hover:border-purple-500'
                                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              {slot.time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <button
                      onClick={handleScheduleAppointment}
                      disabled={isLoading || !selectedDate || !selectedTime}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Agendando...' : 'Confirmar Agendamento'}
                    </button>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Enviar mensagem"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;

