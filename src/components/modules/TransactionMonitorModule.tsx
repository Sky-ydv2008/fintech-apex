import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Smartphone, 
  Clock, 
  Search, 
  Filter,
  X,
  Zap,
  ArrowRight
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { GlowBadge } from '../common/GlowBadge';

export interface TransactionLog {
  id: string;
  txHash: string;
  timestamp: string;
  userAccount: string;
  amount: number;
  asset: string;
  device: string;
  location: string;
  ipAddress: string;
  riskScore: number; // 0 to 100
  riskCategory: 'Normal' | 'Suspicious' | 'High Anomaly';
  aiRiskExplanation: string;
  flaggedRules: string[];
}

const mockTransactions: TransactionLog[] = [
  {
    id: 'tx-101',
    txHash: '0x94f8a...3b21',
    timestamp: '2 mins ago',
    userAccount: 'usr_89234',
    amount: 14500.0,
    asset: 'USDC',
    device: 'Chrome on MacOS (Zurich)',
    location: 'Zurich, Switzerland',
    ipAddress: '185.220.101.4',
    riskScore: 88,
    riskCategory: 'High Anomaly',
    aiRiskExplanation:
      'High Anomaly score of 88/100 triggered by geographic velocity anomaly. User IP logged in Tokyo, Japan 4 minutes prior. Additionally, the $14,500 transfer represents a 420% deviation from 30-day baseline average.',
    flaggedRules: [
      'Impossible Velocity (Tokyo -> Zurich in 4 mins)',
      'High Amount Deviation (+420%)',
      'Unrecognized Device Fingerprint',
    ],
  },
  {
    id: 'tx-102',
    txHash: '0x32e1b...90ac',
    timestamp: '8 mins ago',
    userAccount: 'usr_12049',
    amount: 1.5,
    asset: 'ETH',
    device: 'Mobile App (New York)',
    location: 'New York, USA',
    ipAddress: '68.192.44.12',
    riskScore: 12,
    riskCategory: 'Normal',
    aiRiskExplanation:
      'Transaction normal. Device fingerprint matches historical profile and transfer amount aligns with typical 30-day usage.',
    flaggedRules: [],
  },
  {
    id: 'tx-103',
    txHash: '0x77c4d...11ef',
    timestamp: '14 mins ago',
    userAccount: 'usr_66321',
    amount: 85.0,
    asset: 'SOL',
    device: 'Firefox on Linux (London)',
    location: 'London, UK',
    ipAddress: '82.165.22.9',
    riskScore: 62,
    riskCategory: 'Suspicious',
    aiRiskExplanation:
      'Suspicious score of 62/100 due to rapid burst of 6 consecutive transfers within 90 seconds from a new browser session.',
    flaggedRules: ['High Frequency Burst (6 tx / 90s)', 'New User Agent String'],
  },
  {
    id: 'tx-104',
    txHash: '0x12a99...44bb',
    timestamp: '22 mins ago',
    userAccount: 'usr_44012',
    amount: 0.25,
    asset: 'BTC',
    device: 'Chrome on Windows (Singapore)',
    location: 'Singapore',
    ipAddress: '118.200.12.88',
    riskScore: 18,
    riskCategory: 'Normal',
    aiRiskExplanation:
      'Transaction verified normal. Low risk score.',
    flaggedRules: [],
  },
];

interface TransactionMonitorProps {
  onAskAI: (query: string) => void;
}

export const TransactionMonitorModule: React.FC<TransactionMonitorProps> = ({ onAskAI }) => {
  const [transactions] = useState<TransactionLog[]>(mockTransactions);
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'High Anomaly' | 'Suspicious' | 'Normal'>('All');
  const [activeTx, setActiveTx] = useState<TransactionLog | null>(null);

  const filteredTxs = transactions.filter(
    (tx) => selectedFilter === 'All' || tx.riskCategory === selectedFilter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">ML Transaction Anomaly Monitor</h1>
            <GlowBadge variant="orange" size="sm" pulse icon={<ShieldAlert className="w-3.5 h-3.5" />}>
              ISOLATION FOREST ENGINE
            </GlowBadge>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Real-time machine learning anomaly scoring, geographic velocity tracking, and explainable risk reason synthesis.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
          {(['All', 'High Anomaly', 'Suspicious', 'Normal'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                selectedFilter === cat
                  ? 'bg-orange-500 text-white font-semibold shadow-glow-orange'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <GlassCard glow="orange">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Total Logs Processed</div>
          <div className="text-3xl font-extrabold text-white font-mono">1,420 Tx</div>
          <div className="text-[11px] text-slate-400 font-mono mt-2">Latency: 3.4ms</div>
        </GlassCard>

        <GlassCard>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Flagged High Anomalies</div>
          <div className="text-3xl font-extrabold text-rose-400 font-mono">1 Transaction</div>
          <div className="text-[11px] text-rose-400 font-mono mt-2 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Requires Human Audit</span>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Model Accuracy</div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">99.8%</div>
          <div className="text-[11px] text-slate-400 font-mono mt-2">Isolation Forest Vector</div>
        </GlassCard>
      </div>

      {/* Transactions Table */}
      <GlassCard className="p-0 overflow-hidden border-white/10">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Live Synthetic Transaction Stream</h3>
          <span className="text-xs font-mono text-slate-400">Node 2 Anomaly Classifier</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-mono uppercase text-slate-400 bg-white/[0.02]">
                <th className="py-3.5 px-6 font-semibold">Tx Hash / Timestamp</th>
                <th className="py-3.5 px-4 font-semibold">Account</th>
                <th className="py-3.5 px-4 font-semibold">Transfer Amount</th>
                <th className="py-3.5 px-4 font-semibold">Location / Device</th>
                <th className="py-3.5 px-4 font-semibold">ML Risk Score</th>
                <th className="py-3.5 px-6 text-right font-semibold">AI Risk Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {filteredTxs.map((tx) => {
                const isHighRisk = tx.riskScore > 70;
                const isSuspicious = tx.riskScore >= 30 && tx.riskScore <= 70;

                return (
                  <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-mono font-bold text-slate-100">{tx.txHash}</div>
                      <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-orange-400" />
                        <span>{tx.timestamp}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-mono text-slate-300">{tx.userAccount}</td>

                    <td className="py-4 px-4 font-mono font-bold text-white">
                      {tx.amount.toLocaleString()} {tx.asset}
                    </td>

                    <td className="py-4 px-4">
                      <div className="text-slate-200 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-orange-400" />
                        <span>{tx.location}</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mt-0.5">
                        <Smartphone className="w-3 h-3" />
                        <span>{tx.device}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-white/10 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isHighRisk
                                ? 'bg-rose-500'
                                : isSuspicious
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${tx.riskScore}%` }}
                          />
                        </div>
                        <span
                          className={`font-mono font-bold ${
                            isHighRisk
                              ? 'text-rose-400'
                              : isSuspicious
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          {tx.riskScore}/100
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setActiveTx(tx)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                          isHighRisk
                            ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:border-orange-500/40 hover:text-white'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                        <span>Explain Anomaly</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* AI Explanation Drawer Modal */}
      {activeTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl glass-card rounded-2xl border-orange-500/30 p-6 sm:p-8 space-y-6 animate-fadeIn">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Tri-Node AI Anomaly Explanation</h3>
                  <span className="text-xs font-mono text-slate-400">Tx: {activeTx.txHash}</span>
                </div>
              </div>
              <button onClick={() => setActiveTx(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <div className="text-xs font-mono text-slate-400">Risk Level Category:</div>
                  <div className="text-lg font-bold text-white">{activeTx.riskCategory}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-slate-400">Isolation Forest Score:</div>
                  <div className="text-2xl font-extrabold text-orange-400 font-mono">{activeTx.riskScore} / 100</div>
                </div>
              </div>

              {/* AI Explanation Text */}
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 space-y-2">
                <div className="text-xs font-mono font-bold text-orange-400">HUMAN-READABLE RISK REASON:</div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {activeTx.aiRiskExplanation}
                </p>
              </div>

              {/* Flagged Features */}
              {activeTx.flaggedRules.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
                    Flagged Features & Anomalous Vectors:
                  </div>
                  <ul className="space-y-2">
                    {activeTx.flaggedRules.map((rule, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-rose-300 font-mono bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setActiveTx(null)}
                className="px-4 py-2 rounded-xl bg-white/5 text-xs text-slate-300 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const query = `Provide a full risk audit and security recommendation for transaction ${activeTx.txHash} with risk score ${activeTx.riskScore}/100.`;
                  setActiveTx(null);
                  onAskAI(query);
                }}
                className="btn-primary px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Deep Security Audit in AI Studio</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
