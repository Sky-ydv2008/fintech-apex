import React, { useState } from 'react';
import { 
  BarChart2, 
  Bot, 
  PieChart, 
  Bookmark, 
  Newspaper, 
  ShieldAlert, 
  LineChart, 
  Sparkles, 
  User, 
  Menu, 
  X,
  Zap
} from 'lucide-react';
import { GlowBadge } from '../common/GlowBadge';

export type ActiveTab = 
  | 'landing' 
  | 'markets' 
  | 'ai-chat' 
  | 'portfolio' 
  | 'watchlist' 
  | 'news' 
  | 'analytics' 
  | 'transactions';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenAuthModal: () => void;
  user: { name: string; email: string } | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuthModal,
  user,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'landing', label: 'Home', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'markets', label: 'Markets', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'ai-chat', label: 'AI Assistant', icon: <Bot className="w-4 h-4" />, badge: 'AI 2.0' },
    { id: 'portfolio', label: 'Portfolio', icon: <PieChart className="w-4 h-4" /> },
    { id: 'watchlist', label: 'Watchlist', icon: <Bookmark className="w-4 h-4" /> },
    { id: 'news', label: 'News AI', icon: <Newspaper className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <LineChart className="w-4 h-4" /> },
    { id: 'transactions', label: 'Anomaly ML', icon: <ShieldAlert className="w-4 h-4" />, badge: 'LIVE' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050508]/85 backdrop-blur-xl border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 shadow-[0_0_20px_rgba(255,94,0,0.4)] group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-mono font-extrabold text-lg">3N</span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping opacity-75" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                  TRI<span className="text-orange-500 font-light">-</span>NODE
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider">
                DATA • AI • USER
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 glass-card border border-white/5 py-1.5 px-2 rounded-full">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/40 shadow-[0_0_15px_rgba(255,94,0,0.2)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <span className={isActive ? 'text-orange-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-orange-500/20 text-orange-300 font-mono">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden sm:flex items-center gap-3">
            <GlowBadge variant="orange" pulse icon={<Zap className="w-3 h-3 text-orange-400" />}>
              AI CORE 2.4 ONLINE
            </GlowBadge>

            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/40 text-slate-200 transition-all shadow-sm"
            >
              <User className="w-3.5 h-3.5 text-orange-400" />
              <span>{user ? user.name : 'Sign In'}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#080910]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
                activeTab === item.id
                  ? 'bg-orange-500/20 text-white border border-orange-500/40'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-xs px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 font-mono">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <GlowBadge variant="orange" pulse>
              AI ONLINE
            </GlowBadge>
            <button
              onClick={() => {
                onOpenAuthModal();
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-orange-500 text-white shadow-glow-orange"
            >
              {user ? user.name : 'Sign In / Register'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
