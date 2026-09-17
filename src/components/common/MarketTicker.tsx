import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface TickerItem {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  type: 'crypto' | 'fintech';
}

const mockTickerItems: TickerItem[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 92450.25, change24h: 3.42, type: 'crypto' },
  { symbol: 'ETH', name: 'Ethereum', price: 3480.10, change24h: 2.15, type: 'crypto' },
  { symbol: 'SOL', name: 'Solana', price: 194.75, change24h: 8.64, type: 'crypto' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 142.80, change24h: 4.12, type: 'fintech' },
  { symbol: 'AAPL', name: 'Apple Inc', price: 235.40, change24h: -0.65, type: 'fintech' },
  { symbol: 'MSFT', name: 'Microsoft', price: 448.90, change24h: 1.28, type: 'fintech' },
  { symbol: 'AVAX', name: 'Avalanche', price: 38.60, change24h: -1.82, type: 'crypto' },
  { symbol: 'TSLA', name: 'Tesla Inc', price: 245.15, change24h: 5.78, type: 'fintech' },
];

export const MarketTicker: React.FC = () => {
  // Duplicate list to create seamless infinite scroll loop
  const displayItems = [...mockTickerItems, ...mockTickerItems];

  return (
    <div className="w-full bg-[#08090F]/90 border-y border-white/5 py-2.5 overflow-hidden whitespace-nowrap backdrop-blur-md relative z-20">
      <div className="inline-flex animate-ticker hover:[animation-play-state:paused]">
        {displayItems.map((item, idx) => {
          const isPositive = item.change24h >= 0;
          return (
            <div
              key={`${item.symbol}-${idx}`}
              className="inline-flex items-center gap-2.5 px-6 border-r border-white/5 text-xs font-mono"
            >
              <span className="font-bold text-slate-200">{item.symbol}</span>
              <span className="text-slate-400">
                ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span
                className={`inline-flex items-center gap-0.5 font-medium px-1.5 py-0.5 rounded ${
                  isPositive
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-rose-400 bg-rose-500/10'
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {isPositive ? '+' : ''}
                {item.change24h.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
