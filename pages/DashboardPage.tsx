
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, LifeBuoy, PlusCircle, User, Menu, X, ShieldAlert, MapPin, 
  Mail, MessageCircle, Edit3, Users, Rocket, Zap, Database, Terminal
} from 'lucide-react';
import Logo from '../components/Logo';
import PostJobModal from '../components/PostJobModal';
import BrandProfile from '../components/BrandProfile';
import ApplicantsList from '../components/ApplicantsList';
import TalentExplorer from '../components/TalentExplorer';
import InvestorDirectory from '../components/InvestorDirectory';
import { Job } from '../types';

const DashboardPage: React.FC = () => {
  const { t, language, applications, markApplicationsAsRead, userCreatedJobs, addUserJob } = useApp();
  const { user, isSubscribed, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('talent');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  
  const handleLogout = () => { logout(); navigate('/'); };
  const handleAddJob = (newJob: Partial<Job>) => { addUserJob(newJob); };
  const handleViewApplicants = (jobId: string) => { setSelectedJobId(jobId); markApplicationsAsRead(jobId); };

  const tabs = [
    { id: 'talent', label: t.tab_talent, icon: <Users size={18} /> },
    { id: 'jobs', label: t.tab_jobs, icon: <Terminal size={18} />, badge: applications.filter(a => a.isNew).length || null },
    { id: 'funding', label: t.tab_funding, icon: <Rocket size={18} /> },
    { id: 'brand', label: t.tab_brand, icon: <Database size={18} /> },
    { id: 'support', label: t.tab_support, icon: <LifeBuoy size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F9FBF9] flex flex-col lg:flex-row overflow-hidden pt-16 lg:pt-0 font-sans">
      {/* Sidebar */}
      <aside className={`fixed inset-0 z-[90] lg:relative lg:translate-x-0 transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:w-72 bg-[#1a2e26] text-white p-8 flex flex-col h-full overflow-y-auto`}>
        <div className="mb-12"><Logo size="md" textColor="text-white" variant="light" /></div>
        <nav className="flex-1 space-y-2">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSelectedJobId(null); setIsMobileMenuOpen(false); }} className={`w-full flex items-center justify-between px-6 py-4 rounded-xl font-bold text-sm transition-all ${activeTab === tab.id ? 'bg-white/10 text-[#D6825C]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
              <div className="flex items-center space-x-4">
                {tab.icon}
                <span>{tab.label}</span>
              </div>
              {tab.badge && <span className="bg-[#D6825C] text-white text-[10px] px-2 py-0.5 rounded-full">{tab.badge}</span>}
            </button>
          ))}
        </nav>
        <button onClick={handleLogout} className="mt-auto flex items-center space-x-4 px-6 py-4 rounded-xl font-bold text-sm text-red-400 hover:bg-red-400/5 transition-all">
          <LogOut size={18} /><span>{t.nav_logout}</span>
        </button>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab + (selectedJobId || '')} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-6xl mx-auto pb-20">
            {activeTab === 'talent' && <TalentExplorer isPremium={isSubscribed} startupJobs={userCreatedJobs} />}
            {activeTab === 'jobs' && !selectedJobId && (
              <div className="space-y-10">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <h1 className="text-4xl font-black text-[#1a2e26]">{t.tab_jobs}</h1>
                  <button onClick={() => setIsPostModalOpen(true)} className="bg-[#D6825C] hover:bg-[#c4714e] text-white px-8 py-4 rounded-xl font-black flex items-center space-x-2 shadow-lg transition-all uppercase tracking-widest text-xs">
                    <PlusCircle size={18} /><span>{t.post_job_cta}</span>
                  </button>
                </header>
                {/* Job Cards */}
                <div className="grid gap-6">
                  {userCreatedJobs.map((job, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-2xl border border-[#1a2e26]/5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all">
                      <div className="flex items-center space-x-6">
                        <div className="w-14 h-14 bg-[#F9FBF9] text-[#1a2e26]/40 rounded-xl flex items-center justify-center"><Terminal size={24} /></div>
                        <div>
                          <h4 className="text-xl font-black text-[#1a2e26]">{job.title}</h4>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{job.location} • {job.postedAt}</p>
                        </div>
                      </div>
                      <button onClick={() => handleViewApplicants(job.id!)} className="bg-[#1a2e26] text-white px-8 py-3 rounded-xl font-bold text-sm">View Signals</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'brand' && <BrandProfile />}
          </motion.div>
        </AnimatePresence>
      </main>
      <PostJobModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} onSubmit={handleAddJob} />
    </div>
  );
};

export default DashboardPage;
