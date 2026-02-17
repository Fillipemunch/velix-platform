import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Trash2, ShieldAlert, Database, 
  ArrowLeft, CheckCircle2, AlertTriangle, Zap,
  Search, User, ShieldX, Terminal, 
  Crown, Activity, BarChart3, 
  Check, X, Cpu, ShieldCheck, 
  Briefcase, Rocket, Globe, Link as LinkIcon
} from 'lucide-react';

const AdminPage: React.FC = () => {
  const { ecosystemUsers, nukeDatabase, allJobs, investors, moderateJob, moderateInvestor, banUser, deleteJob, deleteInvestor, t } = useApp();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'talents' | 'companies' | 'investors' | 'system'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [isConfirmingNuke, setIsConfirmingNuke] = useState(false);
  const [nuked, setNuked] = useState(false);

  // MASTER SECURITY LOCK
  const MASTER_ADMIN_EMAIL = 'fillipeferreiramunch@gmail.com';
  const IS_AUTHORIZED = user?.email?.toLowerCase() === MASTER_ADMIN_EMAIL;
  // Encoded URL path for public folder asset
  const founderImageUrl = "/IMG_6411%20Lille.png";

  useEffect(() => {
    if (!isAdmin || !IS_AUTHORIZED) {
      const timer = setTimeout(() => navigate('/'), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAdmin, IS_AUTHORIZED, navigate]);

  if (!isAdmin || !IS_AUTHORIZED) {
    return (
      <div className="min-h-screen bg-[#0C1612] flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-red-500/10 text-red-500 w-24 h-24 rounded-3xl flex items-center justify-center mb-8 border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
          <ShieldX size={48} />
        </motion.div>
        <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Security Violation</h1>
        <p className="text-white/40 font-medium mb-12 max-w-sm mx-auto text-sm">Nexus access restricted to root node: <span className="text-[#D6825C] block font-black mt-2">{MASTER_ADMIN_EMAIL}</span></p>
        <button onClick={() => navigate('/')} className="bg-[#D6825C] text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-all">Deactivate Terminal</button>
      </div>
    );
  }

  // REAL DATA LOGS with safe timestamp fallback
  const unifiedLogs = [
    ...ecosystemUsers.map(u => ({ type: 'NODE', name: u.name, time: u.joinedAt, label: 'Access Auth' })),
    ...allJobs.map(j => ({ type: 'CORP', name: j.title, time: j.postedAt, label: 'Market Signal' })),
    ...investors.map(i => ({ type: 'CAPITAL', name: i.name, time: '2026-01-01', label: 'Capital Registration' }))
  ].sort((a, b) => {
    const timeA = isNaN(new Date(a.time).getTime()) ? 0 : new Date(a.time).getTime();
    const timeB = isNaN(new Date(b.time).getTime()) ? 0 : new Date(b.time).getTime();
    return timeB - timeA;
  }).slice(0, 10);

  const stats = [
    { label: 'Ecosystem Talents', value: ecosystemUsers.length, icon: <Users size={24} />, color: 'text-blue-500' },
    { label: 'Market Signals', value: allJobs.length, icon: <Briefcase size={24} />, color: 'text-orange-500' },
    { label: 'Capital Reserves', value: investors.length, icon: <Rocket size={24} />, color: 'text-[#D6825C]' },
    { label: 'Nexus Health', value: '100%', icon: <Activity size={24} />, color: 'text-green-500' },
  ];

  const handleNuke = () => {
    nukeDatabase();
    setNuked(true);
    setIsConfirmingNuke(false);
    setTimeout(() => setNuked(false), 3000);
  };

  const totalEntities = ecosystemUsers.length + allJobs.length + investors.length || 1;
  const chartValues = [
    { h: `${(ecosystemUsers.length / totalEntities) * 100}%`, color: 'from-blue-500/50 to-blue-500', label: 'Talents' },
    { h: `${(allJobs.length / totalEntities) * 100}%`, color: 'from-orange-500/50 to-orange-500', label: 'Startups' },
    { h: `${(investors.length / totalEntities) * 100}%`, color: 'from-[#D6825C]/50 to-[#D6825C]', label: 'Funds' },
    { h: '15%', color: 'from-slate-500/20 to-slate-500/20', label: 'System' }
  ];

  return (
    <div className="min-h-screen bg-[#F9FBF9] flex flex-col lg:flex-row font-sans">
      {/* Imposing Master Sidebar */}
      <aside className="fixed bottom-0 left-0 right-0 h-20 lg:h-screen lg:w-32 bg-[#1a2e26] flex lg:flex-col items-center justify-around lg:justify-start lg:py-12 border-t lg:border-t-0 lg:border-r border-white/5 z-[100] shadow-[0_-20px_60px_rgba(0,0,0,0.3)]">
        <div className="hidden lg:flex mb-16 relative">
          <div 
            className="w-20 h-20 bg-[#1a2e26] border-2 border-[#D6825C]/40 rounded-[2rem] flex items-center justify-center font-black text-white text-xl shadow-2xl cursor-pointer overflow-hidden group ring-4 ring-white/5 active:scale-95 transition-all"
            onClick={() => navigate('/')}
          >
             <img 
              src={founderImageUrl} 
              className="w-full h-full object-cover transition-transform group-hover:scale-125 duration-1000" 
              alt="Fillipe Munch" 
             />
          </div>
          <div className="absolute -top-2 -right-2 bg-[#D6825C] w-6 h-6 rounded-full flex items-center justify-center border-4 border-[#1a2e26] shadow-lg">
             <Crown size={10} className="text-white" />
          </div>
        </div>
        
        <nav className="flex lg:flex-col w-full lg:flex-1 justify-around lg:justify-start lg:space-y-8">
          {[
            { id: 'overview', icon: <Activity size={28} /> },
            { id: 'talents', icon: <Users size={28} /> },
            { id: 'companies', icon: <Briefcase size={28} /> },
            { id: 'investors', icon: <Rocket size={28} /> },
            { id: 'system', icon: <Cpu size={28} /> },
          ].map(item => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id as any)} 
              className={`p-4 rounded-2xl transition-all relative group ${activeTab === item.id ? 'bg-[#D6825C] text-white shadow-xl shadow-[#D6825C]/20' : 'text-white/20 hover:text-white hover:bg-white/5'}`}
            >
              {item.icon}
              <div className="absolute left-full ml-6 px-4 py-2 bg-white text-[#1a2e26] text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap pointer-events-none hidden lg:block shadow-2xl border border-[#1a2e26]/5">
                {item.id} protocol
              </div>
            </button>
          ))}
          <button onClick={() => navigate('/dashboard')} className="p-4 text-white/20 hover:text-red-400 lg:mt-auto transition-colors">
            <ArrowLeft size={28} />
          </button>
        </nav>
      </aside>

      {/* Main Console Area */}
      <main className="flex-1 lg:ml-32 p-6 md:p-16 lg:p-24 overflow-y-auto pb-32 lg:pb-24 bg-[#F9FBF9]">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="space-y-4">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-[#1a2e26] rounded-2xl flex items-center justify-center shadow-2xl">
                 <Crown className="text-[#D6825C]" size={40} fill="currentColor" />
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-[#1a2e26] tracking-tighter uppercase leading-none">Nexus <br /> <span className="text-[#D6825C]">Master</span></h1>
            </div>
            <p className="text-[#1a2e26]/30 font-black uppercase tracking-[0.5em] text-[10px] ml-1">Live Database Hub • European Infrastructure Layer</p>
          </div>
          
          {/* Identity Capsule - Forced Image */}
          <div className="bg-white p-6 md:p-8 rounded-[3rem] border border-slate-100 shadow-2xl flex items-center justify-between md:justify-start space-x-8 ring-1 ring-slate-200/50 hover:shadow-3xl transition-shadow group cursor-default">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-[#D6825C] uppercase tracking-[0.3em] mb-1">Architect status</span>
              <span className="text-xl font-black text-[#1a2e26] uppercase tracking-tighter">Fillipe Munch</span>
              <span className="text-[9px] font-bold text-slate-300 truncate max-w-[200px] mt-1">{MASTER_ADMIN_EMAIL}</span>
            </div>
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-[#1a2e26] border-[8px] border-[#F9FBF9] shadow-2xl overflow-hidden shrink-0 ring-2 ring-[#D6825C]/20 transition-transform group-hover:rotate-3 duration-700">
              <img 
                src={founderImageUrl} 
                className="w-full h-full object-cover scale-110" 
                alt="Fillipe profile" 
              />
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm group hover:shadow-2xl transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
                    <div className={`w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 transition-all group-hover:bg-[#1a2e26] group-hover:text-white relative z-10 ${stat.color}`}>{stat.icon}</div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2 relative z-10">{stat.label}</p>
                    <p className="text-5xl font-black text-[#1a2e26] tracking-tighter relative z-10">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 bg-[#1a2e26] rounded-[4rem] p-12 lg:p-20 text-white shadow-3xl relative overflow-hidden">
                  <div className="flex items-center justify-between mb-16 relative z-10">
                    <div>
                      <h3 className="text-3xl font-black uppercase tracking-tight">Deployment Matrix</h3>
                      <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mt-3">Node Distribution Protocol</p>
                    </div>
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#D6825C]">
                      <BarChart3 size={24} />
                    </div>
                  </div>
                  <div className="h-64 flex items-end gap-6 md:gap-12 px-4 relative z-10">
                    {chartValues.map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center group">
                         <motion.div initial={{ height: 0 }} animate={{ height: val.h }} className={`w-full bg-gradient-to-t ${val.color} rounded-t-3xl shadow-2xl relative`}>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-[#1a2e26] px-3 py-1 rounded-lg text-[9px] font-black">{val.h}</div>
                         </motion.div>
                         <span className="text-[9px] font-black mt-6 uppercase tracking-[0.2em] opacity-30 text-center leading-none whitespace-nowrap">{val.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-[4rem] p-12 lg:p-16 border border-slate-100 shadow-sm relative overflow-hidden">
                   <h3 className="text-2xl font-black text-[#1a2e26] uppercase tracking-tight mb-12 flex items-center"><Terminal size={24} className="mr-4 text-[#D6825C]" /> Protocol Stream</h3>
                   <div className="space-y-8">
                      {unifiedLogs.length > 0 ? unifiedLogs.map((log, i) => (
                        <div key={i} className="flex items-start justify-between group">
                          <div className="min-w-0 flex-1 pr-6">
                            <p className="text-[10px] font-black text-[#1a2e26] uppercase tracking-widest truncate mb-1">{log.label}</p>
                            <p className="text-xs font-bold text-slate-300 truncate">{log.name}</p>
                          </div>
                          <span className="text-[9px] font-black text-slate-200 uppercase whitespace-nowrap mt-1 tabular-nums">{log.time}</span>
                        </div>
                      )) : <p className="text-xs font-bold text-slate-200 uppercase tracking-widest text-center py-20">Waiting for nexus pulse...</p>}
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'talents' && (
            <motion.div key="talents" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
               <div className="flex items-center justify-between">
                  <h3 className="text-4xl font-black text-[#1a2e26] uppercase tracking-tighter">Human Capital Registry <span className="text-[#D6825C]">({ecosystemUsers.length})</span></h3>
               </div>
               <div className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/30 border-b border-slate-50">
                      <tr className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
                        <th className="px-12 py-10">Integrated Node</th>
                        <th className="px-12 py-10">Endpoint</th>
                        <th className="px-12 py-10">Status</th>
                        <th className="px-12 py-10 text-right">System Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {ecosystemUsers.map(u => (
                        <tr key={u.id} className="group hover:bg-[#F9FBF9] transition-all">
                          <td className="px-12 py-10">
                            <div className="flex items-center space-x-6">
                              <div className="w-14 h-14 bg-[#1a2e26] text-white rounded-2xl flex items-center justify-center font-black text-lg shrink-0 shadow-lg">{u.name[0]}</div>
                              <div className="min-w-0">
                                <p className="text-xl font-black text-[#1a2e26] truncate">{u.name}</p>
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">Node: {u.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-12 py-10">
                            <p className="text-sm font-bold text-slate-500 truncate">{u.email}</p>
                            <p className="text-[10px] font-black text-slate-200 uppercase mt-2">Sync Data: {u.joinedAt}</p>
                          </td>
                          <td className="px-12 py-10">
                            <span className={`text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-full shadow-sm border ${u.status === 'Active' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>{u.status}</span>
                          </td>
                          <td className="px-12 py-10 text-right">
                            {u.email !== MASTER_ADMIN_EMAIL ? (
                              <button onClick={() => banUser(u.id)} className={`p-4 rounded-2xl transition-all shadow-sm ${u.status === 'Active' ? 'bg-red-50 text-red-400 hover:bg-red-500 hover:text-white hover:shadow-red-500/20' : 'bg-green-50 text-green-400 hover:bg-green-500 hover:text-white hover:shadow-green-500/20'}`}>
                                {u.status === 'Active' ? <ShieldAlert size={20} /> : <CheckCircle2 size={20} />}
                              </button>
                            ) : (
                              <span className="text-[10px] font-black text-[#D6825C] uppercase tracking-[0.3em] px-6 py-2 bg-[#D6825C]/10 rounded-full border border-[#D6825C]/20">ROOT NODE</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
            </motion.div>
          )}

          {activeTab === 'system' && (
            <motion.div key="system" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-16 py-12">
               <div className="bg-[#1a2e26] rounded-[5rem] p-16 lg:p-24 text-white shadow-[0_80px_160px_-40px_rgba(26,46,38,0.4)] relative overflow-hidden text-center border border-white/5">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-red-600/20 text-red-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-16 border border-red-500/30 shadow-[0_0_100px_rgba(220,38,38,0.3)] animate-pulse relative z-10">
                    <AlertTriangle size={64} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none relative z-10">Emergency <br /> <span className="text-red-500">Node Purge</span></h3>
                  <p className="text-white/40 text-lg md:text-2xl font-medium max-w-xl mx-auto mb-20 leading-relaxed relative z-10">Initialize a total infrastructure reset. This action will irreversibly wipe all ecosystem nodes and signals from the Nexus matrix.</p>
                  
                  {!isConfirmingNuke ? (
                    <button onClick={() => setIsConfirmingNuke(true)} className="w-full sm:w-auto bg-white text-[#1a2e26] px-20 py-8 rounded-full font-black text-xs uppercase tracking-[0.4em] transition-all active:scale-95 shadow-3xl hover:bg-red-600 hover:text-white relative z-10 group">
                      <span className="group-hover:scale-110 block transition-transform">Initialize Reset</span>
                    </button>
                  ) : (
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-10 relative z-10">
                      <button onClick={handleNuke} className="w-full sm:w-auto bg-red-600 text-white px-20 py-8 rounded-full font-black text-xs uppercase tracking-[0.4em] shadow-3xl active:scale-95 animate-bounce">Confirm Nuke</button>
                      <button onClick={() => setIsConfirmingNuke(false)} className="text-white/30 hover:text-white font-black uppercase text-xs tracking-[0.3em] transition-colors">Abort Mission</button>
                    </div>
                  )}
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {nuked && (
          <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} className="fixed bottom-32 lg:bottom-16 left-6 right-6 lg:left-auto lg:right-16 bg-[#1a2e26] text-white px-12 py-6 rounded-full font-black text-xs uppercase tracking-widest shadow-[0_40px_80px_rgba(0,0,0,0.4)] flex items-center justify-center space-x-6 z-[200] border border-white/10">
            <Zap className="text-[#D6825C] animate-pulse" size={24} fill="currentColor" />
            <span className="tracking-[0.2em]">Protocol Reset Complete • All Signals Purged</span>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;