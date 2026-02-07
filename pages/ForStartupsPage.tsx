import React from 'react';
import { motion } from 'framer-motion';

const ForStartupsPage = () => {
  const [language, setLanguage] = React.useState('en');

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <main className="max-w-7xl mx-auto px-4 pt-20">
        <section className="text-center py-20">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {language === 'en' 
              ? 'Scale your team with VELIX elite talent' 
              : 'Skaler dit team med VELIX elite talent'}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-xl text-slate-400 mb-8"
          >
            Based in Copenhagen • Recruiting the future.
          </motion.p>
        </section>
      </main>
      <footer className="py-10 text-center border-t border-slate-800">
        <p>VELIX Protocol • Based in Copenhagen</p>
      </footer>
    </div>
  );
};

export default ForStartupsPage;
