import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  email: string;
  name: string;
  isSubscribed?: boolean;
  isAdmin?: boolean;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  subscribe: () => void;
  updateProfileImage: (image: string) => void;
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
    const isAdmin = email.toLowerCase() === 'fillipeferreiramunch@gmail.com';
    
    const userData: User = { 
      email, 
      name: email.split('@')[0], 
      isSubscribed: false,
      isAdmin,
      profileImage: isAdmin ? "/IMG_6411%20Lille.png" : undefined
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

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      subscribe,
      updateProfileImage,
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
      isAuthenticated: false,
      isSubscribed: false,
      isAdmin: false
    };
  }
  return context;
};