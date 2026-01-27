
import React, { useState } from 'react';
import { useApp, Application, ApplicationStatus } from '../context/AppContext';
import { Search, FileText, Linkedin, Calendar, ChevronDown, Check, User, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ApplicantsListProps {
  applicants: Application[];
  jobTitle: string;
}

const ApplicantsList: React.FC<ApplicantsListProps> = ({ applicants, jobTitle }) => {
  const { t, updateApplicationStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const filteredApplicants = applicants.filter(app => 
    app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.candidateEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColors: Record<ApplicationStatus, { bg: string, text: string, dot: string }> = {
    Applied: { bg: 'bg-[#2D5A4C]/10', text: 'text-[#2D5A4C]', dot: 'bg-[#2D5A4C]' },
    Interviewing: { bg: 'bg-[#F4E292]/20', text: 'text-[#B8860B]', dot: 'bg-[#F4E292]' },
    Rejected: { bg: 'bg-[#D6825C]/10', text: 'text-[#D6825C]', dot: 'bg-[#D6825C]' },
    Hired: { bg: 'bg-[#2D5A4C]', text: 'text-white', dot: 'bg-white' }
  };

  const statusOptions: ApplicationStatus[] = ['Applied', 'Interviewing', 'Rejected', 'Hired'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A2E26]/20" size={18} />
          <input 
            type="text" 
            placeholder={t.applicants.search}
            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-[#2D5A4C]/10 focus:outline-none focus:ring-4 focus:ring-[#2D5A4C]/5 font-semibold transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-[#1A2E26]/30">
          <span>{filteredApplicants.length} Candidates</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#2D5A4C]/5 shadow-sm overflow-hidden">
        {filteredApplicants.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-[#F4F7F5] rounded-full flex items-center justify-center text-[#2D5A4C]/20 mb-4">
              <Search size={32} />
            </div>
            <p className="text-[#1A2E26]/40 font-bold">{t.applicants.no_results}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#F4F7F5]">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#1A2E26]/30">Candidate</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#1A2E26]/30">Date</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#1A2E26]/30">Pipeline</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#1A2E26]/30 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4F7F5]">
                {filteredApplicants.map((app) => (
                  <motion.tr 
                    key={app.id} 
                    layout
                    className="hover:bg-[#F4F7F5]/30 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-[#F4F7F5] rounded-xl flex items-center justify-center text-[#2D5A4C] font-black text-sm border border-[#2D5A4C]/5">
                          {app.candidateName[0]}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-black text-[#1A2E26]">{app.candidateName}</h4>
                            {app.isNew && (
                              <span className="ml-2 w-1.5 h-1.5 rounded-full bg-[#D6825C] animate-pulse" />
                            )}
                          </div>
                          <p className="text-xs font-bold text-[#1A2E26]/40">{app.candidateEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center text-xs font-bold text-[#1A2E26]/40">
                        <Calendar size={14} className="mr-2 opacity-50" />
                        {new Date(app.submittedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="relative">
                        <button 
                          onClick={() => setOpenDropdown(openDropdown === app.id ? null : app.id)}
                          className={`flex items-center px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${statusColors[app.status].bg} ${statusColors[app.status].text}`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full mr-2 ${statusColors[app.status].dot}`} />
                          {t.applicants.status[app.status]}
                          <ChevronDown size={12} className={`ml-2 transition-transform ${openDropdown === app.id ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {openDropdown === app.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)} />
                              <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute top-full left-0 mt-2 w-48 bg-[#1A2E26] rounded-2xl shadow-2xl p-2 z-20 border border-white/5"
                              >
                                {statusOptions.map((opt) => (
                                  <button
                                    key={opt}
                                    onClick={() => {
                                      updateApplicationStatus(app.id, opt);
                                      setOpenDropdown(null);
                                    }}
                                    className={`w-full text-left px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-between transition-all ${
                                      app.status === opt ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
                                    }`}
                                  >
                                    <div className="flex items-center">
                                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${statusColors[opt].dot.replace('bg-', 'bg-')}`} />
                                      {t.applicants.status[opt]}
                                    </div>
                                    {app.status === opt && <Check size={12} />}
                                  </button>
                                ))}
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end space-x-2">
                        {app.linkedin && (
                          <a 
                            href={app.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-3 border border-[#2D5A4C]/10 text-[#2D5A4C] rounded-xl hover:bg-[#F4F7F5] transition-all"
                            title="LinkedIn"
                          >
                            <Linkedin size={16} />
                          </a>
                        )}
                        <a 
                          href={app.cvUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-3 bg-[#2D5A4C] text-white rounded-xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-[#2D5A4C]/10"
                        >
                          <FileText size={14} className="mr-2" />
                          {t.applicants.view_cv}
                        </a>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantsList;
