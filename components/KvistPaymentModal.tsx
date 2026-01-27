
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Lock, CreditCard, CheckCircle2, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface KvistPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

const KvistPaymentModal: React.FC<KvistPaymentModalProps> = ({ isOpen, onClose, onPaymentSuccess }) => {
  const { t, language } = useApp();
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    // Simulation of payment processing
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
            {/* Close Button Mobile */}
            <button onClick={onClose} className="md:hidden absolute top-6 right-6 text-white/40 hover:text-white z-20">
              <X size={24} />
            </button>

            {/* Left Side: Order Summary */}
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

                <ul className="space-y-6">
                  {[t.checkout.feature1, t.checkout.feature2, t.checkout.feature3].map((f, i) => (
                    <li key={i} className="flex items-center space-x-4">
                      <div className="w-6 h-6 bg-[#2D5A4C] rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={14} className="text-white" />
                      </div>
                      <span className="font-bold text-white/80">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-16 pt-10 border-t border-white/5 relative z-10">
                <span className="block text-white/30 text-[10px] uppercase font-black tracking-widest mb-1">
                  {t.checkout.total_label}
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-5xl font-black tracking-tighter">400 DKK</span>
                  <span className="text-white/30 font-bold uppercase text-xs">/ {t.pricing.period}</span>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="md:w-1/2 p-10 md:p-16 bg-white flex flex-col justify-center">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-black text-[#1A2E26] tracking-tight flex items-center">
                   <Lock size={18} className="mr-2 text-[#2D5A4C]/30" />
                   {t.checkout.secure_label}
                </h3>
                <div className="flex space-x-2 opacity-30 grayscale">
                  <CreditCard size={24} />
                  <div className="w-8 h-5 bg-gray-200 rounded" />
                  <div className="w-8 h-5 bg-gray-200 rounded" />
                </div>
              </div>

              <form onSubmit={handlePayment} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">
                    {t.checkout.cardholder}
                  </label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Mads Mikkelsen"
                    className="w-full px-6 py-4 rounded-2xl bg-[#F4F7F5] border border-transparent focus:bg-white focus:border-[#D6825C]/30 outline-none font-bold text-[#1A2E26] transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">
                    {t.checkout.card_number}
                  </label>
                  <div className="relative group">
                    <CreditCard className="absolute left-6 top-1/2 -translate-y-1/2 text-[#1A2E26]/20 group-focus-within:text-[#D6825C] transition-colors" size={18} />
                    <input 
                      required
                      type="text" 
                      placeholder="0000 0000 0000 0000"
                      className="w-full pl-16 pr-6 py-4 rounded-2xl bg-[#F4F7F5] border border-transparent focus:bg-white focus:border-[#D6825C]/30 outline-none font-bold text-[#1A2E26] transition-all"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">
                      {t.checkout.expiry}
                    </label>
                    <input 
                      required
                      type="text" 
                      placeholder="MM / YY"
                      className="w-full px-6 py-4 rounded-2xl bg-[#F4F7F5] border border-transparent focus:bg-white focus:border-[#D6825C]/30 outline-none font-bold text-[#1A2E26] transition-all text-center"
                      value={formData.expiry}
                      onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">
                      {t.checkout.cvc}
                    </label>
                    <input 
                      required
                      type="text" 
                      placeholder="123"
                      maxLength={3}
                      className="w-full px-6 py-4 rounded-2xl bg-[#F4F7F5] border border-transparent focus:bg-white focus:border-[#D6825C]/30 outline-none font-bold text-[#1A2E26] transition-all text-center"
                      value={formData.cvc}
                      onChange={(e) => setFormData({...formData, cvc: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={processing}
                  className={`w-full mt-8 py-6 rounded-2xl font-black text-xl tracking-widest transition-all shadow-2xl active:scale-[0.98] flex items-center justify-center space-x-3 uppercase ${
                    processing 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#D6825C] text-white hover:bg-[#2D5A4C] shadow-[#D6825C]/20'
                  }`}
                >
                  {processing ? (
                    <>
                      <Loader2 className="animate-spin" size={24} />
                      <span className="text-sm">{t.checkout.processing}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.checkout.pay_btn} 400 DKK</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 flex items-center justify-center space-x-3 text-[9px] font-black text-[#1A2E26]/30 uppercase tracking-[0.2em]">
                 <div className="flex items-center space-x-1">
                   <ShieldCheck size={12} className="text-green-500" />
                   <span>{t.checkout.security_note}</span>
                 </div>
              </div>

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
