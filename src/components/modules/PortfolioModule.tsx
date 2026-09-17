import React, { useState } from 'react';
import { 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Sparkles, 
  ShieldAlert, 
  DollarSign, 
  Percent, 
  Trash2, 
  X,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis
} from 'recharts';
import { GlassCard } from '../common/GlassCard';
import { GlowBadge } from '../common/GlowBadge';
import { AnimatedCounter } from '../common/AnimatedCounter';

export interface PortfolioHolding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  avgCost: number;
  currentPrice: number;
  type: 'crypto' | 'fintech';
}

const initialHoldings: PortfolioHolding[] = [
  { id: '1', symbol: 'BTC', name: 'Bitcoin', quantity: 1.25, avgCost: 78200.0, currentPrice: 92450.25, type: 'crypto' },
  { id: '2', symbol: 'ETH', name: 'Ethereum', quantity: 8.5, avgCost: 3100.0, currentPrice: 3480.10, type: 'crypto' },
  { id: '3', symbol: 'SOL', name: 'Solana', quantity: 45.0, avgCost: 145.0, currentPrice: 194.75, type: 'crypto' },
  { id: '4', symbol: 'NVDA', name: 'NVIDIA Corp', quantity: 120.0, avgCost: 115.0, currentPrice: 142.80, type: 'fintech' },
  { id: '5', symbol: 'AAPL', name: 'Apple Inc', quantity: 60.0, avgCost: 210.0, currentPrice: 235.40, type: 'fintech' },
];

const COLORS = ['#FF8000', '#FF5E00', '#FF3300', '#00F0FF', '#10B981', '#8B5CF6'];

export const PortfolioModule: React.FC = () => {
  const [holdings, setHoldings] = useState<PortfolioHolding[]>(initialHoldings);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSymbol, setNewSymbol] = useState('SOL');
  const [newName, setNewName] = useState('Solana');
  const [newQuantity, setNewQuantity] = useState('10');
  const [newAvgCost, setNewAvgCost] = useState('180');
  const [newPrice, setNewPrice] = useState('194.75');

  const [aiReport, setAiReport] = useState<string | null>(null);
  const [isGeneratingAudit, setIsGeneratingAudit] = useState(false);

  // Calculate totals
  const totalValue = holdings.reduce((sum, h) => sum + h.quantity * h.currentPrice, 0);
  const totalCost = holdings.reduce((sum, h) => sum + h.quantity * h.avgCost, 0);
  const totalProfitLoss = totalValue - totalCost;
  const totalProfitLossPercent = totalCost > 0 ? (totalProfitLoss / totalCost) * 10 : 0;

  // Chart data
  const pieData = holdings.map((h) => ({
    name: h.symbol,
    value: h.quantity * h.currentPrice,
  }));

  const historicalData = [
    { month: 'Jan', value: totalValue * 0.72 },
    { month: 'Feb', value: totalValue * 0.78 },
    { month: 'Mar', value: totalValue * 0.85 },
    { month: 'Apr', value: totalValue * 0.82 },
    { month: 'May', value: totalValue * 0.94 },
    { month: 'Current', value: totalValue },
  ];

  const handleAddHolding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSymbol || !newQuantity || !newAvgCost) return;

    const newH: PortfolioHolding = {
      id: `h-${Date.now()}`,
      symbol: newSymbol.toUpperCase(),
      name: newName || newSymbol.toUpperCase(),
      quantity: parseFloat(newQuantity),
      avgCost: parseFloat(newAvgCost),
      currentPrice: parseFloat(newPrice) || parseFloat(newAvgCost),
      type: 'crypto',
    };

    setHoldings((prev) => [...prev, newH]);
    setShowAddModal(false);
  };

  const handleRemoveHolding = (id: string) => {
    setHoldings((prev) => prev.filter((h) => h.id !== id));
  };

  const handleRunAIAudit = () => {
    setIsGeneratingAudit(true);
    setAiReport(null);

    setTimeout(() => {
      const cryptoPercentage = (
        (holdings.filter((h) => h.type === 'crypto').reduce((sum, h) => sum + h.quantity * h.currentPrice, 0) /
          totalValue) *
        100
      ).toFixed(1);

      const btcAllocation = (
        ((holdings.find((h) => h.symbol === 'BTC')?.quantity || 0) * (holdings.find((h) => h.symbol === 'BTC')?.currentPrice || 0) /
          totalValue) *
        100
      ).toFixed(1);

      setAiReport(
        `**Tri-Node AI Portfolio Intelligence Audit Report:**\n\n` +
        `• **Portfolio Total Valuation:** $${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}\n` +
        `• **Total Net Profit/Loss:** +$${totalProfitLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })} (+${totalProfitLossPercent.toFixed(2)}%)\n` +
        `• **Asset Concentration Risk:** High concentration in Crypto assets (${cryptoPercentage}% of total liquidity). Bitcoin represents ${btcAllocation}% of portfolio value.\n` +
        `• **Volatility Index (Beta):** Estimated portfolio Beta is 1.42 relative to S&P500 benchmark.\n` +
        `• **Key Observations:** Strong unrealized gains driven by BTC ETF inflows and NVDA quarterly revenue growth. Consider rebalancing 10% into stable store of value to mitigate short-term drawdowns.`
      );
      setIsGeneratingAudit(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Portfolio Intelligence</h1>
            <GlowBadge variant="orange" size="sm" pulse>NODE 3 USER DASHBOARD</GlowBadge>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Real-time value calculation, profit/loss metrics, asset breakdown, and AI risk analysis.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunAIAudit}
            disabled={isGeneratingAudit}
            className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-glow-orange disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>{isGeneratingAudit ? 'Running AI Audit...' : 'Run AI Risk Audit'}</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="btn-secondary px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-orange-400" />
            <span>Add Holding</span>
          </button>
        </div>
      </div>

      {/* Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard glow="orange">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Total Portfolio Value</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            $<AnimatedCounter value={totalValue} decimals={2} />
          </div>
          <div className="text-[11px] text-emerald-400 font-mono mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>24h Gain: +$4,210.80 (+3.04%)</span>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Unrealized Profit / Loss</div>
          <div className={`text-2xl sm:text-3xl font-extrabold font-mono ${totalProfitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {totalProfitLoss >= 0 ? '+' : ''}${totalProfitLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-2">
            Return: {totalProfitLossPercent >= 0 ? '+' : ''}{totalProfitLossPercent.toFixed(2)}%
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Total Cost Basis</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-200 font-mono">
            ${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-2">5 Managed Assets</div>
        </GlassCard>

        <GlassCard>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">AI Risk Assessment</div>
          <div className="text-xl font-extrabold text-orange-400 font-mono flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-orange-400" />
            <span>MODERATE (64%)</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-2">Concentration in Crypto Assets</div>
        </GlassCard>
      </div>

      {/* AI Report Box */}
      {aiReport && (
        <GlassCard glow="orange" className="border-orange-500/40 p-6 space-y-3 bg-orange-500/5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-orange-500/20 pb-3">
            <div className="flex items-center gap-2 text-orange-400 font-bold font-mono text-sm">
              <Zap className="w-4 h-4" />
              <span>TRI-NODE AI PORTFOLIO AUDIT REPORT</span>
            </div>
            <GlowBadge variant="green" size="sm">VERIFIED AI SYNTHESIS</GlowBadge>
          </div>
          <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line">
            {aiReport}
          </div>
        </GlassCard>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Asset Allocation Donut Chart */}
        <GlassCard className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Asset Allocation</h3>
            <span className="text-xs text-slate-400 font-mono">5 Assets</span>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0.5)" />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number) => `$${val.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                  contentStyle={{ backgroundColor: '#0B0C12', borderColor: 'rgba(255,94,0,0.3)', borderRadius: '8px', color: '#FFF' }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-300">
            {pieData.map((d, idx) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                <span>{d.name}: {((d.value / totalValue) * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Portfolio Growth Chart */}
        <GlassCard className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Historical Growth</h3>
            <span className="text-xs text-emerald-400 font-mono font-semibold">+38.8% YTD</span>
          </div>
          <div className="h-64 w-full bg-[#050508] p-4 rounded-xl border border-white/10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5E00" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FF5E00" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} domain={['auto', 'auto']} />
                <Tooltip
                  formatter={(val: number) => `$${val.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                  contentStyle={{ backgroundColor: '#0B0C12', borderColor: 'rgba(255,94,0,0.3)', borderRadius: '8px', color: '#FFF' }}
                />
                <Area type="monotone" dataKey="value" stroke="#FF5E00" strokeWidth={2.5} fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

      </div>

      {/* Holdings Table */}
      <GlassCard className="p-0 overflow-hidden border-white/10">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Your Holdings</h3>
          <span className="text-xs text-slate-400 font-mono">{holdings.length} Assets Logged</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-mono uppercase text-slate-400 bg-white/[0.02]">
                <th className="py-3.5 px-6 font-semibold">Asset</th>
                <th className="py-3.5 px-4 font-semibold">Holdings Quantity</th>
                <th className="py-3.5 px-4 font-semibold">Avg Buy Price</th>
                <th className="py-3.5 px-4 font-semibold">Current Price</th>
                <th className="py-3.5 px-4 font-semibold">Total Value</th>
                <th className="py-3.5 px-4 font-semibold">P / L</th>
                <th className="py-3.5 px-6 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {holdings.map((h) => {
                const holdingValue = h.quantity * h.currentPrice;
                const holdingCost = h.quantity * h.avgCost;
                const profitLoss = holdingValue - holdingCost;
                const profitLossPct = (profitLoss / holdingCost) * 100;
                const isPositive = profitLoss >= 0;

                return (
                  <tr key={h.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center font-mono font-bold text-orange-400">
                          {h.symbol}
                        </div>
                        <div>
                          <div className="font-bold text-white">{h.name}</div>
                          <div className="text-[11px] font-mono text-slate-400">{h.symbol}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-mono text-slate-200">{h.quantity}</td>
                    <td className="py-4 px-4 font-mono text-slate-300">${h.avgCost.toLocaleString()}</td>
                    <td className="py-4 px-4 font-mono font-semibold text-slate-100">${h.currentPrice.toLocaleString()}</td>

                    <td className="py-4 px-4 font-mono font-bold text-white">
                      ${holdingValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-4 px-4 font-mono font-semibold">
                      <span className={isPositive ? 'text-emerald-400' : 'text-rose-400'}>
                        {isPositive ? '+' : ''}${profitLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })} ({isPositive ? '+' : ''}{profitLossPct.toFixed(2)}%)
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleRemoveHolding(h.id)}
                        className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                        title="Remove holding"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Add Holding Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md glass-card rounded-2xl border-orange-500/30 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">Add New Holding</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddHolding} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Asset Symbol</label>
                <input
                  type="text"
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white uppercase focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Asset Full Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Quantity</label>
                <input
                  type="number"
                  step="any"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Average Purchase Price ($)</label>
                <input
                  type="number"
                  step="any"
                  value={newAvgCost}
                  onChange={(e) => setNewAvgCost(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500"
                  required
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
                  Save Holding
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
