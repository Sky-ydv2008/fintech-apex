import React, { useState } from 'react';
import { 
  Newspaper, 
  Sparkles, 
  ExternalLink, 
  Tag, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  X,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { GlowBadge } from '../common/GlowBadge';

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  url: string;
  summary: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  sentimentScore: number; // 0 to 100
  keyTakeaways: string[];
  relatedAssets: string[];
}

const mockNews: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Institutional Spot ETF Net Inflows Exceed $420 Million in Single Trading Session',
    source: 'Bloomberg Markets',
    publishedAt: '18 mins ago',
    url: 'https://bloomberg.com',
    summary:
      'Spot Bitcoin and Ethereum ETFs registered heavy net inflows today as institutional asset managers allocated fresh capital following positive inflation metrics.',
    sentiment: 'Bullish',
    sentimentScore: 92,
    keyTakeaways: [
      'BlackRock and Fidelity saw combined inflows exceeding $310M.',
      'CPI print coming in lower than forecast catalyzed broader institutional buying.',
      'Overhead resistance levels tested across major liquid pairs.',
    ],
    relatedAssets: ['BTC', 'ETH'],
  },
  {
    id: 'news-2',
    title: 'Federal Reserve Signals Steady Rate Environment Amid Balanced Employment Figures',
    source: 'Financial Times',
    publishedAt: '1 hour ago',
    url: 'https://ft.com',
    summary:
      'Federal Reserve officials indicated interest rates will remain unchanged through the upcoming monetary policy meeting, providing stability for risk-on assets.',
    sentiment: 'Neutral',
    sentimentScore: 54,
    keyTakeaways: [
      'Macro rate environment remains consistent with baseline expectations.',
      'Treasury yields stabilized near 4.15%.',
      'FinTech equity futures traded flat following the statement.',
    ],
    relatedAssets: ['NVDA', 'AAPL', 'MSFT'],
  },
  {
    id: 'news-3',
    title: 'Solana DEX Volume Touches Record High as Ecosystem Activity Accelerates',
    source: 'CoinDesk',
    publishedAt: '3 hours ago',
    url: 'https://coindesk.com',
    summary:
      'Decentralized exchange volumes on the Solana blockchain reached $4.2 billion today, driven by high liquidity pool utilization and sub-cent transaction fees.',
    sentiment: 'Bullish',
    sentimentScore: 88,
    keyTakeaways: [
      'Daily active address count reached 1.8M.',
      'Network uptime recorded 99.99% despite peak transaction volume.',
      'DeFi protocol TVL climbed 14% week-over-week.',
    ],
    relatedAssets: ['SOL'],
  },
  {
    id: 'news-4',
    title: 'NVIDIA Announces Next-Generation AI Micro-Architecture Architecture Upgrades',
    source: 'Reuters Tech',
    publishedAt: '5 hours ago',
    url: 'https://reuters.com',
    summary:
      'NVIDIA unveiled its latest AI silicon roadmap highlighting 3x energy efficiency improvements for enterprise data center deployments.',
    sentiment: 'Bullish',
    sentimentScore: 94,
    keyTakeaways: [
      'Enterprise order backlog extended into Q3 2026.',
      'Major cloud providers committed to day-one cluster adoption.',
    ],
    relatedAssets: ['NVDA'],
  },
];

interface NewsModuleProps {
  onAskAI: (query: string) => void;
}

export const NewsModule: React.FC<NewsModuleProps> = ({ onAskAI }) => {
  const [selectedSentiment, setSelectedSentiment] = useState<'All' | 'Bullish' | 'Bearish' | 'Neutral'>('All');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  const filteredNews = mockNews.filter(
    (n) => selectedSentiment === 'All' || n.sentiment === selectedSentiment
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">News Intelligence & AI Summaries</h1>
            <GlowBadge variant="orange" size="sm" pulse>NODE 1 DATA + NODE 2 AI</GlowBadge>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Real-time news feeds augmented by automated LLM key point summaries and sentiment classification.
          </p>
        </div>

        {/* Sentiment Filter Tabs */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
          {(['All', 'Bullish', 'Neutral', 'Bearish'] as const).map((sent) => (
            <button
              key={sent}
              onClick={() => setSelectedSentiment(sent)}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                selectedSentiment === sent
                  ? 'bg-orange-500 text-white font-semibold shadow-glow-orange'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {sent}
            </button>
          ))}
        </div>
      </div>

      {/* News Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.map((article) => {
          const isBullish = article.sentiment === 'Bullish';
          return (
            <GlassCard key={article.id} className="space-y-4 hover:border-orange-500/40 transition-all flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-orange-400 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.publishedAt}
                  </span>
                  <span className="text-slate-400">{article.source}</span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug group-hover:text-orange-400 transition-colors">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3">
                  {article.summary}
                </p>

                {/* Related Asset Chips */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] font-mono text-slate-400">Mentioned Assets:</span>
                  {article.relatedAssets.map((asset) => (
                    <span key={asset} className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      ${asset}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                <GlowBadge
                  variant={isBullish ? 'green' : article.sentiment === 'Bearish' ? 'red' : 'neutral'}
                  size="sm"
                >
                  {article.sentiment} ({article.sentimentScore}% Confidence)
                </GlowBadge>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveArticle(article)}
                    className="px-3.5 py-1.5 rounded-lg bg-orange-500/15 hover:bg-orange-500/30 border border-orange-500/40 text-orange-300 text-xs font-medium flex items-center gap-1.5 transition-all shadow-glow-orange"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Takeaways</span>
                  </button>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </GlassCard>
          );
        })}
      </div>

      {/* AI Key Takeaways Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl glass-card rounded-2xl border-orange-500/30 p-6 sm:p-8 space-y-6 animate-fadeIn">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Tri-Node AI News Intelligence</h3>
                  <span className="text-xs font-mono text-slate-400">{activeArticle.source} • {activeArticle.publishedAt}</span>
                </div>
              </div>
              <button onClick={() => setActiveArticle(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-semibold text-orange-300 leading-snug">
                "{activeArticle.title}"
              </h4>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">AI Sentiment Classification:</span>
                  <GlowBadge variant={activeArticle.sentiment === 'Bullish' ? 'green' : 'neutral'} size="sm">
                    {activeArticle.sentiment} ({activeArticle.sentimentScore}%)
                  </GlowBadge>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {activeArticle.summary}
                </p>
              </div>

              {/* Key Bullet Takeaways */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-orange-400 uppercase tracking-wider font-bold">
                  Key Intelligence Bullet Points:
                </div>
                <ul className="space-y-2">
                  {activeArticle.keyTakeaways.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 rounded-xl bg-white/5 text-xs text-slate-300 hover:text-white"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const query = `Analyze the market impact of this news story: "${activeArticle.title}". What assets will react most over the next 48 hours?`;
                  setActiveArticle(null);
                  onAskAI(query);
                }}
                className="btn-primary px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Deep Ask AI About Impact</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
