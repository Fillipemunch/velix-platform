import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Mail, ShieldCheck } from 'lucide-react';
import Logo from '../components/Logo';

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
          className="bg-[#2D5A4C] hover:bg-[#1b3d33] text-white px-12 py-5 rounded-xl font-bold transition-all shadow-2xl shadow-[#2D5A4C]/20 flex items-center justify-center space-x-3 text-lg active:scale-95 group mx-auto mb-16"
        >
          <span>{t.success_cta}</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Mock Email Preview - Clean Welcome Only */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-xl w-full bg-white rounded-2xl shadow-2xl border border-[#2D5A4C]/5 overflow-hidden"
      >
        <div className="bg-[#1A2E26] p-4 flex items-center space-x-3">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Confirmation Protocol</span>
          </div>
        </div>
        
        <div className="p-8 md:p-12 text-left">
          <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-100">
            <Logo size="sm" />
            <div className="text-[10px] font-black text-[#2D5A4C] bg-[#2D5A4C]/5 px-3 py-1 rounded-full uppercase tracking-widest">Signal Locked</div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t.email_confirmation.subject}</h3>
            <p className="text-2xl font-black text-[#1A2E26]">{t.email_confirmation.greeting}</p>
            <p className="text-gray-600 font-medium leading-relaxed text-lg">{t.email_confirmation.body}</p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-50">
             <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">VELIX CORE ARCHITECT • 2026</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SuccessPage;