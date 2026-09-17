import React from 'react';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { ALL_MARKET_COINS, ExtendedAsset } from '../../services/marketApi';

interface MarketTickerProps {
  onSelectCoin?: (symbol: string) => void;
}

export const MarketTicker: React.FC<MarketTickerProps> = ({ onSelectCoin }) => {
  // Use all top market coins for continuous ticker
  const tickerCoins = ALL_MARKET_COINS.slice(0, 15);
  const displayItems = [...tickerCoins, ...tickerCoins];

  return (
    <div className="w-full bg-[#06070C]/95 border-b border-orange-500/20 py-2.5 overflow-hidden whitespace-nowrap backdrop-blur-xl relative z-30 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
      <div className="flex items-center">
        
        {/* Ticker Tag */}
        <div className="hidden sm:flex items-center gap-1.5 px-4 text-[11px] font-mono font-bold text-orange-400 bg-orange-500/10 border-r border-white/10 shrink-0 z-10">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-orange-400" />
          <span>LIVE MARKETS NODE 1</span>
        </div>

        {/* Ticker Track */}
        <div className="inline-flex animate-ticker hover:[animation-play-state:paused]">
          {displayItems.map((item, idx) => {
            const isPositive = item.change24h >= 0;
            return (
              <div
                key={`${item.symbol}-${idx}`}
                onClick={() => onSelectCoin?.(item.symbol)}
                className="inline-flex items-center gap-3 px-6 border-r border-white/5 text-xs font-mono cursor-pointer hover:bg-white/5 transition-colors py-0.5"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-100">{item.symbol}</span>
                  <span className="text-[10px] text-slate-500 font-sans">{item.name}</span>
                </div>

                <span className="text-slate-300 font-bold">
                  ${item.price < 1 ? item.price.toFixed(6) : item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>

                <span
                  className={`inline-flex items-center gap-0.5 font-bold px-1.5 py-0.2 rounded text-[11px] ${
                    isPositive
                      ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                      : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
                  }`}
                >
                  {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {isPositive ? '+' : ''}
                  {item.change24h.toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
