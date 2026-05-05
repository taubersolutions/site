import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';

const autoResponses = {
  greeting: [
    "Hello! Welcome to Tauber Solutions. How can I help you today?",
    "Hi there! I'm here to answer your questions about our financial coaching services.",
    "Welcome! Feel free to ask me anything about our services, pricing, or how we can help you."
  ],
  services: "We offer three main services: 1) One-on-one Financial Coaching, 2) Elite Finances Program with ongoing support, and 3) Speaking Events for organizations. Which would you like to know more about?",
  pricing: "Our pricing varies based on the service. We offer a free 15-minute info call, $150 for initial coaching sessions (60 min), and $100 for follow-up sessions (45 min). Would you like to schedule a free call?",
  schedule: "Great! You can schedule a session by clicking the 'Schedule Your Meeting' button on our website, or I can connect you with our team via WhatsApp. Which would you prefer?",
  contact: "You can reach Chaim Tauber at chaim@taubersolutions.com or call +1 (347) 963-8998. Would you like to connect via WhatsApp instead?",
  default: "That's a great question! For detailed information, I recommend scheduling a free call with one of our coaches. They can provide personalized answers to your specific situation. Would you like me to help you schedule?"
};

const quickReplies = [
  "Tell me about your services",
  "How much does coaching cost?",
  "Schedule a free call",
  "Contact information"
];

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(autoResponses.greeting[0]);
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      isBot: true,
      timestamp: new Date()
    }]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date()
    }]);
  };

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return autoResponses.greeting[Math.floor(Math.random() * autoResponses.greeting.length)];
    }
    if (msg.includes('service') || msg.includes('offer') || msg.includes('do you do')) {
      return autoResponses.services;
    }
    if (msg.includes('price') || msg.includes('cost') || msg.includes('how much')) {
      return autoResponses.pricing;
    }
    if (msg.includes('schedule') || msg.includes('book') || msg.includes('appointment')) {
      return autoResponses.schedule;
    }
    if (msg.includes('contact') || msg.includes('reach') || msg.includes('phone') || msg.includes('email')) {
      return autoResponses.contact;
    }
    return autoResponses.default;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    addUserMessage(inputValue);
    setInputValue('');
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const response = getBotResponse(inputValue);
      addBotMessage(response);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (reply) => {
    addUserMessage(reply);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const response = getBotResponse(reply);
      addBotMessage(response);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 z-40 bg-[#1F2A44] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-40 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-lg shadow-2xl flex flex-col"
            style={{ height: '600px', maxHeight: 'calc(100vh - 3rem)' }}
          >
            {/* Header */}
            <div className="bg-[#1F2A44] text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C2983B] rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Tauber Solutions</h3>
                  <p className="text-xs text-gray-300">Usually replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isBot ? 'bg-[#C2983B]' : 'bg-[#1F2A44]'
                    }`}>
                      {message.isBot ? (
                        <Bot className="w-4 h-4 text-white" />
                      ) : (
                        <User className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.isBot ? 'bg-white border border-gray-200' : 'bg-[#1F2A44] text-white'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && !isTyping && (
              <div className="p-3 bg-white border-t flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-700"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-white border-t rounded-b-lg">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 rounded-none"
                />
                <Button
                  onClick={handleSend}
                  className="bg-[#C2983B] hover:bg-[#b08e35] text-white font-semibold rounded-none"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}