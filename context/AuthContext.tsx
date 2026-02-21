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
  password?: string;
  role: 'startup' | 'talent' | 'admin';
  isSubscribed?: boolean;
  isAdmin?: boolean;
  profileImage?: string;
  startupProfile?: StartupProfile;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => boolean;
  register: (name: string, email: string, password?: string, role?: 'startup' | 'talent') => void;
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

  // Inicialização: Tenta recuperar a sessão ativa
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

  // Helper para ler o registro global (nosso "Banco de Dados")
  const getGlobalRegistry = (): Record<string, User> => {
    try {
      const registryRaw = localStorage.getItem('velix_global_registry');
      return registryRaw ? JSON.parse(registryRaw) : {};
    } catch (e) {
      return {};
    }
  };

  // Helper para salvar no registro global
  const saveToGlobalRegistry = (userData: User) => {
    const registry = getGlobalRegistry();
    registry[userData.email.toLowerCase()] = userData;
    localStorage.setItem('velix_global_registry', JSON.stringify(registry));
  };

  const register = (name: string, email: string, password?: string, role: 'startup' | 'talent' = 'startup') => {
    const cleanEmail = email.toLowerCase();
    const isAdmin = cleanEmail === 'fillipeferreiramunch@gmail.com';
    
    const newUser: User = { 
      email: cleanEmail, 
      name: name, 
      password: password,
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

    // Salva no "Banco de Dados" permanente do navegador
    saveToGlobalRegistry(newUser);
    
    // Inicia a sessão automaticamente após o registro
    setUser(newUser);
    localStorage.setItem('velix_user', JSON.stringify(newUser));
  };

  const login = (email: string, password?: string): boolean => {
    const cleanEmail = email.toLowerCase();
    const registry = getGlobalRegistry();
    const existingUser = registry[cleanEmail];

    if (existingUser) {
      // Se o usuário tem senha registrada, verifica se coincide
      if (existingUser.password && existingUser.password !== password) {
        return false;
      }
      
      setUser(existingUser);
      localStorage.setItem('velix_user', JSON.stringify(existingUser));
      return true;
    }
    
    return false; // Login falhou - conta não existe
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
      saveToGlobalRegistry(updatedUser);
    }
  };

  const updateProfileImage = (image: string) => {
    if (user) {
      const updatedUser = { ...user, profileImage: image };
      setUser(updatedUser);
      localStorage.setItem('velix_user', JSON.stringify(updatedUser));
      saveToGlobalRegistry(updatedUser);
    }
  };

  const updateStartupProfile = (profile: StartupProfile) => {
    if (user) {
      const updatedUser = { ...user, startupProfile: profile };
      setUser(updatedUser);
      localStorage.setItem('velix_user', JSON.stringify(updatedUser));
      saveToGlobalRegistry(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register,
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};