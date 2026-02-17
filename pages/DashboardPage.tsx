import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, LifeBuoy, PlusCircle, User, Menu, X, ShieldAlert, MapPin, 
  Mail, MessageCircle, Edit3, Users, Rocket, Zap, Database, Terminal,
  ArrowLeft, ExternalLink, ShieldCheck, Globe, Crown
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
  const handleAddJob = (newJob: Partial<Job>) => { addUserJob(newJob as any); };
  
  const handleViewApplicants = (jobId: string) => { 
    setSelectedJobId(jobId); 
    markApplicationsAsRead(jobId); 
  };

  const selectedJob = userCreatedJobs.find(j => j.id === selectedJobId);
  const jobApplicants = applications.filter(app => app.jobId === selectedJobId);

  const isMasterAdmin = user?.email?.toLowerCase() === 'fillipeferreiramunch@gmail.com';
  // Precise absolute path for the master architect image
  const founderImageUrl = "/IMG_6411%20Lille.png";

  const tabs = [
    { id: 'talent', label: t.tab_talent, icon: <Users size={18} /> },
    { id: 'jobs', label: t.tab_jobs, icon: <Terminal size={18} />, badge: applications.filter(a => a.isNew).length || null },
    { id: 'funding', label: t.tab_funding, icon: <Rocket size={18} /> },
    { id: 'brand', label: t.tab_brand, icon: <Database size={18} /> },
    { id: 'support', label: t.tab_support, icon: <LifeBuoy size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F9FBF9] flex flex-col lg:flex-row overflow-hidden pt-16 lg:pt-0 font-sans">
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#1a2e26] z-[100] px-6 flex items-center justify-between border-b border-white/5">
        <Logo size="sm" textColor="text-white" variant="light" />
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <aside className={`fixed inset-0 z-[90] lg:relative lg:translate-x-0 transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:w-80 bg-[#1a2e26] text-white p-10 flex flex-col h-full overflow-y-auto border-r border-white/5 shadow-2xl`}>
        <div className="mb-16 hidden lg:block">
          <Logo size="md" textColor="text-white" variant="light" />
        </div>
        
        <nav className="flex-1 space-y-2">
          {tabs.map(tab => (
            <button 
              key={tab.id} 
              onClick={() => { setActiveTab(tab.id); setSelectedJobId(null); setIsMobileMenuOpen(false); }} 
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold text-sm transition-all group ${activeTab === tab.id ? 'bg-[#D6825C] text-white shadow-xl shadow-[#D6825C]/20' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <div className="flex items-center space-x-4">
                <span className={activeTab === tab.id ? 'text-white' : 'text-white/30 group-hover:text-white'}>{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
              {tab.badge && <span className="bg-white text-[#1a2e26] text-[10px] px-2 py-0.5 rounded-full font-black">{tab.badge}</span>}
            </button>
          ))}
          
          {isMasterAdmin && (
            <button 
              onClick={() => navigate('/admin/master')}
              className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-black text-sm text-[#D6825C] bg-[#D6825C]/10 border border-[#D6825C]/20 mt-8 hover:bg-[#D6825C]/20 transition-all shadow-lg shadow-[#D6825C]/5"
            >
              <Crown size={18} fill="currentColor" />
              <span>Master Terminal</span>
            </button>
          )}
        </nav>
        
        <div className="mt-12 pt-10 border-t border-white/5">
           <div className="flex items-center space-x-5 px-4 mb-10 group">
             <div className="w-16 h-16 bg-[#1a2e26] rounded-[1.5rem] border-2 border-white/10 flex items-center justify-center font-black text-[#D6825C] overflow-hidden shrink-0 shadow-2xl relative ring-2 ring-white/5">
               {user?.profileImage ? (
                 <img 
                  src={user.profileImage} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" 
                  alt={user.name}
                 />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-2xl bg-white/5">{user?.name?.[0] || 'V'}</div>
               )}
               {isMasterAdmin && <div className="absolute top-0 right-0 w-4 h-4 bg-[#D6825C] border-2 border-[#1a2e26] rounded-full z-10" />}
             </div>
             <div className="overflow-hidden">
               <p className="text-sm font-black truncate text-white leading-tight mb-1">{isMasterAdmin ? 'Fillipe Munch' : (user?.name || 'Velix Entity')}</p>
               <p className="text-[9px] text-[#D6825C] uppercase font-black tracking-[0.2em]">
                 {isMasterAdmin ? 'Core Architect' : (isSubscribed ? 'Premium Node' : 'Standard Node')}
               </p>
             </div>
           </div>
           <button onClick={handleLogout} className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-red-400 hover:bg-red-400/10 transition-all border border-transparent hover:border-red-400/20">
             <LogOut size={16} /><span>{t.nav_logout}</span>
           </button>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-12 xl:p-20 overflow-y-auto bg-[#F9FBF9]">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab + (selectedJobId || '')} 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -15 }} 
            className="max-w-7xl mx-auto pb-24"
          >
            {activeTab === 'talent' && (
              <TalentExplorer isPremium={isSubscribed} startupJobs={userCreatedJobs} />
            )}

            {activeTab === 'jobs' && (
              <div className="space-y-12">
                {!selectedJobId ? (
                  <>
                    <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                      <div>
                        <h1 className="text-5xl font-black text-[#1a2e26] tracking-tighter uppercase leading-none">{t.tab_jobs}</h1>
                        <p className="text-[#1a2e26]/30 font-black uppercase tracking-[0.4em] text-[10px] mt-4 ml-1">Current Market Pulse Entries</p>
                      </div>
                      <button onClick={() => setIsPostModalOpen(true)} className="bg-[#1a2e26] hover:bg-[#D6825C] text-white px-10 py-5 rounded-2xl font-black flex items-center space-x-3 shadow-2xl transition-all uppercase tracking-widest text-xs active:scale-95 group">
                        <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                        <span>{t.post_job_cta}</span>
                      </button>
                    </header>

                    {userCreatedJobs.length > 0 ? (
                      <div className="grid gap-6">
                        {userCreatedJobs.map((job) => (
                          <div key={job.id} className="bg-white p-10 rounded-[2.5rem] border border-[#1a2e26]/5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8 hover:shadow-2xl transition-all group">
                            <div className="flex items-center space-x-8">
                              <div className="w-16 h-16 bg-[#F9FBF9] text-[#1a2e26]/40 rounded-2xl flex items-center justify-center border border-[#1a2e26]/5 group-hover:bg-[#1a2e26] group-hover:text-white transition-all shadow-inner">
                                <Terminal size={28} />
                              </div>
                              <div>
                                <h4 className="text-2xl font-black text-[#1a2e26] tracking-tight mb-2">{job.title}</h4>
                                <div className="flex items-center space-x-4">
                                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center">
                                     <MapPin size={12} className="mr-2" /> {job.location} • {job.postedAt}
                                   </span>
                                   <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border shadow-sm ${job.status === 'Approved' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                                     {job.status || 'Vetting Phase'}
                                   </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-6">
                              <div className="hidden md:block text-right">
                                <p className="text-2xl font-black text-[#1a2e26] leading-none mb-1">
                                  {applications.filter(a => a.jobId === job.id).length}
                                </p>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Active Signals</p>
                              </div>
                              <button 
                                onClick={() => handleViewApplicants(job.id)} 
                                className="bg-[#1a2e26] text-white hover:bg-[#D6825C] px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl active:scale-95"
                              >
                                Access Data
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-40 text-center bg-white rounded-[4rem] border-2 border-dashed border-[#1a2e26]/10 flex flex-col items-center">
                        <div className="w-24 h-24 bg-[#F9FBF9] rounded-3xl flex items-center justify-center mb-8 text-[#1a2e26]/10 shadow-inner">
                          <Terminal size={48} />
                        </div>
                        <h3 className="text-3xl font-black text-[#1a2e26] mb-3 uppercase tracking-tighter">Nexus Silence</h3>
                        <p className="text-[#1a2e26]/40 font-medium max-sm:mx-auto mb-12 leading-relaxed text-lg">
                          No market entries detected. Initialize your first node broadcast to capture human capital.
                        </p>
                        <button onClick={() => setIsPostModalOpen(true)} className="bg-[#1a2e26] text-white px-14 py-6 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl active:scale-95 hover:bg-[#D6825C] transition-colors">
                          Create Protocol Entry
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-12">
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="flex items-center space-x-8">
                        <button 
                          onClick={() => setSelectedJobId(null)}
                          className="w-14 h-14 rounded-2xl bg-white border border-[#1a2e26]/10 flex items-center justify-center text-[#1a2e26] hover:bg-[#1a2e26] hover:text-white transition-all active:scale-90 shadow-sm"
                        >
                          <ArrowLeft size={24} />
                        </button>
                        <div>
                          <h1 className="text-4xl font-black text-[#1a2e26] tracking-tighter uppercase leading-none">{selectedJob?.title}</h1>
                          <p className="text-[#1a2e26]/30 font-black uppercase tracking-[0.4em] text-[10px] mt-3 ml-1">Talent Capture Pipeline</p>
                        </div>
                      </div>
                    </header>
                    
                    <ApplicantsList applicants={jobApplicants} jobTitle={selectedJob?.title || ''} />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'funding' && (
              <div className="space-y-12">
                <header>
                   <h1 className="text-5xl font-black text-[#1a2e26] tracking-tighter uppercase leading-none">{t.tab_funding}</h1>
                   <p className="text-[#1a2e26]/30 font-black uppercase tracking-[0.4em] text-[10px] mt-4 ml-1">Capital Deployment Infrastructure</p>
                </header>
                <InvestorDirectory />
              </div>
            )}

            {activeTab === 'brand' && <BrandProfile />}

            {activeTab === 'support' && (
              <div className="space-y-16">
                <header>
                  <h1 className="text-5xl font-black text-[#1a2e26] tracking-tighter uppercase leading-none">{t.tab_support}</h1>
                  <p className="text-[#1a2e26]/30 font-black uppercase tracking-[0.4em] text-[10px] mt-4 ml-1">Protocol Matrix Support</p>
                </header>
                
                <div className="grid md:grid-cols-2 gap-10">
                   <div className="bg-white p-16 rounded-[3.5rem] border border-[#1a2e26]/5 shadow-sm hover:shadow-2xl transition-all group">
                      <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-10 shadow-inner group-hover:bg-blue-500 group-hover:text-white transition-all">
                        <Globe size={32} />
                      </div>
                      <h3 className="text-3xl font-black text-[#1a2e26] mb-4 uppercase tracking-tighter">Direct Nexus</h3>
                      <p className="text-[#1a2e26]/50 font-medium mb-10 leading-relaxed text-lg">
                        Need architectural consultation? Our core engineers are available for protocol scaling advice.
                      </p>
                   </div>

                   <div className="bg-[#1a2e26] p-16 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-[#D6825C]/10 rounded-full -mr-24 -mt-24 group-hover:scale-125 transition-transform duration-1000" />
                      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-10 text-[#D6825C] shadow-2xl border border-white/5">
                        <ShieldCheck size={32} />
                      </div>
                      <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">Entity Audit</h3>
                      <p className="text-white/50 font-medium mb-10 leading-relaxed text-lg">
                        Strategic brand vetting to ensure high-signal alignment with the Nordic Innovation Hub.
                      </p>
                      <div className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#D6825C]">
                        <div className="w-2 h-2 rounded-full bg-[#D6825C] animate-pulse" />
                        <span>VELIX STATUS: OPERATIONAL</span>
                      </div>
                   </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <PostJobModal 
        isOpen={isPostModalOpen} 
        onClose={() => setIsPostModalOpen(false)} 
        onSubmit={handleAddJob} 
      />
    </div>
  );
};

export default DashboardPage;