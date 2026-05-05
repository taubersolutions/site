import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Target, Award } from 'lucide-react';

const indicators = [
  {
    icon: Shield,
    title: 'Trusted Guidance',
    description: 'Confidential, judgment-free financial coaching'
  },
  {
    icon: Users,
    title: 'Personalized Approach',
    description: 'Tailored strategies for your unique situation'
  },
  {
    icon: Target,
    title: 'Goal-Focused',
    description: 'Clear roadmaps to achieve your financial dreams'
  },
  {
    icon: Award,
    title: 'Proven Results',
    description: 'Hundreds of clients achieving financial freedom'
  }
];

export default function TrustIndicators() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {indicators.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1F2A44]/5 mb-6 group-hover:bg-[#C2983B]/10 transition-colors duration-300">
                <item.icon className="w-7 h-7 text-[#C2983B]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1F2A44] mb-2">{item.title}</h3>
              <p className="text-gray-600 font-light">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}