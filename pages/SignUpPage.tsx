import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowLeft, User } from 'lucide-react';
import Logo from '../components/Logo';

const SignUpPage: React.FC = () => {
  const { t, addEcosystemUser, syncStartupToEcosystem } = useApp();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // 1. Registrar no diretório interno de usuários
      addEcosystemUser(name, email);
      
      // 2. Sincronizar IMEDIATAMENTE com o ecossistema público (Landing Page)
      syncStartupToEcosystem({
        id: email,
        name: name,
        logo: `https://via.placeholder.com/100?text=${name[0].toUpperCase()}`,
        slogan: 'Initializing mission parameters...',
        industry: 'Tech Ecosystem',
        updatedAt: new Date().toISOString()
      });

      // 3. Autenticar
      login(email);
      
      // 4. Redirecionar
      const isAdmin = email.toLowerCase() === 'fillipeferreiramunch@gmail.com';
      navigate(isAdmin ? '/admin/master' : '/dashboard');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F4F7F5] flex flex-col items-center justify-center p-4"
    >
      <div className="absolute top-8 left-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-[#2D5A4C] hover:text-[#D6825C] transition-colors font-bold text-sm uppercase tracking-widest active:scale-95 group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> {t.common.back}
        </button>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-[#2D5A4C]/5 p-10 border border-[#2D5A4C]/5">
        <div className="text-center mb-10 flex flex-col items-center">
          <Logo size="sm" variant="dark" textColor="text-[#1a2e26]" />
          <h2 className="text-xl font-bold text-gray-800 mt-4">{t.auth.signup_title}</h2>
          <p className="text-gray-500 mt-1 font-medium">{t.auth.signup_subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">{t.apply.name}</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2D5A4C] transition-colors" size={18} />
              <input 
                type="text" 
                required 
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#2D5A4C] focus:bg-white outline-none transition-all font-semibold"
                placeholder="Startup or Talent Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">{t.auth.email_label}</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2D5A4C] transition-colors" size={18} />
              <input 
                type="email" 
                required 
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#2D5A4C] focus:bg-white outline-none transition-all font-semibold"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">{t.auth.password_label}</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2D5A4C] transition-colors" size={18} />
              <input 
                type="password" 
                required 
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#2D5A4C] focus:bg-white outline-none transition-all font-semibold"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#1a2e26] text-white font-black py-4 rounded-2xl hover:bg-[#1e3d33] transition-all transform active:scale-[0.98] shadow-lg shadow-[#1a2e26]/20 text-lg"
          >
            {t.auth.signup_cta}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm font-medium">
            {t.auth.has_account}{' '}
            <Link to="/login" className="text-[#D6825C] font-black hover:underline underline-offset-4">
              {t.auth.login_here}
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUpPage;