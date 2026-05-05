import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, RefreshCw, TrendingUp, Award } from 'lucide-react';

const quizQuestions = [
  {
    question: "What percentage of your income should you save for emergencies?",
    options: ["5-10%", "15-20%", "25-30%", "35-40%"],
    correct: 1,
    explanation: "Financial experts recommend saving 15-20% of your income, aiming for 3-6 months of expenses in your emergency fund."
  },
  {
    question: "What's the 50/30/20 budgeting rule?",
    options: [
      "50% savings, 30% needs, 20% wants",
      "50% needs, 30% wants, 20% savings",
      "50% wants, 30% savings, 20% needs",
      "50% debt, 30% savings, 20% spending"
    ],
    correct: 1,
    explanation: "The 50/30/20 rule suggests allocating 50% to needs, 30% to wants, and 20% to savings and debt repayment."
  },
  {
    question: "Which debt repayment strategy pays off the smallest balance first?",
    options: ["Avalanche Method", "Snowball Method", "Consolidation Method", "Minimum Payment Method"],
    correct: 1,
    explanation: "The Snowball Method focuses on paying off the smallest debt first for psychological wins and momentum."
  },
  {
    question: "What is compound interest?",
    options: [
      "Interest paid only on the principal",
      "Interest paid on both principal and accumulated interest",
      "A fixed interest rate",
      "Interest paid annually"
    ],
    correct: 1,
    explanation: "Compound interest is interest calculated on both the initial principal and accumulated interest, helping your money grow faster."
  },
  {
    question: "At what age can you withdraw from a 401(k) without penalty?",
    options: ["55", "59½", "62", "65"],
    correct: 1,
    explanation: "You can generally withdraw from a 401(k) without penalty at age 59½, though some exceptions exist."
  },
  {
    question: "What is a good credit score range?",
    options: ["300-579", "580-669", "670-739", "740-850"],
    correct: 3,
    explanation: "A credit score of 740-850 is considered excellent, while 670-739 is good. Higher scores mean better loan terms."
  },
  {
    question: "How often should you review your budget?",
    options: ["Once a year", "Every 6 months", "Monthly", "Weekly"],
    correct: 2,
    explanation: "Reviewing your budget monthly helps you stay on track, adjust for changes, and maintain financial awareness."
  },
  {
    question: "What percentage of your income should go toward housing?",
    options: ["20-25%", "28-30%", "35-40%", "45-50%"],
    correct: 1,
    explanation: "The general rule is to spend no more than 28-30% of your gross monthly income on housing costs."
  }
];

export default function FinancialQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleAnswerSelect = (index) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    const isCorrect = index === quizQuestions[currentQuestion].correct;
    setAnswers([...answers, isCorrect]);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setIsComplete(false);
    setAnswers([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) return { message: "Financial Expert!", color: "text-green-600", icon: Award };
    if (percentage >= 60) return { message: "Great Knowledge!", color: "text-blue-600", icon: TrendingUp };
    if (percentage >= 40) return { message: "Good Start!", color: "text-yellow-600", icon: CheckCircle };
    return { message: "Keep Learning!", color: "text-orange-600", icon: RefreshCw };
  };

  if (isComplete) {
    const scoreData = getScoreMessage();
    const ScoreIcon = scoreData.icon;
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <div className={`w-24 h-24 ${scoreData.color.replace('text-', 'bg-').replace('600', '100')} rounded-full flex items-center justify-center mx-auto mb-6`}>
              <ScoreIcon className={`w-12 h-12 ${scoreData.color}`} />
            </div>
            <h2 className={`text-4xl font-semibold ${scoreData.color} mb-4`}>
              {scoreData.message}
            </h2>
            <p className="text-6xl font-bold text-[#1F2A44] mb-2">
              {score}/{quizQuestions.length}
            </p>
            <p className="text-xl text-gray-600 mb-8">
              You scored {Math.round((score / quizQuestions.length) * 100)}%
            </p>
            
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-8 max-w-md mx-auto">
              {answers.map((isCorrect, index) => (
                <div 
                  key={index}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCorrect ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              ))}
            </div>
            
            <Button 
              onClick={resetQuiz}
              className="bg-[#C2983B] hover:bg-[#b08e35] text-white font-semibold px-8 py-6 text-lg rounded-none"
            >
              <RefreshCw className="mr-2 w-5 h-5" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center mb-4">
            <CardTitle className="text-2xl text-[#1F2A44]">
              Financial Literacy Quiz
            </CardTitle>
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3 className="text-xl font-semibold text-[#1F2A44] mb-6">
                {quizQuestions[currentQuestion].question}
              </h3>
              
              <div className="space-y-3 mb-8">
                {quizQuestions[currentQuestion].options.map((option, index) => {
                  const isCorrect = index === quizQuestions[currentQuestion].correct;
                  const isSelected = selectedAnswer === index;
                  
                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showExplanation}
                      className={`w-full p-4 text-left rounded-none border-2 transition-all ${
                        !showExplanation
                          ? 'border-gray-200 hover:border-[#C2983B] hover:bg-[#C2983B]/5'
                          : isSelected
                          ? isCorrect
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : isCorrect
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                      whileHover={!showExplanation ? { scale: 1.02 } : {}}
                      whileTap={!showExplanation ? { scale: 0.98 } : {}}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option}</span>
                        {showExplanation && isCorrect && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        {showExplanation && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
              
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6"
                  >
                    <p className="text-blue-900 font-light">
                      {quizQuestions[currentQuestion].explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {showExplanation && (
                <Button
                  onClick={handleNext}
                  className="bg-[#1F2A44] hover:bg-[#2a3654] text-white font-semibold px-8 py-6 rounded-none w-full"
                >
                  {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
                </Button>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}