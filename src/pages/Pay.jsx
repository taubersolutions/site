import React from 'react';
import SEO from '@/components/seo/SEO';

export default function Pay() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <SEO
        title="Make a Payment"
        description="Securely make a payment to Tauber Solutions using our payment portal."
        canonical="/pay"
      />
      
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-light text-[#1a2b4b] mb-6 text-center">
          Make a Payment
        </h1>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: '800px' }}>
          <iframe
            src="https://secure.cardknox.com/taubersolutions"
            className="w-full h-full border-0"
            title="Payment Portal"
          />
        </div>
      </div>
    </div>
  );
}