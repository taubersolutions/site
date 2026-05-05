import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Compass, TrendingUp, Mic, CheckCircle, Users, Clock, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import SEO from '@/components/seo/SEO';
import { createServiceSchema } from '@/components/seo/schemas';

const services = [
{
  icon: Compass,
  title: 'Financial Coaching',
  subtitle: 'Personal Guidance',
  description: 'One-on-one guidance tailored to your goals. Whether you\'re paying off debt, building savings, or planning for the future, we create a custom roadmap just for you.',
  features: [
  'Personalized financial assessment',
  'Custom budget creation',
  'Debt elimination strategies',
  'Savings and investment planning',
  'Regular accountability check-ins'],

  image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80',
  color: 'from-blue-500/20 to-blue-600/20'
},
{
  icon: TrendingUp,
  title: 'Elite Finances Program',
  subtitle: 'Premium Experience',
  description: 'Ongoing support, accountability, and advanced planning for those ready to take their finances to the next level. This comprehensive program includes everything you need for lasting success.',
  features: [
  'Unlimited coaching sessions',
  'Advanced investment strategies',
  'Tax optimization guidance',
  'Wealth building frameworks',
  'Priority access to new tools'],

  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  color: 'from-amber-500/20 to-amber-600/20'
},
{
  icon: Mic,
  title: 'Speaking Events',
  subtitle: 'Group Transformation',
  description: 'Transformative sessions for organizations and communities. Inspire your team or congregation with practical financial wisdom that creates lasting change.',
  features: [
  'Corporate workshops',
  'Community seminars',
  'Conference keynotes',
  'Educational series',
  'Custom curriculum development'],

  image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
  color: 'from-emerald-500/20 to-emerald-600/20'
}];


const stats = [
{ icon: Users, value: '2,500+', label: 'Clients Served' },
{ icon: Clock, value: '30,000+', label: 'Coaching Hours' },
{ icon: Target, value: '95%', label: 'Goal Achievement' }];


export default function Services() {
  const serviceSchemas = services.map((service) => createServiceSchema({
    title: service.title,
    description: service.description
  }));

  return (
    <div className="pt-20">
      <SEO
        title="Financial Services & Coaching Programs"
        description="Comprehensive financial coaching services including personal guidance, Elite Finances program, and speaking events. Transform your financial life with expert support."
        canonical="/services"
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": serviceSchemas
        }} />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#1F2A44] via-[#2a3654] to-[#1F2A44] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-96 h-96 border border-[#C2983B] rounded-full" />
        </div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl">

            <span className="text-[#C2983B] text-sm tracking-[0.3em] uppercase mb-4 block">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
              Smart Money{' '}
              <span className="text-[#C2983B] font-normal">Starts Here</span>
            </h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed">
              Transform your financial life with expert guidance, proven strategies, 
              and the support you need to achieve lasting success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-b">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) =>
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center">

                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#C2983B]/10 mb-4">
                  <stat.icon className="w-6 h-6 text-[#C2983B]" />
                </div>
                <div className="text-4xl font-semibold text-[#1F2A44] mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="space-y-24">
            {services.map((service, index) =>
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`
              }>

                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="relative">
                    <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-[400px] object-cover" />

                    <div className={`absolute -bottom-6 ${index % 2 === 1 ? '-left-6' : '-right-6'} w-48 h-48 bg-gradient-to-br ${service.color} -z-10`} />
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#C2983B] flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[#C2983B] text-sm tracking-[0.2em] uppercase">
                      {service.subtitle}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-light text-[#1F2A44] mb-4">
                    {service.title}
                  </h2>
                  
                  <p className="text-gray-600 font-light leading-relaxed mb-8">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) =>
                  <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[#C2983B] flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                  )}
                  </ul>
                  
                  <Link to={service.title === 'Speaking Events' ? createPageUrl('Schedule') + '?type=speaking' : createPageUrl('Schedule')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <Button className="bg-[#1F2A44] hover:bg-[#2a3654] text-white px-8 py-6 rounded-none group">
                      {service.title === 'Speaking Events' ? 'Book a Speaking Engagement' : 'Book a Session'}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#C2983B] py-24">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>

            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              Ready to Transform Your Finances?
            </h2>
            <p className="text-xl text-white font-light mb-10 max-w-2xl mx-auto">
              Start your journey to financial freedom today with a free consultation.
            </p>
            <Link to={createPageUrl('Schedule')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Button
                size="lg"
                className="bg-[#1F2A44] hover:bg-[#2a3654] text-white font-semibold px-10 py-6 text-lg rounded-none">

                Schedule Your Free Call
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>);

}