import React, { useEffect, useState } from 'react';
import App from '../App';

export default function Index() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <App />;
}