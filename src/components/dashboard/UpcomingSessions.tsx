
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SessionCard from './SessionCard';

const UpcomingSessions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Sessions</CardTitle>
        <CardDescription>Your schedule for the next 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <SessionCard 
            name="Luna Moonshadow"
            type="Tarot Reading"
            image="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
            date="Apr 10, 2023"
            time="3:00 PM"
            duration="30 min"
            status="confirmed"
          />
          <SessionCard 
            name="Orion Starsight"
            type="Spiritual Guidance"
            image="https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
            date="Apr 12, 2023"
            time="2:30 PM"
            duration="45 min"
            status="confirmed"
          />
        </div>
        <div className="mt-6">
          <Button variant="outline" asChild size="sm">
            <Link to="/dashboard/sessions" className="flex items-center">
              View All Sessions <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingSessions;
