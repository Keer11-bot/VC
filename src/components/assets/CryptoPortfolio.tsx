import React from 'react';
import { motion } from 'framer-motion';
import { CryptoAsset } from './AssetsDashboard';
import CryptoCard from './CryptoCard';

interface CryptoPortfolioProps {
  assets: CryptoAsset[];
}

const CryptoPortfolio: React.FC<CryptoPortfolioProps> = ({ assets }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-dark-200 rounded-2xl p-6 shadow-xl h-full"
    >
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">Portfolio</h2>
        <p className="text-gray-400 text-sm">Your digital asset holdings</p>
      </div>
      
      <div className="space-y-4">
        {assets.map((asset) => (
          <CryptoCard key={asset.id} asset={asset} />
        ))}
      </div>
    </motion.div>
  );
};

export default CryptoPortfolio;