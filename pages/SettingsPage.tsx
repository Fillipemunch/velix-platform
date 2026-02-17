import React, { useState, useRef } from 'react';
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
  const { user, isSubscribed, updateProfileImage } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'billing' | 'security' | 'notifications'>('profile');
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    startupName: user?.name || 'Velix Node',
    email: user?.email || '',
    bio: '',
    notifCandidates: true,
    notifMarketing: false
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        updateProfileImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const billingHistory: any[] = [];

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
          className="flex items-center space-x-3 text-[#0A1128]/30 hover:text-[#D6825C] mb-12 font-black text-[10px] uppercase tracking-[0.3em] transition-all group active:scale-95"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>{t.common.back}</span>
        </button>

        <header className="mb-16">
          <h1 className="text-5xl font-black text-[#0A1128] tracking-tighter uppercase flex items-center">
            <SettingsIcon className="mr-6 text-[#D6825C]" size={36} />
            {t.settings.title}
          </h1>
          <p className="text-[#0A1128]/30 font-black uppercase tracking-[0.2em] text-[10px] mt-4 ml-14">{t.settings.subtitle}</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-16">
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
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="relative group cursor-pointer"
                    >
                      <div className="w-28 h-28 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-[#D6825C] font-black text-4xl border border-[#0A1128]/5 group-hover:bg-slate-200 transition-all shadow-inner overflow-hidden">
                        {user?.profileImage ? (
                          <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <span>{formData.startupName[0]}</span>
                        )}
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-white p-3 rounded-2xl shadow-xl border border-slate-50 group-hover:scale-110 transition-transform">
                        <Camera size={16} className="text-[#D6825C]" />
                      </div>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                      />
                    </div>
                    <div>
                      <p className="text-lg font-black text-[#0A1128] mb-1">Entity Digital Asset</p>
                      <p className="text-[10px] font-black text-[#0A1128]/20 uppercase tracking-widest">SVG, PDF or PNG • MAX 4MB • SQUARE NODE</p>
                    </div>
                  </div>

                  <form onSubmit={handleSave} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#0A1128]/30 ml-3">{t.settings.profile_name}</label>
                        <input 
                          type="text" 
                          className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-[#D6825C] outline-none font-bold text-[#1A2E26] transition-all shadow-sm" 
                          value={formData.startupName}
                          onChange={(e) => setFormData({...formData, startupName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#0A1128]/30 ml-3">{t.settings.profile_email}</label>
                        <input 
                          type="email" 
                          className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white outline-none font-bold text-[#1A2E26] transition-all shadow-sm opacity-60" 
                          value={formData.email}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#0A1128]/30 ml-3">{t.settings.profile_bio}</label>
                      <textarea 
                        rows={5}
                        className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-[#D6825C] outline-none font-bold text-[#1A2E26] transition-all resize-none shadow-sm leading-relaxed" 
                        value={formData.bio}
                        placeholder="Define your entity's bio..."
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      />
                    </div>
                    <button type="submit" className="bg-[#1a2e26] text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#D6825C] transition-all active:scale-95 flex items-center space-x-3 shadow-xl">
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

                  <div className={`p-12 rounded-[3.5rem] border-2 relative overflow-hidden transition-all ${isSubscribed ? 'border-[#D6825C] bg-[#D6825C]/5 shadow-2xl shadow-[#D6825C]/5' : 'border-dashed border-slate-200 bg-white'}`}>
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#D6825C]/5 rounded-full -mr-24 -mt-24 z-0" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                      <div>
                        <div className="flex items-center space-x-4 mb-3">
                          <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${isSubscribed ? 'bg-[#D6825C] text-white' : 'bg-slate-100 text-slate-400'}`}>
                            {isSubscribed ? t.settings.plan_premium : t.settings.plan_free}
                          </span>
                        </div>
                        <p className="text-5xl font-black text-[#0A1128] tracking-tighter uppercase">
                          {isSubscribed ? t.pricing.price : '0.00 €'}
                          <span className="text-base font-bold text-[#0A1128]/30 uppercase tracking-widest ml-3">/ {t.pricing.period}</span>
                        </p>
                        {isSubscribed && (
                          <div className="flex items-center mt-8 space-x-6 text-xs font-bold text-[#0A1128]/50">
                            <span className="flex items-center"><CheckCircle2 size={16} className="text-[#D6825C] mr-2" /> {t.settings.plan_premium}</span>
                            <span className="uppercase tracking-widest text-[10px]">{t.settings.next_billing}: Active Node</span>
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
                          className="bg-[#1a2e26] text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#D6825C] transition-all shadow-2xl active:scale-95 flex items-center group"
                        >
                          Initialize Upgrade
                          <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <AnimatePresence>
              {isSaved && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="fixed bottom-12 right-12 bg-[#D6825C] text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl flex items-center space-x-3 z-[100]"
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