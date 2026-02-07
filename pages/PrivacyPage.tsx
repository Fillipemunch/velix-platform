import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Lock, Eye } from 'lucide-react';

const PrivacyPage: React.FC = () => {
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
      className="pt-32 pb-24 min-h-screen bg-[#F4F7F5]"
    >
      <div className="max-w-4xl mx-auto px-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-3 text-[#2D5A4C]/60 hover:text-[#2D5A4C] mb-12 font-bold text-xs uppercase tracking-widest transition-all group active:scale-95"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>{t.common.back}</span>
        </button>

        <header className="mb-20">
          <span className="inline-block px-4 py-1.5 bg-[#2D5A4C]/10 text-[#2D5A4C] text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
            Legal
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-[#1A2E26] mb-6 tracking-tighter">
            {t.privacy.title}
          </h1>
          <p className="text-xl text-[#1A2E26]/60 font-medium">
            {t.privacy.subtitle}
          </p>
        </header>

        <div className="space-y-16">
          <section className="bg-white p-10 md:p-12 rounded-2xl border border-[#2D5A4C]/5 shadow-sm">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-[#2D5A4C]/5 text-[#2D5A4C] rounded-xl flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <h2 className="text-2xl font-black text-[#1A2E26] tracking-tight">{t.privacy.section1Title}</h2>
            </div>
            <p className="text-[#1A2E26]/70 leading-relaxed font-medium text-lg">
              {t.privacy.section1Text}
            </p>
          </section>

          <section className="bg-white p-10 md:p-12 rounded-2xl border border-[#2D5A4C]/5 shadow-sm">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-[#2D5A4C]/5 text-[#2D5A4C] rounded-xl flex items-center justify-center">
                <Lock size={24} />
              </div>
              <h2 className="text-2xl font-black text-[#1A2E26] tracking-tight">{t.privacy.section2Title}</h2>
            </div>
            <p className="text-[#1A2E26]/70 leading-relaxed font-medium text-lg">
              {t.privacy.section2Text}
            </p>
          </section>

          <section className="bg-white p-10 md:p-12 rounded-2xl border border-[#2D5A4C]/5 shadow-sm">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-[#2D5A4C]/5 text-[#2D5A4C] rounded-xl flex items-center justify-center">
                <Eye size={24} />
              </div>
              <h2 className="text-2xl font-black text-[#1A2E26] tracking-tight">{t.privacy.section3Title}</h2>
            </div>
            <p className="text-[#1A2E26]/70 leading-relaxed font-medium text-lg">
              {t.privacy.section3Text}
            </p>
          </section>
        </div>
        
        <div className="mt-20 pt-12 border-t border-[#2D5A4C]/10 text-center">
          <p className="text-sm font-bold text-[#1A2E26]/40 uppercase tracking-widest">Last updated: January 2026</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPage;