import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, BookOpen, FileText, Search, Clock, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import SEO from '@/components/seo/SEO';

const posts = [
  {
    id: 1,
    title: "Just 18 Hours a Year",
    excerpt: "No time to budget? Here is the surprising truth: managing your finances properly takes no more than 18 hours a year. That is all.",
    category: "Budgeting",
    date: "Parshas Vaeschanan 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
    content: [
      "We constantly hear the same excuse: I know I need to budget. I know I am hurting myself by not tracking my income and expenses. But what can I do? I simply do not have the time. I am running from morning to night with my family, work, davening, simchos, and everything else. Do you really expect me to sit down every month for hours going over my finances?",
      "Here is a surprise: budgeting properly takes a maximum of 18 hours per year. Yes, you read that correctly. 18 hours per year is all it takes.",
      "HEADING:How the Math Works",
      "Getting started the first time does take a few hours. You need to sit down, clarify your budget, get familiar with your own numbers, go through all your assets, income, and expenses, and understand the real picture of your finances. This initial setup typically takes between 2 and 5 hours. Think of it like any preparation before a big project.",
      "After that initial setup, maintaining your budget takes only about 1.5 hours per month. That breaks down into 10 to 15 minutes per week to review the past week's income and expenses, plus 20 to 25 minutes at the end of each month to summarize the month and plan for the next one.",
      "HEADING:The Simple Calculation",
      "1.5 hours per month, multiplied by 12 months, equals 18 hours per year. That is the grand total.",
      "Who cannot afford 18 hours a year to achieve financial peace of mind and freedom? Those 18 hours, spread out over the year in short 15-minute sessions, are something every single person can and should invest in.",
      "Once you have your finances organized, you will wonder how you ever lived without it. The clarity, the calm, the sense of control over your money is worth far more than 18 hours."
    ]
  },
  {
    id: 2,
    title: "Your Highest-Paid Hours",
    excerpt: "What if the 18 hours you spend budgeting per year are actually the most financially productive hours you ever work? Here is the math that proves it.",
    category: "Budgeting",
    date: "Parshas Eikev 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1565514158740-064f34bd6cfd?w=800&q=80",
    content: [
      "Last week we established that budgeting takes no more than 18 hours per year. Now let us look at what those 18 hours are actually worth.",
      "HEADING:The Value of Your Time",
      "Consider a young man who works 40 hours a week and brings home $1,500 per week. His hourly rate is $37.50. At that rate, 18 hours of his time is worth $675.",
      "Someone bringing home $3,000 per week earns $75 per hour. Their 18 hours is worth $1,350.",
      "And for a business owner earning $600,000 per year, working 30 hours a week for 50 weeks, the hourly rate is $400. Their 18 hours is worth $7,200.",
      "HEADING:The Return on Those Hours",
      "Here is the key insight: when someone actually sits down and budgets those 18 hours per year, they consistently earn back far more than what those hours are officially worth.",
      "The worker whose 18 hours is worth $675 has discovered, after budgeting, savings and corrections worth thousands of dollars. The same is true for the person whose 18 hours is worth $1,350. And for the business owner earning $600,000 per year, the discoveries made during those 18 hours of budgeting consistently reveal far more than the $7,200 those hours are officially worth.",
      "HEADING:Why This Happens",
      "When you actually sit down and look clearly at all your income and expenses, you see exactly where your money is going, who is charging you, and how much. You discover subscriptions you forgot about, costs that are higher than you realized, and opportunities to redirect spending.",
      "In every single case I have encountered, the 18 hours invested in budgeting have returned many times their official value.",
      "The 18 hours you give to your budget each year are the hours on which you earn the most. By far."
    ]
  },
  {
    id: 3,
    title: "How Does Everyone Else Afford It? (Part 1)",
    excerpt: "You see your neighbors filling their carts, driving nice cars, and taking vacations. Meanwhile you are struggling. Are they really making it or is something else going on?",
    category: "Mindset",
    date: "Parshas Shemos 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    content: [
      "One of the most painful questions we hear daily from our clients is: How does everyone else afford it? People feel alone in their financial struggle. They watch their neighbors fill grocery carts with abundance, see friends driving expensive cars, hear about colleagues taking luxurious vacations and ask themselves: I earn decent money. Why do I feel so suffocated?",
      "HEADING:The Rashi Principle",
      "Rashi comments on Pharaoh's dream of the seven fat cows: They appeared beautiful to one another, because no one was envious of the other. In times of abundance, people are generous and do not eye each other with jealousy. When there is enough for everyone, comparison disappears.",
      "But today, we are in a recession even if it is not officially called one. Over 80% of Jewish families are struggling financially. The difference between now and 2008 is that in 2008, the crash was public. Everyone knew everyone else was hurting. Today, people hide it. They keep spending, keep smiling, and keep pretending.",
      "HEADING:Are They Really Making It?",
      "When you see someone spending freely, you assume they have the money. But have you seen their bank account? Do you know how much debt they are carrying? You likely know two or three people personally who are spending money they do not have, living off next month's paycheck, letting credit card balances climb, with school tuition bills growing every year.",
      "So why, when you look at others, are you so certain they have money to spare?",
      "The painful truth: a large percentage of our community is spending money they do not have. Some do not track their finances at all. Some are drowning in peer pressure and feel they cannot afford not to spend. The smiling face you see at the grocery store does not tell you what is happening in their bank account.",
      "Continued in Part 2..."
    ]
  },
  {
    id: 4,
    title: "How Does Everyone Else Afford It? (Part 2)",
    excerpt: "Even if your neighbor truly can afford their lifestyle, what does that have to do with you? The only budget that matters is your own.",
    category: "Mindset",
    date: "Parshas Vaeira 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&q=80",
    content: [
      "Last week we established that many of those who appear to be living comfortably are actually spending money they do not have. Now let us take it a step further. Let us say your neighbor truly can afford to live that way. What does that actually do for you?",
      "HEADING:The Answer Is Nothing",
      "Knowing how someone else manages their money does not pay your bills. Understanding why your neighbor can afford a nicer car does not improve your budget. Obsessing over someone else's finances is a distraction that keeps you from focusing on your own. Worse than being useless, comparison is actively destructive. It creates internal resentment. It causes husbands to blame wives and wives to blame husbands. It shifts your focus away from the one thing that actually matters: your own numbers.",
      "HEADING:The Question to Ask Instead",
      "Instead of asking how does he afford it, ask yourself: How can I improve my own financial situation? Look at your own budget. Which expenses can you cut? Where can you increase your income? What financial goals do you want to set?",
      "Here is something to consider: when you see someone else spending and wonder how they afford it, do you think they are not looking at you and asking the same question? Your neighbor sees your spending too. He does not know you are struggling.",
      "HEADING:The Bottom Line",
      "The question of how does he make it is pointless. First, you do not actually know if he is making it. Second, even if he is, it does not help you. The path to financial health runs through your own budget, not your neighbor's.",
      "Sit down with your spouse. Go through your numbers honestly. Write down your financial goals. Make a plan to achieve them. With Hashem's help, you can get there and find true financial peace of mind."
    ]
  },
  {
    id: 5,
    title: "Credit Cards: The Financial Devil in Disguise",
    excerpt: "Credit cards feel convenient, but they may be silently draining your finances. Here is the honest truth about how they work and why they cost you more than you think.",
    category: "Budgeting",
    date: "Parshas Yisro 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    content: [
      "Less than 75 years ago, the concept of buying something without paying cash on the spot barely existed. The credit card was born in 1950 when a wealthy businessman walked into a restaurant and realized he had left his wallet at home. Embarrassed, he founded the Diners Club Card, accepted only at restaurants. Eight years later, American Express and Visa launched cards accepted everywhere.",
      "HEADING:Every Swipe Is a Loan",
      "When you swipe a credit card, you are not spending your own money. You are taking out a loan. Even if you have the money sitting in your bank account, you still have a debt until you pay it off. Your brain does not process it the same way. When you pay cash, you feel the loss immediately. When you swipe a card, your brain registers the money still in your account and you end up spending more.",
      "HEADING:The Interest Rate Trap",
      "A few years ago, the average credit card interest rate was around 16%. Today, many cards charge close to 30%. That means for every $1,000 you carry as a balance, you pay $300 per year in interest alone.",
      "HEADING:You Spend More Even Without Paying Interest",
      "Even people who pay their full balance every month are not in the clear. Studies show that the average American spends 7 to 12% more when using a credit card versus cash. In the Orthodox Jewish community, that number is often 30% or more because our expenses are larger: children, Shabbos, Yom Tov, camp, simchos, and more. Some clients discovered they were spending double what they would have spent with cash.",
      "The bottom line: credit cards are a financial trap dressed up as a convenience. Use them with extreme caution, or better yet, switch to a debit card for everyday purchases."
    ]
  },
  {
    id: 6,
    title: "Credit Cards: The Points Illusion (Part 2)",
    excerpt: "Think you are winning with credit card points and cashback? The math tells a very different story. Here is what the credit card companies do not want you to know.",
    category: "Budgeting",
    date: "Parshas Mishpatim 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
    content: [
      "One of the most seductive illusions of credit cards is the points and miles you earn. People tell themselves: I spend the money anyway, so I might as well use the credit card and earn points. We hear this almost daily from clients. But when you look at it honestly, points are simply a tool credit card companies use to convince you the card is actually benefiting you, when in reality it almost always costs you more than you gain.",
      "HEADING:A Real-Life Example",
      "A client once told me proudly at the end of the year that he had earned $4,500 worth of points. I asked to see his most recent credit card statement. In that one statement alone, there was an interest charge of around $600. If a single statement showed $600 in interest, the full year's interest charges likely exceeded his points earnings entirely.",
      "HEADING:The Question Nobody Asks",
      "Why would a credit card company give you cashback and rewards for borrowing their money? And why do they give extra rewards for specific categories like restaurants, gas, and travel? Are they really that generous? No. They know with certainty that most people will eventually carry a balance and pay interest, which more than covers any rewards they give out.",
      "HEADING:How It Escalates",
      "99% of our clients who came to us with serious credit card debt started using credit cards for two reasons: to build credit, and to earn points. Almost every single one ended up with massive debt.",
      "When you buy something with a credit card, you effectively pay for it three times: once when you buy it, once when the statement arrives, and once when you actually pay it off. And far too often, people pay four, five, six, or seven times over, making minimum payments for years.",
      "The credit card is a financial snake. As Rashi explains about the word neshech (interest): like a snake that gives a small bite which is not felt immediately, but the poison slowly spreads through the body until it reaches the head. That is exactly what happens with credit card debt."
    ]
  },
  {
    id: 7,
    title: "The Debit Card: Your Financial Best Friend",
    excerpt: "If not a credit card, then what? The debit card works exactly like a credit card for everyday purchases, but with one crucial difference that protects your finances.",
    category: "Budgeting",
    date: "Parshas Terumah 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&q=80",
    content: [
      "After discussing the dangers of credit cards, the natural question is: what should I use instead? We live in a world where cash is increasingly rare and many purchases can only be made with a card. The answer is simple: the debit card.",
      "HEADING:How It Works",
      "A debit card looks identical to a credit card. It has 16 digits, an expiration date, and a 3-digit security code. You can swipe it, insert the chip, tap with contactless technology, or enter the numbers online. Everything works exactly like a credit card.",
      "There is one critical difference: when you swipe a debit card, the money comes out of your bank account immediately. You can only spend money you actually have. If there is not enough in your account, the card will not work.",
      "HEADING:Why This Matters",
      "That built-in limitation is actually your greatest financial protection. The bank alerts you every time you are running low. This forces you to make real decisions: do I cut spending, or do I need to find another source of income? You never pay late fees. You never pay interest. Once you buy something, it is paid for. The charge does not follow you to next month.",
      "HEADING:An Important Tip: Do Not Enter Your PIN",
      "When using a debit card in stores, avoid entering your PIN. There are three reasons. First, charges processed without a PIN go through the credit card network, making disputes much easier if something goes wrong. Second, if a skimmer device captures your card info, criminals cannot access your account without the PIN. Third, if you accidentally leave your card somewhere and someone saw you enter the PIN, they could drain your account at an ATM.",
      "You can always bypass the PIN. At most stores, simply press Enter or choose the credit option, and the payment goes through.",
      "The debit card lets you live a completely normal financial life in today's cashless world, while keeping you protected from the trap of debt."
    ]
  },
  {
    id: 8,
    title: "The Clothing Bank Account",
    excerpt: "Yom Tov expenses feel overwhelming partly because clothing costs hit all at once. Here is a simple system that spreads out the burden and brings real peace of mind.",
    category: "Budgeting",
    date: "Parshas Lech Lecha 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80",
    content: [
      "Every child in cheder knows that Yom Tov is expensive. But a moment's reflection reveals that Yom Tov expenses really fall into two separate categories. The first is the general holiday costs: shul seats, Yom Kippur kapparos, the sukkah, dalet minim, matzos, wine, Yom Tov meals, and so on. The second category is outfitting the entire family with new clothing and shoes for Yom Tov.",
      "To make things more complicated, the two major Yomim Tovim, Pesach and Sukkos, both fall at the transition between winter and summer seasons. This means that Erev Yom Tov season is also the time when families need to buy an entirely new wardrobe, adding thousands of dollars to expenses that are already very high.",
      "HEADING:The Solution",
      "The answer is to open a dedicated bank account for clothing, and deposit a set amount every single month.",
      "Here is how to set it up. First, calculate how much clothing for your family costs per season, or add up both seasons and divide by two. You do not need a precise number, a reasonable estimate works fine. Second, divide that number by six. Over the next six months, deposit one-sixth of the total each month into a designated account. Third, add this monthly amount into your budget like any other regular expense. Fourth, open an account at Capital One which charges no monthly fees, or use a dedicated envelope if you prefer cash.",
      "HEADING:What This Accomplishes",
      "Hundreds of Tauber Solutions clients have set up this system, and the results are remarkable. The wife can go shopping for the children's clothing without stress, knowing the money is there. The husband does not feel blindsided by a sudden large expense before Yom Tov. And there is an added bonus: with money set aside specifically for clothing, families can shop after the season when prices drop 40 to 80%, buying next year's clothing at a fraction of the cost.",
      "A clothing account does not just buy clothing. It buys shalom bayis."
    ]
  }
];

const categories = ['All', 'Budgeting', 'Real Estate', 'Investing', 'Debt', 'Mindset'];

function PostModal({ post, onClose }) {
  if (!post) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl mb-8"
      >
        {post.image && (
          <div className="h-56 overflow-hidden rounded-t-2xl">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-[#C2983B] bg-[#C2983B]/10 px-3 py-1 rounded-full">{post.category}</span>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <h2 className="text-2xl font-bold text-[#1a2b4b] mb-2">{post.title}</h2>
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-6">
            <span>{post.date}</span>
            {post.readTime && (
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
            )}
          </div>
          <div className="space-y-4 text-gray-600">
            {post.content.map((para, i) => {
              if (para.startsWith('HEADING:')) {
                return <h3 key={i} className="text-lg font-semibold text-[#1a2b4b] mt-6 mb-2">{para.replace('HEADING:', '')}</h3>;
              }
              return <p key={i} className="leading-relaxed text-sm">{para}</p>;
            })}
          </div>
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 italic">Written by Chaim Tauber, founder of Tauber Solutions</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  const filtered = posts.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pt-20">
      <SEO
        title="Financial Insights and Resources"
        description="Expert financial tips, guides, and resources from Chaim Tauber and Tauber Solutions. Learn budgeting, investing, real estate, and wealth-building strategies."
        canonical="/Blog"
      />

      {selectedPost && <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />}

      <section className="py-24 bg-gradient-to-br from-[#1a2b4b] via-[#2c3e50] to-[#1a2b4b]">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-[#C2983B] text-sm tracking-widest uppercase mb-4 block">
              Insights and Resources
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
              Financial{' '}
              <span className="text-[#C2983B] font-normal">Knowledge Hub</span>
            </h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed">
              Practical guides and expert insights from Chaim Tauber to help you
              take control of your financial future.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 bg-white border-b sticky top-20 z-30 shadow-sm">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C2983B] transition-colors"
              />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-[#C2983B] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
              <div className="w-20 h-20 bg-[#1a2b4b]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-[#1a2b4b]/40" />
              </div>
              <h3 className="text-2xl font-light text-[#1a2b4b] mb-3">No articles found</h3>
              <p className="text-gray-500">Try a different search or category.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  {post.image && (
                    <div className="h-48 overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold text-[#C2983B] bg-[#C2983B]/10 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      {post.pdfUrl && (
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <FileText className="w-3 h-3" /> PDF
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-[#1a2b4b] mb-2 group-hover:text-[#C2983B] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm font-light leading-relaxed mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-xs text-gray-400 flex items-center gap-2">
                        <span>{post.date}</span>
                        {post.readTime && (
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                        )}
                      </div>
                      {post.pdfUrl ? (
                        <a href={post.pdfUrl} download onClick={e => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-sm font-medium text-[#C2983B] hover:text-[#b08e35] transition-colors">
                          <Download className="w-4 h-4" />
                          Download
                        </a>
                      ) : (
                        <span className="flex items-center gap-1.5 text-sm font-medium text-[#C2983B]">
                          Read More <ChevronRight className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#C2983B] py-24">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              Ready to Take Action?
            </h2>
            <p className="text-xl text-white font-light mb-10 max-w-2xl mx-auto">
              Knowledge is just the start. Work with one of our coaches to put it into practice.
            </p>
            <Link to={createPageUrl('Schedule')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Button size="lg" className="bg-[#1a2b4b] hover:bg-[#2c3e50] text-white font-semibold px-10 py-6 text-lg rounded-lg shadow-lg">
                Schedule Your Session
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
