
export type Language = 'en' | 'da';

export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  region: 'Hovedstaden' | 'Aarhus' | 'Odense' | 'Aalborg';
  type: 'Fuldtid' | 'Deltid' | 'Praktik' | 'Full-time' | 'Part-time' | 'Internship';
  salaryRange: string;
  description: string;
  postedAt: string;
  tags: string[];
  status: 'Pending' | 'Approved' | 'Rejected';
  paymentStatus: 'Awaiting' | 'Paid' | 'Failed'; // Added for Stripe integration
  isVerified: boolean;
  cvr: string;
  linkedinUrl: string;
}

export interface FilterState {
  searchQuery: string;
  region: string[];
  type: string[];
}

export interface Investor {
  id: string;
  name: string;
  logo: string;
  focus: string[];
  summary: string;
  stage: string; 
  stages: string[];
  verticals: string[];
  website: string;
  thesis?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  paymentStatus: 'Awaiting' | 'Paid' | 'Failed'; // Added for Stripe integration
  isVerified: boolean;
  cvr: string;
  linkedinUrl: string;
  corporateEmail: string;
}

export interface InvestorFilterState {
  stage: string[];
  vertical: string[];
}
