
import React, { useState, useRef } from 'react';
import { X, Upload, CheckCircle, Send, FileText, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

interface PitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  investorName: string;
}

const PitchModal: React.FC<PitchModalProps> = ({ isOpen, onClose, investorName }) => {
  const { t } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deckFile, setDeckFile] = useState<{ name: string } | null>(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDeckFile({ name: file.name });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deckFile) return alert('Please upload your deck');
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setDeckFile(null);
    setMessage('');
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
            <div className="p-8 border-b border-[#F4F7F5] flex justify-between items-center bg-white">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#D6825C]/10 rounded-2xl flex items-center justify-center text-[#D6825C]">
                  <Send size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#1A2E26] tracking-tight">{t.funding.connect_title}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#2D5A4C]">{investorName}</p>
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
                            Click to upload Deck (PDF)
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

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">
                      {t.funding.form_message}
                    </label>
                    <textarea 
                      rows={3}
                      maxLength={300}
                      className="w-full px-6 py-4 rounded-2xl bg-[#F4F7F5] border border-transparent focus:bg-white focus:border-[#2D5A4C]/20 outline-none font-bold text-[#1A2E26] transition-all resize-none" 
                      placeholder="Hi, we are building..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <div className="flex items-start space-x-3 bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <Info size={16} className="text-blue-500 mt-0.5" />
                    <p className="text-[10px] font-medium text-blue-700 leading-relaxed">
                      Your pitch will be delivered to the partner team. Expect a response within 1-2 weeks if there is an alignment with their current thesis.
                    </p>
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
                  <div className="w-24 h-24 bg-[#2D5A4C]/10 text-[#2D5A4C] rounded-3xl flex items-center justify-center mb-8 animate-bounce">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-3xl font-black text-[#1A2E26] mb-2 tracking-tight">{t.funding.form_success}</h3>
                  <p className="text-[#1A2E26]/40 font-bold uppercase tracking-widest text-[10px] max-w-xs mx-auto mb-8 text-center">
                    {t.funding.form_success_msg}
                  </p>
                  <button onClick={handleClose} className="text-[#D6825C] font-black uppercase tracking-widest text-sm hover:underline">
                    Back to directory
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

export default PitchModal;
