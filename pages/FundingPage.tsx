
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import InvestorDirectory from '../components/InvestorDirectory';

const FundingPage: React.FC = () => {
  const { t } = useApp();
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 min-h-screen bg-[#F4F7F5]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center space-x-3 text-[#2D5A4C]/60 hover:text-[#2D5A4C] mb-12 font-bold text-xs uppercase tracking-widest transition-all group active:scale-95"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>{t.common.back}</span>
        </button>

        <InvestorDirectory />
      </div>
    </motion.div>
  );
};

export default FundingPage;
