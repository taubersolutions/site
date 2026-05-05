import React, { useEffect } from 'react';
import SEO from '@/components/seo/SEO';
import { organizationSchema } from '@/components/seo/schemas';
import HeroSection from '../components/home/HeroSection';
import ServicesPreview from '../components/home/ServicesPreview';
import TrustIndicators from '../components/home/TrustIndicators';
import CTASection from '../components/home/CTASection';
import NewsletterSignup from '../components/interactive/NewsletterSignup';

export default function UK() {
  useEffect(() => {
    sessionStorage.setItem('isUKSession', 'true');
  }, []);

  return (
    <div className="pt-20">
      <SEO
        title="UK Financial Coaching Services"
        description="Expert financial coaching for UK clients. Personalized guidance tailored to UK financial regulations, markets, and your unique goals."
        canonical="/uk"
        schema={organizationSchema}
      />
      <HeroSection />
      <ServicesPreview />
      <TrustIndicators />
      <CTASection />
      <NewsletterSignup variant="section" />
    </div>
  );
}