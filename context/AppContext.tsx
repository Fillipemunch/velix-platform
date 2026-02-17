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
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('velix_applications');
    return saved ? JSON.parse(saved) : [];
  });

  const [allJobs, setAllJobs] = useState<Job[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('velix_all_jobs');
    return saved ? JSON.parse(saved) : [];
  });

  const [investors, setInvestors] = useState<Investor[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('velix_investors');
    return saved ? JSON.parse(saved) : [];
  });

  const [ecosystemUsers, setEcosystemUsers] = useState<EcosystemUser[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('velix_ecosystem_users');
    if (saved) return JSON.parse(saved);
    
    return [
      { id: 'master-admin', name: 'Fillipe Munch', email: 'fillipeferreiramunch@gmail.com', role: 'admin', joinedAt: '2025-12-01', status: 'Active' },
    ];
  });

  const [registeredStartups, setRegisteredStartups] = useState<PublicStartup[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('velix_public_startups');
    if (saved) return JSON.parse(saved);
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
    setRegisteredStartups(prev => {
      const exists = prev.find(p => p.id === startup.id);
      if (exists) {
        return prev.map(p => p.id === startup.id ? startup : p);
      }
      return [startup, ...prev];
    });
  };

  const addEcosystemUser = (name: string, email: string, role: 'startup' | 'talent' = 'startup') => {
    setEcosystemUsers(prev => {
      if (prev.some(u => u.email.toLowerCase() === email.toLowerCase())) return prev;
      const newUser: EcosystemUser = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
        joinedAt: new Date().toISOString().split('T')[0],
        status: 'Active'
      };
      return [...prev, newUser];
    });
  };

  const nukeDatabase = () => {
    const masterAdmin = ecosystemUsers.find(u => u.email === 'fillipeferreiramunch@gmail.com');
    setEcosystemUsers(masterAdmin ? [masterAdmin] : []);
    setAllJobs([]);
    setInvestors([]);
    setApplications([]);
    setRegisteredStartups([]);
    localStorage.removeItem('velix_all_jobs');
    localStorage.removeItem('velix_investors');
    localStorage.removeItem('velix_applications');
    localStorage.removeItem('velix_public_startups');
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
    setApplications(prev => [newApp, ...prev]);
  };

  const markApplicationsAsRead = (jobId: string) => {
    setApplications(prev => prev.map(app => 
      app.jobId === jobId ? { ...app, isNew: false } : app
    ));
  };

  const updateApplicationStatus = (appId: string, status: ApplicationStatus) => {
    setApplications(prev => prev.map(app => 
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
    setInvestors(prev => [newInvestor, ...prev]);
  };

  const deleteInvestor = (id: string) => {
    setInvestors(prev => prev.filter(i => i.id !== id));
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
    setAllJobs(prev => [newJob, ...prev]);
  };

  const deleteJob = (id: string) => {
    setAllJobs(prev => prev.filter(j => j.id !== id));
  };

  const moderateJob = (jobId: string, status: 'Approved' | 'Rejected') => {
    setAllJobs(prev => prev.map(j => j.id === jobId ? { 
      ...j, 
      status, 
      isVerified: status === 'Approved' 
    } : j));
  };

  const moderateInvestor = (investorId: string, status: 'Approved' | 'Rejected') => {
    setInvestors(prev => prev.map(i => i.id === investorId ? { 
      ...i, 
      status, 
      isVerified: status === 'Approved' 
    } : i));
  };

  const banUser = (id: string) => {
    setEcosystemUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Banned' : 'Active' } : u));
  };

  const runFakeCleanup = () => {
    const suspiciousDomains = ['tempmail.com', 'mailinator.com', '10minutemail.com', 'sharklasers.com', 'guerrillamail.com'];
    const initialCount = ecosystemUsers.length;
    const cleanedUsers = ecosystemUsers.filter(user => {
      const emailParts = user.email.split('@');
      const emailDomain = emailParts[1] || '';
      const isSuspiciousDomain = suspiciousDomains.includes(emailDomain);
      const localPart = emailParts[0] || '';
      const hasRandomPattern = /\d{5,}/.test(localPart);
      if (user.email === 'fillipeferreiramunch@gmail.com') return true;
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
      totalUserPosts: allJobs.length + investors.length,
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