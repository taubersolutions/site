import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, TrendingUp, Home, Building2, CreditCard, ArrowRight, Brain, Target, Wallet, Calculator, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import FinancialQuiz from '@/components/interactive/FinancialQuiz';
import SEO from '@/components/seo/SEO';

function InvestmentCalculator({ formatCurrency, currency }) {
  const currentCurrencyObj = currencies.find((c) => c.code === currency);
  const [principal, setPrincipal] = useState('10000');
  const [contribution, setContribution] = useState('500');
  const [contributionFrequency, setContributionFrequency] = useState('monthly');
  const [rate, setRate] = useState('7');
  const [years, setYears] = useState('20');

  const calculateInvestment = () => {
    const p = parseFloat(principal) || 0;
    const c = parseFloat(contribution) || 0;
    const rateVal = parseFloat(rate) || 0;
    const y = parseFloat(years) || 0;
    const r = rateVal / 100 / 12;
    const n = y * 12;
    const monthlyContribution = contributionFrequency === 'monthly' ? c : c / 12;
    const futureValue = p * Math.pow(1 + r, n) + monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);
    const totalContributions = p + monthlyContribution * n;
    const earnings = futureValue - totalContributions;
    return { futureValue, totalContributions, earnings };
  };

  const result = calculateInvestment();

  return (
    <div className="bg-[#2c3e50] rounded-xl p-8 border border-white/10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 min-w-[3.5rem] bg-[#C2983B] rounded-full flex items-center justify-center">
          <TrendingUp className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">Investment Calculator</h3>
      </div>
      
      <div className="space-y-6 mb-8">
        <div>
          <Label className="text-gray-300 text-sm mb-2 block">Investment Period (Years)</Label>
          <Input
            type="text"
            value={years}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '' || /^\d*\.?\d*$/.test(val)) {
                setYears(val);
              }
            }}
            onBlur={(e) => {
              const val = parseFloat(e.target.value);
              setYears(isNaN(val) ? '0' : val.toString());
            }}
            placeholder="20"
            className="h-14 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
        </div>
        <div>
          <Label className="text-gray-300 text-sm mb-2 block">Initial Investment</Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg">
              {currentCurrencyObj.symbol}
            </span>
            <Input
              type="text"
              value={parseFloat(principal) ? parseFloat(principal).toLocaleString() : ''}
              onChange={(e) => {
                const val = e.target.value.replace(/,/g, '');
                if (val === '' || /^\d*\.?\d*$/.test(val)) {
                  setPrincipal(val);
                }
              }}
              onBlur={(e) => {
                const val = parseFloat(e.target.value.replace(/,/g, ''));
                setPrincipal(isNaN(val) ? '0' : val.toString());
              }}
              placeholder="10,000"
              className="h-14 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg pl-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
          </div>
        </div>
        <div>
          <Label className="text-gray-300 text-sm mb-2 flex items-center gap-4">
            <span>Additional Contribution</span>
            <div className="flex gap-2 bg-[#1a2b4b]/50 p-1 rounded">
              <button
                onClick={() => setContributionFrequency('monthly')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                contributionFrequency === 'monthly' ? 'bg-[#C2983B] text-white' : 'text-gray-400'}`
                }>
                Monthly
              </button>
              <button
                onClick={() => setContributionFrequency('yearly')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                contributionFrequency === 'yearly' ? 'bg-[#C2983B] text-white' : 'text-gray-400'}`
                }>
                Yearly
              </button>
            </div>
          </Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg">
              {currentCurrencyObj.symbol}
            </span>
            <Input
              type="text"
              value={parseFloat(contribution) ? parseFloat(contribution).toLocaleString() : ''}
              onChange={(e) => {
                const val = e.target.value.replace(/,/g, '');
                if (val === '' || /^\d*\.?\d*$/.test(val)) {
                  setContribution(val);
                }
              }}
              onBlur={(e) => {
                const val = parseFloat(e.target.value.replace(/,/g, ''));
                setContribution(isNaN(val) ? '0' : val.toString());
              }}
              placeholder="500"
              className="h-14 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg pl-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
          </div>
        </div>
        <div>
          <Label className="text-gray-300 text-sm mb-2 block">Expected Annual Return (%)</Label>
          <Input
            type="text"
            value={rate}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '' || /^\d*\.?\d*$/.test(val)) {
                setRate(val);
              }
            }}
            onBlur={(e) => {
              const val = parseFloat(e.target.value);
              setRate(isNaN(val) ? '0' : val.toString());
            }}
            placeholder="7"
            className="h-14 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
        </div>
      </div>
      
      <div className="pt-6 border-t border-white/10">
        <p className="text-gray-400 text-sm mb-2">Potential Future Value:</p>
        <p className="text-5xl font-bold text-[#C2983B] mb-6">
          {formatCurrency(result.futureValue)}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 text-xs mb-1">Total Contributions</p>
            <p className="text-lg font-medium text-white">
              {formatCurrency(result.totalContributions)}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Investment Earnings</p>
            <p className="text-lg font-medium text-green-400">
              {formatCurrency(result.earnings)}
            </p>
          </div>
        </div>
      </div>
    </div>);

}

function MortgageCalculator({ formatCurrency, currency }) {
  const currentCurrencyObj = currencies.find((c) => c.code === currency);
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

    // Aggregate by year
    const yearlySchedule = [];
    for (let year = 1; year <= term; year++) {
      const yearData = schedule.filter((m) => m.year === year);
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
                {currentCurrencyObj.symbol}
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
                className="h-14 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg pl-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
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
                  {currentCurrencyObj.symbol}
                </button>
              </div>
            </div>
            <div className="relative">
              {downPaymentMode === 'dollar' && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg">
                  {currentCurrencyObj.symbol}
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
                } [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`} />
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
              className="h-14 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
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
              className="h-14 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
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
                  {currentCurrencyObj.symbol}
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
                  className="h-12 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg pl-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
              </div>
            </div>

            <div>
              <Label className="text-gray-300 text-sm mb-2 block">Home Insurance (Annually)</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg">
                  {currentCurrencyObj.symbol}
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
                  className="h-12 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg pl-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
              </div>
            </div>

            <div>
              <Label className="text-gray-300 text-sm mb-2 block">Management (Monthly)</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg">
                  {currentCurrencyObj.symbol}
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
                  className="h-12 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg pl-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
              </div>
            </div>

            <div>
              <Label className="text-gray-300 text-sm mb-2 block">PMI (Monthly)</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg">
                  {currentCurrencyObj.symbol}
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
                  className="h-12 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg pl-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
      
      <div className="pt-6 border-t border-white/10">
        {/* Total Monthly Payment — above the box */}
        <div className="mb-4">
          <p className="text-gray-400 text-sm mb-1">Total Monthly Payment:</p>
          <p className="text-5xl font-bold text-[#C2983B]">
            {formatCurrency(result.monthlyPayment + (parseFloat(pmi) || 0) + (parseFloat(propertyTax) || 0) / 12 + (parseFloat(homeInsurance) || 0) / 12 + (parseFloat(management) || 0))}
          </p>
        </div>

        {/* Grey box: Principal & Interest on left, Additional Expenses on right */}
        <div className="bg-white/5 rounded-lg p-4 mb-6 flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3 flex flex-col justify-center">
            <p className="text-gray-400 text-sm mb-1">Principal & Interest:</p>
            <p className="text-3xl font-bold text-white">
              {formatCurrency(result.monthlyPayment)}
            </p>
          </div>
          <div className="hidden md:block w-px bg-white/10"></div>
          <div className="flex-1">
            <p className="text-gray-400 text-xs mb-3">Additional Expenses</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
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
          className="w-full bg-[#1a2b4b]/70 hover:bg-[#1a2b4b] text-white py-3 rounded-lg transition-colors">
          {showAmortization ? 'Hide' : 'Show'} Amortization Schedule
        </button>

        {showAmortization &&
        <div className="mt-6 border-t border-white/10 pt-6">
            <div className="flex gap-2 mb-4">
              <button
              onClick={() => setViewMode('yearly')}
              className={`flex-1 py-2 rounded-lg transition-colors ${
              viewMode === 'yearly' ? 'bg-[#C2983B] text-white' : 'bg-[#1a2b4b]/50 text-gray-400'}`
              }>
                Yearly
              </button>
              <button
              onClick={() => setViewMode('monthly')}
              className={`flex-1 py-2 rounded-lg transition-colors ${
              viewMode === 'monthly' ? 'bg-[#C2983B] text-white' : 'bg-[#1a2b4b]/50 text-gray-400'}`
              }>
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
                  {(viewMode === 'yearly' ? amortization.yearly : amortization.monthly).map((row, idx) =>
                <tr key={idx} className="border-b border-white/5 text-gray-300">
                      <td className="py-2">{viewMode === 'yearly' ? row.year : row.month}</td>
                      <td className="text-right">{formatCurrency(row.interest)}</td>
                      <td className="text-right">{formatCurrency(row.principal)}</td>
                      <td className="text-right">{formatCurrency(row.balance)}</td>
                    </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        }
      </div>
    </div>);

}

const parseNumTools = (val) => parseFloat(String(val).replace(/,/g, '')) || 0;

const inputClsBase = "h-12 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg pl-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
const inputClsBaseR = "h-12 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg pr-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
const inputClsBaseP = "h-12 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

function NI({ value, onChange, onBlur, placeholder, prefix, suffix }) {
  return (
    <div className="relative">
      {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-sm">{prefix}</span>}
      {suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 text-sm">{suffix}</span>}
      <Input type="text" value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder}
        className={prefix ? inputClsBase : suffix ? inputClsBaseR : inputClsBaseP} />
    </div>
  );
}

function MR({ label, value, highlight, isNeg }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-white/5">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className={`font-semibold text-sm ${highlight ? 'text-green-400' : isNeg ? 'text-red-400' : 'text-white'}`}>{value}</span>
    </div>
  );
}

function CommercialMortgageCalculator({ formatCurrency, currency }) {
  const currentCurrencyObj = currencies.find((c) => c.code === currency);
  const sym = currentCurrencyObj.symbol;

  const [propertyValue, setPropertyValue] = useState('1500000');
  const [downPaymentMode, setDownPaymentMode] = useState('dollar');
  const [downPaymentDollar, setDownPaymentDollar] = useState('375000');
  const [downPaymentPercent, setDownPaymentPercent] = useState('25');
  const [interestRate, setInterestRate] = useState('7.5');
  const [loanTerm, setLoanTerm] = useState('20');

  const [showAdditional, setShowAdditional] = useState(false);
  const [closingCost, setClosingCost] = useState('');
  const [closingCostMode, setClosingCostMode] = useState('dollar');
  const [initialInvestment, setInitialInvestment] = useState('');

  const [currentIncome, setCurrentIncome] = useState('');
  const [currentExpenses, setCurrentExpenses] = useState('');
  const [currentNoiOverride, setCurrentNoiOverride] = useState('');
  const [currentNoiEdited, setCurrentNoiEdited] = useState(false);

  const [proFormaIncome, setProFormaIncome] = useState('');
  const [proFormaExpenses, setProFormaExpenses] = useState('');
  const [proFormaNoiOverride, setProFormaNoiOverride] = useState('');
  const [proFormaNoiEdited, setProFormaNoiEdited] = useState(false);

  const [showAmortization, setShowAmortization] = useState(false);
  const [viewMode, setViewMode] = useState('yearly');

  const handleNumChange = (setter) => (e) => {
    const val = e.target.value.replace(/,/g, '');
    if (val === '' || /^\d*\.?\d*$/.test(val)) setter(val);
  };
  const handleNumBlur = (setter) => (e) => {
    const val = parseFloat(e.target.value.replace(/,/g, ''));
    setter(isNaN(val) ? '' : val);
  };

  const getDownPayment = () => {
    const price = parseFloat(propertyValue) || 0;
    if (downPaymentMode === 'percent') return price * ((parseFloat(downPaymentPercent) || 0) / 100);
    if (downPaymentMode === 'ltv') return price * ((100 - (parseFloat(downPaymentPercent) || 0)) / 100);
    return parseFloat(downPaymentDollar) || 0;
  };
  const getClosingCostAmount = () => {
    const value = parseFloat(propertyValue) || 0;
    const cc = parseFloat(closingCost) || 0;
    return closingCostMode === 'percent' ? (value * cc) / 100 : cc;
  };
  const getTotalDueAtClosing = () => getDownPayment() + getClosingCostAmount() + (parseFloat(initialInvestment) || 0);
  const getLoanAmount = () => (parseFloat(propertyValue) || 0) - getDownPayment();
  const getMonthlyPayment = () => {
    const principal = getLoanAmount();
    const r = (parseFloat(interestRate) || 0) / 100 / 12;
    const n = (parseFloat(loanTerm) || 0) * 12;
    if (r === 0 || n === 0) return 0;
    return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };
  const getAnnualDebtService = () => getMonthlyPayment() * 12;
  const getCurrentNOI = () => {
    if (currentNoiEdited) return parseFloat(currentNoiOverride) || 0;
    return (parseFloat(currentIncome) || 0) - (parseFloat(currentExpenses) || 0);
  };
  const getProFormaNOI = () => {
    if (proFormaNoiEdited) return parseFloat(proFormaNoiOverride) || 0;
    return (parseFloat(proFormaIncome) || 0) - (parseFloat(proFormaExpenses) || 0);
  };
  const getCapRate = (noi) => { const v = parseFloat(propertyValue) || 0; return v > 0 ? (noi / v) * 100 : 0; };
  const getNetProfit = (noi) => noi - getAnnualDebtService();
  const getCashOnCash = (noi) => { const t = getTotalDueAtClosing(); return t > 0 ? (getNetProfit(noi) / t) * 100 : 0; };
  const getDSCR = (noi) => { const ads = getAnnualDebtService(); return ads > 0 ? noi / ads : 0; };
  const getTotalInterest = () => getMonthlyPayment() * (parseFloat(loanTerm) || 0) * 12 - getLoanAmount();

  const calculateAmortization = () => {
    const principal = getLoanAmount();
    const r = (parseFloat(interestRate) || 0) / 100 / 12;
    const n = (parseFloat(loanTerm) || 0) * 12;
    const mp = getMonthlyPayment();
    let balance = principal;
    const schedule = [];
    for (let month = 1; month <= n; month++) {
      const interest = balance * r;
      const princ = mp - interest;
      balance -= princ;
      schedule.push({ month, year: Math.ceil(month / 12), principal: princ, interest, balance: Math.max(0, balance) });
    }
    const term = parseFloat(loanTerm) || 0;
    const yearly = [];
    for (let year = 1; year <= term; year++) {
      const yd = schedule.filter(m => m.year === year);
      yearly.push({ year, principal: yd.reduce((s, m) => s + m.principal, 0), interest: yd.reduce((s, m) => s + m.interest, 0), balance: yd[yd.length - 1]?.balance || 0 });
    }
    return { monthly: schedule, yearly };
  };

  const amortization = calculateAmortization();
  const currentNOI = getCurrentNOI();
  const proFormaNOI = getProFormaNOI();
  const fmt = (n) => `${sym}${(n || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  const fmtPct = (n) => `${(n || 0).toFixed(2)}%`;

  
  
  



  return (
    <div className="bg-[#2c3e50] rounded-xl p-8 border border-white/10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 min-w-[3.5rem] bg-[#C2983B] rounded-full flex items-center justify-center">
          <Building2 className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">Commercial Mortgage</h3>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label className="text-gray-300 text-sm mb-2 block">Property Value</Label>
          <NI prefix={sym} value={propertyValue} onChange={handleNumChange(setPropertyValue)} onBlur={handleNumBlur(setPropertyValue)} placeholder="1,500,000" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-gray-300 text-sm">Down Payment</Label>
            <div className="flex gap-1 bg-white/10 rounded-lg p-0.5">
              {[['$', 'dollar'], ['%', 'percent'], ['LTV', 'ltv']].map(([label, val]) => (
                <button key={val} onClick={() => setDownPaymentMode(val)}
                  className={`px-3 py-1 text-xs rounded transition-colors ${downPaymentMode === val ? 'bg-[#C2983B] text-white' : 'text-gray-400'}`}>
                  {label === '$' ? sym : label}
                </button>
              ))}
            </div>
          </div>
          {downPaymentMode === 'dollar'
            ? <NI prefix={sym} value={downPaymentDollar} onChange={handleNumChange(setDownPaymentDollar)} onBlur={handleNumBlur(setDownPaymentDollar)} placeholder="375,000" />
            : <NI suffix="%" value={downPaymentPercent} onChange={handleNumChange(setDownPaymentPercent)} onBlur={handleNumBlur(setDownPaymentPercent)} placeholder={downPaymentMode === 'ltv' ? 'LTV %' : '25'} />
          }
          {downPaymentMode !== 'dollar' && <p className="text-gray-400 text-xs mt-1">= {fmt(getDownPayment())}</p>}
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label className="text-gray-300 text-sm mb-2 block">Interest Rate</Label>
          <NI suffix="%" value={interestRate} onChange={handleNumChange(setInterestRate)} onBlur={handleNumBlur(setInterestRate)} placeholder="7.5" />
        </div>
        <div>
          <Label className="text-gray-300 text-sm mb-2 block">Amortization (Loan Term in Years)</Label>
          <NI value={loanTerm} onChange={handleNumChange(setLoanTerm)} onBlur={handleNumBlur(setLoanTerm)} placeholder="20" />
        </div>
      </div>

      {/* Additional Information */}
      <div className="border border-white/10 rounded-lg mb-6 overflow-hidden">
        <button onClick={() => setShowAdditional(!showAdditional)}
          className="w-full flex items-center justify-between px-5 py-4 text-white hover:bg-white/5 transition-colors">
          <span className="font-medium text-sm">Additional Information</span>
          <span className="text-gray-400 text-xs">{showAdditional ? 'Hide ▲' : 'Show ▼'}</span>
        </button>
        {showAdditional && (
          <div className="px-5 pb-5 border-t border-white/10 pt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-gray-300 text-sm">Closing Cost</Label>
                  <div className="flex gap-1 bg-white/10 rounded-lg p-0.5">
                    {[['$', 'dollar'], ['%', 'percent']].map(([label, val]) => (
                      <button key={val} onClick={() => setClosingCostMode(val)}
                        className={`px-3 py-1 text-xs rounded transition-colors ${closingCostMode === val ? 'bg-[#C2983B] text-white' : 'text-gray-400'}`}>
                        {label === '$' ? sym : label}
                      </button>
                    ))}
                  </div>
                </div>
                {closingCostMode === 'dollar'
                  ? <NI prefix={sym} value={closingCost} onChange={handleNumChange(setClosingCost)} onBlur={handleNumBlur(setClosingCost)} placeholder="0" />
                  : <NI suffix="%" value={closingCost} onChange={handleNumChange(setClosingCost)} onBlur={handleNumBlur(setClosingCost)} placeholder="0" />
                }
                {closingCostMode === 'percent' && (parseFloat(closingCost) || 0) > 0 && <p className="text-gray-400 text-xs mt-1">= {fmt(getClosingCostAmount())}</p>}
              </div>
              <div>
                <Label className="text-gray-300 text-sm mb-2 block">Initial Investment</Label>
                <NI prefix={sym} value={initialInvestment} onChange={handleNumChange(setInitialInvestment)} onBlur={handleNumBlur(setInitialInvestment)} placeholder="0" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Current Numbers */}
      <div className="border border-white/10 rounded-lg mb-6 overflow-hidden">
        <div className="px-5 py-3 border-b border-white/10"><h4 className="text-white font-medium text-sm">Current Numbers</h4></div>
        <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-gray-300 text-sm mb-2 block">Total Income</Label>
            <NI prefix={sym} value={currentIncome} onChange={handleNumChange(setCurrentIncome)} onBlur={handleNumBlur(setCurrentIncome)} placeholder="0" />
          </div>
          <div>
            <Label className="text-gray-300 text-sm mb-2 block">Total Expenses (excl. mortgage)</Label>
            <NI prefix={sym} value={currentExpenses} onChange={handleNumChange(setCurrentExpenses)} onBlur={handleNumBlur(setCurrentExpenses)} placeholder="0" />
          </div>
          <div>
            <Label className="text-gray-300 text-sm mb-2 block">NOI</Label>
            <NI prefix={sym}
              value={currentNoiEdited ? currentNoiOverride : (getCurrentNOI() || '')}
              onChange={(e) => { setCurrentNoiEdited(true); handleNumChange(setCurrentNoiOverride)(e); }}
              onBlur={handleNumBlur(setCurrentNoiOverride)} placeholder="0" />
            {currentNoiEdited && <button onClick={() => { setCurrentNoiEdited(false); setCurrentNoiOverride(''); }} className="text-[#C2983B] text-xs mt-1">Reset to auto</button>}
            {!currentNoiEdited && (parseFloat(currentIncome) || parseFloat(currentExpenses)) ? <p className="text-gray-400 text-xs mt-1">Auto-calculated</p> : null}
          </div>
        </div>
      </div>

      {/* Pro Forma */}
      <div className="border border-white/10 rounded-lg mb-8 overflow-hidden">
        <div className="px-5 py-3 border-b border-white/10"><h4 className="text-white font-medium text-sm">Pro Forma</h4></div>
        <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-gray-300 text-sm mb-2 block">Total Income</Label>
            <NI prefix={sym} value={proFormaIncome} onChange={handleNumChange(setProFormaIncome)} onBlur={handleNumBlur(setProFormaIncome)} placeholder="0" />
          </div>
          <div>
            <Label className="text-gray-300 text-sm mb-2 block">Total Expenses (excl. mortgage)</Label>
            <NI prefix={sym} value={proFormaExpenses} onChange={handleNumChange(setProFormaExpenses)} onBlur={handleNumBlur(setProFormaExpenses)} placeholder="0" />
          </div>
          <div>
            <Label className="text-gray-300 text-sm mb-2 block">NOI</Label>
            <NI prefix={sym}
              value={proFormaNoiEdited ? proFormaNoiOverride : (getProFormaNOI() || '')}
              onChange={(e) => { setProFormaNoiEdited(true); handleNumChange(setProFormaNoiOverride)(e); }}
              onBlur={handleNumBlur(setProFormaNoiOverride)} placeholder="0" />
            {proFormaNoiEdited && <button onClick={() => { setProFormaNoiEdited(false); setProFormaNoiOverride(''); }} className="text-[#C2983B] text-xs mt-1">Reset to auto</button>}
            {!proFormaNoiEdited && (parseFloat(proFormaIncome) || parseFloat(proFormaExpenses)) ? <p className="text-gray-400 text-xs mt-1">Auto-calculated</p> : null}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="pt-6 border-t border-white/10">
        <p className="text-gray-400 text-sm mb-1">Monthly Payment (P&I):</p>
        <p className="text-5xl font-bold text-[#C2983B] mb-6">{fmt(getMonthlyPayment())}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[['Loan Amount', fmt(getLoanAmount())], ['LTV Ratio', fmtPct(getLoanAmount() / (parseFloat(propertyValue) || 1) * 100)], ['Annual Debt Service', fmt(getAnnualDebtService())], ['Total Interest', fmt(getTotalInterest())]].map(([label, val]) => (
            <div key={label} className="bg-white/5 rounded-lg p-3">
              <p className="text-gray-400 text-xs mb-1">{label}</p>
              <p className={`text-base font-semibold ${label === 'Total Interest' ? 'text-red-400' : 'text-white'}`}>{val}</p>
            </div>
          ))}
        </div>

        {/* Investment + Current + Pro Forma */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-4 flex flex-col justify-between">
            <div>
              <h4 className="text-[#C2983B] font-semibold text-sm mb-3">Investment</h4>
              <div className="mb-3">
                <p className="text-gray-400 text-xs mb-1">Total Due at Closing</p>
                <p className="text-xl font-bold text-white">{fmt(getTotalDueAtClosing())}</p>
              </div>
            </div>
            <div>
              <MR label="Down Payment" value={fmt(getDownPayment())} />
              <MR label="Closing Cost" value={fmt(getClosingCostAmount())} />
              <MR label="Initial Investment" value={fmt(parseNumTools(initialInvestment) || 0)} />
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-[#C2983B] font-semibold text-sm mb-3">Current</h4>
            <MR label="NOI" value={fmt(currentNOI)} />
            <MR label="Cap Rate" value={fmtPct(getCapRate(currentNOI))} />
            <MR label="Net Profit" value={fmt(getNetProfit(currentNOI))} isNeg={getNetProfit(currentNOI) < 0} />
            <MR label="Cash on Cash" value={fmtPct(getCashOnCash(currentNOI))} highlight={getCashOnCash(currentNOI) > 0} isNeg={getCashOnCash(currentNOI) < 0} />
            <MR label="DSCR" value={`${getDSCR(currentNOI).toFixed(2)}x`} highlight={getDSCR(currentNOI) >= 1.25} isNeg={getDSCR(currentNOI) < 1.25 && getDSCR(currentNOI) > 0} />
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-[#C2983B] font-semibold text-sm mb-3">Pro Forma</h4>
            <MR label="NOI" value={fmt(proFormaNOI)} />
            <MR label="Cap Rate" value={fmtPct(getCapRate(proFormaNOI))} />
            <MR label="Net Profit" value={fmt(getNetProfit(proFormaNOI))} isNeg={getNetProfit(proFormaNOI) < 0} />
            <MR label="Cash on Cash" value={fmtPct(getCashOnCash(proFormaNOI))} highlight={getCashOnCash(proFormaNOI) > 0} isNeg={getCashOnCash(proFormaNOI) < 0} />
            <MR label="DSCR" value={`${getDSCR(proFormaNOI).toFixed(2)}x`} highlight={getDSCR(proFormaNOI) >= 1.25} isNeg={getDSCR(proFormaNOI) < 1.25 && getDSCR(proFormaNOI) > 0} />
          </div>
        </div>

        <button onClick={() => setShowAmortization(!showAmortization)}
          className="w-full bg-[#1a2b4b]/70 hover:bg-[#1a2b4b] text-white py-3 rounded-lg transition-colors">
          {showAmortization ? 'Hide' : 'Show'} Amortization Schedule
        </button>

        {showAmortization && (
          <div className="mt-6 border-t border-white/10 pt-6">
            <div className="flex gap-2 mb-4">
              {['yearly', 'monthly'].map(mode => (
                <button key={mode} onClick={() => setViewMode(mode)}
                  className={`flex-1 py-2 rounded-lg transition-colors capitalize ${viewMode === mode ? 'bg-[#C2983B] text-white' : 'bg-[#1a2b4b]/50 text-gray-400'}`}>
                  {mode}
                </button>
              ))}
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
                      <td className="text-right">{fmt(row.interest)}</td>
                      <td className="text-right">{fmt(row.principal)}</td>
                      <td className="text-right">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function LoanCalculator({ formatCurrency, currency }) {
  const currentCurrencyObj = currencies.find((c) => c.code === currency);
  const [loanAmount, setLoanAmount] = useState('25000');
  const [interestRate, setInterestRate] = useState('8');
  const [loanTerm, setLoanTerm] = useState('5');
  const [showAmortization, setShowAmortization] = useState(false);
  const [viewMode, setViewMode] = useState('yearly');

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

  const calculateAmortization = () => {
    const amount = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) || 0;
    const term = parseFloat(loanTerm) || 0;
    const r = rate / 100 / 12;
    const monthlyPayment = calculateLoan().monthlyPayment;
    let balance = amount;
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
    for (let year = 1; year <= loanTerm; year++) {
      const yearData = schedule.filter((m) => m.year === year);
      yearlySchedule.push({
        year,
        principal: yearData.reduce((sum, m) => sum + m.principal, 0),
        interest: yearData.reduce((sum, m) => sum + m.interest, 0),
        balance: yearData[yearData.length - 1].balance
      });
    }

    return { monthly: schedule, yearly: yearlySchedule };
  };

  const result = calculateLoan();
  const amortization = calculateAmortization();

  return (
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
              {currentCurrencyObj.symbol}
            </span>
            <Input
              type="text"
              value={parseFloat(loanAmount) ? parseFloat(loanAmount).toLocaleString() : ''}
              onChange={(e) => {
                const val = e.target.value.replace(/,/g, '');
                if (val === '' || /^\d*\.?\d*$/.test(val)) {
                  setLoanAmount(val);
                }
              }}
              onBlur={(e) => {
                const val = parseFloat(e.target.value.replace(/,/g, ''));
                setLoanAmount(isNaN(val) ? '0' : val.toString());
              }}
              placeholder="25,000"
              className="h-14 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg pl-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
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
              setInterestRate(isNaN(val) ? '0' : val.toString());
            }}
            placeholder="8"
            className="h-14 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
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
            placeholder="5"
            className="h-14 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
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
    </div>);

}

const tools = [
{ id: 'investment', name: 'Investment', icon: TrendingUp, component: InvestmentCalculator },
{ id: 'mortgage', name: 'Mortgage', icon: Home, component: MortgageCalculator },
{ id: 'commercial', name: 'Commercial', icon: Building2, component: CommercialMortgageCalculator },
{ id: 'loan', name: 'Loan', icon: CreditCard, component: LoanCalculator }];


const currencies = [
{ code: 'USD', symbol: '$', rate: 1, name: 'US Dollar' },
{ code: 'ILS', symbol: '₪', rate: 3.6, name: 'Israeli Shekel' },
{ code: 'GBP', symbol: '£', rate: 0.79, name: 'British Pound' }];

const resourcesData = [
{
  id: 'goals',
  title: 'Your Goals Sheet',
  description: "Capture your goals simply and clearly. It's the starting point for building your plan.",
  icon: Target,
  links: {
    GBP: {
      pdf: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69529b452690abb118ee83b9/83e47f6d0_UKGoalsSheet.pdf',
      excel: 'https://docs.google.com/spreadsheets/d/10wTabnJSDS6fHRUYk3Fj2ade7loGHxQ3/export?format=xlsx'
    },
    USD: {
      pdf: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69529b452690abb118ee83b9/83e47f6d0_UKGoalsSheet.pdf',
      excel: 'https://docs.google.com/spreadsheets/d/10wTabnJSDS6fHRUYk3Fj2ade7loGHxQ3/export?format=xlsx'
    },
    ILS: {
      pdf: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69529b452690abb118ee83b9/83e47f6d0_UKGoalsSheet.pdf',
      excel: 'https://docs.google.com/spreadsheets/d/10wTabnJSDS6fHRUYk3Fj2ade7loGHxQ3/export?format=xlsx'
    }
  }
},
{
  id: 'asset',
  title: 'Asset Sheet',
  description: 'See your full financial picture in one clear sheet. Review it monthly to support real action and progress.',
  icon: Wallet,
  links: {
    GBP: {
      pdf: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69529b452690abb118ee83b9/191dcde5b_UKAssetSheet.pdf',
      excel: 'https://docs.google.com/spreadsheets/d/1JiVVyn2C9rfZ2gGqkcldAJ7DUpohRHus/export?format=xlsx'
    },
    USD: {
      pdf: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69529b452690abb118ee83b9/191dcde5b_UKAssetSheet.pdf',
      excel: 'https://docs.google.com/spreadsheets/d/1JiVVyn2C9rfZ2gGqkcldAJ7DUpohRHus/export?format=xlsx'
    },
    ILS: {
      pdf: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69529b452690abb118ee83b9/191dcde5b_UKAssetSheet.pdf',
      excel: 'https://docs.google.com/spreadsheets/d/1JiVVyn2C9rfZ2gGqkcldAJ7DUpohRHus/export?format=xlsx'
    }
  }
},
{
  id: 'budget_planner',
  title: 'Budget Planner',
  description: 'A powerful Excel budget tool you can also upload to Google Sheets for tracking. Plan your month, track weekly, and stay on top of spending with clear totals.',
  icon: Calculator,
  links: {
    GBP: {
      pdf: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69529b452690abb118ee83b9/668cc6683_TSMonthlyUKFinancialPlanner.pdf',
      excel: 'https://docs.google.com/spreadsheets/d/1OWSZoa6DQ-n3HeHtw-cUjBnwbRW-hVte/export?format=xlsx'
    },
    USD: {
      pdf: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69529b452690abb118ee83b9/668cc6683_TSMonthlyUKFinancialPlanner.pdf',
      excel: 'https://docs.google.com/spreadsheets/d/1OWSZoa6DQ-n3HeHtw-cUjBnwbRW-hVte/export?format=xlsx'
    },
    ILS: {
      pdf: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69529b452690abb118ee83b9/668cc6683_TSMonthlyUKFinancialPlanner.pdf',
      excel: 'https://docs.google.com/spreadsheets/d/1OWSZoa6DQ-n3HeHtw-cUjBnwbRW-hVte/export?format=xlsx'
    }
  }
},
{
  id: 'budget_category_guide',
  title: 'Budget Category Guide',
  description: 'A ready-made list of categories to use in the Budget Planner dropdowns. This guide matches the category dropdowns in the Budget Planner.',
  icon: BookOpen,
  links: {
    GBP: {
      pdf: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69529b452690abb118ee83b9/54dc673a5_TSUKCategoryGuide.pdf',
      excel: 'https://docs.google.com/spreadsheets/d/1XsoYxlf9BWJuB1kdSbL9-yySmOe2ipls/export?format=xlsx'
    },
    USD: {
      pdf: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69529b452690abb118ee83b9/54dc673a5_TSUKCategoryGuide.pdf',
      excel: 'https://docs.google.com/spreadsheets/d/1XsoYxlf9BWJuB1kdSbL9-yySmOe2ipls/export?format=xlsx'
    },
    ILS: {
      pdf: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69529b452690abb118ee83b9/54dc673a5_TSUKCategoryGuide.pdf',
      excel: 'https://docs.google.com/spreadsheets/d/1XsoYxlf9BWJuB1kdSbL9-yySmOe2ipls/export?format=xlsx'
    }
  }
}];



export default function Tools() {
  const isUKSession = sessionStorage.getItem('isUKSession') === 'true';
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('preferredCurrency');
    return saved || (isUKSession ? 'GBP' : 'USD');
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('preferredCurrency');
      if (saved) {
        setCurrency(saved);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    const intervalId = setInterval(() => {
      const saved = localStorage.getItem('preferredCurrency');
      if (saved && saved !== currency) {
        setCurrency(saved);
      }
    }, 100);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, [currency]);

  const availableCurrencies = currencies;
  const currentCurrency = currencies.find((c) => c.code === currency);

  const formatCurrency = (amount) => {
    return `${currentCurrency.symbol}${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="pt-20">
      <SEO
        title="Free Financial Tools & Calculators"
        description="Access free financial calculators, budget templates, and resources. Plan investments, calculate mortgages, and improve your financial literacy with our interactive tools."
        canonical="/tools" />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#1a2b4b] via-[#2c3e50] to-[#1a2b4b] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute bottom-20 right-20 w-96 h-96 border border-[#C2983B] rounded-full" />
        </div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl">

            <span className="text-[#C2983B] text-sm tracking-[0.3em] uppercase mb-4 block">
              Free Resources
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
              Your Financial Toolkit —{' '}
              <span className="text-[#C2983B] font-normal">No Cost, Just Clarity</span>
            </h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed mb-8">
              Practical tools to plan, budget, and invest smarter. 
              Start making informed financial decisions today.
            </p>
            
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-white/80 font-medium">Select Your Currency:</span>
              <div className="flex gap-2 bg-white/10 p-1.5 rounded-lg flex-wrap">
                {availableCurrencies.map((curr) =>
                <button
                  key={curr.code}
                  onClick={() => {
                    setCurrency(curr.code);
                    localStorage.setItem('preferredCurrency', curr.code);
                  }}
                  className={`px-5 py-2.5 text-sm font-semibold transition-all rounded-lg ${
                  currency === curr.code ?
                  'bg-[#C2983B] text-white shadow-lg' :
                  'text-white/70 hover:text-white hover:bg-white/20'}`
                  }>

                    {curr.symbol} {curr.code}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calculators */}
      <section className="py-24 bg-[#f8f9fa]">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8">

            <h2 className="text-3xl md:text-4xl font-light text-[#1a2b4b] mb-6">
              Financial <span className="font-normal">Calculators</span>
            </h2>
          </motion.div>

          <Tabs defaultValue="investment" className="max-w-4xl mx-auto">
            <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4 mb-12 h-auto bg-[#1a2b4b]/20 rounded-lg gap-2 p-2">
              {tools.map((tool) =>
              <TabsTrigger
                key={tool.id}
                value={tool.id}
                className="py-4 rounded-lg data-[state=active]:bg-[#1a2b4b] data-[state=active]:text-white text-xs sm:text-sm font-medium transition-all">

                  <tool.icon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                  {tool.name}
                </TabsTrigger>
              )}
            </TabsList>
            
            {tools.map((tool) =>
            <TabsContent key={tool.id} value={tool.id}>
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}>

                  <tool.component formatCurrency={formatCurrency} currency={currentCurrency.code} />
                </motion.div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </section>

      {/* Downloadable Resources */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16">

            <h2 className="text-3xl md:text-4xl font-light text-[#1a2b4b] mb-6">
              Downloadable <span className="font-normal">Resources</span>
            </h2>
            
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span className="text-[#1a2b4b] font-medium">Currency:</span>
              <div className="flex gap-2 bg-gray-100 p-1.5 rounded-lg flex-wrap">
                {availableCurrencies.map((curr) =>
                <button
                  key={curr.code}
                  onClick={() => {
                    setCurrency(curr.code);
                    localStorage.setItem('preferredCurrency', curr.code);
                  }}
                  className={`px-5 py-2.5 text-sm font-semibold transition-all rounded-lg ${
                  currency === curr.code ?
                  'bg-[#C2983B] text-white shadow-lg' :
                  'text-gray-600 hover:text-[#1a2b4b] hover:bg-gray-200'}`
                  }>

                    {curr.symbol} {curr.code}
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {resourcesData.map((resource, idx) => {
              const ResourceIcon = resource.icon;
              const links = resource.links[currency];
              const canDownload = isUKSession || currency === 'GBP';

              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}>

                  <Card className="h-full border border-gray-200 hover:border-2 hover:border-[#C2983B] hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-[#C2983B]/10 mb-4 flex items-center justify-center transition-colors">
                        <ResourceIcon className="w-6 h-6 text-gray-500 group-hover:text-[#C2983B] transition-colors" />
                      </div>
                      <h3 className="text-lg font-semibold text-[#1a2b4b] mb-2">{resource.title}</h3>
                      <p className="text-gray-600 text-sm font-light flex-grow mb-6">
                        {resource.description}
                      </p>
                      <div className="flex flex-col gap-3">
                        {canDownload ?
                        <>
                            <a
                            href={links.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block">

                              <Button variant="outline" className="w-full rounded-lg border-gray-300">
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF
                              </Button>
                            </a>
                            <a
                            href={links.excel}
                            download={`${resource.title.replace(/\s+/g, '-')}.xlsx`}
                            className="block">

                              <Button variant="outline" className="w-full rounded-lg border-gray-300">
                                <Download className="w-4 h-4 mr-2" />
                                Download Excel
                              </Button>
                            </a>
                          </> :

                        <div className="text-center py-4">
                            <p className="text-sm text-gray-500 mb-3">
                              Coming soon for {currency}
                            </p>
                            <Button
                            variant="outline"
                            className="w-full rounded-lg border-gray-300 opacity-50 cursor-not-allowed"
                            disabled>
                              <Download className="w-4 h-4 mr-2" />
                              Not Available Yet
                            </Button>
                          </div>
                        }
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>);

            })}
          </div>
        </div>
      </section>

      {/* Financial Literacy Quiz */}
      <section className="py-24 bg-[#f8f9fa]">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16">

            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C2983B]/10 rounded-full mb-6">
              <Brain className="w-8 h-8 text-[#C2983B]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-[#1a2b4b]">
              Test Your <span className="font-normal">Financial Knowledge</span>
            </h2>
            <p className="text-gray-600 font-light mt-4 max-w-2xl mx-auto">
              Take our interactive quiz to discover your financial literacy level 
              and learn key concepts along the way.
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <FinancialQuiz />
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
              Need Personalized Guidance?
            </h2>
            <p className="text-xl text-white font-light mb-10 max-w-2xl mx-auto">
              Our tools are a great start, but nothing beats working with a professional coach.
            </p>
            <Link to={createPageUrl('Schedule')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Button
                size="lg"
                className="bg-[#1a2b4b] hover:bg-[#2c3e50] text-white font-semibold px-10 py-6 text-lg rounded-lg shadow-lg">

                Schedule Your Meeting
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>);

}
