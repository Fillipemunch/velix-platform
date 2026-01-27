
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mockJobs } from '../data/mockJobs';
import { ArrowLeft, Share2, MapPin, Calendar, Briefcase, Coins, ExternalLink, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import ApplyModal from '../components/ApplyModal';

const JobDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const job = mockJobs.find(j => j.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!job) {
    return <div className="pt-32 text-center text-xl font-bold text-[#1A2E26]">Job not found</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 bg-[#F4F7F5] min-h-screen"
    >
      <div className="max-w-6xl mx-auto px-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-3 text-[#2D5A4C]/60 hover:text-[#2D5A4C] mb-10 font-bold text-xs uppercase tracking-widest transition-all active:scale-90 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>{t.common.back}</span>
        </button>

        <div className="bg-white rounded-xl border border-[#2D5A4C]/5 shadow-2xl shadow-[#2D5A4C]/5 p-10 md:p-16 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4F7F5] rounded-full -mr-32 -mt-32 z-0"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
              <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-10 text-center md:text-left">
                <img src={job.logo} alt={job.company} className="w-24 h-24 md:w-32 md:h-32 rounded-xl object-cover bg-[#F4F7F5] shadow-xl border border-[#2D5A4C]/5 mb-6 md:mb-0" />
                <div>
                  <h1 className="text-4xl md:text-6xl font-black text-[#1A2E26] mb-4 tracking-tighter leading-none">
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[#1A2E26]/60">
                    <div className="flex items-center font-black text-[#2D5A4C] bg-[#2D5A4C]/5 px-4 py-1.5 rounded-xl text-xs uppercase tracking-wider border border-[#2D5A4C]/10">
                      {job.company}
                    </div>
                    <div className="flex items-center font-bold">
                      <MapPin size={18} className="mr-2 text-[#2D5A4C]/40" />
                      {job.location}, {job.region}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex space-x-3">
                  <button className="flex-1 p-5 border border-[#2D5A4C]/10 rounded-xl hover:bg-[#F4F7F5] transition-all active:scale-90 text-[#2D5A4C]/40">
                    <Bookmark size={22} />
                  </button>
                  <button className="flex-1 p-5 border border-[#2D5A4C]/10 rounded-xl hover:bg-[#F4F7F5] transition-all active:scale-90 text-[#2D5A4C]/40">
                    <Share2 size={22} />
                  </button>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-[#D6825C] hover:bg-[#c4714e] text-white px-12 py-6 rounded-xl font-bold transition-all shadow-xl shadow-[#D6825C]/20 flex items-center justify-center space-x-3 text-lg active:scale-95 group"
                >
                  <span>{t.common.apply}</span>
                  <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-16 pt-16 border-t border-[#2D5A4C]/5">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-[#1A2E26]/30 uppercase tracking-[0.2em]">{t.common.type}</p>
                <div className="flex items-center text-[#1A2E26] font-bold text-lg">
                  <Briefcase size={20} className="mr-3 text-[#2D5A4C]" />
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
                  <Calendar size={20} className="mr-3 text-[#2D5A4C]/60" />
                  {job.postedAt}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-[#1A2E26]/30 uppercase tracking-[0.2em]">Safety</p>
                <div className="flex items-center text-[#1A2E26] font-bold text-lg">
                  <div className="w-3 h-3 rounded-full bg-[#2D5A4C] mr-3 animate-pulse"></div>
                  Verified
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-white p-10 md:p-16 rounded-xl border border-[#2D5A4C]/5 shadow-sm">
              <h2 className="text-3xl font-black text-[#1A2E26] mb-8 tracking-tight">{t.common.search || 'Job Description'}</h2>
              <div className="prose prose-slate max-w-none text-[#1A2E26]/70 leading-relaxed text-lg space-y-6 font-medium">
                <p>{job.description}</p>
                <p>As a key member of our team, you will contribute to building a product used by thousands of users across the Nordic region. We follow agile methodologies and value clean, maintainable code.</p>
                <h4 className="text-xl font-bold text-[#1A2E26] mt-10">Responsibilities:</h4>
                <ul className="list-disc pl-6 space-y-3">
                  <li>Collaborate with cross-functional teams to define requirements.</li>
                  <li>Build and maintain scalable software solutions.</li>
                  <li>Write high-quality, testable code following best practices.</li>
                  <li>Participate in peer code reviews and architectural discussions.</li>
                </ul>
              </div>
              
              <div className="mt-12 flex flex-wrap gap-3">
                {job.tags.map(tag => (
                  <span key={tag} className="bg-[#F4F7F5] border border-[#2D5A4C]/5 px-6 py-2.5 rounded-full text-sm font-bold text-[#2D5A4C]/60 hover:text-[#2D5A4C] transition-colors cursor-default">
                    #{tag.toLowerCase()}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="bg-white p-10 rounded-xl border border-[#2D5A4C]/5 shadow-sm">
              <h3 className="text-2xl font-bold text-[#1A2E26] mb-6">{language === 'en' ? 'About company' : 'Om virksomheden'}</h3>
              <p className="text-[#1A2E26]/60 text-sm leading-relaxed font-medium mb-8">
                {job.company} is a leading startup based in the heart of Denmark. We are scaling fast and looking for passionate individuals to join our journey.
              </p>
              <div className="space-y-3">
                <a href="#" className="flex items-center justify-between p-4 bg-[#F4F7F5] rounded-xl hover:bg-[#2D5A4C]/5 transition-colors group">
                  <span className="font-bold text-[#1A2E26]/80">Startup Profile</span>
                  <ExternalLink size={16} className="text-[#2D5A4C]/30 group-hover:text-[#2D5A4C]" />
                </a>
                <a href="#" className="flex items-center justify-between p-4 bg-[#F4F7F5] rounded-xl transition-colors group">
                  <span className="font-bold text-[#1A2E26]/80">Team Size</span>
                  <span className="text-[10px] font-black text-[#2D5A4C] bg-white px-3 py-1 rounded-xl shadow-sm border border-[#2D5A4C]/5">12-50</span>
                </a>
              </div>
            </div>

            <div className="bg-[#1A2E26] p-10 rounded-xl text-white shadow-2xl shadow-[#1A2E26]/20">
              <h3 className="text-2xl font-black mb-4">Nordic Perks</h3>
              <ul className="space-y-4 opacity-80 text-sm font-bold">
                <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#D6825C] mr-3"></div> Flexible working hours</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#D6825C] mr-3"></div> Premium health insurance</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#D6825C] mr-3"></div> Central office with lunch</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#D6825C] mr-3"></div> 5 weeks paid holiday</li>
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
