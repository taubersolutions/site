import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function NewsletterSignup({ variant = 'inline' }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    try {
      await base44.entities.EmailSubscriber.create({
        email: email,
        name: name || undefined,
        source: 'newsletter'
      });
      
      setIsSubmitted(true);
      setEmail('');
      setName('');

      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Failed to save email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'section') {
    return (
      <section className="py-20 bg-gradient-to-br from-[#1F2A44] to-[#2a3654] relative overflow-hidden">
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}>

              <div className="w-16 h-16 bg-[#c5a059]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-[#c5a059]" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                Get Financial Tips
              </h2>
              <p className="text-xl text-gray-300 font-light mb-10">
                Join our newsletter for expert insights, exclusive resources, and practical advice delivered to your inbox.
              </p>

              {!isSubmitted ?
              <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="flex-1 h-14 rounded-none bg-white/10 border-white/20 text-white placeholder:text-white/60" />

                    <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="flex-1 h-14 rounded-none bg-white/10 border-white/20 text-white placeholder:text-white/60" />

                    <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#c5a059] hover:bg-[#b08e35] text-white font-semibold h-14 px-8 rounded-none whitespace-nowrap">

                      {isLoading ? 'Subscribing...' : 'Subscribe'}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-400 mt-4">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </form> :

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/20 border border-green-500/30 rounded-lg p-6 max-w-xl mx-auto">

                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <p className="text-white text-lg font-medium">
                    Thank you for subscribing!
                  </p>
                  <p className="text-gray-300 mt-2">
                    Check your email for a confirmation message.
                  </p>
                </motion.div>
              }
            </motion.div>
          </div>
        </div>
      </section>);

  }

  // Inline variant (for footer)
  return (
    <div className="max-w-md">
      <h4 className="text-[#c5a059] text-sm tracking-[0.2em] uppercase mb-4">
        Stay Informed
      </h4>
      <p className="text-gray-400 font-light mb-4">
        Get financial tips and exclusive content.
      </p>
      
      {!isSubmitted ?
      <form onSubmit={handleSubmit} className="space-y-3">
          <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="bg-white/5 border-white/10 text-white placeholder:text-white/50 rounded-none h-12" />

          <Button
          type="submit"
          disabled={isLoading} className="bg-[#C2983B] text-white px-4 py-2 text-sm font-semibold rounded-none inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow w-full hover:bg-[#b08e35] h-12">


            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form> :

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">

          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
          <p className="text-sm text-gray-300">
            Successfully subscribed!
          </p>
        </motion.div>
      }
    </div>);

}