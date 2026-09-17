import React, { useState } from 'react';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  BarChart2, 
  Grid, 
  List, 
  Filter, 
  ExternalLink,
  ChevronRight,
  Zap,
  Clock,
  X,
  Layers,
  Brain,
  ShieldCheck
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
import { ALL_MARKET_COINS, ExtendedAsset } from '../../services/marketApi';
import { ActiveTab } from '../navigation/Navbar';

interface MarketsModuleProps {
  onAskAI: (query: string) => void;
  onNavigate: (tab: ActiveTab) => void;
}

export const MarketsModule: React.FC<MarketsModuleProps> = ({ onAskAI, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedAsset, setSelectedAsset] = useState<ExtendedAsset | null>(null);
  const [chartTimeframe, setChartTimeframe] = useState<'1D' | '1W' | '1M' | '1Y'>('1W');

  const categories = ['All', 'Layer 1', 'AI Tokens', 'Meme', 'FinTech / Equity', 'Infrastructure'];

  const filteredAssets = ALL_MARKET_COINS.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
              Market Intelligence Explorer
            </h1>
            <GlowBadge variant="orange" size="sm" pulse icon={<Zap className="w-3.5 h-3.5 text-orange-400" />}>
              {ALL_MARKET_COINS.length} LIVE COINS
            </GlowBadge>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Real-time multi-asset market data spanning Layer 1 blockchains, AI compute tokens, meme ecosystems, and FinTech equities.
          </p>
        </div>

        {/* View Switcher & Search */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search coin symbol or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50"
            />
          </div>

          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'table' ? 'bg-orange-500 text-white shadow-glow-orange' : 'text-slate-400 hover:text-white'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid' ? 'bg-orange-500 text-white shadow-glow-orange' : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-glow-orange border border-orange-500/50'
                : 'bg-white/5 text-slate-400 border border-white/10 hover:text-slate-200 hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* TABLE VIEW */}
      {viewMode === 'table' ? (
        <GlassCard className="p-0 overflow-hidden border-white/10 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-mono uppercase text-slate-400 bg-white/[0.02]">
                  <th className="py-4 px-6 font-semibold">Rank & Coin</th>
                  <th className="py-4 px-4 font-semibold">Price</th>
                  <th className="py-4 px-4 font-semibold">24h Change</th>
                  <th className="py-4 px-4 font-semibold">7d Change</th>
                  <th className="py-4 px-4 font-semibold">Market Cap</th>
                  <th className="py-4 px-4 font-semibold">24h Volume</th>
                  <th className="py-4 px-4 font-semibold">Technical Signal</th>
                  <th className="py-4 px-6 text-right font-semibold">AI Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {filteredAssets.map((asset) => {
                  const isPositive24 = asset.change24h >= 0;
                  const isPositive7d = asset.change7d >= 0;

                  return (
                    <tr
                      key={asset.id}
                      onClick={() => setSelectedAsset(asset)}
                      className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-slate-500 text-xs w-6 text-right font-bold">
                            #{asset.rank}
                          </span>
                          <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center font-mono font-extrabold text-orange-400 group-hover:scale-105 transition-transform">
                            {asset.symbol.slice(0, 4)}
                          </div>
                          <div>
                            <div className="font-bold text-white flex items-center gap-2">
                              <span>{asset.name}</span>
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-slate-400 border border-white/5">
                                {asset.category}
                              </span>
                            </div>
                            <span className="text-[11px] font-mono text-slate-400">{asset.symbol}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 font-mono font-bold text-slate-100">
                        ${asset.price < 1 ? asset.price.toFixed(6) : asset.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>

                      <td className="py-4 px-4 font-mono font-semibold">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded ${
                            isPositive24
                              ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                              : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
                          }`}
                        >
                          {isPositive24 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {isPositive24 ? '+' : ''}
                          {asset.change24h.toFixed(2)}%
                        </span>
                      </td>

                      <td className="py-4 px-4 font-mono font-semibold">
                        <span className={isPositive7d ? 'text-emerald-400' : 'text-rose-400'}>
                          {isPositive7d ? '+' : ''}{asset.change7d.toFixed(2)}%
                        </span>
                      </td>

                      <td className="py-4 px-4 font-mono text-slate-300">{asset.marketCap}</td>
                      <td className="py-4 px-4 font-mono text-slate-300">{asset.volume24h}</td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5 text-[11px] font-mono">
                          <span className="text-orange-400 font-bold">RSI {asset.rsi}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-300">{asset.macd}</span>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAskAI(`What is the short-term price target and AI sentiment forecast for ${asset.name} (${asset.symbol})?`);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/15 hover:bg-orange-500/30 border border-orange-500/40 text-orange-300 font-medium transition-all text-xs shadow-glow-orange"
                        >
                          <Sparkles className="w-3 h-3 text-orange-400" />
                          <span>AI Audit</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => {
            const isPositive = asset.change24h >= 0;
            return (
              <GlassCard
                key={asset.id}
                onClick={() => setSelectedAsset(asset)}
                className="space-y-4 hover:border-orange-500/50 cursor-pointer group transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center font-mono font-extrabold text-orange-400 group-hover:scale-105 transition-transform">
                      {asset.symbol.slice(0, 4)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base group-hover:text-orange-400 transition-colors">
                        {asset.name}
                      </h3>
                      <span className="text-xs font-mono text-slate-400">{asset.symbol} • #{asset.rank}</span>
                    </div>
                  </div>
                  <GlowBadge variant="neutral" size="sm">{asset.category}</GlowBadge>
                </div>

                <div className="flex items-baseline justify-between pt-2 border-t border-white/5 font-mono">
                  <div className="text-2xl font-extrabold text-white">
                    ${asset.price < 1 ? asset.price.toFixed(6) : asset.price.toLocaleString()}
                  </div>
                  <div
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded ${
                      isPositive ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
                    }`}
                  >
                    {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {isPositive ? '+' : ''}
                    {asset.change24h.toFixed(2)}%
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-sans">
                  {asset.aiObservation}
                </p>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Cap: {asset.marketCap}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAskAI(`Analyze technical indicators for ${asset.name} (${asset.symbol}).`);
                    }}
                    className="text-orange-400 hover:text-white flex items-center gap-1 font-semibold"
                  >
                    <span>Ask AI</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

      {/* Asset Modal Detail */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-3xl glass-card rounded-2xl border-orange-500/40 overflow-hidden space-y-6 p-6 sm:p-8 animate-fadeIn max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center font-mono font-extrabold text-orange-400 text-lg">
                  {selectedAsset.symbol.slice(0, 4)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-extrabold text-white">{selectedAsset.name}</h3>
                    <GlowBadge variant="orange" size="sm">{selectedAsset.category}</GlowBadge>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span>Rank #{selectedAsset.rank}</span>
                    <span>•</span>
                    <span className="text-orange-400 font-bold">${selectedAsset.price.toLocaleString()}</span>
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

            {/* Timeframe Selector & Chart */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono text-slate-400 uppercase">Interactive Price Chart</div>
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10 text-xs font-mono">
                  {(['1D', '1W', '1M', '1Y'] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setChartTimeframe(tf)}
                      className={`px-2.5 py-1 rounded transition-all ${
                        chartTimeframe === tf ? 'bg-orange-500 text-white font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-64 w-full bg-[#050508] p-4 rounded-xl border border-white/10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedAsset.chartData}>
                    <defs>
                      <linearGradient id="colorCoin" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF8000" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#FF8000" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#64748B" fontSize={10} />
                    <YAxis stroke="#64748B" fontSize={10} domain={['auto', 'auto']} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0B0C12', borderColor: 'rgba(255,94,0,0.3)', borderRadius: '8px', color: '#FFF' }}
                    />
                    <Area type="monotone" dataKey="price" stroke="#FF8000" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCoin)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Technical Metric Cards */}
            <div className="grid grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-slate-400">Relative Strength (RSI)</div>
                <div className="text-base font-bold text-orange-400">{selectedAsset.rsi}</div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-slate-400">MACD Signal</div>
                <div className="text-base font-bold text-emerald-400">{selectedAsset.macd}</div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-slate-400">Market Valuation</div>
                <div className="text-base font-bold text-slate-100">{selectedAsset.marketCap}</div>
              </div>
            </div>

            {/* AI Observation Box */}
            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400">
                <Zap className="w-4 h-4" />
                <span>TRI-NODE AI OBSERVATION</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {selectedAsset.aiObservation}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedAsset(null)}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const query = `Provide a full technical breakdown, support/resistance levels, and risk audit for ${selectedAsset.name} (${selectedAsset.symbol}).`;
                  setSelectedAsset(null);
                  onAskAI(query);
                }}
                className="btn-primary px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Deep Ask AI About {selectedAsset.symbol}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
