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

  // STRICT CHECK: fillipeferreiramunch@gmail.com
  const isMasterAdmin = user?.email.toLowerCase() === 'fillipeferreiramunch@gmail.com';

  const tabs = [
    { id: 'talent', label: t.tab_talent, icon: <Users size={18} /> },
    { id: 'jobs', label: t.tab_jobs, icon: <Terminal size={18} />, badge: applications.filter(a => a.isNew).length || null },
    { id: 'funding', label: t.tab_funding, icon: <Rocket size={18} /> },
    { id: 'brand', label: t.tab_brand, icon: <Database size={18} /> },
    { id: 'support', label: t.tab_support, icon: <LifeBuoy size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F9FBF9] flex flex-col lg:flex-row overflow-hidden pt-16 lg:pt-0 font-sans">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#1a2e26] z-[100] px-6 flex items-center justify-between border-b border-white/5">
        <Logo size="sm" textColor="text-white" variant="light" />
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-0 z-[90] lg:relative lg:translate-x-0 transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:w-72 bg-[#1a2e26] text-white p-8 flex flex-col h-full overflow-y-auto`}>
        <div className="mb-12 hidden lg:block"><Logo size="md" textColor="text-white" variant="light" /></div>
        <nav className="flex-1 space-y-2">
          {tabs.map(tab => (
            <button 
              key={tab.id} 
              onClick={() => { setActiveTab(tab.id); setSelectedJobId(null); setIsMobileMenuOpen(false); }} 
              className={`w-full flex items-center justify-between px-6 py-4 rounded-xl font-bold text-sm transition-all ${activeTab === tab.id ? 'bg-white/10 text-[#D6825C]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <div className="flex items-center space-x-4">
                {tab.icon}
                <span>{tab.label}</span>
              </div>
              {tab.badge && <span className="bg-[#D6825C] text-white text-[10px] px-2 py-0.5 rounded-full font-black">{tab.badge}</span>}
            </button>
          ))}
          
          {/* Master Admin Portal Access */}
          {isMasterAdmin && (
            <button 
              onClick={() => navigate('/admin/master')}
              className="w-full flex items-center space-x-4 px-6 py-4 rounded-xl font-black text-sm text-[#D6825C] bg-[#D6825C]/10 border border-[#D6825C]/20 mt-8 hover:bg-[#D6825C]/20 transition-all shadow-lg shadow-[#D6825C]/5"
            >
              <Crown size={18} fill="currentColor" />
              <span>Master Protocol</span>
            </button>
          )}
        </nav>
        
        <div className="mt-12 pt-8 border-t border-white/5">
           <div className="flex items-center space-x-4 px-6 mb-8">
             <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#D6825C] font-black border border-white/10">
               {user?.name?.[0] || 'V'}
             </div>
             <div className="overflow-hidden">
               <p className="text-xs font-black truncate">{user?.name || 'Velix Entity'}</p>
               <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">
                 {isSubscribed ? 'Premium Node' : 'Standard Node'}
               </p>
             </div>
           </div>
           <button onClick={handleLogout} className="w-full flex items-center space-x-4 px-6 py-4 rounded-xl font-bold text-sm text-red-400 hover:bg-red-400/5 transition-all">
             <LogOut size={18} /><span>{t.nav_logout}</span>
           </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto bg-[#F9FBF9]">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab + (selectedJobId || '')} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            className="max-w-6xl mx-auto pb-20"
          >
            {activeTab === 'talent' && (
              <TalentExplorer isPremium={isSubscribed} startupJobs={userCreatedJobs} />
            )}

            {activeTab === 'jobs' && (
              <div className="space-y-10">
                {!selectedJobId ? (
                  <>
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div>
                        <h1 className="text-4xl font-black text-[#1a2e26] tracking-tighter uppercase">{t.tab_jobs}</h1>
                        <p className="text-[#1a2e26]/40 font-bold uppercase tracking-widest text-[10px] mt-2">Manage your market signal entries</p>
                      </div>
                      <button onClick={() => setIsPostModalOpen(true)} className="bg-[#1a2e26] hover:bg-[#233f34] text-white px-8 py-4 rounded-xl font-black flex items-center space-x-2 shadow-xl transition-all uppercase tracking-widest text-xs">
                        <PlusCircle size={18} /><span>{t.post_job_cta}</span>
                      </button>
                    </header>

                    {userCreatedJobs.length > 0 ? (
                      <div className="grid gap-6">
                        {userCreatedJobs.map((job, idx) => (
                          <div key={job.id} className="bg-white p-8 rounded-[2rem] border border-[#1a2e26]/5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl transition-all group">
                            <div className="flex items-center space-x-6">
                              <div className="w-14 h-14 bg-[#F9FBF9] text-[#1a2e26]/40 rounded-xl flex items-center justify-center border border-[#1a2e26]/5 group-hover:bg-[#1a2e26] group-hover:text-white transition-colors">
                                <Terminal size={24} />
                              </div>
                              <div>
                                <h4 className="text-xl font-black text-[#1a2e26] tracking-tight">{job.title}</h4>
                                <div className="flex items-center space-x-3 mt-1">
                                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{job.location} • {job.postedAt}</span>
                                   <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${job.status === 'Approved' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                                     {job.status || 'Pending Vetting'}
                                   </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="hidden md:block text-right mr-4">
                                <p className="text-xl font-black text-[#1a2e26]">
                                  {applications.filter(a => a.jobId === job.id).length}
                                </p>
                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Signals</p>
                              </div>
                              <button 
                                onClick={() => handleViewApplicants(job.id)} 
                                className="bg-[#F9FBF9] text-[#1a2e26] hover:bg-[#1a2e26] hover:text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all border border-[#1a2e26]/5"
                              >
                                Review Signals
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-[#1a2e26]/10 flex flex-col items-center">
                        <div className="w-20 h-20 bg-[#F9FBF9] rounded-full flex items-center justify-center mb-6 text-[#1a2e26]/10">
                          <Terminal size={40} />
                        </div>
                        <h3 className="text-2xl font-black text-[#1a2e26] mb-2 uppercase tracking-tight">No active entries</h3>
                        <p className="text-[#1a2e26]/40 font-medium max-w-xs mx-auto mb-10 leading-relaxed">
                          Initialize your first market entry to start attracting top-tier talent from the protocol.
                        </p>
                        <button onClick={() => setIsPostModalOpen(true)} className="bg-[#D6825C] text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95">
                          Create Entry
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-10">
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center space-x-6">
                        <button 
                          onClick={() => setSelectedJobId(null)}
                          className="w-12 h-12 rounded-xl bg-white border border-[#1a2e26]/10 flex items-center justify-center text-[#1a2e26] hover:bg-[#1a2e26] hover:text-white transition-all active:scale-90"
                        >
                          <ArrowLeft size={20} />
                        </button>
                        <div>
                          <h1 className="text-3xl font-black text-[#1a2e26] tracking-tight uppercase">{selectedJob?.title}</h1>
                          <p className="text-[#1a2e26]/40 font-bold uppercase tracking-widest text-[10px] mt-1">Talent Pipeline Interface</p>
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
                   <h1 className="text-4xl font-black text-[#1a2e26] tracking-tighter uppercase">{t.tab_funding}</h1>
                   <p className="text-[#1a2e26]/40 font-bold uppercase tracking-widest text-[10px] mt-2">Capital Matrix & Deployment nodes</p>
                </header>
                <InvestorDirectory />
              </div>
            )}

            {activeTab === 'brand' && <BrandProfile />}

            {activeTab === 'support' && (
              <div className="space-y-12">
                <header>
                  <h1 className="text-4xl font-black text-[#1a2e26] tracking-tighter uppercase">{t.tab_support}</h1>
                  <p className="text-[#1a2e26]/40 font-bold uppercase tracking-widest text-[10px] mt-2">Protocol assistance & technical matrix</p>
                </header>
                
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="bg-white p-12 rounded-[2.5rem] border border-[#1a2e26]/5 shadow-sm hover:shadow-xl transition-all">
                      <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-8">
                        <Globe size={24} />
                      </div>
                      <h3 className="text-2xl font-black text-[#1a2e26] mb-4 uppercase tracking-tight">Direct Interface</h3>
                      <p className="text-[#1a2e26]/60 font-medium mb-8 leading-relaxed">
                        Need architectural advice on scaling your hiring via the protocol? Chat with our Copenhagen core team.
                      </p>
                      <button 
                        onClick={() => window.location.href = 'mailto:velixcopenhagen@gmail.com'}
                        className="w-full py-4 bg-[#1a2e26] text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-colors"
                      >
                        Contact via Email
                      </button>
                   </div>

                   <div className="bg-[#1a2e26] p-12 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D6825C]/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 text-[#D6825C]">
                        <ShieldCheck size={24} />
                      </div>
                      <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Integration Audit</h3>
                      <p className="text-white/60 font-medium mb-8 leading-relaxed">
                        Our compliance nodes will review your brand identity to ensure it matches the Velix high-signal standard.
                      </p>
                      <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-[#D6825C]">
                        <Zap size={14} fill="currentColor" />
                        <span>Protocol Status: Nominal</span>
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