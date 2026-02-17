import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp, PublicStartup } from '../context/AppContext';
import { Search, MapPin, ArrowRight, Zap, TrendingUp, Cpu, Globe, Shield, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import StartupProfileModal from '../components/StartupProfileModal';

const LandingPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const appContext = useApp();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('');
  const [showBanner, setShowBanner] = useState(true);
  const [selectedStartup, setSelectedStartup] = useState<PublicStartup | null>(null);

  if (!mounted || !appContext) return null;
  const { t, setFilters, language, investors, registeredStartups } = appContext;
  const featuredInvestors = investors.slice(0, 3);

  // Take the most recently updated startups
  const partners = registeredStartups.slice(0, 12);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, searchQuery: query, region: region ? [region] : [] }));
    navigate('/jobs');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F9FBF9]"
    >
      <AnimatePresence>
        {showBanner && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[60] bg-[#1a2e26] text-white overflow-hidden border-b border-white/5"
          >
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
              <p className="text-sm font-medium flex-1 text-center md:text-left">
                {language === 'en' ? 'Accelerating the European startup landscape.' : 'Accelererer det europæiske startup-landskab.'}
                <Link to="/philosophy" className="ml-2 text-[#D6825C] hover:underline font-bold">
                  View Manifesto
                </Link>
              </p>
              <button onClick={() => setShowBanner(false)} className="text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest">
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className={`max-w-7xl mx-auto px-6 py-24 lg:py-40 flex flex-col items-center text-center ${showBanner ? 'mt-12' : 'mt-0'}`}>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <span className="inline-flex items-center px-6 py-2 bg-[#D6825C]/10 text-[#D6825C] text-[10px] font-black rounded-full mb-10 tracking-[0.2em] uppercase border border-[#D6825C]/20">
            <Cpu size={14} className="mr-2" /> {t.hero.badge}
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-[#1a2e26] mb-8 tracking-tighter leading-[0.95] max-w-5xl mx-auto">
            {t.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-[#1a2e26]/60 mb-16 max-w-3xl mx-auto font-medium">
            {t.hero.subtitle}
          </p>
        </motion.div>

        <motion.form 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
          onSubmit={handleSearch}
          className="bg-white p-3 rounded-2xl shadow-2xl shadow-[#1a2e26]/5 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 w-full max-w-4xl mx-auto border border-[#1a2e26]/5"
        >
          <div className="flex-1 flex items-center px-6 w-full group bg-[#F9FBF9] rounded-xl">
            <Search className="text-[#1a2e26]/20 group-focus-within:text-[#D6825C]" size={20} />
            <input 
              type="text" placeholder={t.hero.searchPlaceholder}
              className="w-full py-5 px-4 focus:outline-none text-[#1a2e26] font-semibold placeholder:text-[#1a2e26]/30 bg-transparent border-none"
              value={query} onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex-1 flex items-center px-6 w-full group bg-[#F9FBF9] rounded-xl">
            <MapPin className="text-[#1a2e26]/20 group-focus-within:text-[#D6825C]" size={20} />
            <select 
              className="w-full py-5 px-4 focus:outline-none text-[#1a2e26] font-semibold appearance-none bg-transparent cursor-pointer"
              value={region} onChange={(e) => setRegion(e.target.value)}
            >
              <option value="">{t.common.allRegions}</option>
              {Object.keys(t.regions).map(reg => (
                <option key={reg} value={reg}>{t.regions[reg]}</option>
              ))}
            </select>
          </div>
          <button 
            type="submit"
            className="w-full md:w-auto bg-[#D6825C] hover:bg-[#c4714e] text-white px-10 py-5 rounded-xl font-black transition-all shadow-xl active:scale-95 uppercase tracking-widest text-xs"
          >
            <span>{t.common.search}</span>
          </button>
        </motion.form>
      </section>

      {/* Dynamic Ecosystem Partners Section */}
      {partners.length > 0 && (
        <section className="py-24 bg-white border-y border-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center space-x-10 mb-16">
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1a2e26]/20 whitespace-nowrap">Integrated Partners</h2>
              <div className="h-px bg-[#1a2e26]/5 flex-1"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {partners.map((partner, idx) => (
                <motion.div 
                  key={partner.id} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedStartup(partner)}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="w-24 h-24 bg-[#F9FBF9] rounded-[2rem] border border-[#1a2e26]/5 flex items-center justify-center mb-4 group-hover:shadow-xl group-hover:border-[#D6825C]/40 transition-all overflow-hidden relative grayscale hover:grayscale-0 active:scale-95">
                    <img src={partner.logo} alt={partner.name} className="w-full h-full object-cover p-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[9px] font-black text-[#1a2e26]/30 uppercase tracking-widest group-hover:text-[#D6825C] transition-colors text-center">{partner.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <StartupProfileModal startup={selectedStartup} onClose={() => setSelectedStartup(null)} />

      <section className="py-32 bg-[#1a2e26] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            {t.investor_preview.title}
          </motion.h2>
          <p className="text-lg text-white/60 mb-20 max-w-2xl mx-auto">{t.investor_preview.subtitle}</p>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {featuredInvestors.map((investor, idx) => (
              <motion.div key={investor.id} transition={{ delay: idx * 0.1 }} className="bg-white/5 p-10 rounded-3xl border border-white/10 hover:border-[#D6825C]/50 transition-all text-center">
                <img src={investor.logo} alt={investor.name} className="w-20 h-20 bg-white rounded-2xl mx-auto mb-8 object-cover" />
                <h4 className="text-2xl font-black mb-4">{investor.name}</h4>
                <div className="flex justify-center flex-wrap gap-2">
                  {investor.verticals.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[9px] text-[#D6825C] font-black uppercase tracking-widest border border-[#D6825C]/30 px-3 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <button onClick={() => navigate('/funding')} className="bg-[#D6825C] text-white px-12 py-5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[#c4714e] transition-all">
            {t.investor_preview.cta}
          </button>
        </div>
      </section>

      <section className="py-32 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-20">
        {[
          { icon: <Zap size={32} fill="currentColor" />, title: t.about.pillar1Title, text: t.about.pillar1Text },
          { icon: <TrendingUp size={32} />, title: t.about.pillar2Title, text: t.about.pillar2Text },
          { icon: <Shield size={32} />, title: t.about.pillar3Title, text: t.about.pillar3Text }
        ].map((p, i) => (
          <div key={i} className="space-y-6">
            <div className="w-16 h-16 bg-[#1a2e26] text-[#D6825C] rounded-2xl flex items-center justify-center shadow-lg">
              {p.icon}
            </div>
            <h3 className="text-2xl font-black text-[#1a2e26] tracking-tight">{p.title}</h3>
            <p className="text-gray-500 leading-relaxed font-medium">{p.text}</p>
          </div>
        ))}
      </section>
    </motion.div>
  );
};

export default LandingPage;