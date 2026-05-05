import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Compass, TrendingUp, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const services = [
  {
    icon: Compass,
    title: 'Financial Coaching',
    description: 'One-on-one guidance tailored to your goals. Build confidence, eliminate debt, and create lasting financial habits.',
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&q=80'
  },
  {
    icon: TrendingUp,
    title: 'Elite Finances Program',
    description: 'Ongoing support, accountability, and advanced planning for those ready to take their finances to the next level.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80'
  },
  {
    icon: Mic,
    title: 'Speaking Events',
    description: 'Transformative sessions for organizations and communities. Inspire your team with financial literacy.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80'
  }
];

export default function ServicesPreview() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C2983B] text-sm tracking-[0.3em] uppercase mb-4 block">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#1F2A44]">
            Smart Money <span className="font-normal">Starts Here</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#1F2A44]/40 group-hover:bg-[#1F2A44]/20 transition-colors duration-500" />
                <div className="absolute top-6 left-6 w-12 h-12 bg-[#C2983B] flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-[#1F2A44] mb-3">{service.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-6">{service.description}</p>
                <Link to={createPageUrl('Services')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center text-[#C2983B] font-medium group/link">
                  Learn More 
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to={createPageUrl('Schedule')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Button 
              size="lg"
              className="bg-[#1F2A44] hover:bg-[#2a3654] text-white px-10 py-6 text-lg rounded-none"
            >
              Book a Session
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}