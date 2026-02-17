import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, MapPin, Target, Users, LayoutGrid, FileText } from 'lucide-react';
import { PublicStartup, useApp } from '../context/AppContext';

interface StartupProfileModalProps {
  startup: PublicStartup | null;
  onClose: () => void;
}

const StartupProfileModal: React.FC<StartupProfileModalProps> = ({ startup, onClose }) => {
  const { t } = useApp();
  if (!startup) return null;

  const hasAbout = startup.about && startup.about.trim().length > 0;
  
  // Lista padrão de valores para renderizar o Core Ethos (mesma do Dashboard)
  const defaultValues = ["Innovation", "Resilience", "Transparency", "Velocity", "Focus"];
  const selectedValues = startup.selectedValues || [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#1A2E26]/60 backdrop-blur-md"
        />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(26,46,38,0.3)] overflow-hidden relative z-10 border border-[#1a2e26]/5 flex flex-col md:flex-row min-h-[600px]"
        >
          {/* Lado Esquerdo / Header - Estilo Sidebar Dashboard */}
          <div className="md:w-64 bg-[#1a2e26] text-white p-10 flex flex-col items-center md:items-start shrink-0 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            
            <div className="relative z-10 w-full flex flex-col items-center md:items-start">
               <div className="w-24 h-24 bg-white rounded-3xl border-4 border-white/10 shadow-2xl overflow-hidden mb-8 group transition-transform hover:scale-105 duration-500">
                  <img 
                    src={startup.logo} 
                    alt={startup.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://via.placeholder.com/200?text=${startup.name[0].toUpperCase()}`;
                    }}
                  />
               </div>
               
               <h2 className="text-2xl font-black tracking-tighter uppercase leading-none mb-2 text-center md:text-left">
                 {startup.name}
               </h2>
               <span className="text-[9px] font-black text-[#D6825C] uppercase tracking-[0.2em] mb-12">
                 Standard Node
               </span>

               <button 
                onClick={onClose}
                className="mt-auto flex items-center space-x-3 text-red-400 hover:text-red-300 font-bold text-[10px] uppercase tracking-widest active:scale-95 transition-all"
               >
                 <X size={16} />
                 <span>Deauthenticate</span>
               </button>
            </div>
          </div>

          {/* Lado Direito / Conteúdo - Estilo Dashboard Profile */}
          <div className="flex-1 p-8 md:p-14 bg-white overflow-y-auto max-h-[85vh] md:max-h-none">
            <div className="max-w-3xl mx-auto space-y-12">
              
              {/* About Us Section */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a2e26]/30">About Us</h4>
                <div className="bg-[#F4F7F5] p-8 rounded-[2rem] border border-[#1a2e26]/5 min-h-[140px]">
                  <p className="text-[#1a2e26] font-bold leading-relaxed">
                    {hasAbout ? startup.about : "This entity has not yet updated its strategic mission overview."}
                  </p>
                </div>
              </div>

              {/* Info Grid - 4 Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#F4F7F5] p-6 rounded-2xl border border-[#1a2e26]/5 space-y-3">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-[#1a2e26]/30 flex items-center">
                    <Globe size={12} className="mr-2" /> Digital Endpoint
                  </h4>
                  <p className="text-sm font-black text-[#1a2e26] truncate">
                    {startup.website || "Not Configured"}
                  </p>
                </div>

                <div className="bg-[#F4F7F5] p-6 rounded-2xl border border-[#1a2e26]/5 space-y-3">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-[#1a2e26]/30 flex items-center">
                    <MapPin size={12} className="mr-2" /> Primary Hub
                  </h4>
                  <p className="text-sm font-black text-[#1a2e26]">
                    {startup.location || "Copenhagen Hub"}
                  </p>
                </div>

                <div className="bg-[#F4F7F5] p-6 rounded-2xl border border-[#1a2e26]/5 space-y-3">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-[#1a2e26]/30 flex items-center">
                    <Target size={12} className="mr-2" /> Sector
                  </h4>
                  <p className="text-sm font-black text-[#1a2e26]">
                    {startup.industry || "General Tech"}
                  </p>
                </div>

                <div className="bg-[#F4F7F5] p-6 rounded-2xl border border-[#1a2e26]/5 space-y-3">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-[#1a2e26]/30 flex items-center">
                    <Users size={12} className="mr-2" /> Fleet Size
                  </h4>
                  <p className="text-sm font-black text-[#1a2e26]">
                    {startup.teamSize || "1-10"}
                  </p>
                </div>
              </div>

              {/* Core Ethos Section */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a2e26]/30">Core Ethos</h4>
                <div className="flex flex-wrap gap-3">
                  {defaultValues.map((val) => {
                    const isActive = selectedValues.includes(val);
                    return (
                      <div 
                        key={val}
                        className={`px-6 py-3 rounded-xl text-xs font-black transition-all border ${
                          isActive 
                          ? 'bg-[#1a2e26] border-[#1a2e26] text-white shadow-lg' 
                          : 'bg-[#F4F7F5] border-transparent text-[#1a2e26]/20'
                        }`}
                      >
                        {val}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <button 
                  onClick={onClose}
                  className="w-full bg-[#1a2e26] text-white py-6 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl flex items-center justify-center space-x-3 active:scale-95 transition-all hover:bg-[#D6825C]"
                >
                  <FileText size={20} />
                  <span>Apply Protocols</span>
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default StartupProfileModal;