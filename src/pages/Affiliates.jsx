import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, ArrowRight, Building2, CreditCard, PiggyBank, Shield, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const affiliates = [
  {
    category: 'Banking',
    partners: [
      {
        name: 'Community First Bank',
        description: 'Local banking with personal service. Great rates on savings and checking accounts.',
        icon: Building2,
        link: '#'
      },
      {
        name: 'Online Savings Plus',
        description: 'High-yield online savings accounts with no minimum balance requirements.',
        icon: PiggyBank,
        link: '#'
      }
    ]
  },
  {
    category: 'Insurance',
    partners: [
      {
        name: 'SecureLife Insurance',
        description: 'Comprehensive life and disability coverage for families at competitive rates.',
        icon: Shield,
        link: '#'
      },
      {
        name: 'Home & Auto Shield',
        description: 'Bundle your home and auto insurance for maximum savings.',
        icon: Shield,
        link: '#'
      }
    ]
  },
  {
    category: 'Investment Services',
    partners: [
      {
        name: 'Growth Investments',
        description: 'Full-service investment management with personalized portfolio strategies.',
        icon: Briefcase,
        link: '#'
      },
      {
        name: 'Retirement Planners Pro',
        description: 'Specialized retirement planning services for a secure future.',
        icon: Briefcase,
        link: '#'
      }
    ]
  },
  {
    category: 'Credit Services',
    partners: [
      {
        name: 'Credit Repair Solutions',
        description: 'Professional credit repair and improvement services.',
        icon: CreditCard,
        link: '#'
      },
      {
        name: 'Debt Consolidation Experts',
        description: 'Simplify your debt with professional consolidation services.',
        icon: CreditCard,
        link: '#'
      }
    ]
  }
];

export default function Affiliates() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#1F2A44] via-[#2a3654] to-[#1F2A44] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 border border-[#C2983B] rounded-full" />
        </div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-[#C2983B] text-sm tracking-[0.3em] uppercase mb-4 block">
              Our Partners
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
              Trusted Partners{' '}
              <span className="text-[#C2983B] font-normal">Supporting Your Growth</span>
            </h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed">
              We've partnered with trusted companies to provide you with comprehensive 
              financial services and resources.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partners by Category */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          {affiliates.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="mb-16 last:mb-0"
            >
              <h2 className="text-2xl font-light text-[#1F2A44] mb-8 pb-4 border-b border-gray-200">
                {category.category}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category.partners.map((partner, index) => (
                  <Card 
                    key={partner.name}
                    className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 group"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 bg-[#1F2A44]/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C2983B]/10 transition-colors">
                          <partner.icon className="w-8 h-8 text-[#C2983B]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-[#1F2A44] mb-2">
                            {partner.name}
                          </h3>
                          <p className="text-gray-600 font-light mb-4">
                            {partner.description}
                          </p>
                          <a 
                            href={partner.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-[#C2983B] font-medium hover:underline"
                          >
                            Learn More
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Become a Partner */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-light text-[#1F2A44] mb-6">
              Interested in Partnering?
            </h2>
            <p className="text-xl text-gray-600 font-light mb-10">
              We're always looking for trusted partners who share our commitment 
              to helping people achieve financial success.
            </p>
            <a href="mailto:chaim@taubersolutions.com">
              <Button className="bg-[#1F2A44] hover:bg-[#2a3654] text-white px-10 py-6 rounded-none">
                Contact Us About Partnership
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#1F2A44]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 font-light mb-10 max-w-2xl mx-auto">
              Connect with our team to learn how our partner services can support your financial journey.
            </p>
            <Link to={createPageUrl('Schedule')}>
              <Button 
                size="lg"
                className="bg-[#C2983B] hover:bg-[#a8842f] text-white px-10 py-6 text-lg rounded-none"
              >
                Schedule a Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}