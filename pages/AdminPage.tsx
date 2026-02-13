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
  Check, X, Eye, ArrowUpRight, Cpu, ShieldCheck
} from 'lucide-react';

const AdminPage: React.FC = () => {
  const { ecosystemUsers, nukeDatabase, allJobs, investors, moderateJob, moderateInvestor, banUser, deleteJob, deleteInvestor } = useApp();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'signals' | 'system'>('overview');
  const [isConfirmingNuke, setIsConfirmingNuke] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [nuked, setNuked] = useState(false);

  // STRICT ACCESS LOCK: fillipeferreiramunch@gmail.com
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
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-red-500/10 text-red-500 w-24 h-24 rounded-3xl flex items-center justify-center mb-8 border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.2)]"
        >
          <ShieldX size={48} />
        </motion.div>
        <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Protocol Breach</h1>
        <p className="text-white/40 font-medium mb-8 max-w-sm mx-auto">
          Unauthorized identity detected. This terminal is strictly locked to: <br/>
          <span className="text-[#D6825C] mt-2 block font-black uppercase tracking-widest">{MASTER_ADMIN_EMAIL}</span>
        </p>
        <button onClick={() => navigate('/')} className="bg-[#D6825C] text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-2xl">Eject to Home</button>
      </div>
    );
  }

  const handleNuke = () => {
    nukeDatabase();
    setNuked(true);
    setIsConfirmingNuke(false);
    setTimeout(() => setNuked(false), 3000);
  };

  const filteredUsers = ecosystemUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingSignals = [
    ...allJobs.filter(j => j.status === 'Pending').map(j => ({ ...j, type: 'Market Entry' })),
    ...investors.filter(i => i.status === 'Pending').map(i => ({ ...i, type: 'Capital Node', title: i.name }))
  ];

  // Helper for Chart UI - Added key to props type to resolve TS error
  const ChartBar = ({ height, delay }: { height: string, delay: number, key?: React.Key }) => (
    <motion.div 
      initial={{ height: 0 }}
      animate={{ height }}
      transition={{ delay, duration: 1, ease: "circOut" }}
      className="w-full bg-gradient-to-t from-[#D6825C]/20 to-[#D6825C] rounded-t-lg relative group"
    >
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1a2e26] text-[8px] text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">
        {height}
      </div>
    </motion.div>
  );

  const stats = [
    { label: 'Real Nodes', value: ecosystemUsers.length, change: '+12%', icon: <Users size={20} /> },
    { label: 'Market Signals', value: allJobs.length, change: '+5.4%', icon: <TrendingUp size={20} /> },
    { label: 'Capital Flow', value: '€24.8M', change: '+22%', icon: <Database size={20} /> },
    { label: 'Nexus Health', value: '99.9%', change: 'Nominal', icon: <Activity size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F9FBF9] flex">
      {/* Mini Sidebar Nav */}
      <aside className="w-24 bg-[#1a2e26] flex flex-col items-center py-10 border-r border-white/5 fixed h-screen z-50">
        <div className="mb-12">
          <div className="w-12 h-12 bg-[#D6825C] rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-2xl">V</div>
        </div>
        <nav className="flex-1 flex flex-col space-y-8">
          {[
            { id: 'overview', icon: <Activity size={24} />, label: 'Pulse' },
            { id: 'users', icon: <Users size={24} />, label: 'Nodes' },
            { id: 'signals', icon: <Terminal size={24} />, label: 'Signals' },
            { id: 'system', icon: <Cpu size={24} />, label: 'Core' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`p-4 rounded-2xl transition-all relative group ${activeTab === item.id ? 'bg-white/10 text-[#D6825C]' : 'text-white/20 hover:text-white'}`}
            >
              {item.icon}
              <span className="absolute left-full ml-4 px-3 py-1 bg-[#1a2e26] text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {item.label}
              </span>
            </button>
          ))}
        </nav>
        <button onClick={() => navigate('/dashboard')} className="p-4 text-white/20 hover:text-white mt-auto">
          <ArrowLeft size={24} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-24 p-12 lg:p-20 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <Crown className="text-[#D6825C]" size={40} fill="currentColor" />
              <h1 className="text-6xl font-black text-[#1a2e26] tracking-tighter uppercase leading-none">Master Hub</h1>
            </div>
            <p className="text-[#1a2e26]/30 font-black uppercase tracking-[0.4em] text-[10px] ml-1">Ecosystem Infrastructure • Protocol v2.5.0</p>
          </div>
          <div className="bg-white px-8 py-6 rounded-[2.5rem] border border-slate-100 shadow-xl flex items-center space-x-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-[#D6825C] uppercase tracking-widest">Protocol Architect</span>
              <span className="text-sm font-black text-[#1a2e26]">{MASTER_ADMIN_EMAIL}</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 border border-green-500/10">
              <ShieldAlert size={20} />
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
              {/* Stats Grid */}
              <div className="grid md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm group hover:shadow-2xl transition-all">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-[#1a2e26] group-hover:bg-[#1a2e26] group-hover:text-white transition-all">
                        {stat.icon}
                      </div>
                      <span className="text-[10px] font-black text-green-500 uppercase">{stat.change}</span>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">{stat.label}</p>
                    <p className="text-4xl font-black text-[#1a2e26] tracking-tighter">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Visual Intelligence Section */}
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-[#1a2e26] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
                  <div className="flex items-center justify-between mb-12 relative z-10">
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tight">Ecosystem Velocity</h3>
                      <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">Synchronization Rate / 30 Days</p>
                    </div>
                    <BarChart3 className="text-[#D6825C]" size={24} />
                  </div>
                  
                  <div className="h-64 flex items-end gap-3 px-4 relative z-10">
                    {['40%', '65%', '45%', '80%', '55%', '90%', '70%', '100%', '85%', '60%', '95%', '75%'].map((h, i) => (
                      <ChartBar key={i} height={h} delay={i * 0.05} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-6 px-4 text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">
                    <span>Epoch 01</span>
                    <span>Epoch 15</span>
                    <span>Epoch 30</span>
                  </div>
                </div>

                <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm">
                  <h3 className="text-xl font-black text-[#1a2e26] uppercase tracking-tight mb-8 flex items-center">
                    <Terminal size={18} className="mr-3 text-[#D6825C]" /> Protocol Stream
                  </h3>
                  <div className="space-y-6">
                    {[
                      { event: 'Node Authenticated', detail: 'ID: v8x-4k2', time: '2m ago' },
                      { event: 'Signal Broadcast', detail: 'Fintech Series A', time: '14m ago' },
                      { event: 'Access Rotated', detail: 'fillipe...munch', time: '1h ago' },
                      { event: 'Database Sync', detail: 'Clean State', time: '3h ago' },
                      { event: 'Bilateral Link', detail: 'Talent -> Node', time: '5h ago' },
                    ].map((log, i) => (
                      <div key={i} className="flex items-start justify-between group">
                        <div>
                          <p className="text-[10px] font-black text-[#1a2e26] uppercase tracking-widest">{log.event}</p>
                          <p className="text-[10px] font-bold text-slate-300 mt-1">{log.detail}</p>
                        </div>
                        <span className="text-[8px] font-black text-slate-200 uppercase">{log.time}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-10 py-4 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-[#1a2e26] hover:bg-slate-50 transition-all">
                    Extract Protocol Logs
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <h3 className="text-3xl font-black text-[#1a2e26] uppercase tracking-tight">Identity Registry</h3>
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                  <input 
                    type="text" placeholder="Query Nexus..." 
                    className="pl-16 pr-8 py-5 rounded-[2rem] bg-white border border-slate-100 text-sm font-bold focus:ring-4 focus:ring-[#D6825C]/10 outline-none w-full md:w-96 transition-all shadow-sm"
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50">
                    <tr className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
                      <th className="px-10 py-8">Entity</th>
                      <th className="px-10 py-8">Channel</th>
                      <th className="px-10 py-8">Status</th>
                      <th className="px-10 py-8 text-right">Correction</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredUsers.map(u => (
                      <tr key={u.id} className="group hover:bg-[#F9FBF9] transition-all">
                        <td className="px-10 py-8">
                          <div className="flex items-center space-x-5">
                            <div className="w-12 h-12 bg-white text-[#1a2e26] rounded-2xl flex items-center justify-center font-black text-xl border border-slate-100 shadow-sm group-hover:bg-[#1a2e26] group-hover:text-white transition-all">
                              {u.name[0]}
                            </div>
                            <div>
                              <p className="text-lg font-black text-[#1a2e26] group-hover:text-[#D6825C] transition-colors">{u.name}</p>
                              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-1">Node ID: {u.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-8">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-500">{u.email}</span>
                            <span className="text-[9px] font-black text-slate-300 uppercase mt-1">Sync: {u.joinedAt}</span>
                          </div>
                        </td>
                        <td className="px-10 py-8">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-full ${u.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="px-10 py-8 text-right">
                          {u.email !== MASTER_ADMIN_EMAIL ? (
                            <div className="flex justify-end space-x-2">
                              <button onClick={() => banUser(u.id)} className={`p-4 rounded-2xl transition-all ${u.status === 'Active' ? 'bg-red-50 text-red-400 hover:bg-red-500 hover:text-white' : 'bg-green-50 text-green-400 hover:bg-green-500 hover:text-white'}`}>
                                {u.status === 'Active' ? <ShieldAlert size={20} /> : <CheckCircle2 size={20} />}
                              </button>
                            </div>
                          ) : (
                            <span className="text-[10px] font-black text-[#D6825C] uppercase tracking-widest px-4 py-2 bg-[#D6825C]/10 rounded-full">Immutable</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'signals' && (
            <motion.div key="signals" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Moderation Queue */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-black uppercase tracking-tight flex items-center">
                    <ShieldCheck size={24} className="mr-3 text-[#D6825C]" /> Vetting Queue
                  </h3>
                  {pendingSignals.length > 0 ? pendingSignals.map((sig: any) => (
                    <div key={sig.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex items-center justify-between shadow-sm group">
                      <div className="flex items-center space-x-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black ${sig.type === 'Market Entry' ? 'bg-orange-50 text-[#D6825C]' : 'bg-blue-50 text-blue-600'}`}>
                          {sig.type === 'Market Entry' ? 'J' : 'I'}
                        </div>
                        <div>
                          <p className="text-xl font-black text-[#1a2e26] tracking-tight">{sig.title || sig.name}</p>
                          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">{sig.type} • ID: {sig.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => sig.type === 'Market Entry' ? moderateJob(sig.id, 'Approved') : moderateInvestor(sig.id, 'Approved')} className="p-4 bg-green-500 text-white rounded-2xl shadow-lg active:scale-95 transition-all"><Check size={20} /></button>
                        <button onClick={() => sig.type === 'Market Entry' ? moderateJob(sig.id, 'Rejected') : moderateInvestor(sig.id, 'Rejected')} className="p-4 bg-red-500 text-white rounded-2xl shadow-lg active:scale-95 transition-all"><X size={20} /></button>
                      </div>
                    </div>
                  )) : (
                    <div className="py-20 text-center bg-white rounded-[3.5rem] border border-dashed border-slate-200">
                      <CheckCircle2 size={40} className="mx-auto text-green-200 mb-4" />
                      <p className="text-slate-300 font-black text-xs uppercase tracking-widest">Registry Fully Vetted</p>
                    </div>
                  )}
                </div>

                {/* Active Broadcasts */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-black uppercase tracking-tight flex items-center">
                    <Activity size={24} className="mr-3 text-blue-500" /> Active Protocol
                  </h3>
                  <div className="bg-white rounded-[3.5rem] border border-slate-100 p-8 space-y-4 shadow-sm h-[600px] overflow-y-auto">
                    {[...allJobs.filter(j => j.status === 'Approved'), ...investors.filter(i => i.status === 'Approved')].map((item: any) => (
                      <div key={item.id} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100 group">
                        <div className="flex items-center space-x-4">
                           <Eye size={16} className="text-slate-200 group-hover:text-[#D6825C]" />
                           <span className="text-sm font-black text-[#1a2e26] truncate max-w-[200px]">{item.title || item.name}</span>
                        </div>
                        <button onClick={() => item.type === 'Market Entry' ? deleteJob(item.id) : deleteInvestor(item.id)} className="text-red-300 hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'system' && (
            <motion.div key="system" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-12">
              <div className="bg-[#1a2e26] rounded-[3.5rem] p-16 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full -mr-48 -mt-48 pointer-events-none" />
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-10 border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.3)]">
                    <AlertTriangle size={48} />
                  </div>
                  <h3 className="text-5xl font-black uppercase tracking-tighter mb-6 leading-none">Emergency Purge</h3>
                  <p className="text-white/40 text-xl font-medium max-w-xl mx-auto mb-16 leading-relaxed">
                    Immediately wipe all non-critical nodes, market entries, and capital hubs. This action is irreversible and recorded in the permanent ledger.
                  </p>
                  
                  {!isConfirmingNuke ? (
                    <button onClick={() => setIsConfirmingNuke(true)} className="bg-red-600 hover:bg-red-700 text-white px-16 py-6 rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-2xl active:scale-95 transition-all">
                      Initialize System Reset
                    </button>
                  ) : (
                    <div className="space-y-8">
                      <p className="text-red-400 font-black uppercase tracking-[0.5em] animate-pulse">Waiting for Confirmation...</p>
                      <div className="flex justify-center space-x-6">
                        <button onClick={handleNuke} className="bg-red-600 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl">Confirm Nuke</button>
                        <button onClick={() => setIsConfirmingNuke(false)} className="text-white/40 hover:text-white font-black uppercase text-xs tracking-widest">Abort</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm">
                  <h4 className="text-xl font-black text-[#1a2e26] uppercase tracking-tight mb-6">Archive Protocol</h4>
                  <p className="text-slate-400 text-sm mb-10 leading-relaxed font-medium">Export all verified data points to an encrypted cold-storage registry.</p>
                  <button className="w-full py-5 bg-slate-50 text-[#1a2e26] rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#1a2e26] hover:text-white transition-all">Initialize Backup</button>
                </div>
                <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm">
                  <h4 className="text-xl font-black text-[#1a2e26] uppercase tracking-tight mb-6">Infrastructure Status</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                       <span className="text-slate-300">Copenhagen Hub</span>
                       <span className="text-green-500">Online</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                       <span className="text-slate-300">Stripe Gateway</span>
                       <span className="text-green-500">Active</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                       <span className="text-slate-300">Auth Matrix</span>
                       <span className="text-orange-500">Heavy Load</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Sync Indicator */}
        <AnimatePresence>
          {nuked && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-12 right-12 bg-[#1a2e26] text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl flex items-center space-x-3 z-[100] border border-white/10">
              <Zap className="text-[#D6825C]" size={20} fill="currentColor" />
              <span>Protocol Reset Successful • Nexus Sync Active</span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminPage;