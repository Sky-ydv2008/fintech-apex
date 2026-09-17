# TRI-NODE • AI × FinTech Intelligence Platform

> **Tagline:** *Three nodes. One intelligent financial ecosystem.*  
> **Repository:** [https://github.com/Sky-ydv2008/fintech-apex](https://github.com/Sky-ydv2008/fintech-apex)

---

## 🌟 Overview

**Tri-Node** is a human-crafted, AI-powered cryptocurrency and fintech intelligence platform. Built with a dark `#050508` theme, warm orange/amber glow accents, glassmorphic UI elements, interactive 3D WebGL hero graphics, and institutional-grade analytics.

Tri-Node removes market clutter by connecting three core conceptual nodes:
1. **DATA NODE:** Collects, standardizes, and indexes live market prices, liquidity depth, news releases, and synthetic transaction logs.
2. **AI CORE NODE:** Synthesizes structured context, performs RAG document retrieval, computes anomaly Isolation Forest risk scores, and generates human-readable explanations.
3. **USER NODE:** Empowers traders and analysts with interactive dashboards, custom watchlists, portfolio breakdown charts, and educational explanations.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 19 + TypeScript | High-performance component-based UI |
| **Styling** | Tailwind CSS + Custom Mesh Glows | Dark visual system with warm orange/red accents |
| **3D Orb** | WebGL / HTML5 Canvas API | Interactive 3D Tri-Node central hero orb |
| **Charts** | Recharts | Financial area charts, donut allocations & sparklines |
| **Backend API** | Node.js + Express + TypeScript | REST API endpoints for markets, AI, portfolio, news, and ML |
| **AI Synthesis** | Contextual LLM Engine + RAG Vector | Grounded market answers & document context matching |
| **Anomaly ML** | Isolation Forest Algorithm Logic | Synthetic transaction risk scoring & human explanations |
| **Deployment** | Vercel + Render | Monorepo serverless Vercel & Render web service ready |

---

## 🚀 Key Modules Included

1. **Hero & Landing Page:** Interactive 3D Canvas node visualization, live auto-scrolling ticker bar, animated counters ($14.8B tracked, 99.94% accuracy, 3.4ms latency), and interactive live AI query test chips.
2. **Markets Explorer:** Real-time crypto & tradFi asset list, search/filter, RSI & MACD technical indicators, 24h charts, and direct "Ask AI" buttons.
3. **AI Assistant Studio:** Contextual chat interface with preset prompts, mode toggles (Market Analysis, Education, Anomaly ML), formatted markdown, and grounded context sources.
4. **Portfolio Tracker:** Multi-asset holdings table, asset allocation donut chart, historical growth area chart, and automated AI Portfolio Risk Audit reports.
5. **Watchlist & Alerts:** Saved assets list with upper/lower price threshold alert triggers.
6. **News Intelligence:** Live crypto & fintech news feed with automated AI sentiment tags (Bullish / Bearish / Neutral) and bullet point summaries.
7. **Advanced Analytics:** Cross-asset Pearson correlation matrix heatmap (BTC, ETH, SOL, NVDA, AAPL) and 30-day volatility meters.
8. **Transaction ML Anomaly Monitor:** Synthetic transaction log stream with Isolation Forest risk scoring (0-100) and explainable AI risk reasons.
9. **Authentication & Profile:** JWT & bcrypt authentication flow with secure session indicators.

---

## ⚙️ Local Setup & Running

```bash
# 1. Clone the repository
git clone https://github.com/Sky-ydv2008/fintech-apex.git
cd fintech-apex

# 2. Install dependencies
npm install

# 3. Start development server (Frontend + API Proxy)
npm run dev

# Open http://localhost:3000 in your browser
```

---

## ☁️ Deployment Instructions

### Deploy Frontend & API to Vercel (Recommended)
This repository includes a pre-configured `vercel.json` for zero-config Vercel deployment:
1. Import `Sky-ydv2008/fintech-apex` in your Vercel Dashboard.
2. Build command: `npm run build`
3. Output Directory: `dist`
4. Deploy!

### Deploy Backend to Render (Optional)
This repository includes `render.yaml` for Render Web Service deployment:
1. Create a new Web Service on Render pointing to `Sky-ydv2008/fintech-apex`.
2. Build Command: `npm install && npm run build`
3. Start Command: `npm run server`

---

## 🔒 Security & Compliance

- Zero private AI API keys exposed client-side. All LLM synthesis and market processing occur securely on the backend server.
- Session authorization powered by server-side parameterization.
- Informational AI disclaimer applied across all analytics outputs.

*Prepared for Team Tri-Node • 2026*
