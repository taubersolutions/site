import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import SEO from '@/components/seo/SEO';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel' },
  { code: 'GBP', symbol: '£', name: 'British Pound' }
];

export default function LoanCalculator() {
  const isUKSession = sessionStorage.getItem('isUKSession') === 'true';
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('preferredCurrency');
    return saved || (isUKSession ? 'GBP' : 'USD');
  });

  const [loanAmount, setLoanAmount] = useState('25000');
  const [interestRate, setInterestRate] = useState('8');
  const [loanTerm, setLoanTerm] = useState('5');

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('preferredCurrency');
      if (saved) setCurrency(saved);
    };

    window.addEventListener('storage', handleStorageChange);
    const intervalId = setInterval(() => {
      const saved = localStorage.getItem('preferredCurrency');
      if (saved && saved !== currency) setCurrency(saved);
    }, 100);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, [currency]);

  const availableCurrencies = currencies;
  const currentCurrency = currencies.find(c => c.code === currency);

  const formatCurrency = (amount) => {
    return `${currentCurrency.symbol}${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  const calculateLoan = () => {
    const amount = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) || 0;
    const term = parseFloat(loanTerm) || 0;
    const r = rate / 100 / 12;
    const n = term * 12;
    const monthlyPayment = amount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - amount;
    return { monthlyPayment, totalPayment, totalInterest };
  };

  const result = calculateLoan();

  return (
    <div className="pt-20">
      <SEO
        title="Loan Calculator"
        description="Calculate your loan payments and total interest. Plan your personal or business loan with our free calculator."
        canonical="/loancalculator"
      />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#1a2b4b] via-[#2c3e50] to-[#1a2b4b] relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-[#C2983B] text-sm tracking-[0.3em] uppercase mb-4 block">
              Loan Calculator
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
              Plan Your Loan{' '}
              <span className="text-[#C2983B] font-normal">Payments</span>
            </h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed mb-8">
              Calculate monthly payments and total interest for any loan.
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-white/80 font-medium">Select Your Currency:</span>
              <div className="flex gap-2 bg-white/10 p-1.5 rounded-lg flex-wrap">
                {availableCurrencies.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => {
                      setCurrency(curr.code);
                      localStorage.setItem('preferredCurrency', curr.code);
                    }}
                    className={`px-5 py-2.5 text-sm font-semibold transition-all rounded-lg ${
                      currency === curr.code
                        ? 'bg-[#C2983B] text-white shadow-lg'
                        : 'text-white/70 hover:text-white hover:bg-white/20'
                    }`}
                  >
                    {curr.symbol} {curr.code}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-24 bg-[#f8f9fa]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#2c3e50] rounded-xl p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 min-w-[3.5rem] bg-[#C2983B] rounded-full flex items-center justify-center">
                  <CreditCard className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Loan Calculator</h3>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <Label className="text-gray-300 text-sm mb-2 block">Loan Amount</Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg">
                      {currentCurrency.symbol}
                    </span>
                    <Input
                      type="text"
                      value={loanAmount}
                      onChange={(e) => {
                        const val = e.target.value.replace(/,/g, '');
                        if (val === '' || /^\d*\.?\d*$/.test(val)) {
                          setLoanAmount(val);
                        }
                      }}
                      onBlur={(e) => {
                        const val = parseFloat(e.target.value.replace(/,/g, ''));
                        setLoanAmount(isNaN(val) ? 0 : val);
                      }}
                      placeholder="25,000"
                      className="h-14 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg pl-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300 text-sm mb-2 block">Interest Rate (%)</Label>
                  <Input
                    type="text"
                    value={interestRate}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || /^\d*\.?\d*$/.test(val)) {
                        setInterestRate(val);
                      }
                    }}
                    onBlur={(e) => {
                      const val = parseFloat(e.target.value);
                      setInterestRate(isNaN(val) ? 0 : val);
                    }}
                    placeholder="8"
                    className="h-14 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 text-sm mb-2 block">Loan Term (Years)</Label>
                  <Input
                    type="text"
                    value={loanTerm}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || /^\d*\.?\d*$/.test(val)) {
                        setLoanTerm(val);
                      }
                    }}
                    onBlur={(e) => {
                      const val = parseFloat(e.target.value);
                      setLoanTerm(isNaN(val) ? 0 : val);
                    }}
                    placeholder="5"
                    className="h-14 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-gray-400 text-sm mb-2">Monthly Payment:</p>
                <p className="text-5xl font-bold text-[#C2983B] mb-6">
                  {formatCurrency(result.monthlyPayment)}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Total Payment</p>
                    <p className="text-lg font-medium text-white">
                      {formatCurrency(result.totalPayment)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Total Interest</p>
                    <p className="text-lg font-medium text-red-400">
                      {formatCurrency(result.totalInterest)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#C2983B] py-24">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              Need Personalized Guidance?
            </h2>
            <p className="text-xl text-white font-light mb-10 max-w-2xl mx-auto">
              Our calculators are a great start, but nothing beats working with a professional coach.
            </p>
            <Link to={createPageUrl('Schedule')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Button
                size="lg"
                className="bg-[#1a2b4b] hover:bg-[#2c3e50] text-white font-semibold px-10 py-6 text-lg rounded-lg shadow-lg"
              >
                Schedule Your Meeting
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}