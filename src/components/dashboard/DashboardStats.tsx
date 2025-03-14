
import React from 'react';
import { Calendar, Star, Users } from 'lucide-react';
import StatCard from './StatCard';

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard 
        icon={<Calendar className="h-5 w-5 text-soulseer-blue" />}
        title="Upcoming Sessions"
        value="2"
        desc="Next: Tomorrow at 3:00 PM"
        linkUrl="/dashboard/sessions"
      />
      <StatCard 
        icon={<Star className="h-5 w-5 text-soulseer-gold" />}
        title="Favorite Readers"
        value="5"
        desc="3 new readings available"
        linkUrl="/dashboard/readers"
      />
      <StatCard 
        icon={<Users className="h-5 w-5 text-soulseer-green" />}
        title="Community Threads"
        value="8"
        desc="3 new replies to your posts"
        linkUrl="/dashboard/community"
      />
    </div>
  );
};

export default DashboardStats;
