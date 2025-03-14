
import React from 'react';
import SocialStatsCard from './SocialStatsCard';
import { useSocialManagement } from '@/hooks/use-social-management';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

const SocialStats: React.FC = () => {
  const { socialStats } = useSocialManagement();

  if (socialStats.isLoading) {
    return (
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
      </Card>
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
    <Card className="p-4 border-t-4 border-t-primary shadow-md animate-fade-in">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SocialStatsCard
            title="Total Posts"
            value={socialStats.data.totalPosts.toLocaleString()}
            trend={socialStats.data.postsTrend}
            icon="FileText"
          />
          
          <SocialStatsCard
            title="Active Users"
            value={socialStats.data.activeUsers.toLocaleString()}
            trend={socialStats.data.usersTrend}
            icon="Users"
          />
          
          <SocialStatsCard
            title="Reports"
            value={socialStats.data.reports.toString()}
            trend={socialStats.data.reportsTrend}
            trendColor="text-amber-500"
            icon="Flag"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialStats;
