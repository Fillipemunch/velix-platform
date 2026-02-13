import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Trash2, ShieldAlert, Database, 
  ArrowLeft, CheckCircle2, AlertTriangle, Zap,
  Search, Calendar, Mail, User, ShieldX, Terminal, 
  Crown, Activity, TrendingUp, BarChart3, Edit3, 
  Check, X, Eye, ArrowUpRight, Cpu, ShieldCheck, 
  Briefcase, Rocket, Globe, Link as LinkIcon
} from 'lucide-react';

const AdminPage: React.FC = () => {
  const { ecosystemUsers, nukeDatabase, allJobs, investors, moderateJob, moderateInvestor, banUser, deleteJob, deleteInvestor } = useApp();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'talents' | 'companies' | 'investors' | 'system'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [isConfirmingNuke, setIsConfirmingNuke] = useState(false);
  const [nuked, setNuked] = useState(false);

  // MASTER SECURITY LOCK
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
      <div className="min-h-screen bg-[#0C1612] flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-red-500/10 text-red-500 w-24 h-24 rounded-3xl flex items-center justify-center mb-8 border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
          <ShieldX size={48} />
        </motion.div>
        <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Protocol Breach</h1>
        <p className="text-white/40 font-medium mb-8 max-w-sm mx-auto">Access restricted to: <span className="text-[#D6825C] block font-black">{MASTER_ADMIN_EMAIL}</span></p>
        <button onClick={() => navigate('/')} className="bg-[#D6825C] text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-2xl">Return to Home</button>
      </div>
    );
  }

  // REAL DATA COUNTERS
  const stats = [
    { label: 'Talent Nodes', value: ecosystemUsers.length, icon: <Users size={20} />, color: 'text-blue-500' },
    { label: 'Corporate Nodes', value: allJobs.length, icon: <Briefcase size={20} />, color: 'text-orange-500' },
    { label: 'Capital Nodes', value: investors.length, icon: <Rocket size={20} />, color: 'text-[#D6825C]' },
    { label: 'System Health', value: 'Nominal', icon: <Activity size={20} />, color: 'text-green-500' },
  ];

  const handleNuke = () => {
    nukeDatabase();
    setNuked(true);
    setIsConfirmingNuke(false);
    setTimeout(() => setNuked(false), 3000);
  };

  // Added 'key?: React.Key' to the props type to fix the TypeScript error when rendering in a list on line 132
  const ChartBar = ({ height, delay }: { height: string, delay: number, key?: React.Key }) => (
    <motion.div initial={{ height: 0 }} animate={{ height }} transition={{ delay, duration: 1, ease: "circOut" }} className="w-full bg-gradient-to-t from-[#D6825C]/20 to-[#D6825C] rounded-t-lg relative group" />
  );

  return (
    <div className="min-h-screen bg-[#F9FBF9] flex">
      {/* Mini Sidebar */}
      <aside className="w-24 bg-[#1a2e26] flex flex-col items-center py-10 border-r border-white/5 fixed h-screen z-50 shadow-2xl">
        <div className="mb-12"><div className="w-12 h-12 bg-[#D6825C] rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-2xl">V</div></div>
        <nav className="flex-1 flex flex-col space-y-6">
          {[
            { id: 'overview', icon: <Activity size={24} />, label: 'Pulse' },
            { id: 'talents', icon: <Users size={24} />, label: 'Talents' },
            { id: 'companies', icon: <Briefcase size={24} />, label: 'Companies' },
            { id: 'investors', icon: <Rocket size={24} />, label: 'Capital' },
            { id: 'system', icon: <Cpu size={24} />, label: 'System' },
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`p-4 rounded-2xl transition-all relative group ${activeTab === item.id ? 'bg-white/10 text-[#D6825C]' : 'text-white/20 hover:text-white'}`}>
              {item.icon}
              <span className="absolute left-full ml-4 px-3 py-1 bg-[#1a2e26] text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">{item.label}</span>
            </button>
          ))}
        </nav>
        <button onClick={() => navigate('/dashboard')} className="p-4 text-white/20 hover:text-white mt-auto"><ArrowLeft size={24} /></button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-24 p-12 lg:p-20 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <Crown className="text-[#D6825C]" size={40} fill="currentColor" />
              <h1 className="text-6xl font-black text-[#1a2e26] tracking-tighter uppercase leading-none">Master Hub</h1>
            </div>
            <p className="text-[#1a2e26]/30 font-black uppercase tracking-[0.4em] text-[10px] ml-1">Ecosystem Infrastructure • Live Data Matrix</p>
          </div>
          <div className="bg-white px-8 py-6 rounded-[2.5rem] border border-slate-100 shadow-xl flex items-center space-x-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-[#D6825C] uppercase tracking-widest">Protocol Architect</span>
              <span className="text-sm font-black text-[#1a2e26]">{MASTER_ADMIN_EMAIL}</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600"><ShieldCheck size={24} /></div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
              <div className="grid md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm group hover:shadow-2xl transition-all">
                    <div className={`w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 transition-all group-hover:bg-[#1a2e26] group-hover:text-white ${stat.color}`}>{stat.icon}</div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">{stat.label}</p>
                    <p className="text-4xl font-black text-[#1a2e26] tracking-tighter">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-[#1a2e26] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between mb-12 relative z-10">
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tight">Node Sychronization</h3>
                      <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">Activity Levels across Registry</p>
                    </div>
                  </div>
                  <div className="h-48 flex items-end gap-3 px-4 relative z-10">
                    {['20%', '35%', '15%', '60%', '45%', '80%', '65%', '100%', '85%', '50%', '95%', '70%'].map((h, i) => (
                      <ChartBar key={i} height={h} delay={i * 0.05} />
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm">
                   <h3 className="text-xl font-black text-[#1a2e26] uppercase tracking-tight mb-8 flex items-center"><Terminal size={18} className="mr-3 text-[#D6825C]" /> Protocol Logs</h3>
                   <div className="space-y-6">
                      {ecosystemUsers.slice(-5).reverse().map((u, i) => (
                        <div key={i} className="flex items-start justify-between">
                          <div>
                            <p className="text-[10px] font-black text-[#1a2e26] uppercase tracking-widest">New Node Sync</p>
                            <p className="text-[10px] font-bold text-slate-300 mt-1">{u.name}</p>
                          </div>
                          <span className="text-[8px] font-black text-slate-200 uppercase">{u.joinedAt}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'talents' && (
            <motion.div key="talents" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <h3 className="text-3xl font-black text-[#1a2e26] uppercase tracking-tight">Talent Registry ({ecosystemUsers.length})</h3>
              <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50">
                    <tr className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300"><th className="px-10 py-8">Entity</th><th className="px-10 py-8">Contact</th><th className="px-10 py-8">Status</th><th className="px-10 py-8 text-right">Actions</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {ecosystemUsers.map(u => (
                      <tr key={u.id} className="group hover:bg-[#F9FBF9] transition-all">
                        <td className="px-10 py-8"><div className="flex items-center space-x-4"><div className="w-10 h-10 bg-[#1a2e26] text-white rounded-xl flex items-center justify-center font-black">{u.name[0]}</div><div><p className="font-black text-[#1a2e26]">{u.name}</p><p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Node ID: {u.id}</p></div></div></td>
                        <td className="px-10 py-8"><p className="text-sm font-bold text-slate-500">{u.email}</p><p className="text-[9px] font-black text-slate-300 uppercase mt-1">Sync: {u.joinedAt}</p></td>
                        <td className="px-10 py-8"><span className={`text-[10px] font-black uppercase px-4 py-1.5 rounded-full ${u.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{u.status}</span></td>
                        <td className="px-10 py-8 text-right">{u.email !== MASTER_ADMIN_EMAIL ? <button onClick={() => banUser(u.id)} className={`p-3 rounded-xl transition-all ${u.status === 'Active' ? 'bg-red-50 text-red-400 hover:bg-red-500 hover:text-white' : 'bg-green-50 text-green-400 hover:bg-green-500 hover:text-white'}`}>{u.status === 'Active' ? <ShieldAlert size={18} /> : <CheckCircle2 size={18} />}</button> : <span className="text-[9px] font-black text-[#D6825C] uppercase tracking-widest px-3 py-1 bg-[#D6825C]/10 rounded-full">Root Node</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'companies' && (
            <motion.div key="companies" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <h3 className="text-3xl font-black text-[#1a2e26] uppercase tracking-tight">Corporate Registry ({allJobs.length})</h3>
              <div className="grid gap-6">
                {allJobs.map((job) => (
                  <div key={job.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between group">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100"><Briefcase size={24} className="text-orange-500" /></div>
                      <div>
                        <h4 className="text-xl font-black text-[#1a2e26] tracking-tight">{job.title}</h4>
                        <div className="flex items-center space-x-4 mt-2">
                           <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">CVR: {job.cvr}</span>
                           <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">•</span>
                           <a href={job.linkedinUrl} target="_blank" className="text-[10px] font-black text-[#D6825C] uppercase tracking-[0.2em] hover:underline flex items-center"><LinkIcon size={12} className="mr-1" /> LinkedIn Signal</a>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                       {job.status === 'Pending' && (
                         <button onClick={() => moderateJob(job.id, 'Approved')} className="bg-green-500 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-green-500/20 active:scale-95 transition-all">Authorize</button>
                       )}
                       <button onClick={() => deleteJob(job.id)} className="p-4 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
                {allJobs.length === 0 && <div className="py-24 text-center bg-white rounded-[3.5rem] border-2 border-dashed border-slate-100 text-slate-300 font-black uppercase tracking-widest text-xs">No corporate nodes registered</div>}
              </div>
            </motion.div>
          )}

          {activeTab === 'investors' && (
            <motion.div key="investors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <h3 className="text-3xl font-black text-[#1a2e26] uppercase tracking-tight">Capital Registry ({investors.length})</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {investors.map((inv) => (
                  <div key={inv.id} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center space-x-5">
                         <img src={inv.logo} className="w-14 h-14 rounded-2xl border border-slate-100 object-cover" />
                         <div>
                            <h4 className="text-2xl font-black text-[#1a2e26] uppercase tracking-tight">{inv.name}</h4>
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{inv.corporateEmail}</p>
                         </div>
                      </div>
                      <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${inv.status === 'Approved' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>{inv.status}</span>
                    </div>
                    <div className="space-y-4 mb-10">
                       <p className="text-xs text-slate-500 font-medium italic">"{inv.thesis}"</p>
                       <div className="flex flex-wrap gap-2">
                          {inv.stages.map(s => <span key={s} className="text-[8px] font-black bg-slate-50 text-slate-400 px-2 py-1 rounded uppercase">{s}</span>)}
                       </div>
                    </div>
                    <div className="flex items-center gap-3 border-t border-slate-50 pt-8">
                       <a href={inv.website} target="_blank" className="flex-1 py-3 bg-slate-50 text-[#1a2e26] rounded-xl font-black text-[10px] uppercase tracking-widest text-center hover:bg-slate-100 transition-all flex items-center justify-center"><Globe size={14} className="mr-2" /> HQ Website</a>
                       {inv.status === 'Pending' && (
                         <button onClick={() => moderateInvestor(inv.id, 'Approved')} className="flex-1 py-3 bg-[#D6825C] text-white rounded-xl font-black text-[10px] uppercase tracking-widest text-center shadow-lg shadow-[#D6825C]/20 active:scale-95 transition-all">Authorize Fund</button>
                       )}
                       <button onClick={() => deleteInvestor(inv.id)} className="p-3 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
                {investors.length === 0 && <div className="md:col-span-2 py-24 text-center bg-white rounded-[3.5rem] border-2 border-dashed border-slate-100 text-slate-300 font-black uppercase tracking-widest text-xs">No capital nodes registered</div>}
              </div>
            </motion.div>
          )}

          {activeTab === 'system' && (
            <motion.div key="system" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-12">
               <div className="bg-[#1a2e26] rounded-[3.5rem] p-16 text-white shadow-2xl relative overflow-hidden text-center">
                  <div className="w-24 h-24 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-10 border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.3)]"><AlertTriangle size={48} /></div>
                  <h3 className="text-5xl font-black uppercase tracking-tighter mb-6">Emergency Purge</h3>
                  <p className="text-white/40 text-xl font-medium max-w-xl mx-auto mb-16 leading-relaxed">Instantly wipe all non-critical nodes, market entries, and capital hubs. IRREVERSIBLE.</p>
                  {!isConfirmingNuke ? (
                    <button onClick={() => setIsConfirmingNuke(true)} className="bg-red-600 hover:bg-red-700 text-white px-16 py-6 rounded-full font-black text-xs uppercase tracking-[0.3em] transition-all active:scale-95">Initialize System Reset</button>
                  ) : (
                    <div className="flex justify-center space-x-6">
                      <button onClick={handleNuke} className="bg-red-600 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl">Confirm Nuke</button>
                      <button onClick={() => setIsConfirmingNuke(false)} className="text-white/40 hover:text-white font-black uppercase text-xs tracking-widest">Abort</button>
                    </div>
                  )}
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {nuked && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-12 right-12 bg-[#1a2e26] text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl flex items-center space-x-3 z-[100] border border-white/10">
            <Zap className="text-[#D6825C]" size={20} fill="currentColor" />
            <span>Protocol Reset Successful • All Nodes Cleared</span>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
