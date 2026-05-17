import { motion } from 'motion/react';
import { ArrowLeft, Construction } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function SimplePage() {
  const location = useLocation();
  const title = location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.substring(2);

  return (
    <div className="min-h-screen bg-[#eff1f3] flex flex-col items-center justify-center p-12 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 rounded-[2.5rem] shadow-xl text-center max-w-lg w-full"
      >
        <div className="w-20 h-20 bg-[#00936e]/10 rounded-3xl flex items-center justify-center text-[#00936e] mx-auto mb-8">
          <Construction size={40} />
        </div>
        <h1 className="text-4xl font-[1000] tracking-tight text-[#1a1a1a] mb-4">{title} Page</h1>
        <p className="text-[#8e959c] font-bold text-lg mb-10 leading-relaxed">
          This feature is currently being integrated with our backend systems. Check back soon for full functionality!
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#333] transition-all active:scale-95"
        >
          <ArrowLeft size={20} />
          Back to Exchange
        </Link>
      </motion.div>
    </div>
  );
}
