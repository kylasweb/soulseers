
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, DollarSign, Users, Video, MessageSquare, MicIcon, Calendar as CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Sample data for the dashboard - in a real app this would come from your API
const recentSessions = [
  {
    id: 1,
    clientName: 'Christina Martinez',
    date: '2023-09-15',
    duration: 35, // in minutes
    amount: 69.65,
    type: 'video'
  },
  {
    id: 2,
    clientName: 'Rajiv Patel',
    date: '2023-09-14',
    duration: 18,
    amount: 35.82,
    type: 'audio'
  },
  {
    id: 3,
    clientName: 'Sarah Johnson',
    date: '2023-09-13',
    duration: 25,
    amount: 49.75,
    type: 'chat'
  },
];

const upcomingSessions = [
  {
    id: 4,
    clientName: 'Michael Wilson',
    date: '2023-09-18 14:30',
    duration: 30,
    type: 'video'
  },
  {
    id: 5,
    clientName: 'Jennifer Lopez',
    date: '2023-09-19 10:00',
    duration: 45,
    type: 'audio'
  },
];

const ReaderDashboard = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const navigate = useNavigate();

  // Format the date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  // Get the type icon based on the session type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'audio':
        return <MicIcon className="h-4 w-4" />;
      case 'chat':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Calculate statistics
  const totalEarnings = recentSessions.reduce((sum, session) => sum + session.amount, 0);
  const totalMinutes = recentSessions.reduce((sum, session) => sum + session.duration, 0);
  const totalClients = new Set(recentSessions.map(session => session.clientName)).size;

  // Handle starting a session
  const handleStartSession = (id: number) => {
    // In a real app, you would start the session based on the ID
    navigate('/consultations/session', {
      state: {
        sessionId: id,
        isReaderMode: true,
        // Would include other session details here
      }
    });
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Reader Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your readings, schedule, and payments
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="availability"
              checked={isAvailable}
              onCheckedChange={setIsAvailable}
            />
            <Label htmlFor="availability">
              {isAvailable ? (
                <span className="flex items-center">
                  <Badge variant="outline" className="bg-green-100 text-green-800 ml-2">
                    Available for Readings
                  </Badge>
                </span>
              ) : (
                <span className="flex items-center">
                  <Badge variant="outline" className="bg-red-100 text-red-800 ml-2">
                    Unavailable
                  </Badge>
                </span>
              )}
            </Label>
          </div>
          <Button>
            <CalendarIcon className="h-4 w-4 mr-2" />
            My Schedule
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Minutes Read</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMinutes} min</div>
            <p className="text-xs text-muted-foreground">+8.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
            <p className="text-xs text-muted-foreground">+4.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
          
          {upcomingSessions.length > 0 ? (
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <Card key={session.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            {getTypeIcon(session.type)}
                          </div>
                          <div>
                            <h3 className="font-medium">{session.clientName}</h3>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(session.date)} · {session.duration} minutes
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Badge variant="outline" className="capitalize">
                          {session.type}
                        </Badge>
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => handleStartSession(session.id)}
                        >
                          Start Session
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8">
                <div className="text-center">
                  <CalendarIcon className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-medium mb-1">No Upcoming Sessions</h3>
                  <p className="text-muted-foreground">
                    You don't have any upcoming sessions scheduled.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4">
          <h2 className="text-xl font-semibold">Past Sessions</h2>
          
          <div className="space-y-4">
            {recentSessions.map((session) => (
              <Card key={session.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          {getTypeIcon(session.type)}
                        </div>
                        <div>
                          <h3 className="font-medium">{session.clientName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(session.date)} · {session.duration} minutes
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="capitalize">
                        {session.type}
                      </Badge>
                      <div className="text-right">
                        <div className="font-medium">${session.amount.toFixed(2)}</div>
                        <div className="text-xs text-muted-foreground">
                          ${(session.amount / session.duration).toFixed(2)}/min
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="earnings" className="space-y-4">
          <h2 className="text-xl font-semibold">Earnings Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">${totalEarnings.toFixed(2)}</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Video sessions</span>
                    <span className="font-medium">$69.65</span>
                  </div>
                  <Progress value={70} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Audio sessions</span>
                    <span className="font-medium">$35.82</span>
                  </div>
                  <Progress value={30} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Chat sessions</span>
                    <span className="font-medium">$49.75</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Payout History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <div className="font-medium">August 2023 Payout</div>
                      <div className="text-sm text-muted-foreground">Processed on Sep 2, 2023</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">$432.18</div>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Completed
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <div className="font-medium">July 2023 Payout</div>
                      <div className="text-sm text-muted-foreground">Processed on Aug 2, 2023</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">$385.92</div>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Completed
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <div className="font-medium">June 2023 Payout</div>
                      <div className="text-sm text-muted-foreground">Processed on Jul 2, 2023</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">$421.55</div>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Completed
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <h2 className="text-xl font-semibold">Reader Settings</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Consultation Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rate">Rate per Minute ($)</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                      $
                    </span>
                    <input
                      id="rate"
                      type="number"
                      min="0.1"
                      step="0.01"
                      defaultValue="1.99"
                      className="flex h-10 w-full rounded-md rounded-l-none border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="minDuration">Minimum Session Duration (minutes)</Label>
                  <input
                    id="minDuration"
                    type="number"
                    min="1"
                    step="1"
                    defaultValue="15"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Available Communication Types</Label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="videoEnabled" defaultChecked />
                    <Label htmlFor="videoEnabled">Video</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="audioEnabled" defaultChecked />
                    <Label htmlFor="audioEnabled">Audio</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="chatEnabled" defaultChecked />
                    <Label htmlFor="chatEnabled">Chat</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Availability Schedule</Label>
                <Button variant="outline">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Manage Schedule
                </Button>
              </div>
              
              <Button className="mt-4">Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ReaderDashboard;
