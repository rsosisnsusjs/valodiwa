'use client'

import { motion } from 'framer-motion';
import { Righteous } from 'next/font/google';

const righteous = Righteous({ subsets: ['latin'], weight: '400' });

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center text-gray-700 dark:text-white space-y-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        className="w-24 h-24 rounded-full border-t-4 border-b-4 border-red-500"
      />
      <motion.h2
        className={`text-3xl ${righteous.className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Loading Diwa BRO...
      </motion.h2>
    </div>
  );
}
