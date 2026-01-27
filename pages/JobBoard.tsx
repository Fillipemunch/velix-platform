
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Filter as FilterIcon, ChevronRight, Coins, MapPin, ArrowLeft, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const JobBoard: React.FC = () => {
  const { t, filters, setFilters, language, allJobs } = useApp();
  const navigate = useNavigate();

  const handleToggleFilter = (category: 'region' | 'type', value: string) => {
    setFilters(prev => {
      const current = prev[category];
      const next = current.includes(value) 
        ? current.filter(i => i !== value)
        : [...current, value];
      return { ...prev, [category]: next };
    });
  };

  // Production Safety: Only show Approved AND Verified jobs
  const approvedJobs = allJobs.filter(job => job.status === 'Approved' && job.isVerified);

  const filteredJobs = approvedJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) || 
                         job.company.toLowerCase().includes(filters.searchQuery.toLowerCase());
    const matchesRegion = filters.region.length === 0 || filters.region.includes(job.region);
    const matchesType = filters.type.length === 0 || filters.type.includes(job.type);
    return matchesSearch && matchesRegion && matchesType;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 max-w-7xl mx-auto px-6 py-12 min-h-screen bg-[#F9FBF9]"
    >
      <header className="mb-12 flex items-center justify-between">
        <div>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-[#1a2e26]/60 hover:text-[#1a2e26] mb-4 font-bold text-xs uppercase tracking-widest transition-all active:scale-90"
          >
            <ArrowLeft size={14} />
            <span>{t.back_button}</span>
          </button>
          <h1 className="text-4xl font-black text-[#1a2e26] tracking-tight">
            Startup Opportunities
          </h1>
          <p className="text-[#1a2e26]/50 font-medium">
            {filteredJobs.length} active signals in the nexus
          </p>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        <aside className="lg:w-72 space-y-10 flex-shrink-0">
          <div className="bg-white p-8 rounded-2xl border border-[#1a2e26]/5 shadow-sm">
            <div className="flex items-center justify-between mb-6">
               <h3 className="font-black text-xs uppercase tracking-widest text-[#1a2e26]/40 flex items-center space-x-2">
                <FilterIcon size={14} />
                <span>{t.location_label}</span>
              </h3>
              {(filters.region.length > 0 || filters.type.length > 0) && (
                <button 
                  onClick={() => setFilters({ searchQuery: '', region: [], type: [] })}
                  className="text-xs font-bold text-[#D6825C] hover:text-[#1a2e26]"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="space-y-3">
              {['Hovedstaden', 'Aarhus', 'Odense', 'Aalborg'].map(reg => (
                <label key={reg} className="flex items-center space-x-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded border-gray-300 text-[#D6825C] focus:ring-[#D6825C]"
                    checked={filters.region.includes(reg)}
                    onChange={() => handleToggleFilter('region', reg)}
                  />
                  <span className="text-sm font-bold text-[#1a2e26]/60 group-hover:text-[#1a2e26] transition-colors">
                    {t.regions[reg]}
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-10 pt-10 border-t border-[#1a2e26]/5">
              <h3 className="font-black text-xs uppercase tracking-widest text-[#1a2e26]/40 mb-6">{t.type_label}</h3>
              <div className="space-y-3">
                {['Fuldtid', 'Deltid', 'Praktik'].map(type => (
                  <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 text-[#D6825C] focus:ring-[#D6825C]"
                      checked={filters.type.includes(type)}
                      onChange={() => handleToggleFilter('type', type)}
                    />
                    <span className="text-sm font-bold text-[#1a2e26]/60 group-hover:text-[#1a2e26] transition-colors">
                      {t.jobTypes[type]}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, idx) => (
                <motion.div 
                  key={job.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => navigate(`/jobs/${job.id}`)}
                  className="bg-white border border-[#1a2e26]/5 p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className="flex items-center space-x-6">
                    <img src={job.logo} alt={job.company} className="w-16 h-16 rounded-xl object-cover bg-[#F9FBF9] border border-[#1a2e26]/5" />
                    <div>
                      <h3 className="text-2xl font-black text-[#1a2e26] group-hover:text-[#D6825C] transition-colors mb-1">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-x-4 text-sm font-bold items-center text-[#1a2e26]/40">
                        <span className="text-[#1a2e26]">{job.company}</span>
                        <span className="flex items-center"><MapPin size={14} className="mr-1" /> {job.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center text-[#1a2e26] font-black bg-[#F9FBF9] px-4 py-2 rounded-xl text-sm border border-[#1a2e26]/5">
                      {job.salaryRange}
                    </div>
                    <div className="flex items-center text-[#1a2e26]/20 text-[10px] font-black uppercase tracking-widest">
                      <Clock size={12} className="mr-1" /> {job.postedAt}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-40 bg-white rounded-3xl border-2 border-dashed border-[#1a2e26]/10"
              >
                <div className="mb-6 inline-block p-6 bg-[#F9FBF9] rounded-2xl text-[#1a2e26]/10">
                  <FilterIcon size={48} />
                </div>
                <h3 className="text-2xl font-black text-[#1a2e26] mb-2">Nexus is silent</h3>
                <p className="text-[#1a2e26]/40 text-lg font-medium max-w-sm mx-auto leading-relaxed">
                  {t.empty_states.jobs}
                </p>
                <button 
                  onClick={() => setFilters({ searchQuery: '', region: [], type: [] })}
                  className="mt-8 text-[#D6825C] font-black uppercase tracking-widest text-xs hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </motion.div>
  );
};

export default JobBoard;
