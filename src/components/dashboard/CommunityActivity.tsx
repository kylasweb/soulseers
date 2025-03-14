
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Calendar, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import CommunityItem from './CommunityItem';

const CommunityActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Activity</CardTitle>
        <CardDescription>Recent discussions and events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <CommunityItem 
            title="Finding Balance in Chaotic Times"
            type="Forum Discussion"
            activity="18 new replies"
            timeago="2 hours ago"
            icon={<Users className="h-5 w-5" />}
          />
          <CommunityItem 
            title="Full Moon Meditation Circle"
            type="Upcoming Event"
            activity="32 participants"
            timeago="Tomorrow at 9:00 PM"
            icon={<Calendar className="h-5 w-5" />}
          />
          <CommunityItem 
            title="Beginner's Guide to Chakra Healing"
            type="New Article"
            activity="216 views"
            timeago="1 day ago"
            icon={<BookOpen className="h-5 w-5" />}
          />
        </div>
        <div className="mt-6">
          <Button variant="outline" asChild size="sm">
            <Link to="/dashboard/community" className="flex items-center">
              Explore Community <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityActivity;
