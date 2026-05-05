import React from 'react';
import SEO from '@/components/seo/SEO';
import { organizationSchema } from '@/components/seo/schemas';
import HeroSection from '@/components/home/HeroSection';
import TrustIndicators from '@/components/home/TrustIndicators';
import ServicesPreview from '@/components/home/ServicesPreview';
import CTASection from '@/components/home/CTASection';
import NewsletterSignup from '@/components/interactive/NewsletterSignup';

export default function Home() {
  return (
    <div>
      <SEO
        title="Financial Coaching & Advisory Services"
        description="Transform your financial future with expert coaching from Tauber Solutions. Personalized guidance for debt management, budgeting, investments, and long-term wealth building."
        canonical="/"
        schema={organizationSchema}
      />
      <HeroSection />
      <ServicesPreview />
      <NewsletterSignup variant="section" />
      <CTASection />
    </div>
  );
}