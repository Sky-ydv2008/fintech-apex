import React from 'react';
import { ShieldCheck, Cpu, Database, Activity, Lock, Terminal, Github, ExternalLink } from 'lucide-react';
import { GlowBadge } from '../common/GlowBadge';
import { ActiveTab } from './Navbar';

interface FooterProps {
  onSelectTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="w-full bg-[#030305] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      {/* Glow ambient circle background */}
      <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-[800px] h-[300px] bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500 shadow-glow-orange text-white font-mono font-bold text-sm">
                3N
              </div>
              <span className="font-extrabold text-lg text-white font-sans tracking-tight">
                TRI<span className="text-orange-500">-</span>NODE
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Three nodes. One intelligent financial ecosystem. AI-driven cryptocurrency and fintech intelligence platform engineered for real-time clarity.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <GlowBadge variant="orange" pulse size="sm">
                SYSTEM NOMINAL
              </GlowBadge>
              <span className="text-xs font-mono text-slate-500">v2.4.0-prod</span>
            </div>
          </div>

          {/* Architecture Nodes */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-4 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-orange-400" />
              TRI-NODE ARCHITECTURE
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-sans">
              <li className="flex items-center gap-2">
                <Database className="w-3 h-3 text-orange-400" />
                <span><strong className="text-slate-200">NODE 1: DATA</strong> — Real-time price, market & news streams</span>
              </li>
              <li className="flex items-center gap-2">
                <Cpu className="w-3 h-3 text-orange-400" />
                <span><strong className="text-slate-200">NODE 2: AI</strong> — Contextual LLM & Anomaly Isolation</span>
              </li>
              <li className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-orange-400" />
                <span><strong className="text-slate-200">NODE 3: USER</strong> — Actionable dashboards & portfolio risk</span>
              </li>
            </ul>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-4">
              INTELLIGENCE MODULES
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onSelectTab('markets')} className="hover:text-orange-400 transition-colors">
                  Market Explorer & Interactive Charts
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('ai-chat')} className="hover:text-orange-400 transition-colors">
                  Contextual AI Market Assistant
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('portfolio')} className="hover:text-orange-400 transition-colors">
                  Portfolio Tracker & AI Insights
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('news')} className="hover:text-orange-400 transition-colors">
                  News Feed & AI Sentiment Classifier
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('transactions')} className="hover:text-orange-400 transition-colors">
                  Transaction ML Anomaly Monitor
                </button>
              </li>
            </ul>
          </div>

          {/* Security & GitHub */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-4 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              SECURITY & REPOSITORY
            </h4>
            <div className="space-y-3">
              <a
                href="https://github.com/Sky-ydv2008/fintech-apex"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-orange-500/40 text-xs text-slate-200 hover:text-white transition-all w-full"
              >
                <Github className="w-4 h-4 text-orange-400" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
              </a>
              <div className="p-3 rounded-lg bg-[#080910] border border-white/5 text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1 text-slate-300 font-semibold">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>Zero Key Exposure</span>
                </div>
                <p className="text-[10px] leading-normal">
                  All LLM credentials and sensitive APIs remain protected server-side behind REST endpoints.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© 2026 Tri-Node Platform. Prepared for Team Tri-Node.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400">Informational AI output • Not financial advice</span>
            <span>•</span>
            <span className="text-orange-400 font-semibold">Ready for Vercel & Render</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
