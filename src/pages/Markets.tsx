import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Market {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  volume: string;
}

export default function Markets() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/markets')
      .then(res => res.json())
      .then(data => {
        setMarkets(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#eff1f3] p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="p-2 hover:bg-white rounded-full transition-colors">
            <ArrowLeft size={24} className="text-[#1a1a1a]" />
          </Link>
          <h1 className="text-4xl font-[1000] tracking-tight text-[#1a1a1a]">Market Prices</h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00936e]"></div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#f3f4f6]">
                  <th className="px-8 py-6 text-[12px] font-bold text-[#8e959c] uppercase tracking-widest">Asset</th>
                  <th className="px-8 py-6 text-[12px] font-bold text-[#8e959c] uppercase tracking-widest text-right">Price</th>
                  <th className="px-8 py-6 text-[12px] font-bold text-[#8e959c] uppercase tracking-widest text-right">24h Change</th>
                  <th className="px-8 py-6 text-[12px] font-bold text-[#8e959c] uppercase tracking-widest text-right">Volume</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((market) => (
                  <motion.tr 
                    key={market.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-b border-[#f3f4f6] hover:bg-[#fafbfc] transition-colors cursor-pointer"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#eff1f3] rounded-xl flex items-center justify-center font-bold text-[#1a1a1a]">
                          {market.symbol[0]}
                        </div>
                        <div>
                          <p className="font-bold text-[#1a1a1a]">{market.name}</p>
                          <p className="text-[12px] font-bold text-[#8e959c]">{market.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right font-bold text-[#1a1a1a]">
                      ${market.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className={`flex items-center justify-end gap-1 font-bold ${market.change >= 0 ? 'text-[#00936e]' : 'text-[#e15241]'}`}>
                        {market.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        {Math.abs(market.change)}%
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right text-[#8e959c] font-bold">
                      {market.volume}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
