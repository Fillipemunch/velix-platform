
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
  allJobs: Job[];
  userCreatedJobs: Job[];
  addUserJob: (job: Omit<Job, 'id' | 'status' | 'isVerified' | 'company' | 'logo' | 'postedAt' | 'tags' | 'paymentStatus'>) => void;
  totalUserPosts: number;
  moderateJob: (jobId: string, status: 'Approved' | 'Rejected') => void;
  moderateInvestor: (investorId: string, status: 'Approved' | 'Rejected') => void;
  getCheckoutPrice: (cvr: string) => { amount: number; currency: string };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('velix_lang');
    return (savedLang as Language) || 'en';
  });
  
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    region: [],
    type: []
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem('velix_applications');
    return saved ? JSON.parse(saved) : [];
  });

  const [allJobs, setAllJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('velix_all_jobs');
    return saved ? JSON.parse(saved) : [];
  });

  const [investors, setInvestors] = useState<Investor[]>(() => {
    const saved = localStorage.getItem('velix_investors');
    return saved ? JSON.parse(saved) : [];
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

  const getCheckoutPrice = (cvr: string) => {
    const isDanish = cvr.toUpperCase().startsWith('DK') || cvr.length === 8;
    return isDanish 
      ? { amount: 400, currency: 'dkk' } 
      : { amount: 54, currency: 'eur' };
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

  const moderateJob = (jobId: string, status: 'Approved' | 'Rejected') => {
    setAllJobs(prev => prev.map(j => j.id === jobId ? { 
      ...j, 
      status, 
      isVerified: status === 'Approved' && j.paymentStatus === 'Paid' 
    } : j));
  };

  const moderateInvestor = (investorId: string, status: 'Approved' | 'Rejected') => {
    setInvestors(prev => prev.map(i => i.id === investorId ? { 
      ...i, 
      status, 
      isVerified: status === 'Approved' && i.paymentStatus === 'Paid' 
    } : i));
  };

  const userCreatedJobs = allJobs; 
  const totalUserPosts = allJobs.length + investors.length;

  const t = translations[language];

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
      allJobs,
      userCreatedJobs,
      addUserJob,
      totalUserPosts,
      moderateJob,
      moderateInvestor,
      getCheckoutPrice
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
