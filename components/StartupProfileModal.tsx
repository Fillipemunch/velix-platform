import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Building2, Target, Calendar } from 'lucide-react';
import { PublicStartup } from '../context/AppContext';

interface StartupProfileModalProps {
  startup: PublicStartup | null;
  onClose: () => void;
}

const StartupProfileModal: React.FC<StartupProfileModalProps> = ({ startup, onClose }) => {
  if (!startup) return null;

  return (
    <AnimatePresence>
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
          className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden relative z-10 border border-[#2D5A4C]/10"
        >
          <button onClick={onClose} className="absolute top-6 right-6 text-[#1a2e26]/20 hover:text-[#1a2e26] z-20 transition-colors">
            <X size={24} />
          </button>

          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
              <div className="w-32 h-32 bg-[#F4F7F5] rounded-[2rem] border border-[#2D5A4C]/5 overflow-hidden flex-shrink-0 shadow-inner">
                <img src={startup.logo} alt={startup.name} className="w-full h-full object-cover p-2" />
              </div>
              <div className="text-center md:text-left pt-4">
                <h2 className="text-4xl font-black text-[#1a2e26] tracking-tighter uppercase leading-none mb-3">{startup.name}</h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <span className="bg-[#D6825C]/10 text-[#D6825C] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#D6825C]/20">{startup.industry}</span>
                  <span className="flex items-center text-[#1a2e26]/40 text-[10px] font-black uppercase tracking-widest"><Calendar size={12} className="mr-1.5" /> Sync: {new Date(startup.updatedAt).toLocaleDateString()}</span>
                </div>
                <p className="mt-6 text-xl font-bold text-[#1a2e26]/60 leading-tight italic">"{startup.slogan}"</p>
              </div>
            </div>

            <div className="space-y-8 pt-8 border-t border-[#F4F7F5]">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a2e26]/30 flex items-center"><Building2 size={14} className="mr-2" /> Profile Intel</h4>
                <p className="text-[#1a2e26]/70 leading-relaxed font-medium text-lg">
                  {startup.about || "This entity is a synchronized node within the VELIX ecosystem. Their mission parameters are currently being broadcasted to the infrastructure layer."}
                </p>
              </div>

              {startup.website && (
                <a 
                  href={startup.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-3 bg-[#1a2e26] text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#D6825C] transition-all shadow-xl active:scale-95 group"
                >
                  <Globe size={18} className="group-hover:rotate-12 transition-transform" />
                  <span>Access External Interface</span>
                </a>
              )}
            </div>
          </div>

          <div className="bg-[#F4F7F5] p-6 text-center">
            <p className="text-[9px] font-black text-[#1a2e26]/20 uppercase tracking-[0.4em]">VELIX ECOSYSTEM • AUTHENTICATED PARTNER</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default StartupProfileModal;