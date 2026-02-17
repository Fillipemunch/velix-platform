import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language, FilterState, Investor, Job } from '../types';
import { translations } from '../translations';

export type ApplicationStatus = 'Applied' | 'Interviewing' | 'Rejected' | 'Hired';

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateName: string;
  candidateEmail: string;
  linkedin?: string;
  cvName: string;
  cvUrl: string;
  submittedAt: string;
  isNew: boolean;
  status: ApplicationStatus;
}

export interface EcosystemUser {
  id: string;
  name: string;
  email: string;
  role: 'startup' | 'talent' | 'admin';
  joinedAt: string;
  status: 'Active' | 'Banned';
  isSuspicious?: boolean;
}

export interface PublicStartup {
  id: string;
  name: string;
  logo: string;
  slogan: string;
  industry: string;
  about?: string;
  website?: string;
  updatedAt: string;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  applications: Application[];
  addApplication: (app: Omit<Application, 'id' | 'submittedAt' | 'isNew' | 'status'>) => void;
  markApplicationsAsRead: (jobId: string) => void;
  updateApplicationStatus: (appId: string, status: ApplicationStatus) => void;
  investors: Investor[];
  addInvestor: (investor: Omit<Investor, 'id' | 'status' | 'isVerified' | 'paymentStatus'>) => void;
  deleteInvestor: (id: string) => void;
  allJobs: Job[];
  userCreatedJobs: Job[];
  addUserJob: (job: Omit<Job, 'id' | 'status' | 'isVerified' | 'company' | 'logo' | 'postedAt' | 'tags' | 'paymentStatus'>) => void;
  deleteJob: (id: string) => void;
  totalUserPosts: number;
  moderateJob: (jobId: string, status: 'Approved' | 'Rejected') => void;
  moderateInvestor: (investorId: string, status: 'Approved' | 'Rejected') => void;
  getCheckoutPrice: (cvr: string) => { amount: number; currency: string };
  ecosystemUsers: EcosystemUser[];
  addEcosystemUser: (name: string, email: string, role?: 'startup' | 'talent') => void;
  banUser: (id: string) => void;
  runFakeCleanup: () => { removedCount: number };
  nukeDatabase: () => void;
  registeredStartups: PublicStartup[];
  syncStartupToEcosystem: (startup: PublicStartup) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const MASTER_ADMIN_EMAIL = 'fillipeferreiramunch@gmail.com';

  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    const savedLang = localStorage.getItem('velix_lang');
    return (savedLang as Language) || 'en';
  });
  
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    region: [],
    type: []
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    try {
      if (typeof window === 'undefined') return [];
      const saved = localStorage.getItem('velix_applications');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) { return []; }
  });

  const [allJobs, setAllJobs] = useState<Job[]>(() => {
    try {
      if (typeof window === 'undefined') return [];
      const saved = localStorage.getItem('velix_all_jobs');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) { return []; }
  });

  const [investors, setInvestors] = useState<Investor[]>(() => {
    try {
      if (typeof window === 'undefined') return [];
      const saved = localStorage.getItem('velix_investors');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) { return []; }
  });

  const [ecosystemUsers, setEcosystemUsers] = useState<EcosystemUser[]>(() => {
    const defaultAdmin: EcosystemUser = { id: 'master-admin', name: 'Fillipe Munch', email: MASTER_ADMIN_EMAIL, role: 'admin', joinedAt: '2025-12-01', status: 'Active' };
    try {
      if (typeof window === 'undefined') return [defaultAdmin];
      const saved = localStorage.getItem('velix_ecosystem_users');
      const parsed = saved ? JSON.parse(saved) : null;
      if (Array.isArray(parsed)) {
        // Garantir que empresas como Gronsti não persistam no diretório de usuários
        return parsed.filter(u => u.name?.toLowerCase() !== 'grønsti');
      }
    } catch (e) {}
    return [defaultAdmin];
  });

  const [registeredStartups, setRegisteredStartups] = useState<PublicStartup[]>(() => {
    try {
      if (typeof window === 'undefined') return [];
      const saved = localStorage.getItem('velix_public_startups');
      const parsed = saved ? JSON.parse(saved) : null;
      if (Array.isArray(parsed)) {
        // FILTRO CRÍTICO: Remove GrønSti ou qualquer startup que não tenha sido criada manualmente agora
        return parsed.filter(s => s.name?.toLowerCase() !== 'grønsti');
      }
    } catch (e) {}
    return [];
  });

  useEffect(() => {
    localStorage.setItem('velix_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('velix_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('velix_investors', JSON.stringify(investors));
  }, [investors]);

  useEffect(() => {
    localStorage.setItem('velix_all_jobs', JSON.stringify(allJobs));
  }, [allJobs]);

  useEffect(() => {
    localStorage.setItem('velix_ecosystem_users', JSON.stringify(ecosystemUsers));
  }, [ecosystemUsers]);

  useEffect(() => {
    localStorage.setItem('velix_public_startups', JSON.stringify(registeredStartups));
  }, [registeredStartups]);

  const syncStartupToEcosystem = (startup: PublicStartup) => {
    if (!startup || !startup.id) return;
    setRegisteredStartups(prev => {
      const currentList = Array.isArray(prev) ? prev : [];
      const exists = currentList.find(p => p.id === startup.id);
      if (exists) {
        return currentList.map(p => p.id === startup.id ? startup : p);
      }
      return [startup, ...currentList];
    });
  };

  const addEcosystemUser = (name: string, email: string, role: 'startup' | 'talent' = 'startup') => {
    if (!email) return;
    setEcosystemUsers(prev => {
      const currentList = Array.isArray(prev) ? prev : [];
      if (currentList.some(u => u.email?.toLowerCase() === email.toLowerCase())) return currentList;
      const newUser: EcosystemUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: name || 'Unnamed Node',
        email,
        role,
        joinedAt: new Date().toISOString().split('T')[0],
        status: 'Active'
      };
      return [...currentList, newUser];
    });
  };

  const nukeDatabase = () => {
    const masterAdmin = ecosystemUsers.find(u => u.email?.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase());
    
    setAllJobs([]);
    setInvestors([]);
    setApplications([]);
    setRegisteredStartups([]);
    setEcosystemUsers(masterAdmin ? [masterAdmin] : []);

    localStorage.removeItem('velix_all_jobs');
    localStorage.removeItem('velix_investors');
    localStorage.removeItem('velix_applications');
    localStorage.removeItem('velix_public_startups');
    localStorage.removeItem('velix_ecosystem_users');

    const globalRegistryRaw = localStorage.getItem('velix_global_registry');
    if (globalRegistryRaw) {
      try {
        const registry = JSON.parse(globalRegistryRaw);
        const newRegistry = {};
        if (registry[MASTER_ADMIN_EMAIL.toLowerCase()]) {
          newRegistry[MASTER_ADMIN_EMAIL.toLowerCase()] = registry[MASTER_ADMIN_EMAIL.toLowerCase()];
        }
        localStorage.setItem('velix_global_registry', JSON.stringify(newRegistry));
      } catch (e) {
        localStorage.removeItem('velix_global_registry');
      }
    }
    console.log("Protocol Reset Successful • All non-admin nodes cleared.");
  };

  const getCheckoutPrice = (cvr: string) => {
    return { amount: 0, currency: 'eur' };
  };

  const addApplication = (appData: Omit<Application, 'id' | 'submittedAt' | 'isNew' | 'status'>) => {
    const newApp: Application = {
      ...appData,
      id: Math.random().toString(36).substr(2, 9),
      submittedAt: new Date().toISOString(),
      isNew: true,
      status: 'Applied'
    };
    setApplications(prev => [newApp, ...(Array.isArray(prev) ? prev : [])]);
  };

  const markApplicationsAsRead = (jobId: string) => {
    setApplications(prev => (Array.isArray(prev) ? prev : []).map(app => 
      app.jobId === jobId ? { ...app, isNew: false } : app
    ));
  };

  const updateApplicationStatus = (appId: string, status: ApplicationStatus) => {
    setApplications(prev => (Array.isArray(prev) ? prev : []).map(app => 
      app.id === appId ? { ...app, status } : app
    ));
  };

  const addInvestor = (investorData: Omit<Investor, 'id' | 'status' | 'isVerified' | 'paymentStatus'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newInvestor: Investor = {
      ...investorData,
      id,
      status: 'Pending',
      paymentStatus: 'Awaiting',
      isVerified: false
    };
    setInvestors(prev => [newInvestor, ...(Array.isArray(prev) ? prev : [])]);
  };

  const deleteInvestor = (id: string) => {
    setInvestors(prev => (Array.isArray(prev) ? prev : []).filter(i => i.id !== id));
  };

  const addUserJob = (jobData: Omit<Job, 'id' | 'status' | 'isVerified' | 'company' | 'logo' | 'postedAt' | 'tags' | 'paymentStatus'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newJob: Job = {
      ...jobData,
      id,
      status: 'Pending',
      paymentStatus: 'Awaiting',
      isVerified: false,
      company: 'Syncing...', 
      logo: 'https://via.placeholder.com/100?text=V',
      postedAt: 'Just now',
      tags: []
    };
    setAllJobs(prev => [newJob, ...(Array.isArray(prev) ? prev : [])]);
  };

  const deleteJob = (id: string) => {
    setAllJobs(prev => (Array.isArray(prev) ? prev : []).filter(j => j.id !== id));
  };

  const moderateJob = (jobId: string, status: 'Approved' | 'Rejected') => {
    setAllJobs(prev => (Array.isArray(prev) ? prev : []).map(j => j.id === jobId ? { 
      ...j, 
      status, 
      isVerified: status === 'Approved' 
    } : j));
  };

  const moderateInvestor = (investorId: string, status: 'Approved' | 'Rejected') => {
    setInvestors(prev => (Array.isArray(prev) ? prev : []).map(i => i.id === investorId ? { 
      ...i, 
      status, 
      isVerified: status === 'Approved' 
    } : i));
  };

  const banUser = (id: string) => {
    setEcosystemUsers(prev => (Array.isArray(prev) ? prev : []).map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Banned' : 'Active' } : u));
  };

  const runFakeCleanup = () => {
    const suspiciousDomains = ['tempmail.com', 'mailinator.com', '10minutemail.com', 'sharklasers.com', 'guerrillamail.com'];
    const currentUsers = Array.isArray(ecosystemUsers) ? ecosystemUsers : [];
    const initialCount = currentUsers.length;
    const cleanedUsers = currentUsers.filter(user => {
      if (!user.email) return false;
      const emailParts = user.email.split('@');
      const emailDomain = emailParts[1] || '';
      const isSuspiciousDomain = suspiciousDomains.includes(emailDomain);
      const localPart = emailParts[0] || '';
      const hasRandomPattern = /\d{5,}/.test(localPart);
      if (user.email.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase()) return true;
      return !isSuspiciousDomain && !hasRandomPattern;
    });
    setEcosystemUsers(cleanedUsers);
    return { removedCount: initialCount - cleanedUsers.length };
  };

  const t = translations[language] || translations['en'];

  return (
    <AppContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      filters, 
      setFilters, 
      applications, 
      addApplication,
      markApplicationsAsRead,
      updateApplicationStatus,
      investors,
      addInvestor,
      deleteInvestor,
      allJobs,
      userCreatedJobs: allJobs,
      addUserJob,
      deleteJob,
      totalUserPosts: (Array.isArray(allJobs) ? allJobs.length : 0) + (Array.isArray(investors) ? investors.length : 0),
      moderateJob,
      moderateInvestor,
      getCheckoutPrice,
      ecosystemUsers,
      addEcosystemUser,
      banUser,
      runFakeCleanup,
      nukeDatabase,
      registeredStartups,
      syncStartupToEcosystem
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};