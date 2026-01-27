
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Lock, CreditCard, CheckCircle2, Loader2, Zap, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Stripe Integration Keys
const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_live_51Lr55EEzvJolWBuXRJuEsjXEXUQNXFeVKYIlW5anghgDxG44l1P8qXIUFQu8rHoEijjcfTzwuD0jvAGG91ALZNLB00YAthJx0g';

interface VelixPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  entityCvr?: string;
}

const VelixPaymentModal: React.FC<VelixPaymentModalProps> = ({ isOpen, onClose, onPaymentSuccess, entityCvr = '' }) => {
  const { t, getCheckoutPrice, language } = useApp();
  const [processing, setProcessing] = useState(false);
  
  // Safety check for translations
  const checkoutText = t.checkout || {
    secure_label: 'Secure',
    summary_title: 'Order Summary',
    subtitle: 'Processing via Velix Protocol',
    feature1: 'Verified Listing',
    feature2: 'Advanced Analytics',
    feature3: 'Priority Signal',
    total_label: 'Total',
    powered_by: 'VELIX 2026',
    pay_btn: 'Authorize Payment',
    processing: 'Syncing...'
  };

  const pricing = getCheckoutPrice(entityCvr) || { amount: 54, currency: 'eur' };
  const displayPrice = pricing.currency === 'dkk' ? '400 DKK' : '€54.00';

  const handleStripeCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // In production, this would initialize a Stripe Checkout Session
      console.log(`[Stripe Bridge] Initiating session for ${pricing.amount} ${pricing.currency.toUpperCase()}`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      onPaymentSuccess();
      setProcessing(false);
    } catch (error) {
      console.error('Stripe Protocol Error:', error);
      setProcessing(false);
    }
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
            className="absolute inset-0 bg-[#1a2e26]/80 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row border border-white/10"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-[#1a2e26]/20 hover:text-[#1a2e26] z-20 transition-colors">
              <X size={24} />
            </button>

            {/* Left Side: Order Summary */}
            <div className="md:w-1/2 bg-[#1a2e26] p-10 md:p-16 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full mb-8 border border-white/10">
                  <ShieldCheck size={14} className="text-[#D6825C]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{checkoutText.secure_label}</span>
                </div>
                
                <h2 className="text-4xl font-black mb-4 tracking-tighter uppercase leading-none">
                  {checkoutText.summary_title}
                </h2>
                <p className="text-white/50 mb-10 font-medium text-lg leading-relaxed">
                  {checkoutText.subtitle}
                </p>

                <ul className="space-y-6">
                  {[checkoutText.feature1, checkoutText.feature2, checkoutText.feature3].map((f, i) => (
                    <li key={i} className="flex items-center space-x-4">
                      <div className="w-6 h-6 bg-[#D6825C] rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={14} className="text-white" />
                      </div>
                      <span className="font-bold text-white/80">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-16 pt-10 border-t border-white/5 relative z-10">
                <span className="block text-white/30 text-[10px] uppercase font-black tracking-widest mb-1">
                  {checkoutText.total_label}
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-5xl font-black tracking-tighter">{displayPrice}</span>
                  <span className="text-white/30 font-bold uppercase text-xs">/ ONE-TIME</span>
                </div>
              </div>
            </div>

            {/* Right Side: Action */}
            <div className="md:w-1/2 p-10 md:p-16 bg-white flex flex-col justify-center">
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-[#1a2e26]/20 border border-[#1a2e26]/5">
                  <Lock size={32} />
                </div>
                <h3 className="text-2xl font-black text-[#1a2e26] tracking-tight mb-2 uppercase">Secure Node Link</h3>
                <p className="text-sm text-[#1a2e26]/40 font-medium px-4">
                  Authenticated redirect to the Stripe Secure Bridge. The protocol will auto-detect your region ({pricing.currency.toUpperCase()}).
                </p>
              </div>

              <button 
                onClick={handleStripeCheckout}
                disabled={processing}
                className={`w-full py-6 rounded-2xl font-black text-xl tracking-widest transition-all shadow-2xl active:scale-[0.98] flex items-center justify-center space-x-3 uppercase ${
                  processing 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-[#D6825C] text-white hover:bg-[#c4714e] shadow-[#D6825C]/20'
                }`}
              >
                {processing ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    <span className="text-sm">{checkoutText.processing}</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Stripe</span>
                  </>
                )}
              </button>

              <div className="mt-10 flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-3 text-[10px] font-black text-[#1a2e26]/30 uppercase tracking-[0.2em]">
                   <Globe size={12} className="text-[#D6825C]" />
                   <span>Automatic Locale: {language === 'da' ? 'Danish' : 'English'}</span>
                </div>
                <p className="text-[9px] text-[#1a2e26]/20 uppercase tracking-widest font-bold text-center">
                  {checkoutText.powered_by}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VelixPaymentModal;
