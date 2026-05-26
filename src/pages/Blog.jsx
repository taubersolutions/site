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
    title: "Credit Cards: The Financial Devil in Disguise",
    excerpt: "Credit cards feel convenient, but they may be silently draining your finances. Here is the honest truth about how they work and why they cost you more than you think.",
    category: "Budgeting",
    date: "Parshas Yisro 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    content: [
      "Less than 75 years ago, the concept of buying something without paying cash on the spot barely existed. The credit card was born in 1950 when a wealthy businessman walked into a restaurant and realized he had left his wallet at home. Embarrassed, he set out to create a solution and founded the Diners Club Card, accepted only at restaurants. Eight years later, American Express and Visa launched cards accepted everywhere. The rest is history.",
      "HEADING:Every Swipe Is a Loan",
      "When you swipe a credit card, you are not spending your own money. You are taking out a loan. Even if you have the money sitting in your bank account, you still have a debt until you pay it off. Your brain does not process it the same way. When you pay cash, you feel the loss immediately. When you swipe a card, your brain registers the money still sitting in your account and you end up spending more.",
      "HEADING:The Interest Rate Trap",
      "A few years ago, the average credit card interest rate was around 16%. Today, many cards charge close to 30%. That means for every $1,000 you carry as a balance, you pay $300 per year in interest alone. After two years, you have paid $600 in penalties on that single thousand dollars.",
      "HEADING:You Spend More Even Without Paying Interest",
      "Even people who pay their full balance every month are not in the clear. Studies show that the average American spends 7 to 12% more when using a credit card versus cash. In the Orthodox Jewish community, that number is often 30% or more because our expenses are larger: children, Shabbos, Yom Tov, camp, simchos, and more. Some clients, after doing an honest accounting, discovered they were spending double what they would have spent with cash.",
      "HEADING:How It Escalates",
      "It starts innocently. You use the card to build credit, or to earn points. You tell yourself you will pay it off daily. Then weekly. Then monthly. Meanwhile, your family grows, expenses increase, and one month you find yourself spending next week's paycheck before it arrives. The credit card statement arrives and you have overspent again.",
      "The bottom line: credit cards are a financial trap dressed up as a convenience. Use them with extreme caution, or better yet, switch to a debit card for everyday purchases."
    ]
  },
  {
    id: 2,
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
    id: 3,
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
      "Here is something to consider: when you see someone else's spending and wonder how they afford it, do you think they are not looking at you and asking the same question? Your neighbor sees your spending too. He does not know you are struggling. He does not see how much or how little you have left at the end of the month.",
      "HEADING:The Bottom Line",
      "The question of how does he make it is pointless. First, you do not actually know if he is making it. Second, even if he is, it does not help you. The path to financial health runs through your own budget, not your neighbor's.",
      "Sit down with your spouse. Go through your numbers honestly. Write down your financial goals. Make a plan to achieve them. With Hashem's help, you can get there and find true financial peace of mind."
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
          <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
            {post.content.map((para, i) => {
              if (para.startsWith('HEADING:')) {
                return <h3 key={i} className="text-lg font-semibold text-[#1a2b4b] mt-6 mb-2">{para.replace('HEADING:', '')}</h3>;
              }
              return <p key={i} className="leading-relaxed">{para}</p>;
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
