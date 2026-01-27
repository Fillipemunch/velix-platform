
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Rocket, Globe, Target, FileText, Camera, CheckCircle2, Mail, ShieldAlert } from 'lucide-react';
import PaywallGate from '../components/PaywallGate';

const InvestorOnboarding: React.FC = () => {
  const { t, language, addInvestor } = useApp();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    website: '',
    stages: [] as string[],
    verticals: '',
    thesis: '',
    corporateEmail: '',
    cvr: '',
    linkedinUrl: ''
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleStage = (stage: string) => {
    setFormData(prev => ({
      ...prev,
      stages: prev.stages.includes(stage)
        ? prev.stages.filter(s => s !== stage)
        : [...prev.stages, stage]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Production rule: Basic corporate email check (must not be public provider)
    const publicProviders = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com'];
    const domain = formData.corporateEmail.split('@')[1];
    if (publicProviders.includes(domain)) {
      alert('Capital access requires a verified corporate email domain. Public providers are not permitted.');
      return;
    }

    addInvestor({
      name: formData.name,
      website: formData.website,
      logo: logoPreview || `https://via.placeholder.com/100?text=${formData.name[0]}`,
      stages: formData.stages,
      stage: formData.stages[0] || 'Early Stage',
      verticals: formData.verticals.split(',').map(v => v.trim()),
      focus: formData.verticals.split(',').map(v => v.trim()).slice(0, 2),
      summary: formData.thesis.substring(0, 120) + '...',
      thesis: formData.thesis,
      corporateEmail: formData.corporateEmail,
      cvr: formData.cvr,
      linkedinUrl: formData.linkedinUrl
    });

    setIsSubmitted(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-24 min-h-screen bg-[#F9FBF9]"
    >
      <div className="max-w-4xl mx-auto px-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-3 text-[#1a2e26]/60 hover:text-[#1a2e26] mb-12 font-bold text-xs uppercase tracking-widest transition-all group active:scale-95"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>{t.common.back}</span>
        </button>

        <header className="mb-16 text-center">
          <div className="inline-flex items-center space-x-3 mb-6 bg-[#1a2e26]/5 px-6 py-2 rounded-full border border-[#1a2e26]/10">
            <ShieldAlert className="text-[#D6825C]" size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a2e26]">Capital Entry Protocol</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#1a2e26] mb-4 tracking-tighter uppercase leading-none">
            {t.investor_onboarding.title}
          </h1>
          <p className="text-lg text-[#1a2e26]/60 font-medium max-w-xl mx-auto leading-relaxed">
            {t.investor_onboarding.subtitle}
          </p>
        </header>

        <PaywallGate>
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-[#1a2e26]/5 border border-[#1a2e26]/5 p-8 md:p-16 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit} 
                  className="space-y-12"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1a2e26]/40">
                      {t.investor_onboarding.logo}
                    </label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-32 h-32 bg-[#F9FBF9] rounded-[2rem] border-2 border-dashed border-[#1a2e26]/10 flex flex-col items-center justify-center cursor-pointer hover:border-[#D6825C] hover:bg-[#D6825C]/5 transition-all group overflow-hidden relative"
                    >
                      {logoPreview ? (
                        <img src={logoPreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <Camera size={28} className="text-[#1a2e26]/20 group-hover:text-[#D6825C] transition-colors mb-2" />
                          <span className="text-[8px] font-black text-[#1a2e26]/40 uppercase tracking-widest text-center px-4">
                            {t.investor_onboarding.upload_hint}
                          </span>
                        </>
                      )}
                      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoChange} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#1a2e26]/40 ml-2">{t.investor_onboarding.firm_name}</label>
                      <input required type="text" className="w-full px-6 py-4 rounded-xl bg-[#F9FBF9] border border-[#1a2e26]/5 focus:border-[#D6825C] outline-none font-bold text-[#1a2e26] transition-all" placeholder="e.g. Copenhagen Capital" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#1a2e26]/40 ml-2">{t.forms.corporate_email}</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a2e26]/30" />
                        <input required type="email" className="w-full pl-12 pr-6 py-4 rounded-xl bg-[#F9FBF9] border border-[#1a2e26]/5 focus:border-[#D6825C] outline-none font-bold text-[#1a2e26]" placeholder="partner@fund.com" value={formData.corporateEmail} onChange={(e) => setFormData({...formData, corporateEmail: e.target.value})} />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#1a2e26]/40 ml-2">{t.forms.cvr_label}</label>
                      <input required type="text" className="w-full px-6 py-4 rounded-xl bg-[#F9FBF9] border border-[#1a2e26]/5 focus:border-[#D6825C] outline-none font-bold text-[#1a2e26]" placeholder="DK-12345678" value={formData.cvr} onChange={(e) => setFormData({...formData, cvr: e.target.value})} />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#1a2e26]/40 ml-2">{t.forms.linkedin_label}</label>
                      <input required type="url" className="w-full px-6 py-4 rounded-xl bg-[#F9FBF9] border border-[#1a2e26]/5 focus:border-[#D6825C] outline-none font-bold text-[#1a2e26]" placeholder="linkedin.com/company/..." value={formData.linkedinUrl} onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1a2e26]/40 ml-2">Venture Maturity</label>
                    <div className="flex flex-wrap gap-3">
                      {['Pre-seed', 'Seed', 'Series A', 'Series B+'].map(stage => (
                        <button key={stage} type="button" onClick={() => toggleStage(stage)} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${formData.stages.includes(stage) ? 'bg-[#1a2e26] border-[#1a2e26] text-white shadow-lg' : 'bg-[#F9FBF9] border-transparent text-[#1a2e26]/40 hover:bg-white hover:border-[#1a2e26]/20'}`}>
                          {stage}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1a2e26]/40 ml-2">Core Thesis</label>
                    <textarea required rows={5} className="w-full px-6 py-4 rounded-xl bg-[#F9FBF9] border border-[#1a2e26]/5 focus:border-[#D6825C] outline-none font-bold text-[#1a2e26] shadow-inner resize-none leading-relaxed" placeholder="Describe your fund's strategic direction and value creation model..." value={formData.thesis} onChange={(e) => setFormData({...formData, thesis: e.target.value})} />
                  </div>

                  <div className="bg-[#D6825C]/5 p-6 rounded-2xl border border-[#D6825C]/10 text-xs font-bold text-[#1a2e26]/60 leading-relaxed flex items-start space-x-4">
                     <CheckCircle2 size={18} className="text-[#D6825C] flex-shrink-0" />
                     <p>{t.forms.moderation_note}</p>
                  </div>

                  <button type="submit" disabled={formData.stages.length === 0} className="w-full py-6 bg-[#1a2e26] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#233f34] transition-all shadow-xl disabled:opacity-30">
                    Submit for Vetting
                  </button>
                </motion.form>
              ) : (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-20 text-center flex flex-col items-center">
                  <div className="w-24 h-24 bg-[#1a2e26]/5 text-[#1a2e26] rounded-2xl flex items-center justify-center mb-8 animate-bounce"><CheckCircle2 size={48} /></div>
                  <h3 className="text-3xl font-black text-[#1a2e26] mb-3 uppercase tracking-tight">{t.investor_onboarding.success_title}</h3>
                  <p className="text-[#1a2e26]/40 font-bold uppercase tracking-widest text-[10px] max-w-sm mx-auto mb-12 leading-relaxed">
                    {t.investor_onboarding.success_msg}
                  </p>
                  <div className="animate-pulse text-[#D6825C] font-black uppercase tracking-[0.2em] text-[10px]">Processing Request...</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </PaywallGate>
      </div>
    </motion.div>
  );
};

export default InvestorOnboarding;
