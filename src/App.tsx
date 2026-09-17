import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/navigation/Navbar';
import { Footer } from './components/navigation/Footer';
import { MarketTicker } from './components/common/MarketTicker';
import { LandingPage } from './components/landing/LandingPage';
import { MarketsModule } from './components/modules/MarketsModule';
import { AIAssistantModule } from './components/modules/AIAssistantModule';
import { PortfolioModule } from './components/modules/PortfolioModule';
import { WatchlistModule } from './components/modules/WatchlistModule';
import { NewsModule } from './components/modules/NewsModule';
import { AnalyticsModule } from './components/modules/AnalyticsModule';
import { TransactionMonitorModule } from './components/modules/TransactionMonitorModule';
import { AuthModal } from './components/auth/AuthModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');
  const [aiPrompt, setAiPrompt] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<{ name: string; email: string } | null>({
    name: 'Team Tri-Node',
    email: 'admin@trinode.ai',
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleAskAI = (query: string) => {
    setAiPrompt(query);
    setActiveTab('ai-chat');
  };

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 font-sans flex flex-col justify-between selection:bg-orange-500/30 selection:text-orange-300">
      
      <div>
        {/* Top Scrolling Live Ticker */}
        <MarketTicker />

        {/* Sticky Header Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            if (tab !== 'ai-chat') setAiPrompt(undefined);
            setActiveTab(tab);
          }}
          onOpenAuthModal={() => setIsAuthOpen(true)}
          user={user}
        />

        {/* Main Content Render Area */}
        <main className="transition-all duration-300">
          {activeTab === 'landing' && <LandingPage onNavigate={setActiveTab} />}
          {activeTab === 'markets' && <MarketsModule onAskAI={handleAskAI} onNavigate={setActiveTab} />}
          {activeTab === 'ai-chat' && <AIAssistantModule initialPrompt={aiPrompt} />}
          {activeTab === 'portfolio' && <PortfolioModule />}
          {activeTab === 'watchlist' && <WatchlistModule onAskAI={handleAskAI} />}
          {activeTab === 'news' && <NewsModule onAskAI={handleAskAI} />}
          {activeTab === 'analytics' && <AnalyticsModule onAskAI={handleAskAI} />}
          {activeTab === 'transactions' && <TransactionMonitorModule onAskAI={handleAskAI} />}
        </main>
      </div>

      {/* Footer */}
      <Footer onSelectTab={setActiveTab} />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={user}
        onLoginSuccess={(u) => setUser(u)}
        onLogout={() => setUser(null)}
      />

    </div>
  );
};
export default App;
