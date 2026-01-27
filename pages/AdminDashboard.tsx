
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// Added missing LogOut import
import { 
  BarChart3, Users, Rocket, CreditCard, ShieldCheck, 
  Clock, CheckCircle2, XCircle, ChevronRight, LayoutDashboard,
  Search, ArrowUpRight, TrendingUp, AlertTriangle, ExternalLink, Cpu, Zap,
  LogOut
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { t, investors, allJobs, moderateJob, moderateInvestor } = useApp();
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'moderation' | 'payments' | 'users'>('moderation');

  if (!isAdmin) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-4xl font-black text-[#0A1128]">{t.common.accessDenied}</h1>
        <button onClick={() => navigate('/')} className="mt-8 text-[#5865F2] font-black underline uppercase text-xs">Return to Node</button>
      </div>
    );
  }

  // Combined moderation queue
  const pendingJobs = allJobs.filter(j => j.status === 'Pending' || !j.status);
  const pendingInvestors = investors.filter(i => i.status === 'Pending');
  
  const moderationQueue = [
    ...pendingJobs.map(j => ({ ...j, type: 'job' as const })),
    ...pendingInvestors.map(i => ({ ...i, type: 'investor' as const }))
  ].sort((a, b) => (b.id > a.id ? 1 : -1));

  const metrics = [
    { label: t.admin.metrics_users, value: '2,482', icon: <Users size={24} />, color: 'text-blue-500', trend: '+12%' },
    { label: t.admin.metrics_investors, value: investors.length.toString(), icon: <Rocket size={24} />, color: 'text-[#00D1FF]', trend: '+3%' },
    { label: t.admin.metrics_mrr, value: '13,200 €', icon: <CreditCard size={24} />, color: 'text-[#5865F2]', trend: '+18%' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row pt-16 lg:pt-0">
      {/* Admin Sidebar */}
      <aside className="w-full lg:w-72 bg-[#0A1128] text-white flex flex-col h-screen fixed lg:sticky top-0 left-0 z-[100] p-10">
        <div className="mb-16 flex items-center space-x-3">
          <div className="w-12 h-12 bg-[#5865F2] rounded-[1rem] flex items-center justify-center font-black text-white text-2xl shadow-2xl shadow-[#5865F2]/30">V</div>
          <span className="text-2xl font-black tracking-tighter uppercase">VELIX <span className="text-[#00D1FF] lowercase font-bold text-sm tracking-normal">Nexus</span></span>
        </div>

        <nav className="flex-1 space-y-3">
          {[
            { id: 'moderation', label: t.admin.tab_moderation, icon: <ShieldCheck size={20} />, count: moderationQueue.length },
            { id: 'payments', label: t.admin.tab_payments, icon: <CreditCard size={20} /> },
            { id: 'users', label: t.admin.tab_users, icon: <Users size={20} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-xl font-bold text-sm transition-all group ${
                activeTab === tab.id ? 'bg-[#5865F2] text-white shadow-2xl shadow-[#5865F2]/20' : 'text-white/30 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center space-x-4">
                {tab.icon}
                <span>{tab.label}</span>
              </div>
              {tab.count !== undefined && tab.count > 0 && (
                <span className="bg-[#00D1FF] text-[#0A1128] text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">{tab.count}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/5 mt-auto">
          <button onClick={() => { logout(); navigate('/'); }} className="w-full text-left px-6 py-4 text-sm font-bold text-red-400 hover:text-red-300 transition-all flex items-center">
            <LogOut size={18} className="mr-3" />
            {t.navigation.logout}
          </button>
        </div>
      </aside>

      {/* Main Admin Dashboard Content */}
      <main className="flex-1 p-8 lg:p-20 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-16 pb-20">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div>
              <h1 className="text-6xl font-black text-[#0A1128] tracking-tighter uppercase">{t.admin.title}</h1>
              <p className="text-[#0A1128]/30 font-black uppercase tracking-[0.3em] text-[10px] mt-4">{t.admin.subtitle}</p>
            </div>
            <div className="flex items-center space-x-4 bg-white px-8 py-5 rounded-[2rem] border border-[#0A1128]/5 shadow-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.5)]" />
              <span className="text-[10px] font-black text-[#0A1128]/50 uppercase tracking-widest">Global Node Health: 100%</span>
            </div>
          </header>

          {/* Quick Metrics */}
          <div className="grid md:grid-cols-3 gap-10">
            {metrics.map((m, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[3rem] border border-[#0A1128]/5 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-slate-50 opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform`} />
                <div className="flex items-center justify-between mb-8">
                  <div className={`w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center ${m.color}`}>
                    {m.icon}
                  </div>
                  <div className="flex items-center text-green-500 text-[10px] font-black uppercase tracking-widest">
                    <TrendingUp size={12} className="mr-1.5" /> {m.trend}
                  </div>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0A1128]/20 mb-2">{m.label}</p>
                <p className="text-4xl font-black text-[#0A1128] tracking-tighter">{m.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-[3.5rem] border border-[#0A1128]/5 shadow-sm overflow-hidden">
            <div className="p-10 md:p-16">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                <h3 className="text-3xl font-black text-[#0A1128] tracking-tight uppercase">
                  {activeTab === 'moderation' ? t.admin.tab_moderation : activeTab === 'payments' ? t.admin.tab_payments : t.admin.tab_users}
                </h3>
                <div className="relative group">
                   <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#5865F2] transition-colors" />
                   <input type="text" placeholder="Query Nexus Data..." className="pl-14 pr-8 py-4 rounded-full bg-slate-50 border-none text-xs font-bold focus:ring-2 focus:ring-[#5865F2]/20 outline-none w-full md:w-80 transition-all" />
                </div>
              </div>

              {activeTab === 'moderation' && (
                <div className="space-y-6">
                  {moderationQueue.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0A1128]/20 border-b border-slate-50">
                            <th className="px-8 py-6">Signal Type</th>
                            <th className="px-8 py-6">Identity / Entry</th>
                            <th className="px-8 py-6">Origin Entity</th>
                            <th className="px-8 py-6 text-right">Action Protocol</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {moderationQueue.map((item, i) => (
                            <motion.tr 
                              key={item.id} 
                              initial={{ opacity: 0 }} 
                              animate={{ opacity: 1 }} 
                              transition={{ delay: i * 0.05 }}
                              className="group hover:bg-slate-50/50 transition-colors"
                            >
                              <td className="px-8 py-8">
                                <span className={`text-[8px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${item.type === 'job' ? 'bg-blue-50 text-blue-600' : 'bg-[#00D1FF]/10 text-[#00D1FF]'}`}>
                                  {item.type === 'job' ? t.admin.type_job : t.admin.type_investor}
                                </span>
                              </td>
                              <td className="px-8 py-8">
                                <p className="text-lg font-black text-[#0A1128] group-hover:text-[#5865F2] transition-colors">
                                  {item.type === 'job' ? (item as any).title : (item as any).name}
                                </p>
                                <p className="text-[10px] font-bold text-slate-300 italic uppercase mt-1">Pending Sync • 2h</p>
                              </td>
                              <td className="px-8 py-8">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-[10px] font-black text-[#0A1128]">E</div>
                                  <span className="text-xs font-bold text-slate-400">EcoStream Hub</span>
                                </div>
                              </td>
                              <td className="px-8 py-8">
                                <div className="flex items-center justify-end space-x-4">
                                  <button 
                                    onClick={() => item.type === 'job' ? moderateJob(item.id, 'Approved') : moderateInvestor(item.id, 'Approved')}
                                    className="px-6 py-3 bg-[#5865F2] text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-[#4752C4] transition-all active:scale-95 shadow-lg shadow-[#5865F2]/20"
                                  >
                                    {t.admin.approve}
                                  </button>
                                  <button 
                                    onClick={() => item.type === 'job' ? moderateJob(item.id, 'Rejected') : moderateInvestor(item.id, 'Rejected')}
                                    className="px-6 py-3 border border-red-100 text-red-400 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-red-50 transition-all"
                                  >
                                    {t.admin.reject}
                                  </button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="py-24 text-center flex flex-col items-center">
                       <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-[#5865F2]/20">
                          <CheckCircle2 size={40} />
                       </div>
                       <p className="text-xl font-black text-[#0A1128]/20 uppercase tracking-widest">{t.admin.no_pending}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'payments' && (
                <div className="space-y-6">
                  {[
                    { id: '1', user: 'EcoStream', amount: '54.00 €', date: 'Jan 22, 2026', type: 'Premium Subscription' },
                    { id: '2', user: 'LunarPay', amount: '54.00 €', date: 'Jan 21, 2026', type: 'Premium Subscription' },
                    { id: '3', user: 'NordicHealth', amount: '13.00 €', date: 'Jan 21, 2026', type: 'Entry Pass' },
                  ].map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-10 bg-slate-50/50 rounded-[2.5rem] hover:bg-white transition-all border border-transparent hover:border-[#5865F2]/10 group shadow-sm hover:shadow-xl">
                      <div className="flex items-center space-x-8">
                        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#5865F2]">
                          <CreditCard size={24} />
                        </div>
                        <div>
                          <p className="text-xl font-black text-[#0A1128] group-hover:text-[#5865F2]">{p.user}</p>
                          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-1">{p.date} • {p.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-12">
                        <span className="text-2xl font-black text-[#0A1128]">{p.amount}</span>
                        <span className="px-5 py-2 bg-green-50 text-green-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-100">Settled</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'users' && (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                      { name: 'EcoStream', roles: 4, posts: 1, premium: true },
                      { name: 'LunarPay', roles: 12, posts: 1, premium: true },
                      { name: 'Volt', roles: 3, posts: 0, premium: false },
                      { name: 'NordicHealth', roles: 0, posts: 1, premium: true },
                    ].map((user, i) => (
                      <div key={i} className="bg-slate-50/50 p-10 rounded-[2.5rem] border border-transparent hover:border-[#5865F2]/10 hover:bg-white transition-all group shadow-sm hover:shadow-2xl">
                        <div className="flex justify-between items-start mb-8">
                          <div className="w-16 h-16 bg-[#0A1128] rounded-2xl flex items-center justify-center font-black text-white text-2xl shadow-xl group-hover:bg-[#5865F2]">
                            {user.name[0]}
                          </div>
                          {user.premium && (
                            <div className="flex items-center text-[#00D1FF] bg-[#00D1FF]/5 p-2 rounded-xl">
                              <Zap size={16} fill="currentColor" />
                            </div>
                          )}
                        </div>
                        <h4 className="text-2xl font-black text-[#0A1128] mb-1">{user.name}</h4>
                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-10">Nexus Node Alpha • Since 2025</p>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="bg-white p-5 rounded-3xl text-center shadow-sm border border-slate-50">
                            <span className="block text-2xl font-black text-[#5865F2]">{user.roles}</span>
                            <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-1">Entries</span>
                          </div>
                          <div className="bg-white p-5 rounded-3xl text-center shadow-sm border border-slate-50">
                            <span className="block text-2xl font-black text-[#00D1FF]">{user.posts}</span>
                            <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-1">Signals</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
