
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Star, Users, Clock, BookOpen, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// This is a placeholder for the chart component that would be in a real app
const ProgressChart = () => {
  return (
    <div className="w-full h-40 flex items-center justify-center bg-accent rounded-md">
      <p className="text-muted-foreground">Spiritual Journey Progress Chart</p>
    </div>
  );
};

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Christina</h1>
        <p className="text-muted-foreground">
          Here's an overview of your spiritual journey and upcoming sessions
        </p>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
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
        </div>

        <div>
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
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
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
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recommended Readers</CardTitle>
              <CardDescription>Based on your interests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ReaderItem 
                name="Willow Ravenwood"
                specialty="Intuitive Healer"
                image="https://images.unsplash.com/photo-1535295972055-1c762f4483e5?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                rating={4.7}
              />
              <ReaderItem 
                name="Jasper Moonstone"
                specialty="Energy Reader"
                image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                rating={4.9}
              />
              <div className="mt-4">
                <Button variant="outline" asChild size="sm">
                  <Link to="/dashboard/readers" className="flex items-center">
                    View All Readers <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  desc: string;
  linkUrl: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, desc, linkUrl }) => {
  return (
    <Card className="hover:shadow-medium transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-full bg-muted">{icon}</div>
          <Link 
            to={linkUrl} 
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            View
          </Link>
        </div>
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold mr-2">{value}</span>
          <span className="text-sm text-muted-foreground">{desc}</span>
        </div>
      </CardContent>
    </Card>
  );
};

interface SessionCardProps {
  name: string;
  type: string;
  image: string;
  date: string;
  time: string;
  duration: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const SessionCard: React.FC<SessionCardProps> = ({ 
  name, type, image, date, time, duration, status 
}) => {
  return (
    <div className="flex items-center p-4 border border-border rounded-lg bg-muted/30">
      <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="flex-grow">
        <h4 className="font-medium">{name}</h4>
        <p className="text-sm text-muted-foreground">{type}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium">{date} at {time}</p>
        <div className="flex items-center justify-end mt-1">
          <p className="text-xs text-muted-foreground mr-2">{duration}</p>
          <Badge 
            variant={status === 'confirmed' ? 'default' : status === 'pending' ? 'outline' : 'destructive'}
            className="capitalize text-xs"
          >
            {status}
          </Badge>
        </div>
      </div>
    </div>
  );
};

interface MilestoneItemProps {
  title: string;
  progress: number;
}

const MilestoneItem: React.FC<MilestoneItemProps> = ({ title, progress }) => {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-soulseer-gold h-2 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

interface CommunityItemProps {
  title: string;
  type: string;
  activity: string;
  timeago: string;
  icon: React.ReactNode;
}

const CommunityItem: React.FC<CommunityItemProps> = ({ 
  title, type, activity, timeago, icon 
}) => {
  return (
    <div className="flex items-start p-4 border border-border rounded-lg bg-muted/30">
      <div className="p-2 bg-accent rounded-full mr-4">
        {icon}
      </div>
      <div className="flex-grow">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{type}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-primary">{activity}</p>
        <p className="text-xs text-muted-foreground mt-1">{timeago}</p>
      </div>
    </div>
  );
};

interface ReaderItemProps {
  name: string;
  specialty: string;
  image: string;
  rating: number;
}

const ReaderItem: React.FC<ReaderItemProps> = ({ name, specialty, image, rating }) => {
  return (
    <div className="flex items-center">
      <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="flex-grow">
        <h4 className="font-medium">{name}</h4>
        <p className="text-sm text-muted-foreground">{specialty}</p>
      </div>
      <div className="flex items-center">
        <Star className="h-4 w-4 text-soulseer-gold fill-soulseer-gold mr-1" />
        <span className="text-sm font-medium">{rating}</span>
      </div>
    </div>
  );
};

export default Dashboard;
