import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import SEO from '@/components/seo/SEO';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel' },
  { code: 'GBP', symbol: '£', name: 'British Pound' }
];

const parseNum = (val) => parseFloat(String(val).replace(/,/g, '')) || 0;

export default function CommercialCalculator() {
  const isUKSession = sessionStorage.getItem('isUKSession') === 'true';
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('preferredCurrency');
    return saved || (isUKSession ? 'GBP' : 'USD');
  });

  // Core fields
  const [propertyValue, setPropertyValue] = useState('1500000');
  const [downPaymentMode, setDownPaymentMode] = useState('dollar');
  const [downPaymentDollar, setDownPaymentDollar] = useState('375000');
  const [downPaymentPercent, setDownPaymentPercent] = useState('25');
  const [interestRate, setInterestRate] = useState('7.5');
  const [loanTerm, setLoanTerm] = useState('20');

  // Additional info (hidden by default)
  const [showAdditional, setShowAdditional] = useState(false);
  const [closingCost, setClosingCost] = useState('');
  const [closingCostMode, setClosingCostMode] = useState('dollar');
  const [initialInvestment, setInitialInvestment] = useState('');

  // Current numbers
  const [currentIncome, setCurrentIncome] = useState('');
  const [currentExpenses, setCurrentExpenses] = useState('');
  const [currentNoiOverride, setCurrentNoiOverride] = useState('');
  const [currentNoiEdited, setCurrentNoiEdited] = useState(false);

  // Pro forma
  const [proFormaIncome, setProFormaIncome] = useState('');
  const [proFormaExpenses, setProFormaExpenses] = useState('');
  const [proFormaNoiOverride, setProFormaNoiOverride] = useState('');
  const [proFormaNoiEdited, setProFormaNoiEdited] = useState(false);

  const [showAmortization, setShowAmortization] = useState(false);
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

  const currentCurrency = currencies.find(c => c.code === currency);

  const formatCurrency = (amount) =>
    `${currentCurrency.symbol}${(amount || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

  const formatPercent = (val) => `${(val || 0).toFixed(2)}%`;

  // Derived values
  const getDownPayment = () => {
    const price = parseNum(propertyValue) || 0;
    if (downPaymentMode === 'percent') return price * ((parseNum(downPaymentPercent) || 0) / 100);
    if (downPaymentMode === 'ltv') return price * ((100 - (parseNum(downPaymentPercent) || 0)) / 100);
    return parseNum(downPaymentDollar) || 0;
  };

  const getClosingCostAmount = () => {
    const value = parseNum(propertyValue) || 0;
    const cc = parseNum(closingCost) || 0;
    return closingCostMode === 'percent' ? (value * cc) / 100 : cc;
  };

  const getTotalDueAtClosing = () =>
    getDownPayment() + getClosingCostAmount() + (parseNum(initialInvestment) || 0);

  const getLoanAmount = () => (parseNum(propertyValue) || 0) - getDownPayment();

  const getMonthlyPayment = () => {
    const principal = getLoanAmount();
    const r = (parseNum(interestRate) || 0) / 100 / 12;
    const n = (parseNum(loanTerm) || 0) * 12;
    if (r === 0 || n === 0) return 0;
    return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const getAnnualDebtService = () => getMonthlyPayment() * 12;

  const getCurrentNOI = () => {
    if (currentNoiEdited) return parseNum(currentNoiOverride) || 0;
    const income = parseNum(currentIncome) || 0;
    const expenses = parseNum(currentExpenses) || 0;
    return income - expenses;
  };

  const getProFormaNOI = () => {
    if (proFormaNoiEdited) return parseNum(proFormaNoiOverride) || 0;
    const income = parseNum(proFormaIncome) || 0;
    const expenses = parseNum(proFormaExpenses) || 0;
    return income - expenses;
  };

  const getCapRate = (noi) => {
    const value = parseNum(propertyValue) || 0;
    return value > 0 ? (noi / value) * 100 : 0;
  };

  const getNetProfit = (noi) => noi - getAnnualDebtService();

  const getCashOnCash = (noi) => {
    const total = getTotalDueAtClosing();
    const netProfit = getNetProfit(noi);
    return total > 0 ? (netProfit / total) * 100 : 0;
  };

  const getDSCR = (noi) => {
    const ads = getAnnualDebtService();
    return ads > 0 ? noi / ads : 0;
  };

  const getTotalInterest = () => {
    const n = (parseNum(loanTerm) || 0) * 12;
    return getMonthlyPayment() * n - getLoanAmount();
  };

  const calculateAmortization = () => {
    const principal = getLoanAmount();
    const r = (parseNum(interestRate) || 0) / 100 / 12;
    const n = (parseNum(loanTerm) || 0) * 12;
    const monthlyPayment = getMonthlyPayment();
    let balance = principal;
    const schedule = [];
    for (let month = 1; month <= n; month++) {
      const interestPayment = balance * r;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      schedule.push({ month, year: Math.ceil(month / 12), principal: principalPayment, interest: interestPayment, balance: Math.max(0, balance) });
    }
    const term = parseNum(loanTerm) || 0;
    const yearlySchedule = [];
    for (let year = 1; year <= term; year++) {
      const yearData = schedule.filter(m => m.year === year);
      yearlySchedule.push({
        year,
        principal: yearData.reduce((sum, m) => sum + m.principal, 0),
        interest: yearData.reduce((sum, m) => sum + m.interest, 0),
        balance: yearData[yearData.length - 1]?.balance || 0
      });
    }
    return { monthly: schedule, yearly: yearlySchedule };
  };

  const amortization = calculateAmortization();
  const currentNOI = getCurrentNOI();
  const proFormaNOI = getProFormaNOI();

  const inputClass = "h-12 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg pl-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
  const inputClassRight = "h-12 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg pr-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
  const inputClassPlain = "h-12 bg-[#1a2b4b]/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#C2983B] rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  const NumInput = ({ value, onChange, onBlur, placeholder, prefix, suffix }) => (
    <div className="relative">
      {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-sm">{prefix}</span>}
      {suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 text-sm">{suffix}</span>}
      <Input
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={prefix ? inputClass : suffix ? inputClassRight : inputClassPlain}
      />
    </div>
  );

  const handleNumChange = (setter) => (e) => {
    const raw = e.target.value.replace(/,/g, '');
    if (raw === '' || /^\d*\.?\d*$/.test(raw)) {
      if (raw === '' || raw === '.') { setter(raw); return; }
      const num = parseFloat(raw);
      if (!isNaN(num)) {
        const formatted = Number.isInteger(num) ? num.toLocaleString('en-US') : raw;
        setter(formatted);
      }
    }
  };

  const handleNumBlur = (setter) => (e) => {
    const raw = e.target.value.replace(/,/g, '');
    const val = parseFloat(raw);
    setter(isNaN(val) ? '' : val.toLocaleString('en-US'));
  };

  const MetricRow = ({ label, value, highlight, isNegative }) => (
    <div className="flex justify-between items-center py-2 border-b border-white/5">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className={`font-semibold text-sm ${highlight ? 'text-[#C2983B]' : isNegative ? 'text-red-400' : 'text-white'}`}>{value}</span>
    </div>
  );

  return (
    <div className="pt-20">
      <SEO
        title="Commercial Mortgage Calculator"
        description="Calculate commercial property loan payments, DSCR, Cap Rate, and investment returns. Plan your commercial real estate financing with our free calculator."
        canonical="/commercialcalculator"
      />

      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[#1a2b4b] via-[#2c3e50] to-[#1a2b4b] relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-[#C2983B] text-sm tracking-[0.3em] uppercase mb-4 block">Commercial Mortgage Calculator</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
              Plan Your Commercial{' '}
              <span className="text-[#C2983B] font-normal">Investment</span>
            </h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed mb-8">
              Calculate payments, cap rate, DSCR, and cash-on-cash returns for your commercial property.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-white/80 font-medium">Currency:</span>
              <div className="flex gap-2 bg-white/10 p-1.5 rounded-lg flex-wrap">
                {currencies.map((curr) => (
                  <button key={curr.code}
                    onClick={() => { setCurrency(curr.code); localStorage.setItem('preferredCurrency', curr.code); }}
                    className={`px-5 py-2.5 text-sm font-semibold transition-all rounded-lg ${currency === curr.code ? 'bg-[#C2983B] text-white shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/20'}`}
                  >
                    {curr.symbol} {curr.code}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-24 bg-[#f8f9fa]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#2c3e50] rounded-xl p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 min-w-[3.5rem] bg-[#C2983B] rounded-full flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Commercial Mortgage</h3>
              </div>

              {/* Row 1: Property Value + Down Payment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label className="text-gray-300 text-sm mb-2 block">Property Value</Label>
                  <NumInput
                    prefix={currentCurrency.symbol}
                    value={propertyValue}
                    onChange={handleNumChange(setPropertyValue)}
                    onBlur={handleNumBlur(setPropertyValue)}
                    placeholder="1,500,000"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-gray-300 text-sm">Down Payment</Label>
                    <div className="flex gap-1 bg-white/10 rounded-lg p-0.5">
                      {[['$', 'dollar'], ['%', 'percent'], ['LTV', 'ltv']].map(([label, val]) => (
                        <button key={val}
                          onClick={() => setDownPaymentMode(val)}
                          className={`px-3 py-1 text-xs rounded transition-colors ${downPaymentMode === val ? 'bg-[#C2983B] text-white' : 'text-gray-400'}`}
                        >
                          {label === '$' ? currentCurrency.symbol : label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {downPaymentMode === 'dollar' ? (
                    <NumInput prefix={currentCurrency.symbol} value={downPaymentDollar}
                      onChange={handleNumChange(setDownPaymentDollar)} onBlur={handleNumBlur(setDownPaymentDollar)} placeholder="375,000" />
                  ) : (
                    <NumInput suffix="%" value={downPaymentPercent}
                      onChange={handleNumChange(setDownPaymentPercent)} onBlur={handleNumBlur(setDownPaymentPercent)}
                      placeholder={downPaymentMode === 'ltv' ? 'LTV %' : '25'} />
                  )}
                  {downPaymentMode !== 'dollar' && (
                    <p className="text-gray-400 text-xs mt-1">= {formatCurrency(getDownPayment())}{downPaymentMode === 'ltv' ? ` (Loan: ${formatCurrency(getLoanAmount())})` : ''}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Interest Rate + Loan Term */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label className="text-gray-300 text-sm mb-2 block">Interest Rate</Label>
                  <NumInput suffix="%" value={interestRate}
                    onChange={handleNumChange(setInterestRate)} onBlur={handleNumBlur(setInterestRate)} placeholder="7.5" />
                </div>
                <div>
                  <Label className="text-gray-300 text-sm mb-2 block">Amortization (Loan Term in Years)</Label>
                  <NumInput value={loanTerm}
                    onChange={handleNumChange(setLoanTerm)} onBlur={handleNumBlur(setLoanTerm)} placeholder="20" />
                </div>
              </div>

              {/* Additional Information toggle */}
              <div className="border border-white/10 rounded-lg mb-6 overflow-hidden">
                <button
                  onClick={() => setShowAdditional(!showAdditional)}
                  className="w-full flex items-center justify-between px-5 py-4 text-white hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium">Additional Information</span>
                  {showAdditional ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                {showAdditional && (
                  <div className="px-5 pb-5 border-t border-white/10 pt-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Closing Cost */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-gray-300 text-sm">Closing Cost</Label>
                          <div className="flex gap-1 bg-white/10 rounded-lg p-0.5">
                            {[['$', 'dollar'], ['%', 'percent']].map(([label, val]) => (
                              <button key={val}
                                onClick={() => setClosingCostMode(val)}
                                className={`px-3 py-1 text-xs rounded transition-colors ${closingCostMode === val ? 'bg-[#C2983B] text-white' : 'text-gray-400'}`}
                              >
                                {label === '$' ? currentCurrency.symbol : label}
                              </button>
                            ))}
                          </div>
                        </div>
                        {closingCostMode === 'dollar'
                          ? <NumInput prefix={currentCurrency.symbol} value={closingCost} onChange={handleNumChange(setClosingCost)} onBlur={handleNumBlur(setClosingCost)} placeholder="0" />
                          : <NumInput suffix="%" value={closingCost} onChange={handleNumChange(setClosingCost)} onBlur={handleNumBlur(setClosingCost)} placeholder="0" />
                        }
                        {closingCostMode === 'percent' && (parseNum(closingCost) || 0) > 0 && (
                          <p className="text-gray-400 text-xs mt-1">= {formatCurrency(getClosingCostAmount())}</p>
                        )}
                      </div>
                      {/* Initial Investment */}
                      <div>
                        <Label className="text-gray-300 text-sm mb-2 block">Initial Investment</Label>
                        <NumInput prefix={currentCurrency.symbol} value={initialInvestment}
                          onChange={handleNumChange(setInitialInvestment)} onBlur={handleNumBlur(setInitialInvestment)} placeholder="0" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Current Numbers */}
              <div className="border border-white/10 rounded-lg mb-6 overflow-hidden">
                <div className="px-5 py-4 border-b border-white/10">
                  <h4 className="text-white font-medium">Current Numbers</h4>
                </div>
                <div className="px-5 py-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label className="text-gray-300 text-sm mb-2 block">Total Income</Label>
                      <NumInput prefix={currentCurrency.symbol} value={currentIncome}
                        onChange={handleNumChange(setCurrentIncome)} onBlur={handleNumBlur(setCurrentIncome)} placeholder="0" />
                    </div>
                    <div>
                      <Label className="text-gray-300 text-sm mb-2 block">Total Expenses (excl. mortgage)</Label>
                      <NumInput prefix={currentCurrency.symbol} value={currentExpenses}
                        onChange={handleNumChange(setCurrentExpenses)} onBlur={handleNumBlur(setCurrentExpenses)} placeholder="0" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-gray-300 text-sm">NOI (Net Operating Income)</Label>
                      </div>
                      <NumInput prefix={currentCurrency.symbol}
                        value={currentNoiEdited ? currentNoiOverride : (getCurrentNOI() || '')}
                        onChange={(e) => { setCurrentNoiEdited(true); handleNumChange(setCurrentNoiOverride)(e); }}
                        onBlur={handleNumBlur(setCurrentNoiOverride)}
                        placeholder={formatCurrency(getCurrentNOI()).replace(currentCurrency.symbol, '')}
                      />
                      {!currentNoiEdited && (parseNum(currentIncome) || parseNum(currentExpenses)) ? (
                        <p className="text-gray-400 text-xs mt-1">Auto-calculated (Income - Expenses)</p>
                      ) : currentNoiEdited ? (
                        <button onClick={() => { setCurrentNoiEdited(false); setCurrentNoiOverride(''); }}
                          className="text-[#C2983B] text-xs mt-1">Reset to auto</button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pro Forma */}
              <div className="border border-white/10 rounded-lg mb-8 overflow-hidden">
                <div className="px-5 py-4 border-b border-white/10">
                  <h4 className="text-white font-medium">Pro Forma</h4>
                </div>
                <div className="px-5 py-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label className="text-gray-300 text-sm mb-2 block">Total Income</Label>
                      <NumInput prefix={currentCurrency.symbol} value={proFormaIncome}
                        onChange={handleNumChange(setProFormaIncome)} onBlur={handleNumBlur(setProFormaIncome)} placeholder="0" />
                    </div>
                    <div>
                      <Label className="text-gray-300 text-sm mb-2 block">Total Expenses (excl. mortgage)</Label>
                      <NumInput prefix={currentCurrency.symbol} value={proFormaExpenses}
                        onChange={handleNumChange(setProFormaExpenses)} onBlur={handleNumBlur(setProFormaExpenses)} placeholder="0" />
                    </div>
                    <div>
                      <Label className="text-gray-300 text-sm mb-2 block">NOI (Net Operating Income)</Label>
                      <NumInput prefix={currentCurrency.symbol}
                        value={proFormaNoiEdited ? proFormaNoiOverride : (getProFormaNOI() || '')}
                        onChange={(e) => { setProFormaNoiEdited(true); handleNumChange(setProFormaNoiOverride)(e); }}
                        onBlur={handleNumBlur(setProFormaNoiOverride)}
                        placeholder={formatCurrency(getProFormaNOI()).replace(currentCurrency.symbol, '')}
                      />
                      {!proFormaNoiEdited && (parseNum(proFormaIncome) || parseNum(proFormaExpenses)) ? (
                        <p className="text-gray-400 text-xs mt-1">Auto-calculated (Income - Expenses)</p>
                      ) : proFormaNoiEdited ? (
                        <button onClick={() => { setProFormaNoiEdited(false); setProFormaNoiOverride(''); }}
                          className="text-[#C2983B] text-xs mt-1">Reset to auto</button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="border-t border-white/10 pt-8">

                {/* Monthly Payment */}
                <div className="mb-6">
                  <p className="text-gray-400 text-sm mb-1">Monthly Payment (P&I):</p>
                  <p className="text-5xl font-bold text-[#C2983B]">{formatCurrency(getMonthlyPayment())}</p>
                </div>

                {/* Loan summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-400 text-xs mb-1">Loan Amount</p>
                    <p className="text-lg font-semibold text-white">{formatCurrency(getLoanAmount())}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-400 text-xs mb-1">LTV Ratio</p>
                    <p className="text-lg font-semibold text-white">{formatPercent(getLoanAmount() / (parseNum(propertyValue) || 1) * 100)}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-400 text-xs mb-1">Annual Debt Service</p>
                    <p className="text-lg font-semibold text-white">{formatCurrency(getAnnualDebtService())}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-400 text-xs mb-1">Total Interest</p>
                    <p className="text-lg font-semibold text-red-400">{formatCurrency(getTotalInterest())}</p>
                  </div>
                </div>

                {/* Investment + Current + Pro Forma side by side */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                  {/* Investment */}
                  <div className="bg-white/5 rounded-lg p-5 flex flex-col justify-between">
                    <div>
                      <h4 className="text-[#C2983B] font-semibold mb-4">Investment</h4>
                      <div className="mb-4">
                        <p className="text-gray-400 text-xs mb-1">Total Due at Closing</p>
                        <p className="text-2xl font-bold text-white">{formatCurrency(getTotalDueAtClosing())}</p>
                      </div>
                      <div className="space-y-1">
                        <MetricRow label="Down Payment" value={formatCurrency(getDownPayment())} />
                        <MetricRow label="Closing Cost" value={formatCurrency(getClosingCostAmount())} />
                      </div>
                    </div>
                    <div className="space-y-1 mt-auto pt-2 border-t border-white/5">
                      <MetricRow label="Initial Investment" value={formatCurrency(parseNum(initialInvestment) || 0)} />
                    </div>
                  </div>

                  {/* Current */}
                  <div className="bg-white/5 rounded-lg p-5">
                    <h4 className="text-[#C2983B] font-semibold mb-4">Current</h4>
                    <div className="space-y-1">
                      <MetricRow label="NOI" value={formatCurrency(currentNOI)} />
                      <MetricRow label="Cap Rate" value={formatPercent(getCapRate(currentNOI))} highlight />
                      <MetricRow label="Net Profit" value={formatCurrency(getNetProfit(currentNOI))} isNegative={getNetProfit(currentNOI) < 0} />
                      <MetricRow label="Cash on Cash" value={formatPercent(getCashOnCash(currentNOI))} highlight={getCashOnCash(currentNOI) > 0} isNegative={getCashOnCash(currentNOI) < 0} />
                      <MetricRow label="DSCR" value={`${getDSCR(currentNOI).toFixed(2)}x`} highlight={getDSCR(currentNOI) >= 1.25} isNegative={getDSCR(currentNOI) < 1} />
                    </div>
                  </div>

                  {/* Pro Forma */}
                  <div className="bg-white/5 rounded-lg p-5">
                    <h4 className="text-[#C2983B] font-semibold mb-4">Pro Forma</h4>
                    <div className="space-y-1">
                      <MetricRow label="NOI" value={formatCurrency(proFormaNOI)} />
                      <MetricRow label="Cap Rate" value={formatPercent(getCapRate(proFormaNOI))} highlight />
                      <MetricRow label="Net Profit" value={formatCurrency(getNetProfit(proFormaNOI))} isNegative={getNetProfit(proFormaNOI) < 0} />
                      <MetricRow label="Cash on Cash" value={formatPercent(getCashOnCash(proFormaNOI))} highlight={getCashOnCash(proFormaNOI) > 0} isNegative={getCashOnCash(proFormaNOI) < 0} />
                      <MetricRow label="DSCR" value={`${getDSCR(proFormaNOI).toFixed(2)}x`} highlight={getDSCR(proFormaNOI) >= 1.25} isNegative={getDSCR(proFormaNOI) < 1} />
                    </div>
                  </div>
                </div>

                {/* Amortization */}
                <button
                  onClick={() => setShowAmortization(!showAmortization)}
                  className="w-full bg-[#1a2b4b]/70 hover:bg-[#1a2b4b] text-white py-3 rounded-lg transition-colors"
                >
                  {showAmortization ? 'Hide' : 'Show'} Amortization Schedule
                </button>

                {showAmortization && (
                  <div className="mt-6 border-t border-white/10 pt-6">
                    <div className="flex gap-2 mb-4">
                      {['yearly', 'monthly'].map(mode => (
                        <button key={mode} onClick={() => setViewMode(mode)}
                          className={`flex-1 py-2 rounded-lg transition-colors capitalize ${viewMode === mode ? 'bg-[#C2983B] text-white' : 'bg-[#1a2b4b]/50 text-gray-400'}`}
                        >
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">Need Personalized Guidance?</h2>
            <p className="text-xl text-white font-light mb-10 max-w-2xl mx-auto">
              Our calculators are a great start, but nothing beats working with a professional coach.
            </p>
            <Link to={createPageUrl('Schedule')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Button size="lg" className="bg-[#1a2b4b] hover:bg-[#2c3e50] text-white font-semibold px-10 py-6 text-lg rounded-lg shadow-lg">
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
