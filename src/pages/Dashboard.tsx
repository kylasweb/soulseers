
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import UpcomingSessions from '@/components/dashboard/UpcomingSessions';
import SpiritualJourney from '@/components/dashboard/SpiritualJourney';
import CommunityActivity from '@/components/dashboard/CommunityActivity';
import RecommendedReaders from '@/components/dashboard/RecommendedReaders';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Christina</h1>
        <p className="text-muted-foreground">
          Here's an overview of your spiritual journey and upcoming sessions
        </p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <UpcomingSessions />
        </div>
        <div>
          <SpiritualJourney />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CommunityActivity />
        </div>
        <div>
          <RecommendedReaders />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
