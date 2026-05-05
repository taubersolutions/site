import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ContactInfoDialog from '@/components/home/ContactInfoDialog';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#1F2A44] via-[#2a3654] to-[#1F2A44]">

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl">


          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight mb-8">

            Welcome to a World of{' '}
            <span className="text-[#C2983B] font-normal">Financial Success</span>{' '}
            and Stability
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl font-light">

            Expert financial coaching to help you achieve your goals with confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">

            <Link to={createPageUrl('Schedule')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#C2983B] hover:bg-[#b08e35] text-white font-medium px-8 py-6 text-base rounded-lg shadow-lg group transition-all duration-300">
                Schedule Your Meeting
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <div className="w-full sm:w-auto scale-90">
              <ContactInfoDialog />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C2983B] to-transparent" />
    </section>);

}