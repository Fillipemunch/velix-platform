import React, { useState } from 'react';
import { useApp, EcosystemUser } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Search, MapPin, Briefcase, Filter, Lock, Send, Sparkles, Star, User, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Job } from '../types';

interface TalentExplorerProps {
  isPremium: boolean;
  startupJobs: Partial<Job>[];
}

const TalentExplorer: React.FC<TalentExplorerProps> = ({ isPremium, startupJobs }) => {
  const { t, ecosystemUsers } = useApp();
  const { user: currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'All',
    experience: 'All',
    location: 'All'
  });
  const [invitingId, setInvitingId] = useState<string | null>(null);
  const [invitedTalents, setInvitedTalents] = useState<string[]>([]);

  // Filtra usuários de forma segura contra nulos ou indefinidos
  const talents = ecosystemUsers
    .filter(u => {
      const userEmail = u.email?.toLowerCase();
      const currentEmail = currentUser?.email?.toLowerCase();
      
      return userEmail && 
             userEmail !== 'fillipeferreiramunch@gmail.com' && 
             userEmail !== currentEmail &&
             u.role === 'talent';
    })
    .map(user => ({
      id: user.id,
      name: user.name || 'Anonymous Node',
      role: 'Integrated Node', 
      experience: 'Expert' as const,
      category: 'Tech' as const,
      location: 'Copenhagen Hub',
      tags: ['Verified', 'Ecosystem'],
      summary: `Active protocol participant since ${user.joinedAt || '2026'}. Authenticated via Velix Infrastructure.`,
      status: user.status
    }));

  const filteredTalents = talents.filter(talent => {
    if (talent.status === 'Banned') return false;
    
    const matchesSearch = talent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         talent.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filters.category === 'All' || talent.category === filters.category;
    const matchesExp = filters.experience === 'All' || talent.experience === filters.experience;
    const matchesLoc = filters.location === 'All' || talent.location === filters.location;

    return matchesSearch && matchesCategory && matchesExp && matchesLoc;
  });

  const handleInvite = (talentId: string, jobId: string) => {
    setInvitedTalents(prev => [...prev, talentId]);
    setInvitingId(null);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#1A2E26] tracking-tight">{t.talent_explorer.title}</h1>
          <p className="text-[#1A2E26]/40 font-bold uppercase tracking-widest text-[10px] mt-2">{t.talent_explorer.subtitle}</p>
        </div>
        
        {isPremium && (
          <div className="relative group flex-shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A2E26]/20 group-focus-within:text-[#2D5A4C] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder={t.talent_explorer.search_placeholder}
              className="pl-12 pr-6 py-4 rounded-2xl bg-white border border-[#2D5A4C]/10 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-[#2D5A4C]/5 w-full md:w-80 shadow-sm transition-all" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 flex-shrink-0 space-y-6">
          <div className="bg-[#1A2E26] p-8 rounded-3xl text-white shadow-xl shadow-[#1A2E26]/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12" />
             <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8 flex items-center">
               <Filter size={14} className="mr-2 text-[#D6825C]" /> {t.talent_explorer.filters}
             </h3>

             <div className="space-y-8 relative z-10">
               <div className="space-y-4">
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{t.talent_explorer.category}</p>
                 <div className="space-y-2">
                   {['All', 'Tech', 'Marketing', 'Design', 'Sales'].map(cat => (
                     <button
                       key={cat}
                       onClick={() => setFilters({ ...filters, category: cat })}
                       className={`w-full text-left px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                         filters.category === cat ? 'bg-[#2D5A4C] text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
                       }`}
                     >
                       {cat === 'All' ? 'All Categories' : t.talent_explorer.categories[cat]}
                     </button>
                   ))}
                 </div>
               </div>

               <div className="space-y-4">
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{t.talent_explorer.experience}</p>
                 <div className="space-y-2">
                   {['All', 'Junior', 'Mid', 'Senior'].map(exp => (
                     <button
                       key={exp}
                       onClick={() => setFilters({ ...filters, experience: exp })}
                       className={`w-full text-left px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                         filters.experience === exp ? 'bg-[#2D5A4C] text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
                       }`}
                     >
                       {exp === 'All' ? 'All Levels' : t.talent_explorer.exp_levels[exp]}
                     </button>
                   ))}
                 </div>
               </div>
             </div>
          </div>
        </aside>

        {/* Results Area */}
        <div className="flex-1 relative">
          {!isPremium && (
            <div className="absolute inset-0 z-20 backdrop-blur-[10px] flex items-center justify-center p-8 text-center rounded-3xl overflow-hidden bg-[#F4F7F5]/40 border-2 border-dashed border-[#2D5A4C]/10">
              <div className="max-w-md bg-white p-12 rounded-3xl shadow-2xl border border-[#2D5A4C]/5">
                <div className="w-20 h-20 bg-[#D6825C]/10 text-[#D6825C] rounded-2xl flex items-center justify-center mx-auto mb-8 animate-pulse">
                  <Lock size={40} />
                </div>
                <h3 className="text-3xl font-black text-[#1A2E26] mb-4 tracking-tight">{t.talent_explorer.upgrade_title}</h3>
                <p className="text-[#1A2E26]/60 font-medium mb-10 leading-relaxed">
                  {t.talent_explorer.upgrade_desc}
                </p>
                <button 
                  onClick={() => window.location.hash = '#/pricing'}
                  className="w-full bg-[#2D5A4C] text-white py-5 rounded-2xl font-black text-lg active:scale-95 transition-all shadow-xl shadow-[#2D5A4C]/20 flex items-center justify-center space-x-3"
                >
                  <Sparkles size={20} />
                  <span>{t.upgrade_cta}</span>
                </button>
              </div>
            </div>
          )}

          <div className={`grid gap-6 ${!isPremium ? 'opacity-30 pointer-events-none select-none' : ''}`}>
            <AnimatePresence mode="popLayout">
              {filteredTalents.length > 0 ? (
                filteredTalents.map((talent, i) => (
                  <motion.div 
                    key={talent.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white p-8 rounded-3xl border border-[#2D5A4C]/5 shadow-sm hover:shadow-xl hover:shadow-[#2D5A4C]/5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                  >
                    <div className="flex items-start space-x-6 flex-1">
                      <div className="w-16 h-16 bg-[#F4F7F5] rounded-2xl flex items-center justify-center text-[#2D5A4C] font-black text-xl group-hover:bg-[#2D5A4C] group-hover:text-white transition-all shadow-inner relative overflow-hidden flex-shrink-0">
                        {talent.name[0]}
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center space-x-3">
                            <h4 className="text-xl font-black text-[#1A2E26] group-hover:text-[#2D5A4C] transition-colors">{talent.name}</h4>
                            <span className="flex items-center text-[#D6825C]"><Star size={12} className="fill-current mr-1" /> 5.0</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-[#1A2E26]/40 mt-1">
                            <span className="flex items-center"><Briefcase size={14} className="mr-1" /> {talent.role}</span>
                            <span className="flex items-center"><MapPin size={14} className="mr-1" /> {talent.location}</span>
                          </div>
                        </div>
                        <p className="text-sm text-[#1A2E26]/60 leading-relaxed max-w-xl font-medium">
                          {talent.summary}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {talent.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-black uppercase tracking-widest bg-[#F4F7F5] px-3 py-1 rounded-full text-[#2D5A4C]/60">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 min-w-[200px] relative">
                      {invitedTalents.includes(talent.id) ? (
                        <div className="w-full flex items-center justify-center py-4 bg-[#2D5A4C]/10 text-[#2D5A4C] rounded-2xl font-black text-sm border border-[#2D5A4C]/20">
                          <Check size={18} className="mr-2" /> {t.talent_explorer.invite_success}
                        </div>
                      ) : (
                        <>
                          <button 
                            onClick={() => setInvitingId(invitingId === talent.id ? null : talent.id)}
                            className="w-full bg-[#2D5A4C] text-white px-6 py-4 rounded-2xl font-black text-sm active:scale-95 transition-all shadow-lg shadow-[#2D5A4C]/10 flex items-center justify-center space-x-2"
                          >
                            <Send size={16} />
                            <span>{t.talent_explorer.invite}</span>
                          </button>
                          
                          <AnimatePresence>
                            {invitingId === talent.id && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute bottom-full right-0 mb-4 w-64 bg-[#1A2E26] text-white p-3 rounded-2xl shadow-2xl z-30 border border-white/10"
                              >
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 px-3 py-2 border-b border-white/5 mb-2">
                                  {t.talent_explorer.select_job}
                                </p>
                                {startupJobs && startupJobs.length > 0 ? (
                                  startupJobs.map(job => (
                                    <button
                                      key={job.id || Math.random().toString()}
                                      onClick={() => job.id && handleInvite(talent.id, job.id)}
                                      className="w-full text-left px-4 py-3 rounded-xl text-xs font-bold hover:bg-white/10 transition-all text-white/80 hover:text-white"
                                    >
                                      {job.title}
                                    </button>
                                  ))
                                ) : (
                                  <p className="px-3 py-4 text-xs font-bold text-white/30 italic">No active jobs found</p>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="py-32 text-center bg-white rounded-3xl border border-dashed border-[#2D5A4C]/10">
                   <div className="w-20 h-20 bg-[#F4F7F5] rounded-full flex items-center justify-center mx-auto mb-6 text-[#2D5A4C]/10">
                     <User size={40} />
                   </div>
                   <h3 className="text-xl font-black text-[#1A2E26] mb-2">{t.talent_explorer.no_talents}</h3>
                   <p className="text-[#1A2E26]/40 font-bold uppercase tracking-widest text-[10px] max-w-xs mx-auto mb-8">
                     Wait for real nodes to synchronize with the Nexus.
                   </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentExplorer;