import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { HelmetProvider } from 'react-helmet-async';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import NewsletterSignup from '@/components/interactive/NewsletterSignup';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const getNavigation = () => {
  const isUKSession = sessionStorage.getItem('isUKSession') === 'true';
  return [
    { name: 'Home', page: isUKSession ? 'UK' : 'Home' },
    { name: 'Services', page: 'Services' },
    { name: 'Our Coaches', page: isUKSession ? 'UKCoaches' : 'Coaches' },
    { name: 'Free Tools', page: 'Tools' },
    { name: 'Schedule Now', page: 'Schedule' },
    { name: 'Pay', page: 'Pay' },
  ];
};

const currencies = [
  { code: 'USD', flag: 'https://flagcdn.com/w40/us.png', name: 'US Dollar' },
  { code: 'GBP', flag: 'https://flagcdn.com/w40/gb.png', name: 'British Pound' },
  { code: 'ILS', flag: 'https://flagcdn.com/w40/il.png', name: 'Israeli Shekel' }
];

const ukCurrencies = [
  { code: 'GBP', flag: 'https://flagcdn.com/w40/gb.png', name: 'British Pound' },
  { code: 'USD', flag: 'https://flagcdn.com/w40/us.png', name: 'US Dollar' },
  { code: 'ILS', flag: 'https://flagcdn.com/w40/il.png', name: 'Israeli Shekel' }
];

export default function Layout({ children, currentPageName }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navigation, setNavigation] = useState(getNavigation());
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('preferredCurrency') || 'USD';
  });

  useEffect(() => {
    setNavigation(getNavigation());
  }, [currentPageName]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPageName]);

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem('preferredCurrency', newCurrency);
  };

  const logoUrl = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69529b452690abb118ee83b9/c18ffb654_Untitleddesign1.png";

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;700&family=Inter:wght@300;400;500;600;700;800&display=swap');

        * {
          font-family: 'Inter', 'Assistant', sans-serif;
        }

        :root {
          --color-primary: #1a2b4b;
          --color-accent: #C2983B;
        }
      `}</style>

      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-3">
              <img 
                src={logoUrl} 
                alt="Tauber Solutions" 
                className="h-12 w-auto"
              />
              <span className="text-xl font-semibold text-[#1a2b4b]">
                Tauber Solutions
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={createPageUrl(item.page)}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={`text-sm tracking-wide transition-colors duration-300 ${
                    currentPageName === item.page
                      ? 'text-[#C2983B] font-semibold'
                      : 'text-[#1a2b4b] hover:text-[#C2983B]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Currency Selector */}
              <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
                {(sessionStorage.getItem('isUKSession') === 'true' ? ukCurrencies : currencies).map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => handleCurrencyChange(curr.code)}
                    className={`hover:scale-110 transition-all ${
                      currency === curr.code ? 'scale-110' : 'opacity-40'
                    }`}
                    title={curr.name}
                  >
                    <img src={curr.flag} alt={curr.name} className="w-6 h-4 object-cover rounded" />
                  </button>
                ))}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1a2b4b]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t"
            >
              <nav className="container mx-auto px-6 py-6 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={createPageUrl(item.page)}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className={`block text-lg ${
                      currentPageName === item.page
                        ? 'text-[#C2983B] font-medium'
                        : 'text-[#1a2b4b]'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex items-center gap-3 pt-4 border-t">
                  {(sessionStorage.getItem('isUKSession') === 'true' ? ukCurrencies : currencies).map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => handleCurrencyChange(curr.code)}
                      className={`hover:scale-110 transition-all ${
                        currency === curr.code ? 'scale-110' : 'opacity-40'
                      }`}
                      title={curr.name}
                    >
                      <img src={curr.flag} alt={curr.name} className="w-8 h-6 object-cover rounded" />
                    </button>
                  ))}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-[#1a2b4b] text-white">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <img 
                src={logoUrl} 
                alt="Tauber Solutions" 
                className="h-16 w-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">Tauber Solutions</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Your Money, Your Goals, Our Mission
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-[#C2983B] text-sm tracking-[0.2em] uppercase mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={createPageUrl(item.page)}
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="text-gray-400 hover:text-white transition-colors font-light"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[#C2983B] text-sm tracking-[0.2em] uppercase mb-6">Contact</h4>
              <ul className="space-y-3 text-gray-400 font-light">
                <li>
                  <a href="mailto:office@taubersolutions.com" className="hover:text-white transition-colors">
                    office@taubersolutions.com
                  </a>
                </li>
                <li>
                  <a href="tel:+18453226500" className="hover:text-white transition-colors">
                    +1 (845) 322-6500
                  </a>
                </li>
                <li>
                  <a href="tel:03300276500" className="hover:text-white transition-colors">
                    03 300 276500
                  </a>
                </li>
                <li className="pt-2">
                  67 North Airmont Rd<br />
                  Suffern, NY 10901
                </li>
                <li className="pt-2">
                  71 Wellington Street West<br />
                  Salford M7 2ED
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <NewsletterSignup variant="inline" />
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-sm font-light">
                © {new Date().getFullYear()} Tauber Solutions. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <Link 
                  to={createPageUrl('PrivacyPolicy')}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link 
                  to={createPageUrl('TermsAndConditions')}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <WhatsAppButton />
      </div>
    </HelmetProvider>
  );
}