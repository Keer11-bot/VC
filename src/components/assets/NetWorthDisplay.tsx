import React from 'react';
import { motion } from 'framer-motion';

interface NetWorthDisplayProps {
  totalValue: number;
  formattedValue: string;
  lastUpdated: Date;
}

const NetWorthDisplay: React.FC<NetWorthDisplayProps> = ({ 
  formattedValue, 
  lastUpdated 
}) => {
  const dateFormatOptions: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };

  // Format the date string
  const formattedDate = lastUpdated.toLocaleDateString('en-US', dateFormatOptions);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-crypto-gradient rounded-2xl p-6 shadow-xl h-full relative overflow-hidden"
    >
      {/* Background animation effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10">
        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Current Net Worth</h2>
          <p className="text-gray-400 text-sm">Total portfolio value</p>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="text-center py-8"
        >
          <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1 tracking-tight">
            {formattedValue}
          </span>
          <span className="text-accent-gold text-sm">USD</span>
        </motion.div>
        
        <motion.div variants={itemVariants} className="text-center">
          <span className="text-sm text-gray-400">As of {formattedDate}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NetWorthDisplay;