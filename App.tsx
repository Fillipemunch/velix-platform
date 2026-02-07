import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import JobBoard from './pages/JobBoard';
import JobDetails from './pages/JobDetails';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import ForStartupsPage from './pages/ForStartupsPage';
import PhilosophyPage from './pages/AboutPage';
import PricingPage from './pages/PricingPage';
import SuccessPage from './pages/SuccessPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CookiesPage from './pages/CookiesPage';
import FundingPage from './pages/FundingPage';
import InvestorOnboarding from './pages/InvestorOnboarding';
import SettingsPage from './pages/SettingsPage';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import { AnimatePresence } from 'framer-motion';
import Logo from './components/Logo';

const Footer: React.FC = () => {
  const { t } = useApp();

  return (
    <footer className="bg-white border-t border-slate-50 py-20 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        <Logo size="md" variant="dark" textColor="text-[#1a2e26]" />
        
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-xs font-black uppercase tracking-[0.2em] text-[#1a2e26]/40">
          <Link to="/privacy" className="hover:text-[#D6825C] transition-colors">{t.footer_privacy}</Link>
          <Link to="/terms" className="hover:text-[#D6825C] transition-colors">{t.footer_terms}</Link>
          <Link to="/cookies" className="hover:text-[#D6825C] transition-colors">{t.footer_cookies}</Link>
          <Link to="/philosophy" className="hover:text-[#D6825C] transition-colors">Philosophy</Link>
        </div>

        <div className="text-[#1a2e26]/20 text-[10px] font-bold tracking-[0.2em] text-center uppercase">
          {t.footer_text}
        </div>
        
        <div className="flex items-center space-x-2 text-[10px] font-black text-[#1a2e26]/10 uppercase tracking-[0.5em]">
          <span>VELIX Protocol • Based in Copenhagen</span>
        </div>
      </div>
    </footer>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useAuth();
  if (!isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/jobs" element={<JobBoard />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/for-startups" element={<ForStartupsPage />} />
        <Route path="/philosophy" element={<PhilosophyPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/funding" element={<FundingPage />} />
        <Route path="/investor-onboarding" element={<InvestorOnboarding />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="min-h-screen flex flex-col selection:bg-[#D6825C]/20 selection:text-[#D6825C]">
            <Header />
            <main className="flex-grow">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;