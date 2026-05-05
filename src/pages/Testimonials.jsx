import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star, Play, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const testimonials = [
  {
    name: 'David M.',
    role: 'Business Owner',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    quote: 'Tauber Solutions completely transformed my relationship with money. I went from living paycheck to paycheck to having a 6-month emergency fund in just one year.',
    rating: 5,
    result: 'Debt-free in 18 months'
  },
  {
    name: 'Sarah K.',
    role: 'Healthcare Professional',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    quote: 'The personalized attention and practical strategies made all the difference. I finally understand where my money goes and how to make it work for me.',
    rating: 5,
    result: 'Saved $50K in 2 years'
  },
  {
    name: 'Michael R.',
    role: 'IT Manager',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    quote: 'Working with Chaim was a game-changer. His approach is practical, compassionate, and results-driven. I highly recommend Tauber Solutions to anyone serious about their finances.',
    rating: 5,
    result: 'Investment portfolio started'
  },
  {
    name: 'Rachel L.',
    role: 'Teacher',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    quote: 'As a single mom, I thought financial freedom was impossible. The team showed me how to budget effectively and plan for my children\'s future.',
    rating: 5,
    result: 'College fund established'
  },
  {
    name: 'Jonathan B.',
    role: 'Real Estate Agent',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
    quote: 'The Elite Finances Program gave me the structure and accountability I needed. My net worth has doubled since I started working with them.',
    rating: 5,
    result: 'Net worth doubled'
  },
  {
    name: 'Emily S.',
    role: 'Nonprofit Director',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&q=80',
    quote: 'I was skeptical at first, but the results speak for themselves. My husband and I are finally on the same page about our finances.',
    rating: 5,
    result: 'Family financial harmony'
  }
];

const news = [
  {
    date: 'January 2025',
    title: 'Tauber Solutions Launches Elite Finances Program',
    excerpt: 'New comprehensive program offers unlimited coaching and advanced strategies for serious wealth builders.'
  },
  {
    date: 'December 2024',
    title: 'Community Workshop Reaches 200 Attendees',
    excerpt: 'Our largest financial literacy workshop yet brought practical money management skills to the community.'
  },
  {
    date: 'November 2024',
    title: 'New Free Calculator Tools Released',
    excerpt: 'Investment, mortgage, and loan calculators now available at no cost to help with financial planning.'
  }
];

export default function Testimonials() {
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
              Success Stories
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
              The Wins We{' '}
              <span className="text-[#C2983B] font-normal">Celebrate Together</span>
            </h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed">
              Stories, results, and updates from our growing community of 
              financially empowered individuals and families.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Video */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative aspect-video bg-[#1F2A44] flex items-center justify-center group cursor-pointer overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80"
                alt="Video Testimonial"
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity"
              />
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-[#C2983B] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </div>
                <p className="text-white text-lg font-light">Watch Success Stories</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-[#1F2A44]">
              Client <span className="font-normal">Success Stories</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-[#C2983B] fill-current" />
                      ))}
                    </div>
                    
                    <Quote className="w-8 h-8 text-[#C2983B]/20 mb-4" />
                    
                    <p className="text-gray-600 font-light leading-relaxed mb-6">
                      "{testimonial.quote}"
                    </p>
                    
                    <div className="flex items-center gap-4 pt-6 border-t">
                      <img 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-[#1F2A44]">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-[#C2983B] font-medium">
                        ✓ {testimonial.result}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#C2983B] text-sm tracking-[0.3em] uppercase mb-4 block">
              Latest Updates
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-[#1F2A44]">
              News & <span className="font-normal">Announcements</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {news.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  {item.date}
                </div>
                <h3 className="text-lg font-semibold text-[#1F2A44] mb-2 group-hover:text-[#C2983B] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-light">{item.excerpt}</p>
              </motion.div>
            ))}
          </div>
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
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-gray-300 font-light mb-10 max-w-2xl mx-auto">
              Join hundreds of clients who have transformed their financial lives.
            </p>
            <Link to={createPageUrl('Schedule')}>
              <Button 
                size="lg"
                className="bg-[#C2983B] hover:bg-[#a8842f] text-white px-10 py-6 text-lg rounded-none"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}