import React from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ArrowRight, Zap } from 'lucide-react';

const PricingPage: React.FC = () => {
  const { t } = useApp();
  const { isAuthenticated, subscribe } = useAuth();
  const navigate = useNavigate();

  // Safely access pricing translations to avoid build errors
  const pricingData = t?.pricing || { 
    title: 'Subsidized Access', 
    subtitle: 'Free for verified startups',
    price: 'FREE',
    period: 'forever',
    features: [],
    cta: 'Activate Now'
  };

  const handleSubscribe = () => {
    if (!isAuthenticated) {
      navigate('/signup');
      return;
    }
    // Direct success since it's free
    subscribe();
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
          className="flex items-center space-x-3 text-[#0A1128]/40 hover:text-[#D6825C] mb-16 font-black text-[10px] uppercase tracking-[0.3em] transition-all group active:scale-90"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>{t?.common?.back || 'Back'}</span>
        </button>

        <header className="text-center mb-24">
          <h1 className="text-6xl md:text-8xl font-black text-[#0A1128] mb-8 tracking-tighter leading-none">
            {pricingData.title}
          </h1>
          <p className="text-xl text-[#0A1128]/50 max-w-2xl mx-auto font-medium leading-relaxed">
            {pricingData.subtitle}
          </p>
        </header>

        <div className="max-w-xl mx-auto">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white p-12 md:p-16 rounded-[3rem] border border-[#1a2e26]/10 shadow-2xl shadow-[#1a2e26]/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#D6825C]/5 rounded-full -mr-24 -mt-24 z-0" />
            
            <div className="relative z-10">
              <div className="flex items-center space-x-6 mb-12">
                <div className="w-16 h-16 bg-[#1a2e26] text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl">
                  <Zap size={32} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-[#0A1128] tracking-tight">Ecosystem Access</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D6825C]">Subsidized Profile</p>
                </div>
              </div>

              <div className="mb-12 border-b border-[#0A1128]/5 pb-12">
                <div className="flex items-baseline space-x-3">
                  <span className="text-7xl font-black tracking-tighter text-[#0A1128]">{pricingData.price}</span>
                  <span className="text-xl font-bold text-[#0A1128]/30 uppercase tracking-widest">/ {pricingData.period}</span>
                </div>
              </div>

              {/* Removed feature list rendering */}

              <button 
                onClick={handleSubscribe}
                className="w-full bg-[#1a2e26] hover:bg-[#233f34] text-white py-6 rounded-full font-black transition-all shadow-2xl flex items-center justify-center space-x-4 text-xl active:scale-95 group uppercase tracking-widest"
              >
                <span>{pricingData.cta}</span>
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-center mt-10 text-[10px] font-black text-[#0A1128]/30 uppercase tracking-[0.3em]">
                Zero Cost • Subsidized by VELIX Protocol
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PricingPage;