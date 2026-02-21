import React from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Globe, Menu, X, User, LogOut, TrendingUp, Settings, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useApp();
  const { logout, isAuthenticated, user, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'da' : 'en');
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 velix-navbar velix-glass px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo size="md" textColor="text-white" variant="light" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/jobs" className={`text-sm font-bold transition-all ${isActive('/jobs') ? 'text-[#D6825C]' : 'text-white/80 hover:text-white'}`}>
            {t.navigation.findJobs}
          </Link>
          <Link to="/for-startups" className={`text-sm font-bold transition-all ${isActive('/for-startups') ? 'text-[#D6825C]' : 'text-white/80 hover:text-white'}`}>
            {t.navigation.forStartups}
          </Link>
          <Link to="/funding" className={`text-sm font-bold transition-all ${isActive('/funding') ? 'text-[#D6825C]' : 'text-white/80 hover:text-white'}`}>
            {t.navigation.tab_funding}
          </Link>
          
          <div className="flex items-center border-l border-white/10 ml-4 pl-4 space-x-4">
            {isAdmin && (
              <Link to="/admin" className={`p-2 rounded-xl transition-all ${isActive('/admin') ? 'bg-[#D6825C]/20 text-[#D6825C]' : 'text-white/40 hover:text-white'}`}>
                <ShieldCheck size={20} />
              </Link>
            )}

            <Link 
              to="/investor-onboarding" 
              className={`flex items-center space-x-2 text-[9px] uppercase tracking-widest font-black bg-[#D6825C] text-white px-5 py-2.5 rounded-xl hover:bg-[#c4714e] transition-all shadow-lg shadow-[#D6825C]/20 active:scale-95 ${isActive('/investor-onboarding') ? 'ring-2 ring-white' : ''}`}
            >
              <Zap size={12} fill="currentColor" />
              <span>{t.navigation.joinAsInvestor}</span>
            </Link>

            <button 
              onClick={toggleLanguage}
              className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-black bg-white/5 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors border border-white/5 text-white"
            >
              <Globe size={14} />
              <span className="text-sm uppercase tracking-normal">{language}</span>
            </button>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link to="/dashboard" className={`flex items-center space-x-2 text-sm font-bold transition-all ${isActive('/dashboard') ? 'text-[#D6825C]' : 'text-white hover:text-[#D6825C]'}`}>
                  <User size={18} />
                  <span>{t.navigation.myAccount}</span>
                </Link>
                <Link to="/settings" className={`p-2 rounded-xl transition-all ${isActive('/settings') ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}>
                  <Settings size={18} />
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-red-400 hover:bg-red-400/10 transition-all rounded-xl active:scale-90"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-sm font-bold text-white/80 hover:text-white px-4 py-2 transition-all">
                  {t.navigation.login}
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-white text-[#1a2e26] px-6 py-3 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all shadow-xl active:scale-95"
                >
                  {t.navigation.signup}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#1a2e26] border-b border-white/5 p-8 flex flex-col space-y-6 shadow-2xl"
          >
            <Link to="/jobs" onClick={() => setIsOpen(false)} className="text-xl font-bold text-white">{t.navigation.findJobs}</Link>
            <Link to="/for-startups" onClick={() => setIsOpen(false)} className="text-xl font-bold text-white">{t.navigation.forStartups}</Link>
            <Link to="/funding" onClick={() => setIsOpen(false)} className="text-xl font-bold text-white">{t.navigation.tab_funding}</Link>
            <Link to="/investor-onboarding" onClick={() => setIsOpen(false)} className="text-xl font-bold text-[#D6825C]">{t.navigation.joinAsInvestor}</Link>
            
            <button onClick={toggleLanguage} className="flex items-center space-x-2 py-2 text-white font-bold">
              <Globe size={20} /> 
              <span>{language === 'en' ? 'Switch Language' : 'Skift Sprog'}</span>
            </button>

            <div className="pt-6 border-t border-white/10 flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 py-2 text-xl font-bold text-white">
                    <User size={20} />
                    <span>{t.navigation.myAccount}</span>
                  </Link>
                  <Link to="/settings" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 py-2 text-xl font-bold text-white">
                    <Settings size={20} />
                    <span>{t.navigation.settings}</span>
                  </Link>
                  <button onClick={handleLogout} className="flex items-center text-left py-2 text-xl font-bold text-red-400">
                    <LogOut size={20} className="mr-2" /> {t.navigation.logout}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="text-xl font-bold text-white py-2">{t.navigation.login}</Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)} className="block w-full bg-[#D6825C] text-white py-5 rounded-xl font-bold text-center text-lg shadow-xl active:scale-95">
                    {t.navigation.signup}
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;