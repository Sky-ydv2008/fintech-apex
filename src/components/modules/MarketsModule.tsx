import React, { useState } from 'react';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  BarChart2, 
  Filter, 
  Bookmark, 
  ExternalLink,
  ChevronRight,
  Zap,
  Clock,
  X
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { GlassCard } from '../common/GlassCard';
import { GlowBadge } from '../common/GlowBadge';
import { ActiveTab } from '../navigation/Navbar';

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: string;
  marketCap: string;
  high24h: number;
  low24h: number;
  type: 'crypto' | 'fintech';
  sparkline: number[];
  rsi: number;
  macd: string;
  aiObservation: string;
  chartData: { time: string; price: number }[];
}

export const mockAssets: Asset[] = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 92450.25,
    change24h: 3.42,
    volume24h: '$38.4B',
    marketCap: '$1.82T',
    high24h: 93100.0,
    low24h: 89400.0,
    type: 'crypto',
    sparkline: [89400, 90100, 89800, 91200, 91800, 92450],
    rsi: 64.2,
    macd: 'Bullish Crossover',
    aiObservation: 'Institutional spot ETF inflows ($420M) driving breakout above 90k psychological level.',
    chartData: [
      { time: '00:00', price: 89400 },
      { time: '04:00', price: 90100 },
      { time: '08:00', price: 89800 },
      { time: '12:00', price: 91200 },
      { time: '16:00', price: 91800 },
      { time: '20:00', price: 92450 },
    ],
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3480.10,
    change24h: 2.15,
    volume24h: '$18.2B',
    marketCap: '$418.5B',
    high24h: 3520.0,
    low24h: 3390.0,
    type: 'crypto',
    sparkline: [3390, 3410, 3400, 3450, 3470, 3480],
    rsi: 58.1,
    macd: 'Consolidation',
    aiObservation: 'Layer 2 staking metrics surging; gas fees stabilized at 12 gwei.',
    chartData: [
      { time: '00:00', price: 3390 },
      { time: '04:00', price: 3410 },
      { time: '08:00', price: 3400 },
      { time: '12:00', price: 3450 },
      { time: '16:00', price: 3470 },
      { time: '20:00', price: 3480 },
    ],
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    price: 194.75,
    change24h: 8.64,
    volume24h: '$7.8B',
    marketCap: '$91.2B',
    high24h: 198.5,
    low24h: 178.2,
    type: 'crypto',
    sparkline: [178.2, 182, 186, 189, 192, 194.75],
    rsi: 71.8,
    macd: 'Strong Bullish',
    aiObservation: 'DEX trading volume reached new record $4.2B, outpacing mainnet benchmarks.',
    chartData: [
      { time: '00:00', price: 178.2 },
      { time: '04:00', price: 182.0 },
      { time: '08:00', price: 186.0 },
      { time: '12:00', price: 189.0 },
      { time: '16:00', price: 192.0 },
      { time: '20:00', price: 194.75 },
    ],
  },
  {
    id: 'nvidia',
    symbol: 'NVDA',
    name: 'NVIDIA Corp',
    price: 142.80,
    change24h: 4.12,
    volume24h: '$24.6B',
    marketCap: '$3.51T',
    high24h: 144.2,
    low24h: 137.5,
    type: 'fintech',
    sparkline: [137.5, 139.0, 140.2, 141.8, 142.8],
    rsi: 68.4,
    macd: 'Bullish Momentum',
    aiObservation: 'Hyperscaler AI chip demand reports indicate 100% capacity utilization through Q4.',
    chartData: [
      { time: '00:00', price: 137.5 },
      { time: '04:00', price: 139.0 },
      { time: '08:00', price: 140.2 },
      { time: '12:00', price: 141.8 },
      { time: '16:00', price: 142.8 },
    ],
  },
  {
    id: 'apple',
    symbol: 'AAPL',
    name: 'Apple Inc',
    price: 235.40,
    change24h: -0.65,
    volume24h: '$11.4B',
    marketCap: '$3.58T',
    high24h: 238.0,
    low24h: 234.2,
    type: 'fintech',
    sparkline: [238.0, 237.2, 236.5, 235.8, 235.4],
    rsi: 48.9,
    macd: 'Neutral Slanted',
    aiObservation: 'Supply chain adjustments ahead of new device launch creating mild consolidation.',
    chartData: [
      { time: '00:00', price: 238.0 },
      { time: '04:00', price: 237.2 },
      { time: '08:00', price: 236.5 },
      { time: '12:00', price: 235.8 },
      { time: '16:00', price: 235.4 },
    ],
  },
  {
    id: 'avalanche',
    symbol: 'AVAX',
    name: 'Avalanche',
    price: 38.60,
    change24h: -1.82,
    volume24h: '$1.4B',
    marketCap: '$15.8B',
    high24h: 39.8,
    low24h: 38.1,
    type: 'crypto',
    sparkline: [39.8, 39.2, 38.9, 38.6],
    rsi: 44.5,
    macd: 'Bearish Cross',
    aiObservation: 'Subnet gaming activity steady, but major unlocking schedule pressure capping near-term rally.',
    chartData: [
      { time: '00:00', price: 39.8 },
      { time: '04:00', price: 39.2 },
      { time: '08:00', price: 38.9 },
      { time: '12:00', price: 38.6 },
    ],
  },
];

interface MarketsModuleProps {
  onAskAI: (query: string) => void;
  onNavigate: (tab: ActiveTab) => void;
}

export const MarketsModule: React.FC<MarketsModuleProps> = ({ onAskAI, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'crypto' | 'fintech'>('all');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const filteredAssets = mockAssets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || asset.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Live Market Explorer</h1>
            <GlowBadge variant="orange" size="sm" pulse>REALTIME NODE 1</GlowBadge>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Institutional-grade pricing streams, technical signals, and contextual AI synthesis.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search symbol or asset..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50"
            />
          </div>

          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedType === 'all'
                  ? 'bg-orange-500 text-white font-semibold shadow-glow-orange'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedType('crypto')}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedType === 'crypto'
                  ? 'bg-orange-500 text-white font-semibold shadow-glow-orange'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Crypto
            </button>
            <button
              onClick={() => setSelectedType('fintech')}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedType === 'fintech'
                  ? 'bg-orange-500 text-white font-semibold shadow-glow-orange'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              FinTech / Stocks
            </button>
          </div>
        </div>
      </div>

      {/* Asset Table / Grid */}
      <div className="glass-card rounded-2xl overflow-hidden border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-mono uppercase text-slate-400 bg-white/[0.02]">
                <th className="py-3.5 px-6 font-semibold">Asset</th>
                <th className="py-3.5 px-4 font-semibold">Price</th>
                <th className="py-3.5 px-4 font-semibold">24h Change</th>
                <th className="py-3.5 px-4 font-semibold">Market Cap</th>
                <th className="py-3.5 px-4 font-semibold">24h Volume</th>
                <th className="py-3.5 px-4 font-semibold">AI Technical Observation</th>
                <th className="py-3.5 px-6 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {filteredAssets.map((asset) => {
                const isPositive = asset.change24h >= 0;
                return (
                  <tr
                    key={asset.id}
                    className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                    onClick={() => setSelectedAsset(asset)}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center font-mono font-bold text-orange-400 group-hover:scale-105 transition-transform">
                          {asset.symbol.slice(0, 3)}
                        </div>
                        <div>
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <span>{asset.name}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-slate-400 border border-white/5">
                              {asset.type.toUpperCase()}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-400">{asset.symbol}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-mono font-bold text-slate-100">
                      ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-4 px-4 font-mono font-semibold">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded ${
                          isPositive
                            ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                            : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
                        }`}
                      >
                        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {isPositive ? '+' : ''}
                        {asset.change24h.toFixed(2)}%
                      </span>
                    </td>

                    <td className="py-4 px-4 font-mono text-slate-300">{asset.marketCap}</td>
                    <td className="py-4 px-4 font-mono text-slate-300">{asset.volume24h}</td>

                    <td className="py-4 px-4 max-w-xs">
                      <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                        {asset.aiObservation}
                      </p>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAskAI(`Why is ${asset.name} (${asset.symbol}) trading at $${asset.price} with a 24h change of ${asset.change24h}%?`);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/15 hover:bg-orange-500/30 border border-orange-500/40 text-orange-300 font-medium transition-all text-xs shadow-glow-orange"
                      >
                        <Sparkles className="w-3 h-3 text-orange-400" />
                        <span>Ask AI</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Asset Modal Detail */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-3xl glass-card rounded-2xl border-orange-500/30 overflow-hidden space-y-6 p-6 sm:p-8 animate-fadeIn max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center font-mono font-bold text-orange-400">
                  {selectedAsset.symbol}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white">{selectedAsset.name}</h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span>{selectedAsset.symbol}</span>
                    <span>•</span>
                    <span className="text-orange-400 font-semibold">${selectedAsset.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedAsset(null)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Price Chart */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono uppercase">24-Hour Price Action</span>
                <span className="text-emerald-400 font-mono font-semibold">RSI: {selectedAsset.rsi} ({selectedAsset.macd})</span>
              </div>
              <div className="h-60 w-full bg-[#050508] p-4 rounded-xl border border-white/10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedAsset.chartData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF8000" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#FF8000" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#64748B" fontSize={10} />
                    <YAxis stroke="#64748B" fontSize={10} domain={['auto', 'auto']} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0B0C12', borderColor: 'rgba(255,94,0,0.3)', borderRadius: '8px', color: '#FFF' }}
                    />
                    <Area type="monotone" dataKey="price" stroke="#FF8000" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Insight Box */}
            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400">
                <Zap className="w-4 h-4" />
                <span>TRI-NODE AI MARKET OBSERVATION</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {selectedAsset.aiObservation}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedAsset(null)}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const query = `Provide detailed technical indicators and risk forecast for ${selectedAsset.name} (${selectedAsset.symbol}).`;
                  setSelectedAsset(null);
                  onAskAI(query);
                }}
                className="btn-primary px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Deep AI Technical Audit</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
