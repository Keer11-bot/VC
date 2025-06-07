import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { CryptoAsset } from './AssetsDashboard';
import { formatCurrency } from '../../utils/formatters';

interface CryptoCardProps {
  asset: CryptoAsset;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ asset }) => {
  const isPositiveChange = asset.change24h ? asset.change24h > 0 : false;
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="bg-dark-300 rounded-xl p-5 cursor-pointer relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center">
          {asset.icon ? (
            <img 
              src={asset.icon} 
              alt={asset.name} 
              className="w-10 h-10 mr-4"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-700 mr-4 flex items-center justify-center">
              {asset.symbol.substring(0, 1)}
            </div>
          )}
          
          <div>
            <h3 className="font-bold text-white">{asset.name}</h3>
            <div className="flex items-center">
              <span className="text-sm text-gray-400">{asset.symbol}</span>
              {asset.change24h && (
                <div className={`ml-2 text-xs flex items-center ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`}>
                  {isPositiveChange ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {Math.abs(asset.change24h).toFixed(1)}%
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-xl font-bold text-white">{asset.amount} {asset.symbol}</div>
          <div className="text-sm text-gray-400">{formatCurrency(asset.valueUSD)}</div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-primary-400"
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </motion.div>
  );
};

export default CryptoCard;