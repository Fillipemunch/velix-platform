import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Shield, TrendingUp, Linkedin, MapPin, Crown } from 'lucide-react';

const AboutPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const appContext = useApp();
  const navigate = useNavigate();

  if (!mounted || !appContext) return null;
  const { t } = appContext;

  const linkedinUrl = "https://www.linkedin.com/in/fillipe-ferreira-munch-317a75396/";
  // Forced absolute path with encoded space for the public folder
  const founderImageUrl = "/IMG_6411%20Lille.png";
  
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

        {/* Founder Section - No Text Fallback */}
        <section className="mb-40 py-12">
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-[#1a2e26] rounded-[3.5rem] p-12 md:p-24 shadow-[0_60px_120px_-20px_rgba(26,46,38,0.3)] flex flex-col md:flex-row items-center gap-16 md:gap-24 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl pointer-events-none" />
              
              {/* Portrait Node - Exclusive Image Render */}
              <div className="relative shrink-0 z-10">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-[3.5rem] overflow-hidden border-[12px] border-white/10 shadow-2xl relative bg-black/10 ring-1 ring-white/20">
                  <img 
                    src={founderImageUrl} 
                    alt="Fillipe Munch - Founder"
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                    loading="eager"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#D6825C] rounded-[2rem] flex items-center justify-center z-20 shadow-2xl border-8 border-[#1a2e26] group hover:scale-110 transition-transform">
                  <Crown size={32} className="text-white" />
                </div>
              </div>

              {/* Identity Matrix */}
              <div className="flex-1 text-center md:text-left space-y-10 z-10">
                <div>
                  <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-[#D6825C]/20 text-[#D6825C] text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-6 border border-[#D6825C]/30">
                    <Zap size={12} fill="currentColor" />
                    <span>Founder & Core Architect</span>
                  </div>
                  <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.8]">
                    Fillipe <br /> <span className="text-[#D6825C]">Munch</span>
                  </h2>
                </div>

                <div className="space-y-4">
                   <p className="text-2xl md:text-3xl text-white/80 font-medium leading-relaxed italic max-w-xl">
                    "{t.about.founderBio}"
                  </p>
                  <p className="text-white/40 font-black uppercase tracking-[0.4em] text-[10px]">Strategic Vision Lead • 2026</p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8 pt-4">
                  <a 
                    href={linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full md:w-auto bg-white text-[#1a2e26] px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#D6825C] hover:text-white transition-all shadow-2xl flex items-center justify-center space-x-3 active:scale-95 group"
                  >
                    <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
                    <span>Synchronize Network</span>
                  </a>
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