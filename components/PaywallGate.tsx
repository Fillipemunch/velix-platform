
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface PaywallGateProps {
  children: React.ReactNode;
}

const PaywallGate: React.FC<PaywallGateProps> = ({ children }) => {
  const { t, totalUserPosts } = useApp();
  const { isSubscribed } = useAuth();
  const navigate = useNavigate();

  // Paywall Logic: 1 free post (either Job or Investor)
  const needsToPay = !isSubscribed && totalUserPosts >= 1;

  if (needsToPay) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto p-12 bg-white rounded-[3rem] shadow-2xl border-2 border-[#D6825C]/20 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D6825C]/5 rounded-full -mr-16 -mt-16 z-0" />
        
        <div className="relative z-10">
          <div className="w-20 h-20 bg-[#F4F7F5] rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-[#D6825C] shadow-inner">
            <Zap size={40} className="fill-current" />
          </div>

          <h2 className="text-3xl font-black text-[#1A2E26] mb-4 tracking-tight leading-tight uppercase">
            {t.paywall.title}
          </h2>
          
          <div className="inline-block px-4 py-1.5 bg-[#D6825C]/10 text-[#D6825C] text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-8">
            {t.paywall.limit_reached}
          </div>

          <p className="text-[#1A2E26]/60 mb-10 font-medium leading-relaxed max-w-sm mx-auto">
            {t.paywall.upgrade_desc}
          </p>
          
          <div className="bg-[#F4F7F5] p-8 rounded-[2rem] mb-10 border border-[#2D5A4C]/5">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[#2D5A4C]/40 uppercase font-black tracking-widest mb-1">Premium Access</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-5xl font-black text-[#2D5A4C] tracking-tighter">{t.paywall.price_monthly}</span>
                <span className="text-sm font-bold text-[#2D5A4C]/40">{t.paywall.price_period}</span>
              </div>
              <span className="mt-4 text-[10px] font-black text-[#D6825C] uppercase tracking-widest bg-white px-3 py-1 rounded-lg shadow-sm border border-[#D6825C]/10">
                {t.paywall.price_single}
              </span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/pricing')}
            className="w-full bg-[#D6825C] text-white py-6 rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-[#c4714e] transition-all shadow-2xl shadow-[#D6825C]/20 active:scale-95 flex items-center justify-center space-x-4"
          >
            <Sparkles size={24} />
            <span>{t.paywall.cta}</span>
          </button>

          <div className="mt-8 flex items-center justify-center space-x-6 text-[9px] font-black text-[#1A2E26]/30 uppercase tracking-widest">
            <span className="flex items-center"><CheckCircle2 size={12} className="mr-1.5" /> Cancel Anytime</span>
            <span className="flex items-center"><CheckCircle2 size={12} className="mr-1.5" /> Instant Activation</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      {!isSubscribed && totalUserPosts === 0 && (
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-md mx-auto mb-8 bg-green-50 border border-green-100 p-4 rounded-2xl flex items-center justify-center space-x-3"
        >
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white">
            <CheckCircle2 size={18} />
          </div>
          <span className="text-xs font-black text-green-700 uppercase tracking-widest">
            {t.paywall.trial_active}: {t.investor_onboarding.free_trial_badge}
          </span>
        </motion.div>
      )}
      {children}
    </>
  );
};

export default PaywallGate;
