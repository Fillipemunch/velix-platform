import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const SuccessPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const appContext = useApp();
  const navigate = useNavigate();

  if (!mounted || !appContext) return null;
  const { t } = appContext;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 min-h-screen flex flex-col items-center px-6 bg-[#F4F7F5] pb-20"
    >
      <div className="max-w-2xl w-full text-center mb-12">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-24 h-24 bg-[#2D5A4C]/5 text-[#2D5A4C] rounded-2xl flex items-center justify-center mx-auto mb-8 border border-[#2D5A4C]/10 shadow-xl"
        >
          <CheckCircle2 size={48} />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-black text-[#1A2E26] mb-4 tracking-tighter">
          {t.success_title}
        </h1>
        <p className="text-[#1A2E26]/60 font-medium mb-10 text-lg leading-relaxed max-w-lg mx-auto">
          {t.success_subtitle}
        </p>

        <button 
          onClick={() => navigate('/dashboard')}
          className="bg-[#2D5A4C] hover:bg-[#1b3d33] text-white px-12 py-5 rounded-xl font-bold transition-all shadow-2xl shadow-[#2D5A4C]/20 flex items-center justify-center space-x-3 text-lg active:scale-95 group mx-auto"
        >
          <span>{t.success_cta}</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
      <div className="mt-20 text-center">
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">VELIX CORE ARCHITECT • 2026</p>
      </div>
    </motion.div>
  );
};

export default SuccessPage;