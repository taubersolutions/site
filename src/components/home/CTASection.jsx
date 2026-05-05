import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function CTASection() {
  return (
    <section className="bg-[#C2983B] py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-20 -right-20 w-96 h-96 border border-[#C2983B] rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 border border-[#C2983B] rounded-full" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>

            <span className="text-[#1F2A44] text-sm tracking-[0.3em] uppercase mb-6 block">
              Take the First Step
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6">
              Your Future Starts with{' '}
              <span className="text-[#1F2A44] font-normal">One Conversation</span>
            </h2>
            <p className="text-xl text-white font-light mb-10">
              Ready to transform your financial life? Let's talk about your goals 
              and create a roadmap to success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('Schedule')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <Button
                  size="lg"
                  className="bg-[#1F2A44] hover:bg-[#2a3654] text-white font-semibold px-10 py-6 text-lg rounded-none group">
                  Schedule Your Meeting
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="tel:+13479638998">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-[#1F2A44] hover:bg-gray-100 border-2 border-white font-semibold px-10 py-6 text-lg rounded-none">
                  <Phone className="mr-2 w-5 h-5" />
                  Call Us Now
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}