import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Database, 
  Cpu, 
  UserCheck, 
  TrendingUp, 
  ShieldAlert, 
  Newspaper, 
  PieChart, 
  Zap,
  CheckCircle2,
  Brain,
  ChevronRight,
  Lock
} from 'lucide-react';
import { TriNodeOrb } from '../hero/TriNodeOrb';
import { AnimatedCounter } from '../common/AnimatedCounter';
import { GlassCard } from '../common/GlassCard';
import { GlowBadge } from '../common/GlowBadge';
import { ActiveTab } from '../navigation/Navbar';

interface LandingPageProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [activePromptIndex, setActivePromptIndex] = useState(0);

  const showcasePrompts = [
    {
      question: 'Why is Bitcoin surging 3.4% today?',
      answer:
        'Bitcoin is demonstrating bullish momentum driven by a $420M net inflow into institutional spot ETFs, combined with macro CPI inflation coming in below expectations at 2.4%. Technical indicators highlight strong support at $90,500 with resistance testing $94,000.',
      sentiment: 'Bullish (89% Confidence)',
      category: 'Market Intelligence',
    },
    {
      question: 'Evaluate portfolio risk & concentration for tech holdings',
      answer:
        'Your portfolio exhibits a 64% concentration in High-Beta Tech assets (NVDA, SOL). While YTD performance is +32.4%, short-term volatility index (VIX) indicates potential drawdowns of 8-12%. Diversifying 15% into hedge stable assets is recommended.',
      sentiment: 'Moderate Risk (76% Volatility)',
      category: 'Portfolio Analytics',
    },
    {
      question: 'Explain anomalous transaction #TX-9842',
      answer:
        'Transaction #TX-9842 ($14,500 USDC transfer) was flagged with a Risk Score of 87/100 due to an unprecedented IP location shift (Tokyo -> Zurich within 4 minutes) and a 400% deviation from historical 30-day transfer volume.',
      sentiment: 'Critical Alert Flagged',
      category: 'Anomaly Detection',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-16 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-orange-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-orange-500/30 shadow-glow-orange">
                <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
                <span className="text-xs font-semibold text-slate-200 uppercase tracking-widest font-mono">
                  NEXT-GEN FINTECH PLATFORM 2026
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white font-sans leading-[1.08]">
                Three Nodes. <br />
                <span className="orange-gradient-text">One Intelligent</span> <br />
                Financial Ecosystem.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
                Tri-Node unifies real-time crypto & stock market data, contextual artificial intelligence, portfolio analytics, and ML transaction anomaly detection into one unified human-crafted platform.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onNavigate('ai-chat')}
                  className="btn-primary px-8 py-4 rounded-xl flex items-center gap-3 text-sm tracking-wide font-bold group shadow-glow-orange"
                >
                  <Cpu className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                  <span>Launch AI Assistant</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('markets')}
                  className="btn-secondary px-7 py-4 rounded-xl flex items-center gap-2 text-sm font-semibold hover:border-orange-500/50"
                >
                  <TrendingUp className="w-4 h-4 text-orange-400" />
                  <span>Explore Live Markets</span>
                </button>
              </div>

              {/* Stats Bar */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    $<AnimatedCounter value={14.8} decimals={1} suffix="B+" />
                  </div>
                  <div className="text-xs text-slate-400 font-sans">Market Volume Tracked</div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-orange-400 font-mono">
                    <AnimatedCounter value={99.94} decimals={2} suffix="%" />
                  </div>
                  <div className="text-xs text-slate-400 font-sans">AI Context Accuracy</div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    <AnimatedCounter value={3.4} decimals={1} suffix="ms" />
                  </div>
                  <div className="text-xs text-slate-400 font-sans">ML Anomaly Detection</div>
                </div>
              </div>

            </div>

            {/* Right Hero 3D Orb */}
            <div className="lg:col-span-5 relative">
              <TriNodeOrb />
            </div>

          </div>
        </div>
      </section>

      {/* THREE NODE CONCEPT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <GlowBadge variant="orange" size="md">TRI-NODE PHILOSOPHY</GlowBadge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans">
            How The Three Nodes Connect
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Engineered to remove noise and transform raw market streams into clear human understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Node 1 */}
          <GlassCard glow="orange" className="space-y-4 hover:scale-[1.02] transition-all">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shadow-glow-orange">
                <Database className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-orange-400 px-2.5 py-1 rounded bg-orange-500/10 border border-orange-500/20">
                NODE 01
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">DATA NODE</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Collects, standardizes, and indexes live market prices, liquidity depth, news releases, and synthetic transaction logs across crypto & tradFi assets.
            </p>
            <div className="pt-2 border-t border-white/5 flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
              <span className="px-2 py-0.5 rounded bg-white/5">Price Feeds</span>
              <span className="px-2 py-0.5 rounded bg-white/5">News Streams</span>
              <span className="px-2 py-0.5 rounded bg-white/5">Tx Logs</span>
            </div>
          </GlassCard>

          {/* Node 2 */}
          <GlassCard glow="orange" className="space-y-4 hover:scale-[1.02] transition-all border-orange-500/40">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shadow-glow-orange">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-white px-2.5 py-1 rounded bg-orange-500/30 border border-orange-500/50">
                NODE 02
              </span>
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>AI CORE NODE</span>
              <Sparkles className="w-4 h-4 text-orange-400" />
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Synthesizes structured context, performs RAG document retrieval, computes anomaly Isolation Forest risk scores, and generates human-readable explanations.
            </p>
            <div className="pt-2 border-t border-white/5 flex flex-wrap gap-2 text-[11px] font-mono text-orange-300">
              <span className="px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20">LLM Reasoning</span>
              <span className="px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20">RAG Vector</span>
              <span className="px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20">Anomaly ML</span>
            </div>
          </GlassCard>

          {/* Node 3 */}
          <GlassCard glow="orange" className="space-y-4 hover:scale-[1.02] transition-all">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shadow-glow-orange">
                <UserCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-orange-400 px-2.5 py-1 rounded bg-orange-500/10 border border-orange-500/20">
                NODE 03
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">USER NODE</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Empowers traders and analysts with interactive dashboards, custom watchlists, portfolio breakdown charts, and educational explanations.
            </p>
            <div className="pt-2 border-t border-white/5 flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
              <span className="px-2 py-0.5 rounded bg-white/5">Portfolio P/L</span>
              <span className="px-2 py-0.5 rounded bg-white/5">Alert Triggers</span>
              <span className="px-2 py-0.5 rounded bg-white/5">Education</span>
            </div>
          </GlassCard>

        </div>
      </section>

      {/* INTERACTIVE AI DEMO SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassCard className="p-8 sm:p-12 relative overflow-hidden border-orange-500/30 bg-gradient-to-br from-[#0B0C14] via-[#0E0F1A] to-[#0B0C14]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <GlowBadge variant="orange" icon={<Brain className="w-3.5 h-3.5" />}>
                INTERACTIVE AI SHOWCASE
              </GlowBadge>
              <h2 className="text-3xl font-extrabold text-white">
                Test Tri-Node AI Reasoning Live
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Select a sample intelligence query to see how Tri-Node turns market data & transaction logs into clear human explanations.
              </p>

              {/* Sample Selector Chips */}
              <div className="space-y-3">
                {showcasePrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePromptIndex(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-xs flex items-center justify-between ${
                      activePromptIndex === idx
                        ? 'bg-orange-500/15 border-orange-500 text-white font-medium shadow-glow-orange'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase font-mono text-orange-400 tracking-wider">
                        {prompt.category}
                      </div>
                      <div className="font-semibold text-slate-100">{prompt.question}</div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-orange-400 transition-transform ${activePromptIndex === idx ? 'translate-x-1' : ''}`} />
                  </button>
                ))}
              </div>

              <button
                onClick={() => onNavigate('ai-chat')}
                className="btn-primary w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Open Full AI Assistant Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* AI Response Display Box */}
            <div className="lg:col-span-7 bg-[#050508] p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-sans">Tri-Node Intelligence Engine</h4>
                    <span className="text-[10px] text-slate-400 font-mono">Grounded by Backend Market Context</span>
                  </div>
                </div>
                <GlowBadge variant="green" size="sm" pulse>
                  {showcasePrompts[activePromptIndex].sentiment}
                </GlowBadge>
              </div>

              <div className="space-y-4">
                <div className="text-xs font-mono text-slate-400">QUERY:</div>
                <p className="text-sm font-semibold text-orange-300 bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                  "{showcasePrompts[activePromptIndex].question}"
                </p>

                <div className="text-xs font-mono text-slate-400">SYNTHESIS OUTPUT:</div>
                <p className="text-sm text-slate-200 leading-relaxed font-sans bg-white/5 p-4 rounded-xl border border-white/5">
                  {showcasePrompts[activePromptIndex].answer}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Zero AI Hallucination Grounding
                </span>
                <span>Latency: 28ms</span>
              </div>
            </div>

          </div>
        </GlassCard>
      </section>

      {/* PLATFORM MODULES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <GlowBadge variant="orange">FULL-STACK CAPABILITIES</GlowBadge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Built For Serious Fintech Intelligence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <GlassCard onClick={() => onNavigate('markets')} className="cursor-pointer space-y-4 group">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
              Market Intelligence
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time prices, percentage changes, sparkline interactive charts, asset search, and detailed technical asset breakdowns.
            </p>
          </GlassCard>

          <GlassCard onClick={() => onNavigate('ai-chat')} className="cursor-pointer space-y-4 group">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
              Contextual AI Assistant
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ask deep questions regarding market trends, educational concepts, macro indicators, or specific asset movements.
            </p>
          </GlassCard>

          <GlassCard onClick={() => onNavigate('portfolio')} className="cursor-pointer space-y-4 group">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
              <PieChart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
              Portfolio & Risk Insights
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Track multi-asset holdings, P/L performance, asset concentration, and generate AI portfolio risk analysis reports.
            </p>
          </GlassCard>

          <GlassCard onClick={() => onNavigate('news')} className="cursor-pointer space-y-4 group">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
              <Newspaper className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
              News AI & Sentiment
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Live crypto & fintech news stream with AI key bullet summaries and automated sentiment classification.
            </p>
          </GlassCard>

          <GlassCard onClick={() => onNavigate('transactions')} className="cursor-pointer space-y-4 group">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
              Transaction ML Anomaly Monitor
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Synthetic transactions feed with Isolation Forest machine-learning anomaly scores and explainable risk reasons.
            </p>
          </GlassCard>

          <GlassCard onClick={() => onNavigate('analytics')} className="cursor-pointer space-y-4 group">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
              Advanced Analytics & Correlations
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Volatility matrices, asset correlation heatmaps, historical metrics, and technical indicator visualizations.
            </p>
          </GlassCard>

        </div>
      </section>

      {/* SECURITY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl glass-card border-orange-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Production Security Architecture</h4>
              <p className="text-xs text-slate-400">
                Strict separation between Frontend UI and API keys. Server-side bcrypt authentication, parameterization, and HTTP-only session safeguards.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('ai-chat')}
            className="btn-primary px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0"
          >
            Start Exploring
          </button>
        </div>
      </section>

    </div>
  );
};
