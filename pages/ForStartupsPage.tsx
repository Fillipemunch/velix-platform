import React from 'react';
import { motion } from 'framer-motion';

export default function ForStartupsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.h1 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="text-4xl font-bold"
      >
        Scale your team with VELIX elite talent
      </motion.h1>
      <p className="mt-4 text-gray-400">Based in Copenhagen • VELIX Protocol</p>
    </div>
  );
}
