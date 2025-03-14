
import React from 'react';
import SocialStatsCard from './SocialStatsCard';

const SocialStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <SocialStatsCard
        title="Total Posts"
        value="3,487"
        trend="+210 this month"
      />
      
      <SocialStatsCard
        title="Active Users"
        value="984"
        trend="+15% from last month"
      />
      
      <SocialStatsCard
        title="Reports"
        value="12"
        trend="Requires attention"
        trendColor="text-amber-500"
      />
    </div>
  );
};

export default SocialStats;
