import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory state (resets on server restart, but works for the demo)
  let userAccount = {
    email: 'fhgill0210@gmail.com',
    balance: 15420.50,
    level: 'VIP 1',
    portfolio: {
      'BTC': 0.12,
      'ETH': 1.5,
      'KCS': 500
    },
    history: [
      { id: 1, type: 'BUY', asset: 'BTC', amount: 0.05, price: 62000, value: 3100, date: new Date(Date.now() - 86400000).toISOString() },
      { id: 2, type: 'SELL', asset: 'ETH', amount: 0.5, price: 3500, value: 1750, date: new Date(Date.now() - 172800000).toISOString() }
    ]
  };

  // Mock Market Data API
  app.get('/api/markets', (req, res) => {
    const markets = [
      { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: 65432.10, change: +2.5, volume: '1.2B' },
      { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: 3456.78, change: -1.2, volume: '800M' },
      { id: 'kcs', name: 'KuCoin Token', symbol: 'KCS', price: 12.34, change: +5.7, volume: '50M' },
      { id: 'sol', name: 'Solana', symbol: 'SOL', price: 145.67, change: +0.8, volume: '300M' },
      { id: 'ada', name: 'Cardano', symbol: 'ADA', price: 0.45, change: -2.3, volume: '100M' },
      { id: 'dot', name: 'Polkadot', symbol: 'DOT', price: 7.89, change: +1.2, volume: '80M' },
    ];
    res.json(markets);
  });

  // Account API
  app.get('/api/account', (req, res) => {
    res.json(userAccount);
  });

  // Trade Execution API
  app.post('/api/trade', (req, res) => {
    const { type, symbol, amount, price } = req.body;
    const totalValue = amount * price;

    if (type === 'BUY') {
      if (userAccount.balance < totalValue) {
        return res.status(400).json({ error: 'Insufficient balance' });
      }
      userAccount.balance -= totalValue;
      userAccount.portfolio[symbol] = (userAccount.portfolio[symbol] || 0) + amount;
    } else if (type === 'SELL') {
      if ((userAccount.portfolio[symbol] || 0) < amount) {
        return res.status(400).json({ error: 'Insufficient asset balance' });
      }
      userAccount.balance += totalValue;
      userAccount.portfolio[symbol] -= amount;
    }

    const trade = {
      id: Date.now(),
      type,
      asset: symbol,
      amount,
      price,
      value: totalValue,
      date: new Date().toISOString()
    };

    userAccount.history.unshift(trade);
    res.json({ success: true, account: userAccount, trade });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
