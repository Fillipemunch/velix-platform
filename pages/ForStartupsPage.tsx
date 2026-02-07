import React from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Palette, Users, Layout, Check, Sparkles } from 'lucide-react';

const ForStartupsPage: React.FC = () => {
  const { t, language } = useApp();
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 min-h-screen pb-20 bg-[#F4F7F5]"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-3 text-[#2D5A4C]/60 hover:text-[#2D5A4C] mb-12 font-bold text-xs uppercase tracking-widest transition-all group active:scale-95"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>{t.common.back}</span>
        </button>

        <section className="text-center mb-32 relative">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-8xl font-black text-[#1A2E26] mb-10 tracking-tighter leading-none max-w-5xl mx-auto"
          >
            {language === 'en' ? 'Scale your team with the best European talent' : 'Skaler dit team med de bedste talenter i Europa'}
          </motion.h1>
          </motion.h1> 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-[#1A2E26]/60 mb-16 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            {language === 'en' ? 'Join 2,000+ European startups using VELIX to hire faster and smarter.' : 'Slut dig til 2.000+ europæiske startups, der bruger VELIX til at ansætte hurtigere.'}
          </motion.p>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6"
          >
            <button 
              onClick={() => navigate('/pricing')}
              className="bg-[#D6825C] text-white px-12 py-6 rounded-xl font-bold transition-all shadow-2xl shadow-[#D6825C]/20 flex items-center justify-center space-x-4 text-xl active:scale-95 hover:bg-[#c4714e]"
            >
              <span>{t.pricing.cta}</span>
              <ArrowRight size={24} />
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="bg-white text-[#1A2E26] border border-[#2D5A4C]/10 px-12 py-6 rounded-xl font-bold transition-all flex items-center justify-center space-x-4 text-xl active:scale-95 hover:bg-[#ebf0ed]"
            >
              <span>{t.navigation.signup}</span>
            </button>
          </motion.div>
          <div className="mt-12 text-[10px] font-black uppercase tracking-[0.4em] text-[#1A2E26]/20">
            VELIX Protocol • Based in Copenhagen
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-32">
          <div className="p-12 bg-white rounded-xl border border-[#2D5A4C]/5 shadow-sm group hover:shadow-xl transition-all">
            <div className="w-20 h-20 bg-[#2D5A4C]/5 text-[#2D5A4C] rounded-xl flex items-center justify-center mb-8 group-hover:bg-[#2D5A4C] group-hover:text-white transition-all duration-500">
              <Users size={36} />
            </div>
            <h3 className="text-2xl font-bold text-[#1A2E26] mb-4">{language === 'en' ? 'Reach 500k+ candidates' : 'Nå 500k+ kandidater'}</h3>
            <p className="text-[#1A2E26]/60 font-medium leading-relaxed">
              {language === 'en' ? 'Your job posts are seen by top-tier talent across the European ecosystem.' : 'Dine jobopslag ses af top-talenter i hele Europa.'}
            </p>
          </div>
          <div className="p-12 bg-white rounded-xl border border-[#2D5A4C]/5 shadow-sm group hover:shadow-xl transition-all">
            <div className="w-20 h-20 bg-[#2D5A4C]/5 text-[#2D5A4C] rounded-xl flex items-center justify-center mb-8 group-hover:bg-[#2D5A4C] group-hover:text-white transition-all duration-500">
              <Layout size={36} />
            </div>
            <h3 className="text-2xl font-bold text-[#1A2E26] mb-4">{language === 'en' ? 'Advanced ATS' : 'Avanceret ATS'}</h3>
            <p className="text-[#1A2E26]/60 font-medium leading-relaxed">
              {language === 'en' ? 'Manage your entire recruitment pipeline with our professional protocol.' : 'Administrer hele din rekrutteringsproces med vores system.'}
            </p>
          </div>
          <div className="p-12 bg-white rounded-xl border border-[#2D5A4C]/5 shadow-sm group hover:shadow-xl transition-all">
            <div className="w-20 h-20 bg-[#2D5A4C]/5 text-[#2D5A4C] rounded-xl flex items-center justify-center mb-8 group-hover:bg-[#2D5A4C] group-hover:text-white transition-all duration-500">
              <Palette size={36} />
            </div>
            <h3 className="text-2xl font-bold text-[#1A2E26] mb-4">{language === 'en' ? 'Custom Branding' : 'Custom Branding'}</h3>
            <p className="text-[#1A2E26]/60 font-medium leading-relaxed">
              {language === 'en' ? 'Showcase your company culture with beautiful, personalized profiles.' : 'Vis din virksomhedskultur frem med personlige profiler.'}
            </p>
          </div>
        </section>

        {/* Pricing Summary */}
        <section id="pricing" className="max-w-4xl mx-auto mb-32">
          <div className="bg-white p-12 md:p-20 rounded-xl border border-[#D6825C]/30 shadow-2xl shadow-[#D6825C]/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#D6825C]/5 rounded-full -mr-24 -mt-24" />
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <Sparkles className="text-[#D6825C]" size={24} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D6825C]">PREMIUM</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-[#1A2E26] tracking-tight">{t.pricing.title}</h2>
                </div>
                <div className="bg-[#D6825C]/10 px-8 py-6 rounded-xl border border-[#D6825C]/20 text-center">
                  <span className="block text-5xl font-black text-[#D6825C]">{t.pricing.price}</span>
                  <span className="text-xs font-bold text-[#1A2E26]/40 uppercase tracking-widest">{t.pricing.period}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-12">
                {t.pricing.features.map((feature: string) => (
                  <div key={feature} className="flex items-center space-x-4">
                    <div className="w-6 h-6 bg-[#2D5A4C] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="text-white" size={14} />
                    </div>
                    <span className="font-bold text-[#1A2E26]/80">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => navigate('/pricing')}
                className="w-full bg-[#D6825C] hover:bg-[#c4714e] text-white py-6 rounded-xl font-bold transition-all shadow-xl shadow-[#D6825C]/20 flex items-center justify-center space-x-4 text-2xl active:scale-95 group"
              >
                <span>{t.pricing.cta}</span>
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default ForStartupsPage;
