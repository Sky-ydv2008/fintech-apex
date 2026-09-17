import React from 'react';
import { 
  LineChart, 
  Activity, 
  Sparkles, 
  BarChart2, 
  Gauge, 
  Globe, 
  Zap, 
  CheckCircle2
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { GlowBadge } from '../common/GlowBadge';

const correlationMatrix = {
  assets: ['BTC', 'ETH', 'SOL', 'NVDA', 'AAPL'],
  values: [
    [1.00, 0.88, 0.76, 0.42, 0.28],
    [0.88, 1.00, 0.81, 0.38, 0.25],
    [0.76, 0.81, 1.00, 0.45, 0.30],
    [0.42, 0.38, 0.45, 1.00, 0.64],
    [0.28, 0.25, 0.30, 0.64, 1.00],
  ],
};

const getHeatmapBg = (val: number) => {
  if (val === 1.0) return 'bg-orange-500/30 text-white font-bold border-orange-500/50';
  if (val >= 0.8) return 'bg-orange-500/20 text-orange-200 font-semibold border-orange-500/30';
  if (val >= 0.5) return 'bg-orange-500/10 text-slate-200 border-orange-500/20';
  return 'bg-white/5 text-slate-400 border-white/5';
};

interface AnalyticsModuleProps {
  onAskAI: (query: string) => void;
}

export const AnalyticsModule: React.FC<AnalyticsModuleProps> = ({ onAskAI }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Advanced Financial Analytics</h1>
            <GlowBadge variant="orange" size="sm" pulse>NODE 1 + NODE 2 DEEP METRICS</GlowBadge>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Asset correlation matrices, 30-day volatility indexes, Sharpe ratios, and macro liquidity indicators.
          </p>
        </div>

        <button
          onClick={() => onAskAI("Analyze current cross-asset correlations between Bitcoin and NVIDIA. Is tech equity risk spilling into crypto?")}
          className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-glow-orange"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Ask AI About Correlation Risk</span>
        </button>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard glow="orange">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Crypto Fear & Greed</div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">78 / 100</div>
          <div className="text-[11px] text-slate-400 font-mono mt-2">Extreme Greed Sentiment</div>
        </GlassCard>

        <GlassCard>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">30-Day Volatility (BTC)</div>
          <div className="text-3xl font-extrabold text-orange-400 font-mono">42.8%</div>
          <div className="text-[11px] text-slate-400 font-mono mt-2">Moderate Volatility Band</div>
        </GlassCard>

        <GlassCard>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Sharpe Ratio (Portfolio)</div>
          <div className="text-3xl font-extrabold text-white font-mono">2.14</div>
          <div className="text-[11px] text-emerald-400 font-mono mt-2">Strong Risk-Adjusted Return</div>
        </GlassCard>

        <GlassCard>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">DXY Dollar Index</div>
          <div className="text-3xl font-extrabold text-slate-200 font-mono">102.45</div>
          <div className="text-[11px] text-rose-400 font-mono mt-2">-0.35% Softening Trend</div>
        </GlassCard>
      </div>

      {/* Correlation Matrix & AI Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Heatmap Grid */}
        <GlassCard className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-orange-400" />
              Cross-Asset Correlation Matrix (30D)
            </h3>
            <span className="text-xs text-slate-400 font-mono">Pearson Coefficient</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse text-xs font-mono">
              <thead>
                <tr>
                  <th className="p-3 text-slate-400"></th>
                  {correlationMatrix.assets.map((asset) => (
                    <th key={asset} className="p-3 text-white font-bold">{asset}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {correlationMatrix.assets.map((rowAsset, rowIdx) => (
                  <tr key={rowAsset}>
                    <td className="p-3 font-bold text-white text-left">{rowAsset}</td>
                    {correlationMatrix.values[rowIdx].map((val, colIdx) => (
                      <td key={colIdx} className="p-2">
                        <div className={`p-2.5 rounded-lg border transition-all ${getHeatmapBg(val)}`}>
                          {val.toFixed(2)}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-[11px] text-slate-400 font-mono pt-2 border-t border-white/5 flex items-center justify-between">
            <span>1.00 = Perfect Positive Correlation</span>
            <span className="text-orange-400">0.42 = Tech-to-Crypto Spillover</span>
          </div>
        </GlassCard>

        {/* AI Correlation Commentary */}
        <GlassCard glow="orange" className="lg:col-span-5 space-y-4 bg-orange-500/5 border-orange-500/30">
          <div className="flex items-center justify-between border-b border-orange-500/20 pb-3">
            <div className="flex items-center gap-2 text-orange-400 font-bold font-mono text-xs">
              <Zap className="w-4 h-4" />
              <span>TRI-NODE AI ANALYTICS OBSERVATION</span>
            </div>
            <GlowBadge variant="orange" size="sm">LIVE SYNTHESIS</GlowBadge>
          </div>

          <div className="space-y-3 text-xs text-slate-200 leading-relaxed font-sans">
            <p>
              • <strong className="text-white">Crypto High Inter-Correlation:</strong> BTC, ETH, and SOL demonstrate strong co-movement (0.76 to 0.88), indicating macro-driven liquidity inflows rather than asset-specific divergence.
            </p>
            <p>
              • <strong className="text-white">TradFi Tech Spillover:</strong> NVDA shows a moderate positive correlation (0.42) with Bitcoin, reflecting joint sensitivity to global risk-on market sentiment and liquidity expansion.
            </p>
            <p>
              • <strong className="text-white">Portfolio Optimization Suggestion:</strong> Allocating to uncorrelated store-of-value instruments can reduce 30-day drawdown probability by 18%.
            </p>
          </div>

          <div className="pt-4 border-t border-orange-500/20 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Calculated via Node 1 feeds
            </span>
            <span>Refreshed: Live</span>
          </div>
        </GlassCard>

      </div>

    </div>
  );
};
