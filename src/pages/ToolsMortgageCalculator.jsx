import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Home, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import SEO from '@/components/seo/SEO';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel' },
  { code: 'GBP', symbol: '£', name: 'British Pound' }
];

export default function ToolsMortgageCalculator() {
  const isUKSession = sessionStorage.getItem('isUKSession') === 'true';
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('preferredCurrency');
    return saved || (isUKSession ? 'GBP' : 'USD');
  });

  const [homePrice, setHomePrice] = useState('400000');
  const [downPaymentMode, setDownPaymentMode] = useState('percent');
  const [downPaymentPercent, setDownPaymentPercent] = useState('20');
  const [downPaymentDollar, setDownPaymentDollar] = useState('80000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [pmi, setPmi] = useState('0');
  const [propertyTax, setPropertyTax] = useState('0');
  const [homeInsurance, setHomeInsurance] = useState('0');
  const [management, setManagement] = useState('0');
  const [showAmortization, setShowAmortization] = useState(false);
  const [showAdditionalExpenses, setShowAdditionalExpenses] = useState(true);
  const [viewMode, setViewMode] = useState('yearly');

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

  const getDownPayment = () => {
    const price = parseFloat(homePrice) || 0;
    if (downPaymentMode === 'percent') {
      const percent = parseFloat(downPaymentPercent) || 0;
      return (price * percent) / 100;
    }
    return parseFloat(downPaymentDollar) || 0;
  };

  const calculateMortgage = () => {
    const price = parseFloat(homePrice) || 0;
    const down = getDownPayment();
    const rate = parseFloat(interestRate) || 0;
    const term = parseFloat(loanTerm) || 0;
    const principal = price - down;
    const r = rate / 100 / 12;
    const n = term * 12;
    const monthlyPayment = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - principal;
    return { monthlyPayment, totalPayment, totalInterest, principal };
  };

  const calculateAmortization = () => {
    const price = parseFloat(homePrice) || 0;
    const down = getDownPayment();
    const rate = parseFloat(interestRate) || 0;
    const term = parseFloat(loanTerm) || 0;
    const principal = price - down;
    const r = rate / 100 / 12;
    const monthlyPayment = calculateMortgage().monthlyPayment;
    let balance = principal;
    const schedule = [];

    for (let month = 1; month <= term * 12; month++) {
      const interestPayment = balance * r;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month,
        year: Math.ceil(month / 12),
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }

    const yearlySchedule = [];
    for (let year = 1; year <= term; year++) {
      const yearData = schedule.filter(m => m.year === year);
      yearlySchedule.push({
        year,
        principal: yearData.reduce((sum, m) => sum + m.principal, 0),
        interest: yearData.reduce((sum, m) => sum + m.interest, 0),
        balance: yearData[yearData.length - 1].balance
      });
    }

    return { monthly: schedule, yearly: yearlySchedule };
  };

  const result = calculateMortgage();
  const amortization = calculateAmortization();

  return (
    <div className="pt-20">
      <SEO
        title="Mortgage Calculator"
        description="Calculate your monthly mortgage payment, total interest, and amortization schedule. Plan your home purchase with our free mortgage calculator."
        canonical="/tools/mortgagecalculator"
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
              Mortgage Calculator
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
              Plan Your Home{' '}
              <span className="text-[#C2983B] font-normal">Purchase</span>
            </h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed mb-8">
              Calculate your monthly payments and see how much home you can afford.
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
                  <Home className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Mortgage Calculator</h3>
              </div>

              <div className="space-y-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-gray-300 text-sm">Home Price</Label>
                      <div className="h-[30px] w-[88px]"></div>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg">
                        {currentCurrency.symbol}
                      </span>
                      <Input
                        type="text"
                        value={parseFloat(homePrice) ? parseFloat(homePrice).toLocaleString() : ''}
                        onChange={(e) => {
                          const val = e.target.value.replace(/,/g, '');
                          if (val === '' || /^\d*\.?\d*$/.test(val)) {
                            setHomePrice(val);
                          }
                        }}
                        onBlur={(e) => {
                          const val = parseFloat(e.target.value.replace(/,/g, ''));
                          setHomePrice(isNaN(val) ? '0' : val.toString());
                        }}
                        placeholder="400,000"
                        className="h-14 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg pl-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-gray-300 text-sm">Down Payment</Label>
                      <div className="flex gap-1 bg-white/10 rounded-lg p-0.5">
                        <button
                          onClick={() => setDownPaymentMode('percent')}
                          className={`px-3 py-1 text-xs rounded transition-colors ${
                            downPaymentMode === 'percent' ? 'bg-[#C2983B] text-white' : 'text-gray-400'
                          }`}
                        >
                          %
                        </button>
                        <button
                          onClick={() => setDownPaymentMode('dollar')}
                          className={`px-3 py-1 text-xs rounded transition-colors ${
                            downPaymentMode === 'dollar' ? 'bg-[#C2983B] text-white' : 'text-gray-400'
                          }`}
                        >
                          {currentCurrency.symbol}
                        </button>
                      </div>
                    </div>
                    <div className="relative">
                      {downPaymentMode === 'dollar' && (
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg">
                          {currentCurrency.symbol}
                        </span>
                      )}
                      {downPaymentMode === 'percent' && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 text-lg">
                          %
                        </span>
                      )}
                      <Input
                        type="text"
                        value={downPaymentMode === 'percent' ? downPaymentPercent : (parseFloat(downPaymentDollar) ? parseFloat(downPaymentDollar).toLocaleString() : '')}
                        onChange={(e) => {
                          const val = e.target.value.replace(/,/g, '');
                          if (val === '' || /^\d*\.?\d*$/.test(val)) {
                            if (downPaymentMode === 'percent') {
                              setDownPaymentPercent(val);
                            } else {
                              setDownPaymentDollar(val);
                            }
                          }
                        }}
                        onBlur={(e) => {
                          const val = parseFloat(e.target.value.replace(/,/g, ''));
                          if (downPaymentMode === 'percent') {
                            setDownPaymentPercent(isNaN(val) ? '0' : val.toString());
                          } else {
                            setDownPaymentDollar(isNaN(val) ? '0' : val.toString());
                          }
                        }}
                        placeholder={downPaymentMode === 'percent' ? '20' : '80,000'}
                        className={`h-14 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg ${
                          downPaymentMode === 'dollar' ? 'pl-10' : 'pr-10'
                        } [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                      />
                    </div>
                    {downPaymentMode === 'percent' && (
                      <p className="text-gray-400 text-xs mt-1">
                        = {formatCurrency(((parseFloat(homePrice) || 0) * (parseFloat(downPaymentPercent) || 0)) / 100)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        setInterestRate(isNaN(val) ? '0' : val.toString());
                      }}
                      placeholder="6.5"
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
                        setLoanTerm(isNaN(val) ? '0' : val.toString());
                      }}
                      placeholder="30"
                      className="h-14 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <button 
                    onClick={() => setShowAdditionalExpenses(!showAdditionalExpenses)}
                    className="flex items-center justify-between w-full mb-4 text-white font-medium hover:text-[#C2983B] transition-colors"
                  >
                    <h4>Additional Expenses</h4>
                    <span className="text-sm text-[#C2983B]">{showAdditionalExpenses ? 'Hide' : 'Show'}</span>
                  </button>
                  {showAdditionalExpenses && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300 text-sm mb-2 block">Property Tax (Annually)</Label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg">
                          {currentCurrency.symbol}
                        </span>
                        <Input
                          type="text"
                          value={parseFloat(propertyTax) ? parseFloat(propertyTax).toLocaleString() : ''}
                          onChange={(e) => {
                            const val = e.target.value.replace(/,/g, '');
                            if (val === '' || /^\d*\.?\d*$/.test(val)) {
                              setPropertyTax(val);
                            }
                          }}
                          onBlur={(e) => {
                            const val = parseFloat(e.target.value.replace(/,/g, ''));
                            setPropertyTax(isNaN(val) ? '0' : val.toString());
                          }}
                          placeholder="0"
                          className="h-12 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg pl-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-300 text-sm mb-2 block">Home Insurance (Annually)</Label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg">
                          {currentCurrency.symbol}
                        </span>
                        <Input
                          type="text"
                          value={parseFloat(homeInsurance) ? parseFloat(homeInsurance).toLocaleString() : ''}
                          onChange={(e) => {
                            const val = e.target.value.replace(/,/g, '');
                            if (val === '' || /^\d*\.?\d*$/.test(val)) {
                              setHomeInsurance(val);
                            }
                          }}
                          onBlur={(e) => {
                            const val = parseFloat(e.target.value.replace(/,/g, ''));
                            setHomeInsurance(isNaN(val) ? '0' : val.toString());
                          }}
                          placeholder="0"
                          className="h-12 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg pl-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-300 text-sm mb-2 block">Management (Monthly)</Label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg">
                          {currentCurrency.symbol}
                        </span>
                        <Input
                          type="text"
                          value={parseFloat(management) ? parseFloat(management).toLocaleString() : ''}
                          onChange={(e) => {
                            const val = e.target.value.replace(/,/g, '');
                            if (val === '' || /^\d*\.?\d*$/.test(val)) {
                              setManagement(val);
                            }
                          }}
                          onBlur={(e) => {
                            const val = parseFloat(e.target.value.replace(/,/g, ''));
                            setManagement(isNaN(val) ? '0' : val.toString());
                          }}
                          placeholder="0"
                          className="h-12 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg pl-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-300 text-sm mb-2 block">PMI (Monthly)</Label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg">
                          {currentCurrency.symbol}
                        </span>
                        <Input
                          type="text"
                          value={parseFloat(pmi) ? parseFloat(pmi).toLocaleString() : ''}
                          onChange={(e) => {
                            const val = e.target.value.replace(/,/g, '');
                            if (val === '' || /^\d*\.?\d*$/.test(val)) {
                              setPmi(val);
                            }
                          }}
                          onBlur={(e) => {
                            const val = parseFloat(e.target.value.replace(/,/g, ''));
                            setPmi(isNaN(val) ? '0' : val.toString());
                          }}
                          placeholder="0"
                          className="h-12 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg pl-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>
                  </div>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-gray-400 text-sm mb-2">Principal & Interest:</p>
                <p className="text-4xl font-bold text-white mb-4">
                  {formatCurrency(result.monthlyPayment)}
                </p>

                <div className="bg-white/5 rounded-lg p-4 mb-4">
                  <p className="text-gray-400 text-xs mb-3">Additional Expenses</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Property Tax</span>
                      <span className="text-white">{formatCurrency((parseFloat(propertyTax) || 0) / 12)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Home Insurance</span>
                      <span className="text-white">{formatCurrency((parseFloat(homeInsurance) || 0) / 12)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Management</span>
                      <span className="text-white">{formatCurrency(parseFloat(management) || 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">PMI</span>
                      <span className="text-white">{formatCurrency(parseFloat(pmi) || 0)}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-400 text-sm mb-2">Total Monthly Payment:</p>
                  <p className="text-5xl font-bold text-[#C2983B]">
                    {formatCurrency(result.monthlyPayment + (parseFloat(pmi) || 0) + (parseFloat(propertyTax) || 0) / 12 + (parseFloat(homeInsurance) || 0) / 12 + (parseFloat(management) || 0))}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Loan Amount</p>
                    <p className="text-lg font-medium text-white">
                      {formatCurrency(result.principal)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Total Interest</p>
                    <p className="text-lg font-medium text-red-400">
                      {formatCurrency(result.totalInterest)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowAmortization(!showAmortization)}
                  className="w-full bg-[#1a2b4b]/70 hover:bg-[#1a2b4b] text-white py-3 rounded-lg transition-colors"
                >
                  {showAmortization ? 'Hide' : 'Show'} Amortization Schedule
                </button>

                {showAmortization && (
                  <div className="mt-6 border-t border-white/10 pt-6">
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => setViewMode('yearly')}
                        className={`flex-1 py-2 rounded-lg transition-colors ${
                          viewMode === 'yearly' ? 'bg-[#C2983B] text-white' : 'bg-[#1a2b4b]/50 text-gray-400'
                        }`}
                      >
                        Yearly
                      </button>
                      <button
                        onClick={() => setViewMode('monthly')}
                        className={`flex-1 py-2 rounded-lg transition-colors ${
                          viewMode === 'monthly' ? 'bg-[#C2983B] text-white' : 'bg-[#1a2b4b]/50 text-gray-400'
                        }`}
                      >
                        Monthly
                      </button>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-[#2c3e50]">
                          <tr className="text-gray-400 border-b border-white/10">
                            <th className="text-left py-2">{viewMode === 'yearly' ? 'Year' : 'Month'}</th>
                            <th className="text-right py-2">Interest</th>
                            <th className="text-right py-2">Principal</th>
                            <th className="text-right py-2">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(viewMode === 'yearly' ? amortization.yearly : amortization.monthly).map((row, idx) => (
                            <tr key={idx} className="border-b border-white/5 text-gray-300">
                              <td className="py-2">{viewMode === 'yearly' ? row.year : row.month}</td>
                              <td className="text-right">{formatCurrency(row.interest)}</td>
                              <td className="text-right">{formatCurrency(row.principal)}</td>
                              <td className="text-right">{formatCurrency(row.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
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