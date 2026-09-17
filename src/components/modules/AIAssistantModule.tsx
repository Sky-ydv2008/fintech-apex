import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  BookOpen, 
  ShieldAlert, 
  LineChart, 
  Database, 
  Zap, 
  Copy, 
  Check, 
  FileText,
  User,
  Search,
  ExternalLink,
  Cpu
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { GlowBadge } from '../common/GlowBadge';
import { ALL_MARKET_COINS } from '../../services/marketApi';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  mode?: 'market' | 'education' | 'anomaly' | 'rag';
  sources?: string[];
  sentiment?: string;
  confidence?: string;
}

interface AIAssistantModuleProps {
  initialPrompt?: string;
}

export const AIAssistantModule: React.FC<AIAssistantModuleProps> = ({ initialPrompt }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      content:
        'Hello! I am Tri-Node AI, your intelligence synthesis core. Select any market coin (BTC, SOL, XRP, NVDA, PEPE, TAO) or ask a question regarding market trends, portfolio risk, or anomaly scoring.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mode: 'market',
      sources: ['Node 1 Realtime Streams', 'CoinGecko Vector Feed', 'PostgreSQL pgvector'],
      sentiment: 'Neutral / Informational',
      confidence: '99.4%',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeMode, setActiveMode] = useState<'market' | 'education' | 'anomaly' | 'rag'>('market');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showVectorDrawer, setShowVectorDrawer] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const presetPrompts = [
    { label: 'Why is Bitcoin surging past $92k?', coin: 'BTC' },
    { label: 'Analyze Solana DEX volume & TVL', coin: 'SOL' },
    { label: 'What is XRP RLUSD cross-border impact?', coin: 'XRP' },
    { label: 'Evaluate Bittensor TAO AI token momentum', coin: 'TAO' },
    { label: 'Explain Isolation Forest transaction fraud algorithm', coin: 'ML' },
  ];

  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // AI Synthesis Engine matching all coins
    setTimeout(() => {
      let aiResponse = '';
      let sources = ['Tri-Node Realtime Data Node', 'pgvector Knowledge Base'];
      let sentiment = 'Bullish (88% Confidence)';

      const lowerQ = query.toLowerCase();

      // Find matching coin from database
      const matchedCoin = ALL_MARKET_COINS.find(
        (c) => lowerQ.includes(c.symbol.toLowerCase()) || lowerQ.includes(c.name.toLowerCase())
      );

      if (matchedCoin) {
        aiResponse =
          `**Tri-Node Market Intelligence (${matchedCoin.name} / ${matchedCoin.symbol}):**\n\n` +
          `• **Current Valuation:** $${matchedCoin.price < 1 ? matchedCoin.price.toFixed(6) : matchedCoin.price.toLocaleString()} (${matchedCoin.change24h >= 0 ? '+' : ''}${matchedCoin.change24h}% 24h)\n` +
          `• **Market Cap & Volume:** ${matchedCoin.marketCap} market cap with ${matchedCoin.volume24h} 24-hour volume.\n` +
          `• **Technical Signals:** RSI at ${matchedCoin.rsi} (${matchedCoin.macd}). 7-day price action reflects ${matchedCoin.change7d >= 0 ? '+' : ''}${matchedCoin.change7d}% trajectory.\n` +
          `• **AI Core Observation:** ${matchedCoin.aiObservation}\n\n` +
          `*Informational observation grounded by Node 1 market streams. Not financial advice.*`;
        sources.push(`${matchedCoin.name} On-Chain Telemetry`, 'Spot Orderbook Ingest');
        sentiment = matchedCoin.change24h >= 0 ? 'Bullish (92% Confidence)' : 'Bearish Consolidation';
      } else if (lowerQ.includes('isolation') || lowerQ.includes('anomaly')) {
        aiResponse =
          '**Isolation Forest Anomaly ML Model Overview:**\n\n' +
          '• **Algorithmic Logic:** Isolates observations by randomly partitioning feature values. Anomalies require significantly fewer splits than normal baseline transactions.\n' +
          '• **Evaluated Features:** Geographic velocity (distance / time delta), amount variance from 30-day mean, device fingerprint hashes.\n' +
          '• **Threshold Action:** Scores >70 trigger automated alert escalation.';
        sources.push('Isolation Forest Spec', 'Transaction Risk Log');
        sentiment = 'Security Metric';
      } else if (lowerQ.includes('rag') || lowerQ.includes('vector')) {
        aiResponse =
          '**RAG (Retrieval-Augmented Generation) & pgvector Storage:**\n\n' +
          '1. Document Chunking: Text parsed into 512-token embeddings.\n' +
          '2. Vector Indexing: Stored in PostgreSQL with HNSW cosine similarity index.\n' +
          '3. Prompt Injection: Top k=3 relevant context chunks retrieved and supplied directly to LLM for zero-hallucination accuracy.';
        sources.push('pgvector Engine Specification', 'Tri-Node Whitepaper');
        sentiment = 'Technical Architecture';
      } else {
        aiResponse =
          `**Tri-Node Intelligence Synthesis:**\n\n` +
          `Synthesizing market context for "${query}". Indicators demonstrate stable liquidity across top tracked coins. RSI indexes show neutral-to-bullish momentum.`;
      }

      const aiMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: activeMode,
        sources,
        sentiment,
        confidence: '99.1%',
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1100);
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              Tri-Node AI Studio
            </h1>
            <GlowBadge variant="orange" size="sm" pulse icon={<Sparkles className="w-3.5 h-3.5 text-orange-400" />}>
              NODE 2 CORE ACTIVE
            </GlowBadge>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Grounded LLM intelligence synthesis across 20+ market coins, portfolio risk, and transaction ML anomalies.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
          <button
            onClick={() => setActiveMode('market')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeMode === 'market'
                ? 'bg-orange-500 text-white font-semibold shadow-glow-orange'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LineChart className="w-3.5 h-3.5" />
            <span>Market Analysis</span>
          </button>
          <button
            onClick={() => setActiveMode('education')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeMode === 'education'
                ? 'bg-orange-500 text-white font-semibold shadow-glow-orange'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Education</span>
          </button>
          <button
            onClick={() => setActiveMode('anomaly')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeMode === 'anomaly'
                ? 'bg-orange-500 text-white font-semibold shadow-glow-orange'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Anomaly ML</span>
          </button>
        </div>
      </div>

      {/* Main Chat Frame */}
      <GlassCard className="p-0 overflow-hidden border-white/10 flex flex-col h-[650px] relative shadow-2xl">
        
        {/* Messages Feed */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((msg) => {
            const isAssistant = msg.sender === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex gap-4 ${isAssistant ? 'justify-start' : 'justify-end'}`}
              >
                {isAssistant && (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shrink-0 shadow-glow-orange">
                    <Bot className="w-5 h-5" />
                  </div>
                )}

                <div className={`max-w-2xl space-y-3 ${isAssistant ? 'w-full' : ''}`}>
                  
                  {/* Card Container */}
                  <div
                    className={`p-5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isAssistant
                        ? 'bg-[#080910] border border-white/10 text-slate-100 shadow-xl'
                        : 'bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium ml-auto'
                    }`}
                  >
                    <div className="whitespace-pre-line font-sans">
                      {msg.content}
                    </div>

                    {/* Metadata Footer */}
                    {isAssistant && (
                      <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
                        {msg.sentiment && (
                          <span className="text-orange-400 font-bold">
                            Sentiment: {msg.sentiment}
                          </span>
                        )}

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => copyToClipboard(msg.id, msg.content)}
                            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span>Copy</span>
                          </button>
                          <span>{msg.timestamp}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Grounding Source Badges */}
                  {isAssistant && msg.sources && msg.sources.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-400 pl-1">
                      <span className="flex items-center gap-1 text-slate-400 font-semibold">
                        <Database className="w-3 h-3 text-orange-400" /> Grounded Context:
                      </span>
                      {msg.sources.map((src, idx) => (
                        <span key={idx} className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                          {src}
                        </span>
                      ))}
                    </div>
                  )}

                </div>

                {!isAssistant && (
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-slate-200 shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing State */}
          {isTyping && (
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 animate-pulse">
                <Bot className="w-5 h-5" />
              </div>
              <div className="p-4 rounded-2xl bg-[#080910] border border-white/10 text-xs text-orange-400 font-mono flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Tri-Node Engine synthesizing Node 1 feeds and pgvector embeddings...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Suggested Queries Chips */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#06070B] flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-bold">Suggested Market Queries:</span>
          {presetPrompts.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(preset.label)}
              className="text-[11px] px-3 py-1 rounded-full bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/40 text-slate-300 hover:text-white transition-all font-sans"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 bg-[#080910] border-t border-white/10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              placeholder="Ask about any coin (BTC, SOL, XRP, NVDA, PEPE), portfolio risk, or anomaly score..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="btn-primary px-6 py-3 rounded-xl flex items-center gap-2 text-xs font-bold uppercase tracking-wider disabled:opacity-50 shadow-glow-orange"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </GlassCard>

    </div>
  );
};
