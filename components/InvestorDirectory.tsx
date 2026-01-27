
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Filter, Rocket, Target, Send, ShieldCheck, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Investor } from '../types';
import PitchSubmissionModal from './PitchSubmissionModal';

const InvestorDirectory: React.FC = () => {
  const { t, investors } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('All');
  const [selectedVertical, setSelectedVertical] = useState<string>('All');
  const [pitchingInvestor, setPitchingInvestor] = useState<Investor | null>(null);

  const stages = ['All', 'Pre-seed', 'Seed', 'Series A', 'Series B+'];
  const verticals = ['All', 'SaaS', 'GreenTech', 'FinTech', 'DeepTech', 'HealthTech', 'Enterprise', 'Consumer'];

  // Production Safety: Only show Approved AND Verified investors
  const approvedInvestors = investors.filter(i => i.status === 'Approved' && i.isVerified);

  const filteredInvestors = approvedInvestors.filter(inv => {
    const matchesSearch = inv.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         inv.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = selectedStage === 'All' || inv.stages?.includes(selectedStage) || inv.stage === selectedStage;
    const matchesVertical = selectedVertical === 'All' || inv.verticals.includes(selectedVertical);
    return matchesSearch && matchesStage && matchesVertical;
  });

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#1a2e26] tracking-tight uppercase">Capital Map</h1>
          <p className="text-[#1a2e26]/40 font-bold uppercase tracking-widest text-[10px] mt-2">Vetted European Funds</p>
        </div>
        
        <div className="relative flex-shrink-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a2e26]/20" size={18} />
          <input 
            type="text" 
            placeholder="Query Nexus Data..."
            className="pl-12 pr-6 py-4 rounded-xl bg-white border border-[#1a2e26]/5 text-sm font-semibold focus:outline-none focus:border-[#D6825C] w-full md:w-80 shadow-sm transition-all" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        <aside className="lg:w-64 flex-shrink-0 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-[#1a2e26]/5 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a2e26]/40 mb-8 flex items-center">
              <Filter size={14} className="mr-2" /> Parameters
            </h3>

            <div className="space-y-10">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1a2e26]/20">Asset Maturity</p>
                <div className="flex flex-wrap gap-2">
                  {stages.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedStage(s)}
                      className={`px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border ${
                        selectedStage === s 
                        ? 'bg-[#1a2e26] border-[#1a2e26] text-white' 
                        : 'bg-transparent border-[#1a2e26]/10 text-[#1a2e26]/40 hover:border-[#1a2e26]/30'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1a2e26] p-10 rounded-2xl text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-20 h-20 bg-[#D6825C]/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700" />
             <Rocket className="text-[#D6825C] mb-6" size={24} />
             <h4 className="text-sm font-black uppercase tracking-widest mb-2">Fund Listing</h4>
             <p className="text-[10px] text-white/50 leading-relaxed font-bold uppercase tracking-tight">
               Are you managing European capital? Register your node.
             </p>
             <button 
               onClick={() => window.location.hash = '#/investor-onboarding'}
               className="mt-8 w-full py-4 bg-[#D6825C] hover:bg-[#c4714e] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-white shadow-lg shadow-[#D6825C]/20"
             >
               Apply for Access
             </button>
          </div>
        </aside>

        <div className="flex-1">
          <AnimatePresence mode="popLayout">
            {filteredInvestors.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {filteredInvestors.map((inv, i) => (
                  <motion.div 
                    key={inv.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white p-10 rounded-3xl border border-[#1a2e26]/5 shadow-sm hover:shadow-xl transition-all group"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <img src={inv.logo} alt={inv.name} className="w-14 h-14 rounded-xl border border-[#1a2e26]/5 object-cover" />
                      <div className="flex items-center text-[#1a2e26] bg-[#F9FBF9] px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-[#1a2e26]/5">
                        {inv.stage}
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-[#1a2e26] mb-2 tracking-tighter uppercase group-hover:text-[#D6825C] transition-colors flex items-center">
                      {inv.name}
                      <ShieldCheck size={16} className="ml-2 text-blue-500" />
                    </h3>

                    <p className="text-xs text-[#1a2e26]/60 leading-relaxed font-medium mb-8 min-h-[4rem]">
                      {inv.summary}
                    </p>

                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setPitchingInvestor(inv)}
                        className="flex-1 bg-[#1a2e26] text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#233f34] transition-all shadow-xl active:scale-95 flex items-center justify-center"
                      >
                        <Send size={14} className="mr-2" />
                        Transmit Pitch
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-40 text-center bg-white rounded-3xl border-2 border-dashed border-[#1a2e26]/10">
                 <div className="w-20 h-20 bg-[#F9FBF9] rounded-full flex items-center justify-center mx-auto mb-8 text-[#1a2e26]/10">
                   <Target size={40} />
                 </div>
                 <h3 className="text-2xl font-black text-[#1a2e26] mb-3 uppercase tracking-tight">Nexus is scanning</h3>
                 <p className="text-[#1a2e26]/40 font-medium max-w-sm mx-auto text-lg leading-relaxed">
                   {t.empty_states.investors}
                 </p>
                 <button 
                   onClick={() => { setSelectedStage('All'); setSelectedVertical('All'); setSearchTerm(''); }}
                   className="mt-10 text-[#D6825C] font-black uppercase tracking-widest text-[10px] hover:underline"
                 >
                   Reset Search Matrix
                 </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <PitchSubmissionModal 
        isOpen={!!pitchingInvestor} 
        onClose={() => setPitchingInvestor(null)} 
        investorName={pitchingInvestor?.name || ''} 
      />
    </div>
  );
};

export default InvestorDirectory;
