
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProgressChart from './ProgressChart';
import MilestoneItem from './MilestoneItem';

const SpiritualJourney = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spiritual Journey</CardTitle>
        <CardDescription>Your progress and milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <ProgressChart />
        <div className="mt-6 space-y-4">
          <MilestoneItem 
            title="Self-Discovery Path"
            progress={60}
          />
          <MilestoneItem 
            title="Meditation Practice"
            progress={45}
          />
          <MilestoneItem 
            title="Energy Healing"
            progress={30}
          />
        </div>
        <div className="mt-6">
          <Button variant="outline" asChild size="sm">
            <Link to="/dashboard/journey" className="flex items-center">
              View Full Journey <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpiritualJourney;
