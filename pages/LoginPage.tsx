import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';

const LoginPage: React.FC = () => {
  const { t } = useApp();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email);
      // EXCLUSIVE REDIRECT: Master Admin goes to Master Hub, others to Dashboard
      const isAdmin = email.toLowerCase() === 'fillipeferreiramunch@gmail.com';
      navigate(isAdmin ? '/admin/master' : '/dashboard');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#F9FBF9] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-10 border border-[#1a2e26]/5">
        <div className="flex flex-col items-center mb-12">
          <Logo size="md" variant="dark" textColor="text-[#1a2e26]" />
          <h2 className="text-xl font-black text-[#1a2e26] mt-6 tracking-tight">{t.auth.login_title}</h2>
          <p className="text-gray-400 text-sm font-medium">{t.auth.login_subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">{t.auth.email_label}</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#D6825C] transition-colors" size={18} />
              <input 
                type="email" required placeholder="name@company.com"
                className="w-full pl-12 pr-4 py-4 bg-[#F9FBF9] border-none rounded-xl focus:ring-2 focus:ring-[#D6825C]/20 outline-none font-semibold text-[#1a2e26]"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">{t.auth.password_label}</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#D6825C] transition-colors" size={18} />
              <input 
                type={showPassword ? "text" : "password"} required
                className="w-full pl-12 pr-12 py-4 bg-[#F9FBF9] border-none rounded-xl focus:ring-2 focus:ring-[#D6825C]/20 outline-none font-semibold text-[#1a2e26]"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#1a2e26]">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-[#1a2e26] text-white font-black py-5 rounded-xl hover:bg-[#233f34] transition-all shadow-xl text-lg uppercase tracking-widest text-xs">
            {t.auth.login_cta}
          </button>
        </form>

        <div className="mt-10 text-center">
          <Link to="/signup" className="text-[#D6825C] font-black text-sm hover:underline">{t.auth.signup_here}</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;