
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Video, Headphones, MessageSquare, Users, Star } from 'lucide-react';

const Sessions = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Live Sessions</h1>
          <p className="text-lg text-muted-foreground">
            Join our interactive sessions for real-time spiritual guidance and community connection
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="mb-12">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
              <TabsTrigger value="featured">Featured Events</TabsTrigger>
              <TabsTrigger value="workshops">Workshops</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            {featuredSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </TabsContent>

          <TabsContent value="workshops" className="space-y-6">
            {workshops.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </TabsContent>
        </Tabs>

        <div className="bg-muted rounded-lg p-6 md:p-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Host Your Own Session</h2>
            <p className="mb-6 text-muted-foreground">
              Are you a spiritual practitioner looking to share your knowledge and connect with our community? 
              Apply to become a session host and reach thousands of spiritual seekers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button>Apply to Host</Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const SessionCard = ({ session }) => {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 p-6 flex flex-col justify-center items-center bg-muted cyber:bg-muted/50">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-1">{session.date}</h3>
            <p className="text-muted-foreground">{session.time}</p>
            <div className="flex items-center justify-center mt-3">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" /> 
              <span className="text-sm text-muted-foreground">{session.duration}</span>
            </div>
          </div>
        </div>
        <div className="md:w-3/4 p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <Badge variant={session.type === 'Workshop' ? 'secondary' : session.type === 'Group Session' ? 'outline' : 'default'}>
                {session.type}
              </Badge>
              <h3 className="text-xl font-bold mt-2">{session.title}</h3>
            </div>
            <div className="flex">
              {session.format.includes('Video') && <Video className="h-4 w-4 mr-2" />}
              {session.format.includes('Audio') && <Headphones className="h-4 w-4 mr-2" />}
              {session.format.includes('Chat') && <MessageSquare className="h-4 w-4" />}
            </div>
          </div>
          <p className="text-muted-foreground mb-4">{session.description}</p>
          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img src={session.hostImage} alt={session.host} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-medium">{session.host}</p>
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-soulseer-gold fill-soulseer-gold cyber:text-accent cyber:fill-accent" />
                  <span className="text-xs ml-1">{session.rating} ({session.reviews} reviews)</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-4">
                <p className="font-bold text-right">${session.price}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-3 w-3 mr-1" />
                  <span>{session.attendees} spots left</span>
                </div>
              </div>
              <Button>Join</Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const upcomingSessions = [
  {
    id: 1,
    title: "Full Moon Manifestation Circle",
    description: "Harness the powerful energy of the full moon to manifest your intentions and desires in this guided group session.",
    type: "Group Session",
    host: "Luna Moonshadow",
    hostImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    date: "Apr 22, 2023",
    time: "8:00 PM ET",
    duration: "90 min",
    format: ["Video", "Audio"],
    attendees: 12,
    price: 25,
    rating: 4.8,
    reviews: 129
  },
  {
    id: 2,
    title: "Akashic Records Reading: Past Lives Exploration",
    description: "Journey through your past lives and access the wisdom stored in your soul's record in this intimate live reading session.",
    type: "Private Session",
    host: "Orion Starsight",
    hostImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    date: "Apr 24, 2023",
    time: "2:30 PM ET",
    duration: "60 min",
    format: ["Video", "Chat"],
    attendees: 5,
    price: 75,
    rating: 4.9,
    reviews: 87
  }
];

const featuredSessions = [
  {
    id: 3,
    title: "Intuitive Healing Energy Circle",
    description: "Experience a powerful group healing session where our facilitator channels universal energy to support your physical and emotional wellbeing.",
    type: "Group Session",
    host: "Seren Divine",
    hostImage: "https://images.unsplash.com/photo-1558898479-33c0057a5d12?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    date: "Apr 25, 2023",
    time: "7:00 PM ET",
    duration: "75 min",
    format: ["Video", "Audio"],
    attendees: 8,
    price: 35,
    rating: 4.7,
    reviews: 62
  }
];

const workshops = [
  {
    id: 4,
    title: "Developing Your Psychic Abilities: Beginner's Workshop",
    description: "Learn the fundamentals of psychic development through practical exercises and guided techniques in this interactive workshop.",
    type: "Workshop",
    host: "Indigo Rivers",
    hostImage: "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    date: "Apr 28, 2023",
    time: "1:00 PM ET",
    duration: "3 hours",
    format: ["Video", "Chat"],
    attendees: 15,
    price: 49,
    rating: 4.6,
    reviews: 41
  }
];

export default Sessions;
