import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  email: string;
  name: string;
  isSubscribed?: boolean;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  subscribe: () => void;
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

  const login = (email: string) => {
    const isAdmin = email.toLowerCase() === 'fillipe@velix.dk' || email.toLowerCase().includes('admin');
    const userData: User = { 
      email, 
      name: email.split('@')[0], 
      isSubscribed: false,
      isAdmin
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

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      subscribe,
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
      isAuthenticated: false,
      isSubscribed: false,
      isAdmin: false
    };
  }
  return context;
};