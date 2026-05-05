import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const messages = [
  "Hi! I'd love to learn more about your financial coaching services.",
  "Hello! I'm interested in scheduling a coaching session.",
  "Hi there! Can you help me get started with financial planning?",
  "Hello! I'd like to discuss my financial goals with your team.",
  "Hi! I'm ready to take control of my finances. Can we chat?",
  "Hello! I'd like to learn more about your coaching programs.",
  "Hi! I'm interested in working with one of your coaches.",
  "Hello! Can you tell me more about how you can help with my finances?",
  "Hi! I'd like to book a free consultation.",
  "Hello! I'm looking for guidance on my financial journey."
];

export default function WhatsAppButton() {
  const getRandomMessage = () => {
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleClick = (e) => {
    e.preventDefault();
    const message = encodeURIComponent(getRandomMessage());
    window.open(`https://wa.me/18453226500?text=${message}`, '_blank');
  };

  return (
    <motion.a
      href="https://wa.me/18453226500"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <MessageCircle className="w-6 h-6" fill="white" />
    </motion.a>
  );
}