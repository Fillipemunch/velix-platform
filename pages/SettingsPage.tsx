
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User, CreditCard, Shield, Bell, ArrowLeft, Camera, 
  Download, Zap, CheckCircle2, ChevronRight,
  Settings as SettingsIcon, AlertCircle, Save, Database
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { t, language } = useApp();
  const { user, isSubscribed } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'billing' | 'security' | 'notifications'>('billing');
  const [isSaved, setIsSaved] = useState(false);

  const [formData, setFormData] = useState({
    startupName: user?.name || 'My Startup',
    email: user?.email || 'admin@startup.com',
    bio: 'Innovative technology scaling across the European Nexus.',
    notifCandidates: true,
    notifMarketing: false
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const menuItems = [
    { id: 'profile', label: t.settings.tab_profile, icon: <User size={18} /> },
    { id: 'billing', label: t.settings.tab_billing, icon: <CreditCard size={18} /> },
    { id: 'security', label: t.settings.tab_security, icon: <Shield size={18} /> },
    { id: 'notifications', label: t.settings.tab_notifications, icon: <Bell size={18} /> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 min-h-screen bg-[#F8FAFC]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-3 text-[#0A1128]/30 hover:text-[#5865F2] mb-12 font-black text-[10px] uppercase tracking-[0.3em] transition-all group active:scale-95"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>{t.common.back}</span>
        </button>

        <header className="mb-16">
          <h1 className="text-5xl font-black text-[#0A1128] tracking-tighter uppercase flex items-center">
            <SettingsIcon className="mr-6 text-[#5865F2]" size={36} />
            {t.settings.title}
          </h1>
          <p className="text-[#0A1128]/30 font-black uppercase tracking-[0.2em] text-[10px] mt-4 ml-14">{t.settings.subtitle}</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar Navigation */}
          <aside className="lg:w-72 space-y-3 flex-shrink-0">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center space-x-4 px-8 py-5 rounded-[1.5rem] font-bold text-sm transition-all group ${
                  activeTab === item.id 
                  ? 'bg-[#0A1128] text-white shadow-2xl shadow-[#0A1128]/20' 
                  : 'text-[#0A1128]/40 hover:text-[#0A1128] hover:bg-white transition-colors border border-transparent hover:border-[#0A1128]/5'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 bg-white rounded-[3.5rem] p-10 md:p-16 border border-[#0A1128]/5 shadow-sm min-h-[600px]">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div 
                  key="profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-12"
                >
                  <h2 className="text-3xl font-black text-[#0A1128] tracking-tight border-b border-slate-50 pb-8 uppercase">
                    {t.settings.profile_header}
                  </h2>
                  
                  <div className="flex items-center space-x-10 mb-12">
                    <div className="relative group cursor-pointer">
                      <div className="w-28 h-28 bg-slate-50 rounded-[2rem] flex items-center justify-center text-[#5865F2] font-black text-4xl border border-[#0A1128]/5 group-hover:bg-slate-100 transition-all shadow-inner">
                        {formData.startupName[0]}
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-white p-3 rounded-2xl shadow-xl border border-slate-50 group-hover:scale-110 transition-transform">
                        <Camera size={16} className="text-[#5865F2]" />
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-black text-[#0A1128] mb-1">Entity Digital Asset</p>
                      <p className="text-[10px] font-black text-[#0A1128]/20 uppercase tracking-widest">SVG, PDF or PNG • Max 4MB • Square Node</p>
                    </div>
                  </div>

                  <form onSubmit={handleSave} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#0A1128]/30 ml-3">{t.settings.profile_name}</label>
                        <input 
                          type="text" 
                          className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-[#5865F2] outline-none font-bold text-[#0A1128] transition-all shadow-sm" 
                          value={formData.startupName}
                          onChange={(e) => setFormData({...formData, startupName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#0A1128]/30 ml-3">{t.settings.profile_email}</label>
                        <input 
                          type="email" 
                          className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-[#5865F2] outline-none font-bold text-[#0A1128] transition-all shadow-sm" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#0A1128]/30 ml-3">{t.settings.profile_bio}</label>
                      <textarea 
                        rows={5}
                        className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-[#5865F2] outline-none font-bold text-[#0A1128] transition-all resize-none shadow-sm leading-relaxed" 
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      />
                    </div>
                    <button type="submit" className="bg-[#5865F2] text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#4752C4] transition-all active:scale-95 flex items-center space-x-3 shadow-xl shadow-[#5865F2]/20">
                      <Save size={18} />
                      <span>{t.settings.save_btn}</span>
                    </button>
                  </form>
                </motion.div>
              )}

              {activeTab === 'billing' && (
                <motion.div 
                  key="billing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-16"
                >
                  <h2 className="text-3xl font-black text-[#0A1128] tracking-tight border-b border-slate-50 pb-8 uppercase">
                    {t.settings.billing_header}
                  </h2>

                  {/* Plan Card */}
                  <div className={`p-12 rounded-[3.5rem] border-2 relative overflow-hidden transition-all ${isSubscribed ? 'border-[#5865F2] bg-[#5865F2]/5 shadow-2xl shadow-[#5865F2]/5' : 'border-dashed border-slate-200 bg-white'}`}>
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#5865F2]/5 rounded-full -mr-24 -mt-24 z-0" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                      <div>
                        <div className="flex items-center space-x-4 mb-3">
                          <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${isSubscribed ? 'bg-[#5865F2] text-white' : 'bg-slate-100 text-slate-400'}`}>
                            {isSubscribed ? t.settings.plan_premium : t.settings.plan_free}
                          </span>
                        </div>
                        <p className="text-5xl font-black text-[#0A1128] tracking-tighter">
                          {isSubscribed ? '54.00 €' : '0.00 €'}
                          <span className="text-base font-bold text-[#0A1128]/30 uppercase tracking-widest ml-3">/ {t.pricing.period}</span>
                        </p>
                        {isSubscribed && (
                          <div className="flex items-center mt-8 space-x-6 text-xs font-bold text-[#0A1128]/50">
                            <span className="flex items-center"><CheckCircle2 size={16} className="text-[#5865F2] mr-2" /> Auto-Renewing</span>
                            <span className="uppercase tracking-widest text-[10px]">{t.settings.next_billing}: Feb 22, 2026</span>
                          </div>
                        )}
                      </div>
                      
                      {isSubscribed ? (
                        <button className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-500 hover:underline transition-colors active:scale-95">
                          {t.settings.cancel_plan}
                        </button>
                      ) : (
                        <button 
                          onClick={() => navigate('/pricing')}
                          className="bg-[#5865F2] text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#4752C4] transition-all shadow-2xl shadow-[#5865F2]/20 active:scale-95 flex items-center group"
                        >
                          Initialize Upgrade
                          <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>

                  {!isSubscribed && (
                    <div className="bg-[#0A1128] p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-40 -mt-40 z-0 group-hover:scale-110 transition-transform duration-1000" />
                      <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center mb-8">
                          <Zap size={32} className="text-[#00D1FF]" fill="currentColor" />
                        </div>
                        <h3 className="text-3xl font-black mb-3 tracking-tight">{t.settings.upgrade_banner_title}</h3>
                        <p className="text-white/50 mb-10 font-medium max-w-sm text-lg leading-relaxed">{t.settings.upgrade_banner_desc}</p>
                        <button 
                          onClick={() => navigate('/pricing')}
                          className="px-12 py-5 bg-[#5865F2] hover:bg-[#4752C4] rounded-full font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-[#5865F2]/20"
                        >
                          View Pricing Matrix
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Billing History Table */}
                  <div className="pt-8">
                    <h3 className="text-xl font-black text-[#0A1128] mb-10 uppercase tracking-[0.2em] flex items-center">
                       <AlertCircle size={20} className="mr-4 text-[#5865F2]" />
                       {t.settings.billing_history}
                    </h3>
                    <div className="space-y-3">
                      {[
                        { date: 'Jan 22, 2026', amount: '54.00 €' },
                        { date: 'Dec 22, 2025', amount: '54.00 €' }
                      ].map((invoice, i) => (
                        <div key={i} className="flex items-center justify-between p-8 bg-slate-50/50 rounded-[2rem] border border-transparent hover:border-[#5865F2]/10 transition-all group shadow-sm hover:shadow-xl">
                          <div className="flex items-center space-x-8">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#5865F2] shadow-sm">
                              <Download size={20} />
                            </div>
                            <div>
                              <p className="text-lg font-black text-[#0A1128]">{invoice.date}</p>
                              <p className="text-[10px] font-bold text-[#0A1128]/20 uppercase tracking-widest mt-1">VX-2026-00{i+1}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-12">
                            <span className="text-xl font-black text-[#0A1128]">{invoice.amount}</span>
                            <button className="flex items-center text-[10px] font-black uppercase tracking-widest text-[#5865F2] hover:underline active:scale-90 transition-all">
                               {t.settings.download_pdf}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div 
                  key="security"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-12"
                >
                  <h2 className="text-3xl font-black text-[#0A1128] tracking-tight border-b border-slate-50 pb-8 uppercase">
                    {t.settings.security_header}
                  </h2>
                  
                  <div className="space-y-10">
                    <div className="max-w-md space-y-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#0A1128]/30 ml-3">Current Vault Key</label>
                        <input type="password" placeholder="••••••••" className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-[#5865F2] outline-none font-bold text-[#0A1128] transition-all shadow-sm" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#0A1128]/30 ml-3">New Vault Key</label>
                        <input type="password" placeholder="••••••••" className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-[#5865F2] outline-none font-bold text-[#0A1128] transition-all shadow-sm" />
                      </div>
                    </div>
                    <button className="bg-[#0A1128] text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#1A2542] transition-all active:scale-95 shadow-xl shadow-[#0A1128]/20">
                      Update Vault
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div 
                  key="notifications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-12"
                >
                  <h2 className="text-3xl font-black text-[#0A1128] tracking-tight border-b border-slate-50 pb-8 uppercase">
                    {t.settings.notifications_header}
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-10 bg-slate-50/50 rounded-[2.5rem] border border-transparent hover:border-[#5865F2]/10 transition-all group">
                      <div>
                        <h4 className="text-xl font-black text-[#0A1128] mb-2">{t.settings.notif_candidates}</h4>
                        <p className="text-sm font-medium text-[#0A1128]/50 max-w-sm leading-relaxed">Real-time alerts when new candidates interface with your nexus nodes.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={formData.notifCandidates} onChange={() => setFormData({...formData, notifCandidates: !formData.notifCandidates})} />
                        <div className="w-16 h-9 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-[#5865F2] shadow-inner"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-10 bg-slate-50/50 rounded-[2.5rem] border border-transparent hover:border-[#5865F2]/10 transition-all group">
                      <div>
                        <h4 className="text-xl font-black text-[#0A1128] mb-2">{t.settings.notif_marketing}</h4>
                        <p className="text-sm font-medium text-[#0A1128]/50 max-w-sm leading-relaxed">Strategic intel about European ecosystem trends and hiring velocity.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={formData.notifMarketing} onChange={() => setFormData({...formData, notifMarketing: !formData.notifMarketing})} />
                        <div className="w-16 h-9 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-[#5865F2] shadow-inner"></div>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Save indicator for modular tabs */}
            <AnimatePresence>
              {isSaved && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="fixed bottom-12 right-12 bg-[#5865F2] text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl flex items-center space-x-3 z-[100]"
                >
                  <CheckCircle2 size={18} />
                  <span>{t.settings.success_save}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
