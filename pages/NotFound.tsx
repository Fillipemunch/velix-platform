
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldAlert, WifiOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Logo from '../components/Logo';

const NotFound: React.FC = () => {
  const { t } = useApp();
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#1a2e26] flex flex-col items-center justify-center p-6 text-center"
    >
      <Logo size="lg" variant="light" textColor="text-white" className="mb-12" />
      
      <div className="max-w-md w-full">
        <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 text-[#D6825C] border border-white/10">
          <ShieldAlert size={48} />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-[#F9FBF9] mb-4 tracking-tighter uppercase leading-none">
          404: Node Disconnected
        </h1>
        <p className="text-white/40 font-medium text-lg mb-12">
          The protocol could not locate the requested resource in the European Nexus.
        </p>

        <button 
          onClick={() => navigate('/')}
          className="bg-[#D6825C] text-white px-10 py-5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#c4714e] transition-all shadow-xl active:scale-95 flex items-center justify-center mx-auto space-x-3"
        >
          <ArrowLeft size={18} />
          <span>Return to Protocol Home</span>
        </button>
      </div>

      <div className="mt-20 flex items-center space-x-2 text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">
        <span>VELIX ERROR HANDLER • V1.0.4</span>
      </div>
    </motion.div>
  );
};

export default NotFound;
