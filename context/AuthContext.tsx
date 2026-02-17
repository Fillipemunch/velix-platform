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
  login: (email: string, role?: 'startup' | 'talent', name?: string) => void;
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

  // Carrega a sessão ativa e o registro global de usuários
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('velix_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      localStorage.removeItem('velix_user');
    }
  }, []);

  // Helper para atualizar o banco de dados global de usuários (persistência entre logins)
  const syncToGlobalRegistry = (userData: User) => {
    try {
      const registryRaw = localStorage.getItem('velix_global_registry');
      const registry: Record<string, User> = registryRaw ? JSON.parse(registryRaw) : {};
      registry[userData.email.toLowerCase()] = userData;
      localStorage.setItem('velix_global_registry', JSON.stringify(registry));
    } catch (e) {
      console.error("Registry sync error", e);
    }
  };

  const login = (email: string, role: 'startup' | 'talent' = 'startup', name?: string) => {
    if (!email) return;
    const cleanEmail = email.toLowerCase();
    const isAdmin = cleanEmail === 'fillipeferreiramunch@gmail.com';
    
    // 1. Tentar recuperar perfil existente do registro global
    const registryRaw = localStorage.getItem('velix_global_registry');
    const registry: Record<string, User> = registryRaw ? JSON.parse(registryRaw) : {};
    const existingProfile = registry[cleanEmail];

    if (existingProfile) {
      // Se o usuário já existe, carrega os dados salvos dele
      setUser(existingProfile);
      localStorage.setItem('velix_user', JSON.stringify(existingProfile));
      return;
    }

    // 2. Se for um usuário novo, cria o perfil inicial
    const userData: User = { 
      email: cleanEmail, 
      name: name || cleanEmail.split('@')[0], 
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
    syncToGlobalRegistry(userData);
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
      syncToGlobalRegistry(updatedUser);
    }
  };

  const updateProfileImage = (image: string) => {
    if (user) {
      const updatedUser = { ...user, profileImage: image };
      setUser(updatedUser);
      localStorage.setItem('velix_user', JSON.stringify(updatedUser));
      syncToGlobalRegistry(updatedUser);
    }
  };

  const updateStartupProfile = (profile: StartupProfile) => {
    if (user) {
      const updatedUser = { ...user, startupProfile: profile };
      setUser(updatedUser);
      localStorage.setItem('velix_user', JSON.stringify(updatedUser));
      syncToGlobalRegistry(updatedUser);
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
    } as any;
  }
  return context;
};