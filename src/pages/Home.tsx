import { 
  ShieldCheck, 
  BarChart3, 
  Headphones, 
  Gift, 
  User, 
  ShoppingCart,
} from 'lucide-react';
import { useState, useEffect, useRef, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const targetWidth = 1080;
        const targetHeight = 720;

        const scaleX = viewportWidth / targetWidth;
        const scaleY = viewportHeight / targetHeight;
        
        const newScale = Math.min(scaleX, scaleY, 1);
        setScale(newScale);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#eff1f3] flex items-center justify-center overflow-hidden font-sans">
      <div 
        ref={containerRef}
        style={{ 
          width: '1080px', 
          height: '720px', 
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}
        className="relative bg-white shadow-[0_45px_100px_rgba(0,0,0,0.1)] flex flex-col flex-shrink-0"
      >
        <div className="absolute inset-0 pointer-events-none z-0 bg-slate-50">
          <img 
            src="/hero1bg.png" 
            alt="Background" 
            className="h-full w-full object-cover object-right"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2232&auto=format&fit=crop";
              target.className = "h-full w-full object-cover object-right opacity-5 transition-opacity duration-1000";
            }}
          />
        </div>
        
        <nav className="flex items-center justify-between px-16 py-8 z-50">
          <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
            <img 
              src="/klogo.png" 
              alt="KUCOIN" 
              className="h-14 w-auto object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const container = target.parentElement;
                if (container) {
                  container.innerHTML = `
                    <div class="flex items-center gap-2.5">
                      <div class="w-11 h-11 bg-[#00936e] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#00936e]/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                      </div>
                      <div class="flex flex-col -space-y-1.5">
                        <span class="text-[28px] font-[1000] tracking-tighter text-[#00936e] uppercase leading-none">KUCOIN</span>
                        <span class="text-[9px] font-bold text-[#8e959c] uppercase tracking-[0.22em] leading-none mt-1 ml-1">People's Exchange</span>
                      </div>
                    </div>
                  `;
                }
              }}
            />
          </Link>

          <div className="flex items-center gap-10">
            <Link to="/account" className="text-[#1a1a1a] hover:text-[#00936e] transition-colors p-1">
              <User size={30} strokeWidth={1.2} />
            </Link>
            <Link to="/cart" className="relative p-1 cursor-pointer group">
              <ShoppingCart size={30} strokeWidth={1.2} className="text-[#1a1a1a] group-hover:text-[#00936e] transition-colors" />
            </Link>
          </div>
        </nav>

        <main className="flex-grow flex items-center px-16 pb-12 relative overflow-hidden">
          <div className="relative z-20 w-full grid grid-cols-[1.1fr_1.1fr]">
            <div className="mt-[-20px] z-20 max-w-[480px]">
              <motion.h1 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-[64px] font-[1000] leading-[0.94] tracking-[-0.05em] text-[#1a1a1a]"
              >
                Trade Crypto.<br />
                <span className="text-[#00936e]">Grow Your Wealth.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-6 text-[18px] text-[#8e959c] max-w-[400px] leading-relaxed font-medium tracking-tight"
              >
                Trade 700+ cryptocurrencies on a secure and trusted platform.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-10 flex items-center gap-4"
              >
                <Link to="/signup" className="bg-[#00936e] text-white px-7 py-3.5 rounded-md font-bold text-base hover:brightness-105 transition-all active:scale-[0.97] shadow-[0_20px_40px_rgba(0,147,110,0.15)] flex items-center justify-center no-underline whitespace-nowrap">
                  Sign Up / Get Started
                </Link>
                <Link to="/markets" className="bg-white/80 backdrop-blur-sm text-[#1a1a1a] border-[3px] border-[#eff2f5] px-7 py-3.5 rounded-md font-bold text-base hover:border-[#00936e] hover:text-[#00936e] transition-all active:scale-[0.97] flex items-center justify-center no-underline whitespace-nowrap">
                  Explore Markets
                </Link>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-12 grid grid-cols-4 gap-2 pr-12 relative z-30"
              >
                <Link to="/security" className="no-underline">
                  <FeatureSmall 
                    icon={<ShieldCheck className="text-[#00936e] w-10 h-10" strokeWidth={1} />}
                    title="Secure"
                    desc="Top-tier security"
                    desc2="to protect your assets"
                  />
                </Link>
                <Link to="/trade" className="no-underline">
                  <FeatureSmall 
                    icon={<BarChart3 className="text-[#00936e] w-10 h-10" strokeWidth={1} />}
                    title="Advanced Tools"
                    desc="Powerful trading tools"
                    desc2="for beginners & pros"
                  />
                </Link>
                <Link to="/support" className="no-underline">
                  <FeatureSmall 
                    icon={<Headphones className="text-[#00936e] w-10 h-10" strokeWidth={1} />}
                    title="24/7 Support"
                    desc="Always here for you,"
                    desc2="anytime, anywhere"
                  />
                </Link>
                <Link to="/rewards" className="no-underline">
                  <FeatureSmall 
                    icon={<Gift className="text-[#00936e] w-10 h-10" strokeWidth={1} />}
                    title="Rewards"
                    desc="Earn rewards as"
                    desc2="you trade"
                  />
                </Link>
              </motion.div>
            </div>
            <div className="min-h-[400px]" />
          </div>
        </main>
      </div>
    </div>
  );
}

function FeatureSmall({ icon, title, desc, desc2 }: { icon: ReactNode, title: string, desc: string, desc2: string }) {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="mb-2 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h4 className="font-extrabold text-[15px] text-[#1a1a1a] mb-1 tracking-tight">{title}</h4>
      <p className="text-[#9ca3af] text-[9px] font-bold leading-tight uppercase tracking-tighter">
        {desc}<br />{desc2}
      </p>
    </div>
  );
}
