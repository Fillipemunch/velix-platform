import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, Zap, Shield, TrendingUp, Linkedin, MapPin } from 'lucide-react';

const AboutPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const appContext = useApp();
  const navigate = useNavigate();

  if (!mounted || !appContext) return null;
  const { t } = appContext;

  // Foto real do fundador integrada. 
  const founderImage = "https://replicate.delivery/xped/01dfa151-5127-4648-912c-39655519842c/output.png"; 

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F9FBF9]"
    >
      {/* Header Section */}
      <section className="bg-[#1a2e26] pt-40 pb-32 md:pt-48 md:pb-40">
        <div className="max-w-6xl mx-auto px-6">
          <button 
            onClick={() => navigate('/')}
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
        {/* Manifesto Section */}
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

        {/* Founder Card Section - REFINED FIX */}
        <section className="mb-40 flex justify-center py-12">
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-lg w-full bg-white rounded-[4.5rem] shadow-[0_40px_100px_-20px_rgba(26,46,38,0.12)] border border-white p-16 text-center relative overflow-hidden transform transition-all hover:shadow-[0_60px_120px_-20px_rgba(26,46,38,0.18)]"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#F9FBF9]/80 to-white pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Profile Image - RECORTE CIRCULAR E CENTRALIZAÇÃO CORRIGIDA */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-12 group">
                <div className="w-full h-full rounded-full overflow-hidden border-[10px] border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] bg-slate-100 relative z-10 ring-1 ring-[#1a2e26]/5">
                  <img 
                    src={founderImage} 
                    alt={t.about.founderName} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 block"
                    style={{ objectPosition: 'center 5%' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/600x600/1a2e26/D6825C?text=FM";
                    }}
                  />
                </div>
                
                {/* Medal Icon - POSICIONADO NO CANTO INFERIOR DIREITO SEM OBSTRUIR */}
                <div className="absolute bottom-6 right-6 w-16 h-16 bg-[#D6825C] text-white rounded-[1.5rem] flex items-center justify-center shadow-[0_20px_40px_rgba(214,130,92,0.5)] border-4 border-white z-20 transition-all group-hover:rotate-12 group-hover:scale-110">
                  <Award size={28} />
                </div>
              </div>

              {/* Títulos e Nomes */}
              <div className="space-y-3 mb-10">
                <h3 className="text-[#D6825C] font-black text-[10px] uppercase tracking-[0.5em] mb-2">
                  {t.about.founderRole}
                </h3>
                <h2 className="text-[#1a2e26] text-6xl font-black tracking-tighter uppercase leading-tight">
                  {t.about.founderName}
                </h2>
              </div>
              
              <div className="w-24 h-1.5 bg-[#D6825C] mx-auto mb-10 rounded-full" />
              
              <div className="px-8 mb-16">
                <p className="text-[#1a2e26]/70 leading-relaxed text-xl italic font-medium">
                  "{t.about.founderBio}"
                </p>
              </div>
              
              <div className="pt-12 border-t border-[#1a2e26]/5 w-full space-y-8">
                <div className="flex flex-col items-center gap-6">
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center space-x-4 bg-[#1a2e26] text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#D6825C] transition-all shadow-2xl active:scale-95 group"
                  >
                    <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
                    <span>Executive Profile</span>
                  </a>
                  
                  <div className="flex items-center text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
                    <MapPin size={14} className="mr-3 text-[#D6825C]" />
                    Copenhagen Hub • DK
                  </div>
                </div>
                
                <div className="pt-4">
                  <span className="text-slate-200 font-mono text-[9px] tracking-[0.6em] uppercase font-black">VELIX CORE ARCHITECT • 2026</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center pt-24 border-t border-[#1a2e26]/5">
          <p className="text-xs font-black text-[#1a2e26]/20 uppercase tracking-[0.6em]">VELIX • EUROPEAN STARTUP INFRASTRUCTURE</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutPage;