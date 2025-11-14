import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Mail, Phone, Building, Target, DollarSign, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

const SmartForm = ({ leadData, onSubmit, onSchedule, isLoading }) => {
  const [formData, setFormData] = useState({
    name: leadData.name || '',
    email: leadData.email || '',
    phone: leadData.phone || '',
    company: leadData.company || '',
    segment: leadData.segment || '',
    needs: leadData.needs || [],
    objectives: leadData.objectives || '',
    budget: leadData.budget || '',
    urgency: leadData.urgency || '',
    stage: leadData.stage || '',
    problems: leadData.problems || '',
    users: leadData.users || ''
  });

  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);

  const needsOptions = [
    'Desenvolvimento de aplicativo',
    'Desenvolvimento de site',
    'Consultoria ou diagnóstico',
    'App personalizado para empresas',
    'Solução para órgãos públicos / prefeituras',
    'Projetos especiais'
  ];

  const stageOptions = [
    'Ideia inicial',
    'Algo já estruturado',
    'Reestruturação'
  ];

  const urgencyOptions = [
    'Urgente (começar em até 1 semana)',
    'Rápido (começar em até 1 mês)',
    'Planejado (começar em 2-3 meses)',
    'Ainda explorando opções'
  ];

  const budgetRanges = [
    'Até R$ 5.000',
    'R$ 5.000 - R$ 10.000',
    'R$ 10.000 - R$ 25.000',
    'R$ 25.000 - R$ 50.000',
    'Acima de R$ 50.000',
    'Ainda não defini'
  ];

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
      if (!formData.phone.trim()) newErrors.phone = 'WhatsApp é obrigatório';
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Email inválido';
      }
    }
    
    if (step === 2) {
      if (!formData.needs || formData.needs.length === 0) {
        newErrors.needs = 'Selecione pelo menos uma necessidade';
      }
      if (!formData.objectives.trim()) {
        newErrors.objectives = 'Objetivo é obrigatório';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleNeedsChange = (need) => {
    setFormData(prev => ({
      ...prev,
      needs: prev.needs.includes(need)
        ? prev.needs.filter(n => n !== need)
        : [...prev.needs, need]
    }));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onSubmit(formData);
    }
  };

  const loadAvailableSlots = async (date) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'https://friendly-exploration-production.up.railway.app';
      const response = await fetch(`${apiUrl}/api/appointments/available?date=${date}`);
      const data = await response.json();
      setAvailableSlots(data.slots || []);
    } catch (error) {
      console.error('Erro ao carregar horários:', error);
    }
  };

  const handleScheduleClick = () => {
    setShowSchedule(true);
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    loadAvailableSlots(today);
  };

  const handleFinalSchedule = () => {
    if (selectedDate && selectedTime) {
      onSchedule({
        ...formData,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime
      });
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-xl border-2 border-blue-500 max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">Etapa {currentStep} de 4</span>
          <span className="text-sm text-gray-500">{Math.round((currentStep / 4) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / 4) * 100}%` }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
          />
        </div>
      </div>

      {/* Step 1: Informações Básicas */}
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <User className="text-blue-600" size={24} />
            Informações Básicas
          </h3>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nome Completo *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Seu nome completo"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              WhatsApp *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="(00) 00000-0000"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              E-mail
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="seu@email.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Empresa / Projeto
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nome da sua empresa ou projeto"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Segmento
            </label>
            <input
              type="text"
              value={formData.segment}
              onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Clínica médica, E-commerce, Startup, etc."
            />
          </div>
        </motion.div>
      )}

      {/* Step 2: Necessidades e Objetivos */}
      {currentStep === 2 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Target className="text-blue-600" size={24} />
            O que você precisa?
          </h3>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tipo de Solução * (pode selecionar mais de uma)
            </label>
            <div className="space-y-2">
              {needsOptions.map((need) => (
                <label key={need} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.needs.includes(need)}
                    onChange={() => handleNeedsChange(need)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{need}</span>
                </label>
              ))}
            </div>
            {errors.needs && <p className="text-red-500 text-xs mt-1">{errors.needs}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Qual é o objetivo principal deste projeto? *
            </label>
            <textarea
              value={formData.objectives}
              onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 min-h-[100px] ${
                errors.objectives ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Descreva o que você quer alcançar com este projeto..."
            />
            {errors.objectives && <p className="text-red-500 text-xs mt-1">{errors.objectives}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quais problemas você deseja resolver?
            </label>
            <textarea
              value={formData.problems}
              onChange={(e) => setFormData({ ...formData, problems: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
              placeholder="Descreva os principais desafios ou problemas que esta solução vai resolver..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quem vai usar este sistema/app/site?
            </label>
            <input
              type="text"
              value={formData.users}
              onChange={(e) => setFormData({ ...formData, users: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Clientes, funcionários, pacientes, etc."
            />
          </div>
        </motion.div>
      )}

      {/* Step 3: Contexto e Urgência */}
      {currentStep === 3 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="text-blue-600" size={24} />
            Contexto do Projeto
          </h3>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              O projeto já está em qual estágio?
            </label>
            <select
              value={formData.stage}
              onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione...</option>
              {stageOptions.map((stage) => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Qual é a sua urgência para começar?
            </label>
            <select
              value={formData.urgency}
              onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione...</option>
              {urgencyOptions.map((urgency) => (
                <option key={urgency} value={urgency}>{urgency}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Orçamento aproximado (não precisa ser exato)
            </label>
            <select
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione uma faixa...</option>
              {budgetRanges.map((range) => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
        </motion.div>
      )}

      {/* Step 4: Resumo e Agendamento */}
      {currentStep === 4 && !showSchedule && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <CheckCircle className="text-green-600" size={24} />
            Resumo do Projeto
          </h3>
          
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div>
              <span className="font-semibold text-gray-700">Nome:</span>
              <p className="text-gray-600">{formData.name}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-700">WhatsApp:</span>
              <p className="text-gray-600">{formData.phone}</p>
            </div>
            {formData.company && (
              <div>
                <span className="font-semibold text-gray-700">Empresa:</span>
                <p className="text-gray-600">{formData.company}</p>
              </div>
            )}
            <div>
              <span className="font-semibold text-gray-700">Necessidades:</span>
              <p className="text-gray-600">{formData.needs.join(', ')}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Objetivo:</span>
              <p className="text-gray-600">{formData.objectives}</p>
            </div>
            {formData.budget && (
              <div>
                <span className="font-semibold text-gray-700">Orçamento:</span>
                <p className="text-gray-600">{formData.budget}</p>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <CheckCircle size={20} />
              Enviar Informações
            </button>
            <button
              onClick={handleScheduleClick}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Calendar size={20} />
              Agendar Reunião
            </button>
          </div>
        </motion.div>
      )}

      {/* Agendamento */}
      {currentStep === 4 && showSchedule && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="text-purple-600" size={24} />
            Agendar Reunião
          </h3>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Data:</label>
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                loadAvailableSlots(e.target.value);
                setSelectedTime('');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {selectedDate && availableSlots.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Horário:</label>
              <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {availableSlots.map((slot, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
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

          <div className="flex gap-3">
            <button
              onClick={() => setShowSchedule(false)}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Voltar
            </button>
            <button
              onClick={handleFinalSchedule}
              disabled={isLoading || !selectedDate || !selectedTime}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Calendar size={20} />
              Confirmar Agendamento
            </button>
          </div>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      {currentStep < 4 && (
        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Voltar
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            Próximo
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SmartForm;

