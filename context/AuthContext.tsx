import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface StartupProfile {
  slogan: string;
  about: string;
  website: string;
  location: string;
  industry: string;
  teamSize: string;
  selectedValues: string[];
}

interface User {
  email: string;
  name: string;
  role: 'startup' | 'talent' | 'admin';
  isSubscribed?: boolean;
  isAdmin?: boolean;
  profileImage?: string;
  startupProfile?: StartupProfile;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, role?: 'startup' | 'talent') => void;
  logout: () => void;
  subscribe: () => void;
  updateProfileImage: (image: string) => void;
  updateStartupProfile: (profile: StartupProfile) => void;
  isAuthenticated: boolean;
  isSubscribed: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('velix_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, role: 'startup' | 'talent' = 'startup') => {
    const isAdmin = email.toLowerCase() === 'fillipeferreiramunch@gmail.com';
    
    const userData: User = { 
      email, 
      name: email.split('@')[0], 
      role: isAdmin ? 'admin' : role,
      isSubscribed: false,
      isAdmin,
      profileImage: isAdmin ? "/IMG_6411%20Lille.png" : undefined,
      startupProfile: {
        slogan: '',
        about: '',
        website: '',
        location: 'Hovedstaden',
        industry: 'GreenTech',
        teamSize: '1-10',
        selectedValues: []
      }
    };
    setUser(userData);
    localStorage.setItem('velix_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('velix_user');
  };

  const subscribe = () => {
    if (user) {
      const updatedUser = { ...user, isSubscribed: true };
      setUser(updatedUser);
      localStorage.setItem('velix_user', JSON.stringify(updatedUser));
    }
  };

  const updateProfileImage = (image: string) => {
    if (user) {
      const updatedUser = { ...user, profileImage: image };
      setUser(updatedUser);
      localStorage.setItem('velix_user', JSON.stringify(updatedUser));
    }
  };

  const updateStartupProfile = (profile: StartupProfile) => {
    if (user) {
      const updatedUser = { ...user, startupProfile: profile };
      setUser(updatedUser);
      localStorage.setItem('velix_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      subscribe,
      updateProfileImage,
      updateStartupProfile,
      isAuthenticated: !!user,
      isSubscribed: !!user?.isSubscribed,
      isAdmin: !!user?.isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      login: () => {},
      logout: () => {},
      subscribe: () => {},
      updateProfileImage: () => {},
      updateStartupProfile: () => {},
      isAuthenticated: false,
      isSubscribed: false,
      isAdmin: false
    };
  }
  return context;
};