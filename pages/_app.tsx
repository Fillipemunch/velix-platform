import type { AppProps } from 'next/app';
import { AppProvider } from '../context/AppContext';
import { AuthProvider } from '../context/AuthContext';
import { HashRouter, MemoryRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use MemoryRouter during build (SSR) and HashRouter on client
  const Router = typeof window !== 'undefined' ? HashRouter : MemoryRouter;

  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Component {...pageProps} />
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}