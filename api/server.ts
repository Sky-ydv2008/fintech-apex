import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'trinode_secret_key_2026_pro';

app.use(cors());
app.use(express.json());

interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  plainPasswordFallback?: string;
}

// Pre-configured Team Member Accounts
const defaultTeamUsers: UserRecord[] = [
  {
    id: 'team_lipsa',
    name: 'Lipsa Bisoyi',
    email: 'bisoyilipsarani@gmail.com',
    passwordHash: bcrypt.hashSync('Apex@Lipsa', 10),
    plainPasswordFallback: 'Apex@Lipsa',
  },
  {
    id: 'team_shivam',
    name: 'Shivam Yadav',
    email: 'normiee.sky@gmail.com',
    passwordHash: bcrypt.hashSync('Apex@Shivam', 10),
    plainPasswordFallback: 'Apex@Shivam',
  },
  {
    id: 'team_aryan',
    name: 'Aryan Gupta',
    email: 'the.aryangupta10@gmail.com',
    passwordHash: bcrypt.hashSync('Apex@Aryan', 10),
    plainPasswordFallback: 'Apex@Aryan',
  },
];

const users: UserRecord[] = [...defaultTeamUsers];

// Healthcheck
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    version: '2.4.0',
    timestamp: new Date().toISOString(),
    nodes: {
      dataNode: 'ONLINE',
      aiNode: 'ONLINE',
      userNode: 'ONLINE',
    },
    message: 'Three nodes. One intelligent financial ecosystem.',
  });
});

// Auth Routes
app.post('/api/auth/register', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser: UserRecord = {
    id: `u_${Date.now()}`,
    name: name || email.split('@')[0],
    email,
    passwordHash,
    plainPasswordFallback: password,
  };
  users.push(newUser);

  const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });
  return res.json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email } });
});

app.post('/api/auth/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (user) {
    const match = await bcrypt.compare(password, user.passwordHash) || password === user.plainPasswordFallback;
    if (!match) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  }

  // Demo fallback
  const token = jwt.sign({ userId: 'demo_user', email }, JWT_SECRET, { expiresIn: '7d' });
  return res.json({ token, user: { id: 'demo_user', name: email.split('@')[0], email } });
});

// Change Password Endpoint
app.post('/api/auth/change-password', async (req: Request, res: Response) => {
  const { email, currentPassword, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ error: 'Email and new password required' });
  }

  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (user) {
    user.passwordHash = await bcrypt.hash(newPassword, 10);
    user.plainPasswordFallback = newPassword;
  } else {
    users.push({
      id: `u_${Date.now()}`,
      name: email.split('@')[0],
      email,
      passwordHash: await bcrypt.hash(newPassword, 10),
      plainPasswordFallback: newPassword,
    });
  }

  return res.json({ status: 'success', message: 'Password updated successfully!' });
});

// Markets Route serving extended market coins
app.get('/api/markets', (req: Request, res: Response) => {
  const assets = [
    { symbol: 'BTC', name: 'Bitcoin', price: 92450.25, change24h: 3.42, marketCap: '$1.82T', category: 'Layer 1' },
    { symbol: 'ETH', name: 'Ethereum', price: 3480.10, change24h: 2.15, marketCap: '$418.5B', category: 'Layer 1' },
    { symbol: 'SOL', name: 'Solana', price: 194.75, change24h: 8.64, marketCap: '$91.2B', category: 'Layer 1' },
    { symbol: 'BNB', name: 'BNB', price: 645.20, change24h: 1.85, marketCap: '$94.1B', category: 'Layer 1' },
    { symbol: 'XRP', name: 'Ripple', price: 2.45, change24h: 11.40, marketCap: '$138.2B', category: 'Layer 1' },
    { symbol: 'ADA', name: 'Cardano', price: 0.92, change24h: 4.80, marketCap: '$32.8B', category: 'Layer 1' },
    { symbol: 'DOGE', name: 'Dogecoin', price: 0.38, change24h: 6.20, marketCap: '$55.4B', category: 'Meme' },
    { symbol: 'AVAX', name: 'Avalanche', price: 38.60, change24h: -1.82, marketCap: '$15.8B', category: 'Layer 1' },
    { symbol: 'LINK', name: 'Chainlink', price: 22.40, change24h: 5.15, marketCap: '$13.6B', category: 'Infrastructure' },
    { symbol: 'SUI', name: 'Sui', price: 3.42, change24h: 7.80, marketCap: '$9.8B', category: 'Layer 1' },
    { symbol: 'PEPE', name: 'Pepe', price: 0.0000195, change24h: 12.50, marketCap: '$8.2B', category: 'Meme' },
    { symbol: 'TAO', name: 'Bittensor', price: 580.40, change24h: 14.20, marketCap: '$4.2B', category: 'AI Tokens' },
    { symbol: 'RENDER', name: 'Render', price: 9.85, change24h: 6.70, marketCap: '$3.8B', category: 'AI Tokens' },
    { symbol: 'NVDA', name: 'NVIDIA Corp', price: 142.80, change24h: 4.12, marketCap: '$3.51T', category: 'FinTech / Equity' },
    { symbol: 'AAPL', name: 'Apple Inc', price: 235.40, change24h: -0.65, marketCap: '$3.58T', category: 'FinTech / Equity' },
    { symbol: 'MSFT', name: 'Microsoft', price: 448.90, change24h: 1.28, marketCap: '$3.34T', category: 'FinTech / Equity' },
    { symbol: 'TSLA', name: 'Tesla Inc', price: 245.15, change24h: 5.78, marketCap: '$782B', category: 'FinTech / Equity' },
    { symbol: 'COIN', name: 'Coinbase', price: 325.80, change24h: 8.45, marketCap: '$80.4B', category: 'FinTech / Equity' },
  ];
  res.json({ assets, count: assets.length, timestamp: new Date().toISOString() });
});

// AI Chat Endpoint
app.post('/api/ai/chat', (req: Request, res: Response) => {
  const { query, mode = 'market' } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter required' });
  }

  let responseText = '';
  let sentiment = 'Neutral';
  let sources = ['Node 1 Realtime Feeds', 'Tri-Node Knowledge Vector'];

  if (query.toLowerCase().includes('bitcoin') || query.toLowerCase().includes('btc')) {
    responseText =
      '**Tri-Node Market Analysis (BTC):**\n\n' +
      'Bitcoin is currently trading at $92,450 (+3.42% in 24h). Institutional spot ETF net inflows exceeded $420M over the last session. Technical indicators show healthy RSI at 64.2 with key resistance testing $94,000.';
    sentiment = 'Bullish (89% Confidence)';
    sources.push('Spot ETF Inflow Stream', 'Orderbook Liquidity Depth');
  } else if (query.toLowerCase().includes('solana') || query.toLowerCase().includes('sol')) {
    responseText =
      '**Tri-Node Market Analysis (SOL):**\n\n' +
      'Solana is outperforming major L1 peers at $194.75 (+8.64% in 24h). Daily DEX volume hit a record $4.2B with TVL climbing 14% week-over-week.';
    sentiment = 'Strong Bullish';
    sources.push('Solana Mainnet Telemetry', 'DEX Liquidity Index');
  } else {
    responseText =
      `**Tri-Node Financial Intelligence:**\n\n` +
      `Synthesized observation regarding: "${query}". Market indicators remain steady across active categories. Informational AI output disclaimer applies.`;
  }

  return res.json({
    query,
    answer: responseText,
    sentiment,
    sources,
    confidence: '99.2%',
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production' || require.main === module) {
  app.listen(PORT, () => {
    console.log(`[Tri-Node API] Express server running on port ${PORT}`);
  });
}

export default app;
