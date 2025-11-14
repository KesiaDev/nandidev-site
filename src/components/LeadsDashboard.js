import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Calendar, Filter, Download, Phone, Mail, Building, Tag } from 'lucide-react';

const LeadsDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLeads();
    fetchStats();
    // Atualizar a cada 30 segundos
    const interval = setInterval(() => {
      fetchLeads();
      fetchStats();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchLeads = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || '/api';
      const response = await fetch(`${apiUrl}/leads`);
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error('Erro ao buscar leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || '/api';
      const response = await fetch(`${apiUrl}/stats`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    }
  };

  const handleWhatsApp = (phone) => {
    const message = encodeURIComponent('Olá! Vi seu interesse através do nosso site. Vamos conversar sobre seu projeto?');
    window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  const handleEmail = (email) => {
    window.open(`mailto:${email}?subject=Proposta Nandi Dev`, '_blank');
  };

  const exportLeads = () => {
    const csv = [
      ['Nome', 'Telefone', 'Email', 'Empresa', 'Segmento', 'Necessidades', 'Orçamento', 'Prazo', 'Data'].join(','),
      ...leads.map(lead => [
        lead.name || '',
        lead.phone || '',
        lead.email || '',
        lead.company || '',
        lead.segment || '',
        (lead.needs || []).join('; '),
        lead.budget || '',
        lead.timeline || '',
        new Date(lead.createdAt).toLocaleDateString('pt-BR')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const filteredLeads = leads.filter(lead => {
    const matchesFilter = filter === 'all' || 
      (filter === 'today' && new Date(lead.createdAt).toDateString() === new Date().toDateString()) ||
      (filter === 'week' && {
        const leadDate = new Date(lead.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return leadDate >= weekAgo;
      });
    
    const matchesSearch = !searchTerm || 
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm) ||
      lead.company?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <Users className="text-blue-600" size={32} />
                Dashboard de Leads
              </h1>
              <p className="text-gray-600 mt-2">Gerencie e acompanhe todos os leads capturados pelo chatbot</p>
            </div>
            <button
              onClick={exportLeads}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all"
            >
              <Download size={20} />
              Exportar CSV
            </button>
          </div>
        </div>

        {/* Estatísticas */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total de Leads</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</p>
                </div>
                <Users className="text-blue-600" size={40} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Hoje</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stats.today}</p>
                </div>
                <Calendar className="text-green-600" size={40} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Esta Semana</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stats.thisWeek}</p>
                </div>
                <TrendingUp className="text-purple-600" size={40} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Segmentos</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{Object.keys(stats.segments || {}).length}</p>
                </div>
                <Tag className="text-orange-600" size={40} />
              </div>
            </motion.div>
          </div>
        )}

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-600" />
              <span className="text-gray-700 font-semibold">Filtrar:</span>
            </div>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('today')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === 'today' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Hoje
            </button>
            <button
              onClick={() => setFilter('week')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Esta Semana
            </button>
            <input
              type="text"
              placeholder="Buscar por nome, email, telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Lista de Leads */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {filteredLeads.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="mx-auto text-gray-400" size={64} />
              <p className="text-gray-600 mt-4 text-lg">Nenhum lead encontrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Nome</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Contato</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Empresa</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Segmento</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Necessidades</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Data</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredLeads.map((lead, index) => (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">{lead.name || 'Não informado'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {lead.phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone size={14} />
                              {lead.phone}
                            </div>
                          )}
                          {lead.email && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail size={14} />
                              {lead.email}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Building size={16} />
                          {lead.company || 'Não informado'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {lead.segment ? (
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                            {lead.segment}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {(lead.needs || []).map((need, i) => (
                            <span key={i} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                              {need}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(lead.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {lead.phone && (
                            <button
                              onClick={() => handleWhatsApp(lead.phone)}
                              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-all"
                              title="WhatsApp"
                            >
                              <Phone size={16} />
                            </button>
                          )}
                          {lead.email && (
                            <button
                              onClick={() => handleEmail(lead.email)}
                              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all"
                              title="Email"
                            >
                              <Mail size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadsDashboard;

