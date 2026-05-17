import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Market {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
}

export default function Trade() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Market | null>(null);
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');

  const fetchAccount = () => {
    fetch('/api/account')
      .then(res => res.json())
      .then(data => setBalance(data.balance));
  };

  useEffect(() => {
    fetch('/api/markets')
      .then(res => res.json())
      .then(data => {
        setMarkets(data);
        setSelectedAsset(data[0]);
        setLoading(false);
      });
    fetchAccount();
  }, []);

  const handleTrade = async () => {
    if (!selectedAsset) return;
    
    try {
      const response = await fetch('/api/trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: tradeType,
          symbol: selectedAsset.symbol,
          amount: parseFloat(amount),
          price: selectedAsset.price
        })
      });

      const result = await response.json();
      if (response.ok) {
        alert(`${tradeType} order for ${amount} ${selectedAsset.symbol} executed successfully!`);
        setAmount('');
        setBalance(result.account.balance);
      } else {
        alert(`Order failed: ${result.error}`);
      }
    } catch (err) {
      alert('An error occurred during trading.');
    }
  };

  return (
    <div className="min-h-screen bg-[#eff1f3] flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-[#f3f4f6] px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link to="/" className="p-2 hover:bg-[#eff1f3] rounded-full transition-colors">
            <ArrowLeft size={24} className="text-[#1a1a1a]" />
          </Link>
          <h1 className="text-2xl font-[1000] tracking-tight text-[#1a1a1a]">Trading Terminal</h1>
        </div>
        <div className="flex items-center gap-8 text-[13px] font-bold">
          <div className="flex items-center gap-2">
            <span className="text-[#8e959c]">BTC/USDT</span>
            <span className="text-[#00936e]">$65,432.10</span>
          </div>
          <div className="flex items-center gap-2 border-l border-[#f3f4f6] pl-8">
            <span className="text-[#8e959c]">Balance</span>
            <span className="text-[#1a1a1a]">${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </header>

      <main className="flex-grow grid grid-cols-12 gap-1 p-1 bg-[#f3f4f6]">
        {/* Market List */}
        <div className="col-span-3 bg-white h-full flex flex-col">
          <div className="p-4 border-b border-[#f3f4f6]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8e959c]" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-[#f3f4f6] border-none rounded-lg pl-10 pr-4 py-2 text-[13px] font-bold focus:ring-2 focus:ring-[#00936e] transition-all"
              />
            </div>
          </div>
          <div className="flex-grow overflow-y-auto">
            {markets.map(market => (
              <div 
                key={market.id}
                onClick={() => setSelectedAsset(market)}
                className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${selectedAsset?.id === market.id ? 'bg-[#00936e]/5 border-r-[3px] border-[#00936e]' : 'hover:bg-[#fafbfc]'}`}
              >
                <div>
                  <p className="font-bold text-[13px] text-[#1a1a1a]">{market.symbol}/USDT</p>
                  <p className="text-[11px] font-bold text-[#8e959c]">{market.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[13px] text-[#1a1a1a]">${market.price.toLocaleString()}</p>
                  <p className={`text-[11px] font-bold ${market.change >= 0 ? 'text-[#00936e]' : 'text-[#e15241]'}`}>
                    {market.change > 0 ? '+' : ''}{market.change}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart View (Mock) */}
        <div className="col-span-6 bg-white flex flex-col">
          <div className="p-6 border-b border-[#f3f4f6] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-[1000] tracking-tight">{selectedAsset?.symbol}/USDT</h2>
              <span className={`px-2 py-1 rounded text-[11px] font-bold uppercase transition-colors ${selectedAsset && selectedAsset.change >= 0 ? 'bg-[#00936e]/10 text-[#00936e]' : 'bg-[#e15241]/10 text-[#e15241]'}`}>
                {selectedAsset?.change}%
              </span>
            </div>
            <div className="flex gap-2">
              {['1m', '15m', '1h', '4h', '1D'].map(t => (
                <button key={t} className={`px-3 py-1 rounded text-[11px] font-bold uppercase transition-colors ${t === '1h' ? 'bg-[#1a1a1a] text-white' : 'text-[#8e959c] hover:bg-[#eff1f3]'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-grow flex items-center justify-center bg-[#fafbfc] relative overflow-hidden">
            <div className="text-[#8e959c] font-bold flex flex-col items-center gap-4">
              <div className="flex items-end gap-1 h-32">
                {[40, 60, 45, 80, 55, 90, 70, 100, 85].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className={`w-4 rounded-t-sm ${i % 2 === 0 ? 'bg-[#00936e]/20' : 'bg-[#e15241]/20'}`} />
                ))}
              </div>
              Interactive Chart Coming Soon...
            </div>
          </div>
        </div>

        {/* Trade Form */}
        <div className="col-span-3 bg-white p-6 space-y-6">
          <div className="flex gap-2 p-1 bg-[#f3f4f6] rounded-xl">
            <button 
              onClick={() => setTradeType('BUY')}
              className={`flex-1 py-3 font-extrabold text-[13px] rounded-lg transition-all ${tradeType === 'BUY' ? 'bg-white text-[#00936e] shadow-sm' : 'text-[#8e959c] hover:text-[#00936e]'}`}
            >
              BUY
            </button>
            <button 
              onClick={() => setTradeType('SELL')}
              className={`flex-1 py-3 font-extrabold text-[13px] rounded-lg transition-all ${tradeType === 'SELL' ? 'bg-white text-[#e15241] shadow-sm' : 'text-[#8e959c] hover:text-[#e15241]'}`}
            >
              SELL
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-[#8e959c] uppercase tracking-widest mb-1.5 pl-1">Amount ({selectedAsset?.symbol})</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00" 
                  className="w-full border-2 border-[#f3f4f6] rounded-xl p-4 font-[1000] text-xl focus:border-[#00936e] focus:outline-none transition-all placeholder:opacity-30"
                />
              </div>
            </div>

            <div className="flex justify-between text-[11px] font-bold text-[#8e959c] px-1">
              <span>Est. Value</span>
              <span className="text-[#1a1a1a]">${(parseFloat(amount || '0') * (selectedAsset?.price || 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>

            <button 
              onClick={handleTrade}
              disabled={!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0}
              className={`w-full text-white py-4 rounded-xl font-bold text-base hover:brightness-105 active:scale-95 transition-all shadow-lg disabled:opacity-50 disabled:scale-100 uppercase ${tradeType === 'BUY' ? 'bg-[#00936e] shadow-[#00936e]/20' : 'bg-[#e15241] shadow-[#e15241]/20'}`}
            >
              {tradeType} {selectedAsset?.symbol}
            </button>
          </div>

          <div className="pt-6 border-t border-[#f3f4f6] space-y-4">
             <div className="flex justify-between text-[12px] font-bold">
                <span className="text-[#8e959c]">Available Balance</span>
                <span className="text-[#1a1a1a]">${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
