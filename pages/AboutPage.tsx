import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, Zap, Shield, TrendingUp, Linkedin, MapPin } from 'lucide-react';

const AboutPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Hook usage must be after conditional return to avoid hook mismatch
  const appContext = useApp();
  const navigate = useNavigate();

  if (!mounted || !appContext) return null;
  const { t } = appContext;

  const founderImage = "https://replicate.delivery/x991/3VvjGCHv8IruOF7YfS8L3R4tVveF8oE9hU0fK1G5fHee7LpRA/output.jpg"; 

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F9FBF9]"
    >
      <section className="bg-[#1a2e26] pt-40 pb-32 md:pt-48 md:pb-40">
        <div className="max-w-6xl mx-auto px-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-3 text-white/40 hover:text-[#D6825C] mb-12 font-black text-[10px] uppercase tracking-[0.3em] transition-all group active:scale-95"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>{t.common.back}</span>
          </button>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-5xl"
          >
            <span className="inline-block px-6 py-2 bg-white/5 text-[#D6825C] text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-10 border border-white/10">
              {t.about.subtitle}
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-[#F9FBF9] mb-12 tracking-tighter leading-[0.85] uppercase">
              {t.about.title}
            </h1>
            <div className="h-1 w-24 bg-[#D6825C] mb-12 rounded-full" />
            <p className="text-2xl md:text-4xl text-white/80 leading-[1.4] font-medium max-w-4xl tracking-tight">
              {t.about.description}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-24">
        <section className="mb-40">
          <div className="flex items-center space-x-10 mb-20">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1a2e26]/20 whitespace-nowrap">{t.about.manifestoTitle}</h2>
            <div className="h-px bg-[#1a2e26]/5 flex-1"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: t.about.pillar1Title, text: t.about.pillar1Text, icon: <Zap size={24} fill="currentColor" />, color: 'bg-[#D6825C]' },
              { title: t.about.pillar2Title, text: t.about.pillar2Text, icon: <TrendingUp size={24} />, color: 'bg-[#1a2e26]' },
              { title: t.about.pillar3Title, text: t.about.pillar3Text, icon: <Shield size={24} />, color: 'bg-[#1a2e26]/40' }
            ].map((pillar, i) => (
              <div key={i} className="bg-white p-12 rounded-[2.5rem] border border-[#1a2e26]/5 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden">
                <div className={`w-14 h-14 ${pillar.color} text-white rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-lg`}>
                  {pillar.icon}
                </div>
                <h3 className="text-3xl font-black text-[#1a2e26] mb-6 tracking-tight uppercase">{pillar.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-lg">{pillar.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-40 flex justify-center py-12">
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-md w-full bg-white rounded-[3.5rem] shadow-2xl border border-slate-50 p-12 text-center relative overflow-hidden transform transition-all hover:scale-[1.02]"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1a2e26] via-[#D6825C] to-[#1a2e26]" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative w-64 h-64 mx-auto mb-12 group">
                <div className="w-full h-full rounded-full overflow-hidden border-[12px] border-slate-50 shadow-2xl bg-slate-100">
                  <img 
                    src={founderImage} 
                    alt={t.about.founderName} 
                    className="w-full h-full object-cover object-[center_20%] transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="absolute bottom-2 right-2 w-16 h-16 bg-[#D6825C] text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl border-4 border-white transition-transform group-hover:rotate-12">
                  <Award size={28} />
                </div>
              </div>
              <h3 className="text-[#D6825C] font-black text-[10px] uppercase tracking-[0.5em] mb-3">{t.about.founderRole}</h3>
              <h2 className="text-[#1a2e26] text-5xl font-black mb-8 tracking-tighter uppercase">{t.about.founderName}</h2>
              <div className="w-32 h-1 bg-[#1a2e26]/5 mx-auto mb-12 rounded-full" />
              <div className="px-6">
                <p className="text-gray-500 leading-relaxed text-xl italic font-medium">"{t.about.founderBio}"</p>
              </div>
              <div className="mt-16 pt-12 border-t border-slate-50 w-full space-y-10">
                <div className="flex flex-col items-center gap-8">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-4 bg-[#1a2e26] text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#D6825C] transition-all shadow-2xl active:scale-95 group">
                    <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
                    <span>Interface Profile</span>
                  </a>
                  <div className="flex items-center text-slate-300 text-[10px] font-black uppercase tracking-[0.4em]">
                    <MapPin size={14} className="mr-3 text-[#D6825C]" />
                    Copenhagen Hub • DK
                  </div>
                </div>
                <div className="pt-8">
                  <span className="text-slate-200 font-mono text-[10px] tracking-[0.5em] uppercase font-black">VELIX EXECUTIVE CORE • 2026</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center pt-24 border-t border-[#1a2e26]/5">
          <p className="text-xs font-black text-[#1a2e26]/20 uppercase tracking-[0.6em]">VELIX • BASED IN COPENHAGEN</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutPage;