import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CryptoPortfolio from './CryptoPortfolio';
import NetWorthDisplay from './NetWorthDisplay';
import { formatCurrency } from '../../utils/formatters';

// Types
export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  valueUSD: number;
  icon: string;
  change24h?: number;
}

const AssetsDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [portfolio, setPortfolio] = useState<CryptoAsset[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Simulating data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      const mockData: CryptoAsset[] = [
        {
          id: 'bitcoin',
          name: 'Bitcoin',
          symbol: 'BTC',
          amount: 15,
          valueUSD: 1260000, // $84,000 per BTC
          icon: 'https://images.pexels.com/photos/315788/pexels-photo-315788.jpeg?auto=compress&cs=tinysrgb&w=600',
          change24h: 2.4,
        },
        {
          id: 'ethereum',
          name: 'Ethereum',
          symbol: 'ETH',
          amount: 953,
          valueUSD: 1905000, // $2,000 per ETH
          icon: 'https://images.pexels.com/photos/730552/pexels-photo-730552.jpeg?auto=compress&cs=tinysrgb&w=600',
          change24h: 1.7,
        },
        {
          id: 'domain',
          name: 'Web Domains',
          symbol: 'USD',
          amount: 560000,
          valueUSD: 560000, // $2,000 per ETH
          icon: 'https://th.bing.com/th/id/OIP.wGjsFdemdv8dxfaLPM84iAHaEK?w=296&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
          change24h: 1.7,
        },
        {
          id: 'equity',
          name: 'Equity Holdings',
          symbol: 'Cr',
          amount: 26,
          valueUSD: 3113772, // $2,000 per ETH
          icon: 'https://th.bing.com/th/id/OIP.slQhzvN6Tzo0RxGP9AiQSgAAAA?w=250&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
          change24h: 1.7,
        }
      ];

      setPortfolio(mockData);
      const total = mockData.reduce((sum, asset) => sum + asset.valueUSD, 0);
      setTotalValue(total);
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-5xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Assets</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Monitor your portfolio and track your current net worth in real-time.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="h-96 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <CryptoPortfolio assets={portfolio} />
            </div>
            <div>
              <NetWorthDisplay 
                totalValue={totalValue} 
                formattedValue={formatCurrency(totalValue)}
                lastUpdated={lastUpdated} 
              />
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center text-sm text-gray-500 mt-8"
          >
            <p>Last updated: {lastUpdated.toLocaleDateString()} at {lastUpdated.toLocaleTimeString()}</p>
            <p className="mt-2">Prices and portfolio values are provided for informational purposes only.</p>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default AssetsDashboard;