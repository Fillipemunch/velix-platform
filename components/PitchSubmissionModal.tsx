
import React, { useState, useRef } from 'react';
import { X, Upload, CheckCircle, Send, FileText, Info, Rocket, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

interface PitchSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  investorName: string;
}

const PitchSubmissionModal: React.FC<PitchSubmissionModalProps> = ({ isOpen, onClose, investorName }) => {
  const { t, language } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deckFile, setDeckFile] = useState<{ name: string } | null>(null);
  
  const [formData, setFormData] = useState({
    startupName: '',
    oneliner: '',
    round: 'Seed',
    amount: '',
    summary: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDeckFile({ name: file.name });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deckFile) return alert(language === 'en' ? 'Please upload your pitch deck (PDF)' : 'Upload venligst dit pitch deck (PDF)');
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setDeckFile(null);
    setFormData({
      startupName: '',
      oneliner: '',
      round: 'Seed',
      amount: '',
      summary: ''
    });
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
            className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 border border-[#2D5A4C]/10"
          >
            {/* Header */}
            <div className="p-8 border-b border-[#F4F7F5] flex justify-between items-center bg-white">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#2D5A4C]/5 rounded-2xl flex items-center justify-center text-[#2D5A4C]">
                  <Rocket size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#1A2E26] tracking-tight">
                    {language === 'en' ? `Pitch to ${investorName}` : `Pitch til ${investorName}`}
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#2D5A4C]">{t.funding.connect_subtitle}</p>
                </div>
              </div>
              <button onClick={handleClose} className="text-[#1A2E26]/20 hover:text-[#1A2E26] transition-colors p-2">
                <X size={24} />
              </button>
            </div>

            <div className="p-10 max-h-[75vh] overflow-y-auto">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Startup Name & Oneliner */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">
                        {t.funding.form_startup_name}
                      </label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-6 py-4 rounded-2xl bg-[#F4F7F5] border border-transparent focus:bg-white focus:border-[#2D5A4C]/20 outline-none font-bold text-[#1A2E26] transition-all" 
                        placeholder="e.g. Acme AI"
                        value={formData.startupName}
                        onChange={(e) => setFormData({...formData, startupName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">
                        {t.funding.form_oneliner}
                      </label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-6 py-4 rounded-2xl bg-[#F4F7F5] border border-transparent focus:bg-white focus:border-[#2D5A4C]/20 outline-none font-bold text-[#1A2E26] transition-all" 
                        placeholder="The Uber for cleaning..."
                        value={formData.oneliner}
                        onChange={(e) => setFormData({...formData, oneliner: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Round & Amount */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">
                        {t.funding.form_round}
                      </label>
                      <select 
                        className="w-full px-6 py-4 rounded-2xl bg-[#F4F7F5] border border-transparent focus:bg-white focus:border-[#2D5A4C]/20 outline-none font-bold text-[#1A2E26] transition-all appearance-none cursor-pointer"
                        value={formData.round}
                        onChange={(e) => setFormData({...formData, round: e.target.value})}
                      >
                        {t.funding.rounds.map((r: string) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">
                        {t.funding.form_amount}
                      </label>
                      <div className="relative">
                        <DollarSign size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1A2E26]/30" />
                        <input 
                          required
                          type="text" 
                          className="w-full pl-12 pr-6 py-4 rounded-2xl bg-[#F4F7F5] border border-transparent focus:bg-white focus:border-[#2D5A4C]/20 outline-none font-bold text-[#1A2E26] transition-all" 
                          placeholder="e.g. 2M DKK"
                          value={formData.amount}
                          onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pitch Deck Upload */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">
                      {t.funding.form_deck}
                    </label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center group ${
                        deckFile ? 'border-[#2D5A4C] bg-[#2D5A4C]/5' : 'border-[#2D5A4C]/20 hover:border-[#2D5A4C] bg-[#F4F7F5]'
                      }`}
                    >
                      {deckFile ? (
                        <>
                          <FileText className="text-[#2D5A4C] mb-2" size={32} />
                          <p className="text-sm font-black text-[#1A2E26]">{deckFile.name}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-[#2D5A4C] mt-1">Ready to send</p>
                        </>
                      ) : (
                        <>
                          <Upload className="text-[#2D5A4C]/20 group-hover:text-[#2D5A4C] transition-colors mb-2" size={32} />
                          <p className="text-xs font-bold text-[#1A2E26]/40 group-hover:text-[#1A2E26] transition-colors">
                            {language === 'en' ? 'Upload your Pitch Deck (PDF)' : 'Upload dit Pitch Deck (PDF)'}
                          </p>
                        </>
                      )}
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept=".pdf" 
                        onChange={handleFileChange} 
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">
                      {t.funding.form_summary}
                    </label>
                    <textarea 
                      required
                      rows={3}
                      className="w-full px-6 py-4 rounded-2xl bg-[#F4F7F5] border border-transparent focus:bg-white focus:border-[#2D5A4C]/20 outline-none font-bold text-[#1A2E26] transition-all resize-none" 
                      placeholder="Explain your solution and traction..."
                      value={formData.summary}
                      onChange={(e) => setFormData({...formData, summary: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#2D5A4C] text-white font-black py-5 rounded-2xl hover:bg-[#1e3d33] transition-all transform active:scale-95 shadow-xl shadow-[#2D5A4C]/20 text-lg"
                  >
                    {t.funding.form_submit}
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 flex flex-col items-center"
                >
                  <div className="w-24 h-24 bg-[#2D5A4C]/10 text-[#2D5A4C] rounded-[2rem] flex items-center justify-center mb-8 animate-bounce">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-3xl font-black text-[#1A2E26] mb-2 tracking-tight">{t.funding.form_success}</h3>
                  <p className="text-[#1A2E26]/40 font-bold uppercase tracking-widest text-[10px] max-w-xs mx-auto mb-8 text-center leading-relaxed">
                    {t.funding.form_success_msg}
                  </p>
                  <button onClick={handleClose} className="text-[#D6825C] font-black uppercase tracking-widest text-sm hover:underline">
                    {language === 'en' ? 'Back to directory' : 'Tilbage til oversigten'}
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

export default PitchSubmissionModal;
