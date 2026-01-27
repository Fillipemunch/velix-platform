import React, { useState, useRef } from 'react';
import { X, Upload, CheckCircle, FileText, Linkedin, Mail, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobTitle: string;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose, jobId, jobTitle }) => {
  // Added language to the destructuring to fix the error on line 85
  const { t, addApplication, language } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cvFile, setCvFile] = useState<{ name: string; url: string } | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedin: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile({
        name: file.name,
        url: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) return alert('Please upload your CV');

    addApplication({
      jobId,
      jobTitle,
      candidateName: formData.name,
      candidateEmail: formData.email,
      linkedin: formData.linkedin,
      cvName: cvFile.name,
      cvUrl: cvFile.url
    });

    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', linkedin: '' });
    setCvFile(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#1A2E26]/60 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-[#2D5A4C]/10"
          >
            {/* Header */}
            <div className="p-8 border-b border-[#F4F7F5] flex justify-between items-center bg-white">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#D6825C]/10 rounded-2xl flex items-center justify-center text-[#D6825C]">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#1A2E26] tracking-tight">{language === 'en' ? 'Apply for Role' : 'Ansøg stilling'}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#2D5A4C]">{jobTitle}</p>
                </div>
              </div>
              <button onClick={handleClose} className="text-[#1A2E26]/20 hover:text-[#1A2E26] transition-colors p-2">
                <X size={24} />
              </button>
            </div>

            <div className="p-10">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">{t.apply.name}</label>
                    <div className="relative group">
                      <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#2D5A4C]/30 group-focus-within:text-[#2D5A4C] transition-colors" />
                      <input 
                        required 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-[#F4F7F5] border border-transparent focus:bg-white focus:border-[#2D5A4C]/20 outline-none font-bold text-[#1A2E26] transition-all" 
                        style={{ backgroundColor: '#F4F7F5' }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">{t.apply.email}</label>
                    <div className="relative group">
                      <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#2D5A4C]/30 group-focus-within:text-[#2D5A4C] transition-colors" />
                      <input 
                        required 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-[#F4F7F5] border border-transparent focus:bg-white focus:border-[#2D5A4C]/20 outline-none font-bold text-[#1A2E26] transition-all" 
                        style={{ backgroundColor: '#F4F7F5' }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">{t.apply.linkedin}</label>
                    <div className="relative group">
                      <Linkedin size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#2D5A4C]/30 group-focus-within:text-[#2D5A4C] transition-colors" />
                      <input 
                        type="url" 
                        placeholder="https://linkedin.com/..."
                        value={formData.linkedin}
                        onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-[#F4F7F5] border border-transparent focus:bg-white focus:border-[#2D5A4C]/20 outline-none font-bold text-[#1A2E26] transition-all placeholder:text-[#2D5A4C]/20" 
                        style={{ backgroundColor: '#F4F7F5' }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">{t.apply.cv}</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center group ${
                        cvFile ? 'border-[#2D5A4C] bg-[#2D5A4C]/5' : 'border-[#2D5A4C]/20 hover:border-[#2D5A4C] bg-[#F4F7F5]'
                      }`}
                    >
                      {cvFile ? (
                        <>
                          <CheckCircle className="text-[#2D5A4C] mb-2" size={32} />
                          <p className="text-sm font-black text-[#1A2E26]">{cvFile.name}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-[#2D5A4C] mt-1">File Attached</p>
                        </>
                      ) : (
                        <>
                          <Upload className="text-[#2D5A4C]/20 group-hover:text-[#2D5A4C] transition-colors mb-2" size={32} />
                          <p className="text-xs font-bold text-[#1A2E26]/40 group-hover:text-[#1A2E26] transition-colors">
                            Click to upload PDF or DOCX
                          </p>
                        </>
                      )}
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept=".pdf,.doc,.docx" 
                        onChange={handleFileChange} 
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#2D5A4C] text-white font-black py-5 rounded-2xl hover:bg-[#1e3d33] transition-all transform active:scale-95 shadow-xl shadow-[#2D5A4C]/20 text-lg"
                  >
                    {t.apply.submit}
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 flex flex-col items-center"
                >
                  <div className="w-24 h-24 bg-[#2D5A4C]/10 text-[#2D5A4C] rounded-3xl flex items-center justify-center mb-8 animate-bounce">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-3xl font-black text-[#1A2E26] mb-2 tracking-tight">{t.apply.success}</h3>
                  <p className="text-[#1A2E26]/40 font-bold uppercase tracking-widest text-[10px] max-w-xs mx-auto mb-8">
                    {t.apply.successMsg}
                  </p>
                  <button onClick={handleClose} className="text-[#D6825C] font-black uppercase tracking-widest text-sm hover:underline">
                    {t.common.back}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ApplyModal;