
import React from 'react';
import SocialStatsCard from './SocialStatsCard';
import { useSocialManagement } from '@/hooks/use-social-management';
import { Skeleton } from '@/components/ui/skeleton';

const SocialStats: React.FC = () => {
  const { socialStats } = useSocialManagement();

  if (socialStats.isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-28 w-full" />
        ))}
      </div>
    );
  }

  if (socialStats.isError || !socialStats.data) {
    return (
      <div className="bg-destructive/10 p-4 rounded-md text-destructive mb-4">
        Error loading social statistics. Please refresh the page.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <SocialStatsCard
        title="Total Posts"
        value={socialStats.data.totalPosts.toLocaleString()}
        trend={socialStats.data.postsTrend}
      />
      
      <SocialStatsCard
        title="Active Users"
        value={socialStats.data.activeUsers.toLocaleString()}
        trend={socialStats.data.usersTrend}
      />
      
      <SocialStatsCard
        title="Reports"
        value={socialStats.data.reports.toString()}
        trend={socialStats.data.reportsTrend}
        trendColor="text-amber-500"
      />
    </div>
  );
};

export default SocialStats;
