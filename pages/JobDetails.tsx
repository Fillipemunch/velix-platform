import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Share2, MapPin, Calendar, Briefcase, Coins, ExternalLink, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import ApplyModal from '../components/ApplyModal';

const JobDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language, allJobs } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const job = allJobs.find(j => j.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!job) {
    return <div className="pt-40 text-center text-xl font-bold text-[#1A2E26]">Job not found in the Nexus layer</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 bg-[#F9FBF9] min-h-screen"
    >
      <div className="max-w-6xl mx-auto px-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-3 text-[#1A2E26]/40 hover:text-[#1A2E26] mb-10 font-bold text-xs uppercase tracking-widest transition-all active:scale-90 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>{t.common.back}</span>
        </button>

        <div className="bg-white rounded-[2.5rem] border border-[#1A2E26]/5 shadow-2xl shadow-[#1A2E26]/5 p-10 md:p-16 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F9FBF9] rounded-full -mr-32 -mt-32 z-0"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
              <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-10 text-center md:text-left">
                <img src={job.logo} alt={job.company} className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] object-cover bg-[#F9FBF9] shadow-xl border border-[#1A2E26]/5 mb-6 md:mb-0" />
                <div>
                  <h1 className="text-4xl md:text-6xl font-black text-[#1A2E26] mb-4 tracking-tighter leading-none uppercase">
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[#1A2E26]/60">
                    <div className="flex items-center font-black text-[#1A2E26] bg-[#1A2E26]/5 px-4 py-1.5 rounded-xl text-[10px] uppercase tracking-wider border border-[#1A2E26]/10">
                      {job.company}
                    </div>
                    <div className="flex items-center font-bold text-sm">
                      <MapPin size={18} className="mr-2 text-[#1A2E26]/20" />
                      {job.location}, {job.region}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex space-x-3">
                  <button className="flex-1 p-5 border border-[#1A2E26]/10 rounded-2xl hover:bg-[#F9FBF9] transition-all active:scale-90 text-[#1A2E26]/20">
                    <Bookmark size={22} />
                  </button>
                  <button className="flex-1 p-5 border border-[#1A2E26]/10 rounded-2xl hover:bg-[#F9FBF9] transition-all active:scale-90 text-[#1A2E26]/20">
                    <Share2 size={22} />
                  </button>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-[#1A2E26] text-white px-12 py-6 rounded-2xl font-black transition-all shadow-xl shadow-[#1A2E26]/20 flex items-center justify-center space-x-3 text-sm uppercase tracking-widest active:scale-95 group"
                >
                  <span>{t.common.apply}</span>
                  <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-16 pt-16 border-t border-[#1A2E26]/5">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-[#1A2E26]/30 uppercase tracking-[0.2em]">{t.common.type}</p>
                <div className="flex items-center text-[#1A2E26] font-bold text-lg">
                  <Briefcase size={20} className="mr-3 text-[#1A2E26]/40" />
                  {/* @ts-ignore */}
                  {t.jobTypes?.[job.type] || job.type}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-[#1A2E26]/30 uppercase tracking-[0.2em]">{t.common.salary}</p>
                <div className="flex items-center text-[#1A2E26] font-bold text-lg">
                  <Coins size={20} className="mr-3 text-[#D6825C]" />
                  {job.salaryRange.split('+')[0]}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-[#1A2E26]/30 uppercase tracking-[0.2em]">{t.common.posted}</p>
                <div className="flex items-center text-[#1A2E26] font-bold text-lg">
                  <Calendar size={20} className="mr-3 text-[#1A2E26]/20" />
                  {job.postedAt}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-[#1A2E26]/30 uppercase tracking-[0.2em]">Safety</p>
                <div className="flex items-center text-[#1A2E26] font-bold text-lg">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D6825C] mr-3 animate-pulse"></div>
                  Protocol Vetted
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-white p-10 md:p-16 rounded-[2.5rem] border border-[#1A2E26]/5 shadow-sm">
              <h2 className="text-3xl font-black text-[#1A2E26] mb-8 tracking-tight uppercase">Mission Parameters</h2>
              <div className="prose prose-slate max-w-none text-[#1A2E26]/70 leading-relaxed text-lg space-y-6 font-medium">
                <p>{job.description}</p>
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-[#1A2E26]/5 shadow-sm">
              <h3 className="text-xl font-black text-[#1A2E26] mb-6 uppercase tracking-tight">{language === 'en' ? 'Startup Intel' : 'Startup Information'}</h3>
              <p className="text-[#1A2E26]/60 text-sm leading-relaxed font-medium mb-8">
                {job.company} is an authenticated entity within the European Innovation Ecosystem. Scaling under the Nordic connectivity standard.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-5 bg-[#F9FBF9] rounded-2xl border border-transparent hover:border-[#1A2E26]/5 transition-all group">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40">CVR Node</span>
                  <span className="text-sm font-black text-[#1A2E26]">{job.cvr}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1A2E26] p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
              <h3 className="text-xl font-black mb-8 uppercase tracking-widest">Protocol Benefits</h3>
              <ul className="space-y-5 opacity-80 text-xs font-bold uppercase tracking-widest">
                <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#D6825C] mr-4 shadow-[0_0_8px_#D6825C]"></div> Flexible Node Syncing</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#D6825C] mr-4 shadow-[0_0_8px_#D6825C]"></div> Premium Health Matrix</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#D6825C] mr-4 shadow-[0_0_8px_#D6825C]"></div> Central Hub Access</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#D6825C] mr-4 shadow-[0_0_8px_#D6825C]"></div> 5 Weeks Sync Pause</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <ApplyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        jobId={job.id}
        jobTitle={job.title} 
      />
    </motion.div>
  );
};

export default JobDetails;