import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Youtube, Instagram, Facebook, Linkedin, Twitter, Users, ArrowRight, Radio, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const socialLinks = [
  {
    name: 'WhatsApp Community',
    description: 'Join our active WhatsApp group for daily tips, Q&A, and community support.',
    icon: MessageCircle,
    color: 'bg-[#25D366]',
    link: 'https://wa.me/18453226500',
    cta: 'Join Group'
  },
  {
    name: 'YouTube',
    description: 'Watch educational videos, client success stories, and financial tips.',
    icon: Youtube,
    color: 'bg-red-600',
    link: '#',
    cta: 'Subscribe'
  },
  {
    name: 'Instagram',
    description: 'Daily financial inspiration, tips, and behind-the-scenes content.',
    icon: Instagram,
    color: 'bg-gradient-to-br from-purple-600 to-pink-500',
    link: '#',
    cta: 'Follow'
  },
  {
    name: 'Facebook',
    description: 'Join our community page for discussions, events, and resources.',
    icon: Facebook,
    color: 'bg-blue-600',
    link: '#',
    cta: 'Like Page'
  },
  {
    name: 'LinkedIn',
    description: 'Professional insights and networking opportunities.',
    icon: Linkedin,
    color: 'bg-blue-700',
    link: '#',
    cta: 'Connect'
  },
  {
    name: 'Twitter/X',
    description: 'Quick financial tips and industry news updates.',
    icon: Twitter,
    color: 'bg-black',
    link: '#',
    cta: 'Follow'
  }
];

export default function Community() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#1F2A44] via-[#2a3654] to-[#1F2A44] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute bottom-20 left-20 w-96 h-96 border border-[#C2983B] rounded-full" />
        </div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-[#C2983B] text-sm tracking-[0.3em] uppercase mb-4 block">
              Join Our Community
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
              Stay Connected.{' '}
              <span className="text-[#C2983B] font-normal">Stay Empowered.</span>
            </h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed">
              Connect with us on social media, join our WhatsApp community, 
              and stay up to date with financial wisdom and inspiration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured: Gelt Status */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-[#1F2A44] p-10 lg:p-12 text-white">
                  <div className="flex items-center gap-3 mb-6">
                    <Radio className="w-8 h-8 text-[#C2983B]" />
                    <span className="text-[#C2983B] text-sm tracking-[0.2em] uppercase">Featured</span>
                  </div>
                  <h2 className="text-3xl font-light mb-4">
                    Chaim Tauber — <span className="text-[#C2983B]">Gelt Status</span>
                  </h2>
                  <p className="text-gray-300 font-light leading-relaxed mb-8">
                    Listen to Chaim's podcast where he shares practical financial wisdom, 
                    interviews successful individuals, and provides actionable strategies 
                    for building wealth and achieving financial freedom.
                  </p>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-[#C2983B] hover:bg-[#a8842f] text-white px-8 py-6 rounded-none">
                      Listen Now
                      <ExternalLink className="ml-2 w-5 h-5" />
                    </Button>
                  </a>
                </div>
                <div className="relative h-64 lg:h-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80"
                    alt="Gelt Status Podcast"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Group */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-8">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-[#1F2A44] mb-4">
              Join Our WhatsApp Community
            </h2>
            <p className="text-xl text-gray-600 font-light mb-10 max-w-2xl mx-auto">
              Get daily financial tips, ask questions, share wins, and connect 
              with others on their financial journey. It's free and full of value!
            </p>
            <a href="https://wa.me/18453226500" target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-12 py-6 text-lg rounded-none"
              >
                <MessageCircle className="mr-2 w-6 h-6" />
                Join WhatsApp Group
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Social Links Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-[#1F2A44]">
              Follow Us <span className="font-normal">Everywhere</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <a 
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-8">
                      <div className={`w-14 h-14 ${social.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <social.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#1F2A44] mb-2 group-hover:text-[#C2983B] transition-colors">
                        {social.name}
                      </h3>
                      <p className="text-gray-600 font-light mb-4">
                        {social.description}
                      </p>
                      <span className="inline-flex items-center text-[#C2983B] font-medium">
                        {social.cta}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </CardContent>
                  </Card>
                </a>
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
              Ready for One-on-One Support?
            </h2>
            <p className="text-xl text-gray-300 font-light mb-10 max-w-2xl mx-auto">
              While our community is great for general tips, nothing beats personalized coaching.
            </p>
            <Link to={createPageUrl('Schedule')}>
              <Button 
                size="lg"
                className="bg-[#C2983B] hover:bg-[#a8842f] text-white px-10 py-6 text-lg rounded-none"
              >
                Schedule Your Session
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}