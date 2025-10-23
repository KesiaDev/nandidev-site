import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Instagram, 
  Github, 
  Mail, 
  Phone, 
  MapPin,
  ArrowUp,
  Heart
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/54996246565?text=Olá! Gostaria de saber mais sobre os serviços da Nandi Dev.', '_blank');
  };

  const handleInstagram = () => {
    window.open('https://instagram.com/nandidev', '_blank');
  };

  const handleGithub = () => {
    window.open('https://github.com/nandidev', '_blank');
  };

  const handleEmail = () => {
    window.open('mailto:nandikesiadevnandi@gmail.com', '_blank');
  };

  const handlePhone = () => {
    window.open('tel:+54996246565', '_blank');
  };

  const quickLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Serviços', href: '#services' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Contato', href: '#contact' }
  ];

  const services = [
    'Desenvolvimento de Sites',
    'Lojas Virtuais',
    'Aplicativos Mobile',
    'Sistemas Web',
    'Manutenção'
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3"
              >
                <img 
                  src="/logo/logo.png" 
                  alt="Nandi Dev Logo" 
                  className="h-12 w-auto"
                  onError={(e) => {
                    // Fallback caso a logo não seja encontrada
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-12 h-12 bg-gradient-to-r from-primary via-accent to-secondary rounded-lg flex items-center justify-center" style={{display: 'none'}}>
                  <span className="text-white font-bold text-xl">N</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Nandi Dev</h3>
                  <p className="text-sm text-gray-400">Web & App Developer</p>
                </div>
              </motion.div>
              
              <p className="text-gray-400 leading-relaxed">
                Transformamos ideias em experiências digitais incríveis. 
                Desenvolvimento de sites, aplicativos e sistemas web personalizados.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleWhatsApp}
                  className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleInstagram}
                  className="w-10 h-10 bg-pink-500 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleGithub}
                  className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <Github className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleEmail}
                  className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <Mail className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Links Rápidos</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Serviços</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service} className="text-gray-400">
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contato</h4>
              <div className="space-y-4">
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={handlePhone}
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Phone className="w-5 h-5" />
                  <span>+54 996246565</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={handleEmail}
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Mail className="w-5 h-5" />
                  <span>nandikesiadevnandi@gmail.com</span>
                </motion.button>
                
                <div className="flex items-start space-x-3 text-gray-400">
                  <MapPin className="w-5 h-5 mt-1" />
                  <span>Caxias do Sul - RS<br />Brasil</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© 2025 Nandi Dev. Todos os direitos reservados.</span>
              <Heart className="w-4 h-4 text-red-500" />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
