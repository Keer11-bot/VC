import React from 'react';
import AssetsDashboard from '../components/assets/AssetsDashboard';

const AssetsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-300 py-20">
      <div className="container mx-auto px-4">
        <AssetsDashboard />
      </div>
    </div>
  );
};

export default AssetsPage;