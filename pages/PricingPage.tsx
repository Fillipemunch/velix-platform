
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Sparkles, ArrowRight, Zap } from 'lucide-react';
import VelixPaymentModal from '../components/VelixPaymentModal';

const PricingPage: React.FC = () => {
  const { t } = useApp();
  const { isAuthenticated, subscribe } = useAuth();
  const navigate = useNavigate();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleOpenCheckout = () => {
    if (!isAuthenticated) {
      navigate('/signup');
      return;
    }
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = () => {
    subscribe();
    setIsCheckoutOpen(false);
    navigate('/success');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 min-h-screen pb-20 bg-[#F8FAFC]"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-3 text-[#0A1128]/40 hover:text-[#5865F2] mb-16 font-black text-[10px] uppercase tracking-[0.3em] transition-all group active:scale-90"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>{t.back_button}</span>
        </button>

        <header className="text-center mb-24">
          <h1 className="text-6xl md:text-8xl font-black text-[#0A1128] mb-8 tracking-tighter leading-none">
            {t.pricing_title}
          </h1>
          <p className="text-xl text-[#0A1128]/50 max-w-2xl mx-auto font-medium leading-relaxed">
            {t.pricing_subtitle}
          </p>
        </header>

        <div className="max-w-xl mx-auto">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white p-12 md:p-16 rounded-[3rem] border border-[#5865F2]/10 shadow-2xl shadow-[#5865F2]/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#5865F2]/5 rounded-full -mr-24 -mt-24 z-0" />
            
            <div className="relative z-10">
              <div className="flex items-center space-x-6 mb-12">
                <div className="w-16 h-16 bg-[#5865F2] text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-[#5865F2]/20">
                  <Zap size={32} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-[#0A1128] tracking-tight">{t.plan_premium}</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5865F2]">Elite Startup Tier</p>
                </div>
              </div>

              <div className="mb-12 border-b border-[#0A1128]/5 pb-12">
                <div className="flex items-baseline space-x-3">
                  <span className="text-7xl font-black tracking-tighter text-[#0A1128]">€54</span>
                  <span className="text-xl font-bold text-[#0A1128]/30 uppercase tracking-widest">/ {t.pricing.period}</span>
                </div>
              </div>

              <div className="space-y-6 mb-12">
                {t.pricing_features.map((feature: string) => (
                  <div key={feature} className="flex items-center space-x-5">
                    <div className="w-6 h-6 rounded-full bg-[#5865F2]/5 flex items-center justify-center border border-[#5865F2]/10 flex-shrink-0">
                      <Check size={14} className="text-[#5865F2]" />
                    </div>
                    <span className="text-[#0A1128]/80 font-bold text-lg">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={handleOpenCheckout}
                className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white py-6 rounded-full font-black transition-all shadow-2xl shadow-[#5865F2]/20 flex items-center justify-center space-x-4 text-xl active:scale-95 group uppercase tracking-widest"
              >
                <span>{t.subscribe_now}</span>
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-center mt-10 text-[10px] font-black text-[#0A1128]/30 uppercase tracking-[0.3em]">
                Bank-Grade Checkout • 54.00 EUR
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Velix Premium Checkout Modal */}
      <VelixPaymentModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        onPaymentSuccess={handlePaymentSuccess} 
      />
    </motion.div>
  );
};

export default PricingPage;
