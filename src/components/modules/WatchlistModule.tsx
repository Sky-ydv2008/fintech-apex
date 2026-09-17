import React, { useState } from 'react';
import { 
  Bookmark, 
  TrendingUp, 
  TrendingDown, 
  Bell, 
  Sparkles, 
  Plus, 
  Trash2, 
  X,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { GlowBadge } from '../common/GlowBadge';

export interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  alertHigh?: number;
  alertLow?: number;
  aiSentiment: 'Bullish' | 'Bearish' | 'Neutral';
}

const initialWatchlist: WatchlistItem[] = [
  { id: 'w1', symbol: 'BTC', name: 'Bitcoin', price: 92450.25, change24h: 3.42, alertHigh: 95000, alertLow: 88000, aiSentiment: 'Bullish' },
  { id: 'w2', symbol: 'ETH', name: 'Ethereum', price: 3480.10, change24h: 2.15, alertHigh: 3600, alertLow: 3300, aiSentiment: 'Bullish' },
  { id: 'w3', symbol: 'SOL', name: 'Solana', price: 194.75, change24h: 8.64, alertHigh: 210, alertLow: 175, aiSentiment: 'Bullish' },
  { id: 'w4', symbol: 'NVDA', name: 'NVIDIA Corp', price: 142.80, change24h: 4.12, alertHigh: 150, alertLow: 135, aiSentiment: 'Bullish' },
  { id: 'w5', symbol: 'AVAX', name: 'Avalanche', price: 38.60, change24h: -1.82, alertHigh: 42, alertLow: 35, aiSentiment: 'Neutral' },
];

interface WatchlistModuleProps {
  onAskAI: (query: string) => void;
}

export const WatchlistModule: React.FC<WatchlistModuleProps> = ({ onAskAI }) => {
  const [items, setItems] = useState<WatchlistItem[]>(initialWatchlist);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSymbol, setNewSymbol] = useState('');
  const [newName, setNewName] = useState('');
  const [alertNotice, setAlertNotice] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSymbol) return;

    const newItem: WatchlistItem = {
      id: `w-${Date.now()}`,
      symbol: newSymbol.toUpperCase(),
      name: newName || newSymbol.toUpperCase(),
      price: 150.0,
      change24h: 1.2,
      aiSentiment: 'Neutral',
    };

    setItems((prev) => [...prev, newItem]);
    setShowAddModal(false);
    setNewSymbol('');
    setNewName('');
  };

  const handleSetAlert = (symbol: string) => {
    setAlertNotice(`Alert set successfully for ${symbol}! You will be notified when target price is breached.`);
    setTimeout(() => setAlertNotice(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Saved Watchlist & Alerts</h1>
            <GlowBadge variant="orange" size="sm" pulse>NODE 3 ALERTS</GlowBadge>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Track key assets and configure AI alert triggers for price movements.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-glow-orange"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add Asset to Watchlist</span>
        </button>
      </div>

      {/* Alert Notification Toast */}
      {alertNotice && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          <span>{alertNotice}</span>
        </div>
      )}

      {/* Watchlist Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => {
          const isPositive = item.change24h >= 0;
          return (
            <GlassCard key={item.id} className="space-y-4 hover:border-orange-500/40 transition-all">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center font-mono font-bold text-orange-400">
                    {item.symbol}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{item.name}</h3>
                    <span className="text-xs font-mono text-slate-400">{item.symbol}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline justify-between pt-2 border-t border-white/5">
                <div className="text-2xl font-extrabold text-white font-mono">
                  ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div
                  className={`inline-flex items-center gap-1 text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    isPositive ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
                  }`}
                >
                  {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {isPositive ? '+' : ''}
                  {item.change24h.toFixed(2)}%
                </div>
              </div>

              {/* Alert Bounds */}
              <div className="p-3 rounded-xl bg-[#050508] border border-white/5 space-y-1.5 text-xs font-mono text-slate-400">
                <div className="flex items-center justify-between">
                  <span>Target Upper Alert:</span>
                  <span className="text-orange-300 font-bold">${item.alertHigh?.toLocaleString() || 'Not set'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Target Lower Alert:</span>
                  <span className="text-slate-300">${item.alertLow?.toLocaleString() || 'Not set'}</span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-2 flex items-center justify-between gap-2">
                <GlowBadge variant={item.aiSentiment === 'Bullish' ? 'green' : 'neutral'} size="sm">
                  {item.aiSentiment} Sentiment
                </GlowBadge>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSetAlert(item.symbol)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-orange-400 transition-colors"
                    title="Configure alert triggers"
                  >
                    <Bell className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onAskAI(`What is the sentiment and short-term price forecast for ${item.name} (${item.symbol})?`)}
                    className="px-3 py-1.5 rounded-lg bg-orange-500/15 hover:bg-orange-500/30 border border-orange-500/30 text-orange-300 text-xs font-medium flex items-center gap-1 transition-all"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>AI Insights</span>
                  </button>
                </div>
              </div>

            </GlassCard>
          );
        })}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md glass-card rounded-2xl border-orange-500/30 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">Add Asset to Watchlist</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Ticker Symbol</label>
                <input
                  type="text"
                  placeholder="e.g. SOL, TSLA, AVAX"
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white uppercase focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Full Asset Name</label>
                <input
                  type="text"
                  placeholder="e.g. Solana, Tesla Inc"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-5 py-2 rounded-xl text-xs font-semibold"
                >
                  Add to Watchlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
