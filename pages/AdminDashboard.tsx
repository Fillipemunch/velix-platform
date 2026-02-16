import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Rocket, ShieldCheck, CheckCircle2, 
  XCircle, Search, TrendingUp, LogOut, 
  Terminal, Trash2, ShieldAlert, Database,
  ArrowRight, Clock, UserMinus, ShieldQuestion,
  Zap, Sparkles, Filter, Ghost, AlertTriangle, Menu, X as CloseIcon
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { 
    investors, allJobs, moderateJob, moderateInvestor, 
    deleteJob, deleteInvestor, ecosystemUsers, banUser, runFakeCleanup, t
  } = useApp();
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'users' | 'posts' | 'moderation' | 'cleanup'>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCleaning, setIsCleaning] = useState(false);
  const [cleanupResult, setCleanupResult] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const MASTER_ADMIN_EMAIL = 'fillipeferreiramunch@gmail.com';
  const IS_AUTHORIZED = user?.email.toLowerCase() === MASTER_ADMIN_EMAIL;

  useEffect(() => {
    if (!isAdmin || !IS_AUTHORIZED) {
      const timer = setTimeout(() => navigate('/'), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAdmin, IS_AUTHORIZED, navigate]);

  if (!isAdmin || !IS_AUTHORIZED) {
    return (
      <div className="min-h-screen bg-[#1a2e26] flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-red-500/10 text-red-500 w-24 h-24 rounded-3xl flex items-center justify-center mb-8 border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
          <ShieldAlert size={48} />
        </motion.div>
        <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter leading-none">Access Denied</h1>
        <p className="text-white/40 font-medium mb-8 max-w-sm mx-auto">Security protocol active. This terminal is restricted to the Master Administrator.</p>
        <button onClick={() => navigate('/')} className="bg-[#D6825C] text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-2xl">Return to Home</button>
      </div>
    );
  }

  const handleCleanup = () => {
    setIsCleaning(true);
    setTimeout(() => {
      const result = runFakeCleanup();
      setCleanupResult(result.removedCount);
      setIsCleaning(false);
    }, 2000);
  };

  const allPosts = [
    ...allJobs.map(j => ({ ...j, type: t.admin.type_job })),
    ...investors.map(i => ({ ...i, type: t.admin.type_investor, title: i.name }))
  ];

  const moderationQueue = [
    ...allJobs.filter(j => j.status === 'Pending').map(j => ({ ...j, type: 'job' })),
    ...investors.filter(i => i.status === 'Pending').map(i => ({ ...i, type: 'investor' }))
  ];

  const stats = [
    { label: t.admin.metrics_users, value: ecosystemUsers.length, icon: <Users size={20} />, color: 'bg-blue-500/10 text-blue-500' },
    { label: t.admin.stats_signals, value: allPosts.length, icon: <Terminal size={20} />, color: 'bg-[#D6825C]/10 text-[#D6825C]' },
    { label: t.admin.stats_vetting, value: moderationQueue.length, icon: <ShieldQuestion size={20} />, color: 'bg-orange-500/10 text-orange-500' },
  ];

  const filteredUsers = ecosystemUsers.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPosts = allPosts.filter(p => 
    (p as any).title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (p as any).company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p as any).name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row pt-16 lg:pt-0 font-sans">
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#1a2e26] z-[110] px-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#D6825C] rounded-lg flex items-center justify-center font-black text-white text-sm">V</div>
          <span className="text-white font-black uppercase tracking-tighter text-sm">Master Terminal</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white p-2">
          {isSidebarOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar / Mobile Overlay */}
      <aside className={`fixed inset-0 lg:relative lg:translate-x-0 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:w-80 bg-[#1a2e26] text-white flex flex-col h-full z-[100] p-10 border-r border-white/5 overflow-y-auto`}>
        <div className="mb-16 hidden lg:block">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-[#D6825C] rounded-2xl flex items-center justify-center font-black text-white text-2xl shadow-xl">V</div>
            <div>
              <h2 className="text-xl font-black tracking-tighter uppercase">VELIX</h2>
              <p className="text-[#D6825C] text-[8px] font-black tracking-[0.3em] uppercase">Master Terminal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-3 mt-8 lg:mt-0">
          {[
            { id: 'users', label: t.admin.user_management, icon: <Users size={20} /> },
            { id: 'posts', label: t.admin.content_mod, icon: <Terminal size={20} /> },
            { id: 'cleanup', label: t.admin.fake_cleanup, icon: <Sparkles size={20} />, color: 'text-[#D6825C]' },
            { id: 'moderation', label: t.admin.vetting_queue, icon: <ShieldCheck size={20} />, badge: moderationQueue.length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setIsSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold text-sm transition-all ${
                activeTab === tab.id ? 'bg-white/10 text-[#D6825C]' : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center space-x-4">
                {tab.icon}
                <span>{tab.label}</span>
              </div>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="bg-[#D6825C] text-white text-[10px] font-black px-2 py-0.5 rounded-full">{tab.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="pt-10 border-t border-white/5 mt-12">
          <button 
            onClick={() => { logout(); navigate('/'); }} 
            className="w-full flex items-center px-6 py-4 text-xs font-black text-red-400 hover:bg-red-400/5 transition-all rounded-2xl uppercase tracking-widest"
          >
            <LogOut size={16} className="mr-4" /> {t.admin.deauth_terminal}
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-12 lg:p-16 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-12">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a2e26] tracking-tighter uppercase leading-none">{t.admin.dashboard_title}</h1>
              <p className="text-[#1a2e26]/30 font-black uppercase tracking-[0.4em] text-[10px] mt-4 ml-1">{t.admin.dashboard_subtitle}</p>
            </div>
            <div className="relative group w-full md:w-auto">
               <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#D6825C] transition-colors" />
               <input 
                type="text" 
                placeholder={t.admin.search_placeholder} 
                className="pl-14 pr-8 py-4 rounded-2xl bg-white border border-slate-100 text-xs font-bold focus:ring-4 focus:ring-[#D6825C]/5 outline-none w-full md:w-80 transition-all shadow-sm" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-50 shadow-sm relative group hover:shadow-xl transition-all">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${s.color}`}>
                  {s.icon}
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1a2e26]/20 mb-2">{s.label}</p>
                <p className="text-4xl md:text-5xl font-black text-[#1a2e26] tracking-tighter">{s.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-[2rem] md:rounded-[3.5rem] border border-slate-50 shadow-sm overflow-hidden">
            <div className="p-6 md:p-12">
              <AnimatePresence mode="wait">
                {activeTab === 'users' && (
                  <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h3 className="text-xl md:text-2xl font-black text-[#1a2e26] uppercase mb-8">{t.admin.user_management}</h3>
                    <div className="overflow-x-auto -mx-6 md:mx-0">
                      <table className="w-full text-left min-w-[600px]">
                        <thead>
                          <tr className="text-[10px] font-black uppercase tracking-widest text-slate-300 border-b border-slate-50">
                            <th className="px-6 py-6">Entity</th>
                            <th className="px-6 py-6">Email</th>
                            <th className="px-6 py-6">Status</th>
                            <th className="px-6 py-6 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {filteredUsers.map((u) => (
                            <tr key={u.id} className="group hover:bg-slate-50/50 transition-all">
                              <td className="px-6 py-6 font-black text-[#1a2e26]">{u.name}</td>
                              <td className="px-6 py-6 text-xs font-bold text-slate-400">{u.email}</td>
                              <td className="px-6 py-6"><span className={`text-[8px] font-black uppercase px-3 py-1 rounded-full ${u.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{u.status}</span></td>
                              <td className="px-6 py-6 text-right">{u.email !== MASTER_ADMIN_EMAIL && <button onClick={() => banUser(u.id)} className="p-3 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><UserMinus size={18} /></button>}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'posts' && (
                  <motion.div key="posts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h3 className="text-xl md:text-2xl font-black text-[#1a2e26] uppercase mb-8">{t.admin.content_mod}</h3>
                    <div className="grid gap-4">
                      {filteredPosts.map((p: any) => (
                        <div key={p.id} className="p-6 bg-slate-50/50 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
                          <div className="flex items-center space-x-6 min-w-0">
                            <div className="w-12 h-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center font-black shrink-0">{p.type[0]}</div>
                            <div className="min-w-0 pr-4">
                              <p className="text-lg font-black text-[#1a2e26] tracking-tight truncate">{p.title || p.name}</p>
                              <span className="text-[8px] font-black uppercase tracking-widest text-[#D6825C]">{p.type}</span>
                            </div>
                          </div>
                          <button onClick={() => (p.type === t.admin.type_job || p.type === 'Market Entry') ? deleteJob(p.id) : deleteInvestor(p.id)} className="w-full sm:w-auto py-3 px-6 sm:p-4 text-red-400 bg-red-50 sm:bg-transparent sm:text-red-300 hover:text-red-500 sm:hover:bg-red-50 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest sm:opacity-0 group-hover:opacity-100">
                            <span className="sm:hidden mr-2">Remove Signal</span>
                            <Trash2 size={20} className="inline" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'cleanup' && (
                  <motion.div key="cleanup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h3 className="text-xl md:text-2xl font-black text-[#1a2e26] uppercase mb-8">{t.admin.fake_cleanup}</h3>
                    <div className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 text-center flex flex-col items-center">
                       <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 text-[#D6825C] shadow-xl">{isCleaning ? <Zap size={40} className="animate-pulse" /> : <Ghost size={40} />}</div>
                       <h4 className="text-2xl md:text-3xl font-black text-[#1a2e26] uppercase mb-6 tracking-tighter">Protocol Scan</h4>
                       <p className="text-[#1a2e26]/50 font-medium max-w-sm mx-auto mb-10 text-sm md:text-lg leading-relaxed">Instantly identify and remove bot patterns and temporary nodes.</p>
                       <button onClick={handleCleanup} disabled={isCleaning} className={`w-full sm:w-auto px-12 py-5 bg-[#1a2e26] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-all flex items-center justify-center space-x-3 ${isCleaning ? 'opacity-50' : 'hover:bg-[#D6825C]'}`}>
                         {isCleaning ? <><Database className="animate-spin" size={16} /> <span>Cleaning...</span></> : <><Zap size={16} fill="currentColor" /> <span>Start Cleanup</span></>}
                       </button>
                       <AnimatePresence>{cleanupResult !== null && <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 bg-green-50 text-green-600 px-6 py-4 rounded-xl border border-green-100 text-xs font-black uppercase tracking-widest">{cleanupResult} Nodes Purged Successfully</motion.div>}</AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'moderation' && (
                  <motion.div key="moderation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h3 className="text-xl md:text-2xl font-black text-[#1a2e26] uppercase mb-8">{t.admin.vetting_queue}</h3>
                    {moderationQueue.length > 0 ? (
                      <div className="grid gap-6">
                        {moderationQueue.map((item: any) => (
                          <div key={item.id} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                            <div className="flex items-center space-x-6 min-w-0">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black shrink-0 ${item.type === 'job' ? 'bg-[#D6825C]/10 text-[#D6825C]' : 'bg-blue-50 text-blue-600'}`}>{item.type[0].toUpperCase()}</div>
                              <div className="min-w-0">
                                <h4 className="text-lg font-black text-[#1a2e26] truncate">{item.title || item.name}</h4>
                                <p className="text-[10px] font-bold text-slate-300 uppercase mt-1 tracking-widest">ID: {item.id}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 w-full sm:w-auto">
                              <button onClick={() => item.type === 'job' ? moderateJob(item.id, 'Approved') : moderateInvestor(item.id, 'Approved')} className="flex-1 sm:flex-none bg-[#1a2e26] text-white px-6 py-3 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest active:scale-95">{t.admin.approve}</button>
                              <button onClick={() => item.type === 'job' ? moderateJob(item.id, 'Rejected') : moderateInvestor(item.id, 'Rejected')} className="p-3 border border-red-50 text-red-300 hover:text-red-500 rounded-xl transition-all"><XCircle size={18} /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-24 text-center">
                        <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={32} /></div>
                        <p className="text-slate-400 font-medium">{t.admin.no_pending_msg}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <footer className="pt-20 border-t border-slate-50 flex flex-col items-center text-center">
            <p className="text-[8px] md:text-[10px] font-black text-[#1a2e26]/10 uppercase tracking-[0.4em] mb-4">VELIX CORE INFRASTRUCTURE • GENERAL CONSOLE</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;