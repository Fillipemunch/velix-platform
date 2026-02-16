import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Lock, CheckCircle2, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface KvistPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

const KvistPaymentModal: React.FC<KvistPaymentModalProps> = ({ isOpen, onClose, onPaymentSuccess }) => {
  const { t } = useApp();
  const [processing, setProcessing] = useState(false);
  const [name, setName] = useState('');

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onPaymentSuccess();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1A2E26]/80 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row border border-[#2D5A4C]/10"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-white/40 hover:text-white z-20 transition-colors">
              <X size={24} />
            </button>

            <div className="md:w-1/2 bg-[#1A2E26] p-10 md:p-16 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full mb-8 border border-white/10">
                  <ShieldCheck size={14} className="text-[#D6825C]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t.checkout.secure_label}</span>
                </div>
                
                <h2 className="text-4xl font-black mb-4 tracking-tighter uppercase leading-none">
                  {t.checkout.summary_title}
                </h2>
                <p className="text-white/50 mb-10 font-medium text-lg">
                  {t.checkout.subtitle}
                </p>
              </div>

              <div className="mt-16 pt-10 border-t border-white/5 relative z-10">
                <span className="block text-white/30 text-[10px] uppercase font-black tracking-widest mb-1">
                  {t.checkout.total_label}
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-5xl font-black tracking-tighter">SUBSIDIZED</span>
                  <span className="text-white/30 font-bold uppercase text-xs">/ {t.pricing.period}</span>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 p-10 md:p-16 bg-white flex flex-col justify-center">
              <div className="text-center mb-12">
                 <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-[#1a2e26]/20 border border-[#1a2e26]/5">
                   <Lock size={32} />
                 </div>
                 <h3 className="text-2xl font-black text-[#1A2E26] tracking-tight mb-2 uppercase">Secure Activation</h3>
                 <p className="text-sm text-[#1A2E26]/40 font-medium px-4">
                   Activate your entry to the Nexus. This broadcast is currently subsidized by the Protocol.
                 </p>
              </div>

              <form onSubmit={handlePayment} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">
                    {t.checkout.cardholder}
                  </label>
                  <input 
                    required
                    type="text" 
                    placeholder="Full Entity Name"
                    className="w-full px-6 py-4 rounded-2xl bg-[#F4F7F5] border border-transparent focus:bg-white focus:border-[#D6825C]/30 outline-none font-bold text-[#1A2E26] transition-all"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <button 
                  type="submit"
                  disabled={processing}
                  className={`w-full mt-8 py-6 rounded-2xl font-black text-xl tracking-widest transition-all shadow-2xl active:scale-[0.98] flex items-center justify-center space-x-3 uppercase ${
                    processing 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#D6825C] text-white hover:bg-[#c4714e] shadow-[#D6825C]/20'
                  }`}
                >
                  {processing ? (
                    <>
                      <Loader2 className="animate-spin" size={24} />
                      <span className="text-sm">{t.checkout.processing}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.checkout.pay_btn}</span>
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-[9px] text-[#1A2E26]/20 mt-10 uppercase tracking-widest font-bold">
                {t.checkout.powered_by}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default KvistPaymentModal;