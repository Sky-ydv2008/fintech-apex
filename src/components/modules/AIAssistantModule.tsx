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
  RefreshCw,
  Info,
  ChevronDown,
  User
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { GlowBadge } from '../common/GlowBadge';

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
        'Hello! I am Tri-Node AI, your contextual financial & crypto intelligence assistant. How can I analyze the markets or explain financial concepts for you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mode: 'market',
      sources: ['Tri-Node Realtime Data Node', 'CoinGecko Feed', 'Fed Macro Index'],
      sentiment: 'Neutral / Informational',
      confidence: '99.4%',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeMode, setActiveMode] = useState<'market' | 'education' | 'anomaly' | 'rag'>('market');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const presetPrompts = [
    { label: 'Why is Bitcoin moving today?', mode: 'market' as const },
    { label: 'Explain RAG & pgvector retrieval', mode: 'rag' as const },
    { label: 'How does Isolation Forest detect transaction fraud?', mode: 'anomaly' as const },
    { label: 'Evaluate market risk for ETH L2 scaling', mode: 'education' as const },
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

    // Simulate AI synthesis with backend RAG context
    setTimeout(() => {
      let aiResponse = '';
      let sources = ['Tri-Node Data Stream v2', 'pgvector Financial KB'];
      let sentiment = 'Bullish (84% Confidence)';

      if (query.toLowerCase().includes('bitcoin') || query.toLowerCase().includes('btc')) {
        aiResponse =
          '**Bitcoin (BTC) Technical & Context Analysis:**\n\n' +
          '• **Current Price Momentum:** BTC is trading near $92,450 (+3.42% in 24h).\n' +
          '• **Primary Drivers:** Institutional ETF net inflows exceeded $420M in the past 24 hours. Macro liquidity indexes show renewed buying interest following low CPI print.\n' +
          '• **Support & Resistance:** Key immediate support rests at $90,500, with primary overhead resistance at $94,000.\n' +
          '• **Observational Signal:** Positive volume profile with RSI at 64.2 (Healthy bullish range).\n\n' +
          '*Note: Observational market analysis provided for educational and analytical purposes only. Not financial advice.*';
        sources = ['CoinDesk Stream', 'Spot ETF Tracker API', 'On-Chain Liquidity Node'];
      } else if (query.toLowerCase().includes('rag') || query.toLowerCase().includes('vector')) {
        aiResponse =
          '**RAG (Retrieval-Augmented Generation) Architecture in Tri-Node:**\n\n' +
          '1. **Ingestion & Chunking:** Financial whitepapers, news summaries, and terminology docs are split into optimal 512-token chunks.\n' +
          '2. **Embedding Generation:** OpenAI/Gemini embedding models convert text chunks into high-dimensional vector representations.\n' +
          '3. **pgvector Storage:** Embeddings are stored in PostgreSQL with HNSW index for ultra-low latency cosine similarity searches.\n' +
          '4. **Context Injection:** When you ask a question, relevant chunks are retrieved and injected directly into the prompt context for zero-hallucination answers.';
        sources = ['Tri-Node Implementation Plan PDF', 'PostgreSQL pgvector Spec'];
        sentiment = 'Technical Explanation';
      } else if (query.toLowerCase().includes('isolation') || query.toLowerCase().includes('anomaly')) {
        aiResponse =
          '**Isolation Forest Anomaly Detection Engine:**\n\n' +
          '• **Core Concept:** Isolation Forest isolates anomalies by randomly selecting a feature and split value. Anomalous transactions require far fewer splits to isolate than normal baseline behavior.\n' +
          '• **Feature Vector:** Features analyzed include Transfer Amount, Geographic Distance/Velocity, Device Fingerprint, and Historical 30-day Mean.\n' +
          '• **Scoring Threshold:** Risk score > 70 triggers immediate flagging for human audit.';
        sources = ['Tri-Node Anomaly ML Service', 'Transaction Log Repository'];
        sentiment = 'Security Audit System';
      } else {
        aiResponse =
          `**Tri-Node Analysis regarding: "${query}"**\n\n` +
          'Based on real-time data feeds collected at Node 1, current indicators reflect standard market fluctuations. Technical moving averages suggest steady liquidity consolidation.\n\n' +
          '• **Volume Trend:** Stable 24h turnover.\n' +
          '• **Sentiment Classification:** Neutral to Moderately Positive.\n' +
          '• **Recommended Action:** Monitor key support levels and set price alerts in Watchlist.';
      }

      const aiMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: activeMode,
        sources,
        sentiment,
        confidence: '98.8%',
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
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
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Tri-Node AI Studio</h1>
            <GlowBadge variant="orange" size="sm" pulse icon={<Sparkles className="w-3 h-3 text-orange-400" />}>
              NODE 2 ACTIVE
            </GlowBadge>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Contextual LLM intelligence grounded by live market feeds and RAG knowledge vectors.
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

      {/* Main Chat Grid */}
      <GlassCard className="p-0 overflow-hidden border-white/10 flex flex-col h-[650px] relative">
        
        {/* Messages Feed Container */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((msg) => {
            const isAssistant = msg.sender === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex gap-4 ${isAssistant ? 'justify-start' : 'justify-end'}`}
              >
                {isAssistant && (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shrink-0 shadow-glow-orange">
                    <Bot className="w-5 h-5" />
                  </div>
                )}

                <div className={`max-w-2xl space-y-3 ${isAssistant ? 'w-full' : ''}`}>
                  
                  {/* Message Card */}
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

                    {/* Metadata Footer for Assistant Messages */}
                    {isAssistant && (
                      <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
                        {msg.sentiment && (
                          <span className="text-orange-400 font-semibold">
                            Sentiment: {msg.sentiment}
                          </span>
                        )}

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyToClipboard(msg.id, msg.content)}
                            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <span>{msg.timestamp}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Grounding Source Tags */}
                  {isAssistant && msg.sources && msg.sources.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-400 pl-1">
                      <span className="flex items-center gap-1 text-slate-400">
                        <Database className="w-3 h-3 text-orange-400" /> Grounded Context:
                      </span>
                      {msg.sources.map((src, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/5">
                          {src}
                        </span>
                      ))}
                    </div>
                  )}

                </div>

                {!isAssistant && (
                  <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-slate-200 shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-4 items-center">
              <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 animate-pulse">
                <Bot className="w-5 h-5" />
              </div>
              <div className="p-4 rounded-2xl bg-[#080910] border border-white/10 text-xs text-orange-400 font-mono flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Tri-Node Engine is synthesizing backend context...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Prompt Chips Bar */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#06070B] flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Suggested Queries:</span>
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

        {/* Input Bar */}
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
              placeholder="Ask Tri-Node AI about prices, news summary, portfolio risk, or anomaly scores..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="btn-primary px-5 py-3 rounded-xl flex items-center gap-2 text-xs font-bold uppercase tracking-wider disabled:opacity-50"
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
