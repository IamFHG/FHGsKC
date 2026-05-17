import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Wallet, History, Shield, LogOut, ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserAccount {
  email: string;
  balance: number;
  level: string;
  portfolio: Record<string, number>;
  history: Array<{
    id: number;
    type: string;
    asset: string;
    amount: number;
    price: number;
    value: number;
    date: string;
  }>;
}

export default function Account() {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/account')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#eff1f3] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00936e]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eff1f3] p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="p-2 hover:bg-white rounded-full transition-colors">
            <ArrowLeft size={24} className="text-[#1a1a1a]" />
          </Link>
          <h1 className="text-4xl font-[1000] tracking-tight text-[#1a1a1a]">My Account</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-[#00936e]/10 rounded-full flex items-center justify-center text-[#00936e] mb-4">
                  <User size={40} />
                </div>
                <h2 className="font-bold text-[#1a1a1a] truncate w-full">{user.email}</h2>
                <span className="inline-block mt-2 px-3 py-1 bg-[#00936e] text-white text-[10px] font-bold rounded-full uppercase tracking-widest leading-none">
                  {user.level}
                </span>
              </div>
            </div>

            <nav className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <button className="w-full flex items-center gap-3 px-6 py-4 text-left font-bold text-[#1a1a1a] hover:bg-[#fafbfc] transition-colors bg-[#fafbfc]">
                <Wallet size={20} className="text-[#00936e]" />
                Wallet Overview
              </button>
              <button className="w-full flex items-center gap-3 px-6 py-4 text-left font-bold text-[#8e959c] hover:bg-[#fafbfc] transition-colors">
                <History size={20} />
                Transaction History
              </button>
              <button className="w-full flex items-center gap-3 px-6 py-4 text-left font-bold text-[#8e959c] hover:bg-[#fafbfc] transition-colors">
                <Shield size={20} />
                Security
              </button>
              <div className="h-px bg-[#f3f4f6] mx-6" />
              <button className="w-full flex items-center gap-3 px-6 py-4 text-left font-bold text-[#e15241] hover:bg-[#fef2f2] transition-colors">
                <LogOut size={20} />
                Logout
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1a1a1a] p-8 rounded-2xl text-white shadow-xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <p className="text-[#8e959c] font-bold text-[12px] uppercase tracking-widest mb-2">Total Balance</p>
                <h3 className="text-4xl font-[1000] tracking-tight mb-8">
                  ${user.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h3>
                <div className="flex gap-4">
                  <button className="flex-1 bg-[#00936e] py-3 rounded-xl font-bold hover:brightness-110 transition-all active:scale-95">Deposit</button>
                  <button className="flex-1 bg-white/10 py-3 rounded-xl font-bold hover:bg-white/20 transition-all active:scale-95">Withdraw</button>
                </div>
              </div>
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#00936e] rounded-full blur-[100px] opacity-20" />
            </motion.div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#f3f4f6]">
              <h4 className="font-bold text-[#1a1a1a] text-lg mb-6">Recent Activity</h4>
              <div className="space-y-6">
                {user.history.map(item => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#eff1f3] rounded-xl flex items-center justify-center text-[#1a1a1a]">
                        {item.type === 'BUY' ? <TrendingUp size={20} className="text-[#00936e]" /> : <TrendingDown size={20} className="text-[#e15241]" />}
                      </div>
                      <div>
                        <p className="font-bold text-[#1a1a1a]">{item.type === 'BUY' ? 'Bought' : 'Sold'} {item.asset}</p>
                        <p className="text-[12px] text-[#8e959c] font-medium">
                          {new Date(item.date).toLocaleDateString()} • {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className={`font-bold text-right ${item.type === 'BUY' ? 'text-[#00936e]' : 'text-[#e15241]'}`}>
                        {item.type === 'BUY' ? '-' : '+'}${item.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-[10px] text-[#8e959c] font-bold text-right uppercase tracking-tighter">
                        {item.amount} {item.asset} @ ${item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
                {user.history.length === 0 && (
                  <p className="text-center text-[#8e959c] py-8">No recent activity</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
