
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, MapPin, Coins, Info, CheckCircle2, ShieldCheck, Link as LinkIcon, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PaywallGate from './PaywallGate';
import VelixPaymentModal from './VelixPaymentModal';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (job: any) => void;
}

const PostJobModal: React.FC<PostJobModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const { t, language } = useApp();
  const [step, setStep] = useState(1);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: 'Copenhagen',
    region: 'Hovedstaden' as any,
    type: 'Fuldtid',
    salaryMin: '',
    salaryMax: '',
    cvr: '',
    linkedinUrl: ''
  });

  const handleSyncAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsCheckoutOpen(false);
    const formattedSalary = `${formData.salaryMin} - ${formData.salaryMax} EUR`;
    
    onSubmit({
      title: formData.title,
      description: formData.description,
      location: formData.location,
      region: formData.region,
      type: formData.type as any,
      salaryRange: formattedSalary,
      cvr: formData.cvr,
      linkedinUrl: formData.linkedinUrl
    });
    
    setStep(3);
    setTimeout(() => {
      onClose();
      setStep(1);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1a2e26]/60 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-[#F9FBF9] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-[#1a2e26]/10"
          >
            <div className="p-8 border-b border-[#1a2e26]/5 flex justify-between items-center bg-white">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#1a2e26]/5 rounded-xl flex items-center justify-center text-[#1a2e26]">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#1a2e26] uppercase">Market Entry Protocol</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#D6825C]">Step {step} of 2</p>
                </div>
              </div>
              <button onClick={onClose} className="text-[#1a2e26]/20 hover:text-[#1a2e26] transition-colors p-2">
                <X size={24} />
              </button>
            </div>

            <div className="p-10 max-h-[80vh] overflow-y-auto">
              {step === 1 && (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1a2e26]/40 ml-2">Position Identity</label>
                    <input 
                      autoFocus required type="text" placeholder="e.g. Lead Product Architect"
                      className="w-full px-6 py-4 rounded-xl bg-white border border-[#1a2e26]/10 focus:border-[#D6825C] outline-none font-bold text-[#1a2e26] transition-all shadow-sm" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#1a2e26]/40 ml-2">{t.forms.cvr_label}</label>
                      <input 
                        required type="text" placeholder="DK-12345678"
                        className="w-full px-6 py-4 rounded-xl bg-white border border-[#1a2e26]/10 focus:border-[#D6825C] outline-none font-bold text-[#1a2e26] shadow-sm" 
                        value={formData.cvr}
                        onChange={(e) => setFormData({...formData, cvr: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#1a2e26]/40 ml-2">{t.forms.linkedin_label}</label>
                      <div className="relative">
                        <LinkIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a2e26]/30" />
                        <input 
                          required type="url" placeholder="linkedin.com/in/..."
                          className="w-full pl-12 pr-6 py-4 rounded-xl bg-white border border-[#1a2e26]/10 focus:border-[#D6825C] outline-none font-bold text-[#1a2e26] shadow-sm" 
                          value={formData.linkedinUrl}
                          onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1a2e26] p-6 rounded-2xl text-white/80 text-xs font-medium flex items-start space-x-4 border border-white/5">
                    <ShieldCheck size={20} className="text-[#D6825C] flex-shrink-0" />
                    <p>{t.forms.moderation_note}</p>
                  </div>

                  <button 
                    onClick={() => setStep(2)}
                    disabled={!formData.title || !formData.cvr || !formData.linkedinUrl}
                    className="w-full bg-[#1a2e26] text-white py-5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all disabled:opacity-30"
                  >
                    Configure Details
                  </button>
                </div>
              )}

              {step === 2 && (
                <form onSubmit={handleSyncAttempt} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#1a2e26]/40 ml-2">Agreement Node</label>
                      <select 
                        className="w-full px-6 py-4 rounded-xl bg-white border border-[#1a2e26]/10 font-bold text-[#1a2e26] outline-none" 
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                      >
                        <option value="Fuldtid">Full-time Node</option>
                        <option value="Deltid">Agile/Part-time</option>
                        <option value="Praktik">Apprenticeship</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#1a2e26]/40 ml-2">Total Comp Node (EUR)</label>
                      <div className="grid grid-cols-2 gap-2">
                         <input type="number" placeholder="Min" className="w-full px-4 py-4 rounded-xl bg-white border border-[#1a2e26]/10 font-bold" value={formData.salaryMin} onChange={(e) => setFormData({...formData, salaryMin: e.target.value})} />
                         <input type="number" placeholder="Max" className="w-full px-4 py-4 rounded-xl bg-white border border-[#1a2e26]/10 font-bold" value={formData.salaryMax} onChange={(e) => setFormData({...formData, salaryMax: e.target.value})} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1a2e26]/40 ml-2">Mission Parameters</label>
                    <textarea 
                      required rows={5} placeholder="Describe the mission outcomes and tech requirements..."
                      className="w-full px-6 py-4 rounded-xl bg-white border border-[#1a2e26]/10 focus:border-[#D6825C] outline-none font-bold text-[#1a2e26] shadow-sm resize-none" 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>

                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 border border-[#1a2e26]/10 text-[#1a2e26] py-5 rounded-xl font-black text-xs uppercase tracking-widest">Back</button>
                    <button type="submit" className="flex-[2] bg-[#D6825C] text-white py-5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center space-x-2">
                      <Sparkles size={16} />
                      <span>Proceed to Payment</span>
                    </button>
                  </div>
                </form>
              )}

              {step === 3 && (
                <div className="text-center py-20 flex flex-col items-center">
                  <div className="w-24 h-24 bg-[#1a2e26]/5 text-[#1a2e26] rounded-2xl flex items-center justify-center mb-8 animate-pulse">
                    <ShieldCheck size={48} />
                  </div>
                  <h3 className="text-3xl font-black text-[#1a2e26] mb-3 uppercase tracking-tight">Syncing with Protocol</h3>
                  <p className="text-[#1a2e26]/40 font-bold uppercase tracking-widest text-[10px] max-w-sm mx-auto leading-relaxed">
                    {t.forms.moderation_note}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          <VelixPaymentModal 
            isOpen={isCheckoutOpen} 
            onClose={() => setIsCheckoutOpen(false)} 
            onPaymentSuccess={handlePaymentSuccess}
            entityCvr={formData.cvr}
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export default PostJobModal;
