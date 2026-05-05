import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/seo/SEO';

export default function TermsAndConditions() {
  return (
    <div className="pt-20">
      <SEO
        title="Terms and Conditions"
        description="Read the terms and conditions for using Tauber Solutions services."
        canonical="/terms-and-conditions"
      />

      <section className="py-24 bg-gradient-to-br from-[#1a2b4b] via-[#2c3e50] to-[#1a2b4b]">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
              Terms and <span className="font-normal text-[#C2983B]">Conditions</span>
            </h1>
            <p className="text-xl text-gray-300 font-light">
              Last updated: January 8, 2026
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the services of Tauber Solutions ("we," "us," or "our"), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
            </p>

            <h2>2. Services Provided</h2>
            <p>
              Tauber Solutions provides financial coaching and advisory services. Our services include:
            </p>
            <ul>
              <li>One-on-one financial coaching sessions</li>
              <li>Financial planning guidance</li>
              <li>Educational resources and tools</li>
              <li>Speaking engagements and workshops</li>
            </ul>

            <h2>3. Not Financial Advice</h2>
            <p>
              Our services are for educational and coaching purposes only. We do not provide investment advice, tax advice, or legal advice. You should consult with qualified professionals for specific financial, tax, or legal advice.
            </p>

            <h2>4. Fees and Payment</h2>
            <p>
              Fees for our services are as quoted at the time of booking. Payment is required at the time of service unless otherwise agreed. All fees are non-refundable unless stated otherwise.
            </p>

            <h2>5. Cancellation Policy</h2>
            <p>
              You may cancel or reschedule a session with at least 24 hours notice. Cancellations with less than 24 hours notice may be subject to a cancellation fee.
            </p>

            <h2>6. Confidentiality</h2>
            <p>
              We maintain strict confidentiality of all information shared during coaching sessions. However, we may be required to disclose information if legally compelled to do so.
            </p>

            <h2>7. Client Responsibilities</h2>
            <p>
              As a client, you agree to:
            </p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Actively participate in coaching sessions</li>
              <li>Implement recommendations at your own discretion</li>
              <li>Communicate openly about your financial situation</li>
            </ul>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Tauber Solutions shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for the service in question.
            </p>

            <h2>9. Intellectual Property</h2>
            <p>
              All content, materials, and tools provided by Tauber Solutions are our intellectual property. You may not reproduce, distribute, or create derivative works without our express written permission.
            </p>

            <h2>10. Termination</h2>
            <p>
              We reserve the right to terminate or suspend access to our services immediately, without prior notice, for any reason, including breach of these Terms and Conditions.
            </p>

            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting. Your continued use of our services constitutes acceptance of the modified terms.
            </p>

            <h2>12. Governing Law</h2>
            <p>
              These Terms and Conditions are governed by and construed in accordance with the laws of the State of New York, United States, without regard to its conflict of law provisions.
            </p>

            <h2>13. Contact Information</h2>
            <p>
              For questions about these Terms and Conditions, please contact us at:
            </p>
            <p>
              Email: <a href="mailto:office@taubersolutions.com">office@taubersolutions.com</a><br />
              Phone: +1 (845) 322-6500<br />
              Address: 67 North Airmont Rd, Suffern, NY 10901
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}