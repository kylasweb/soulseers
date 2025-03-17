
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, DollarSign, Calendar, Clock, Video, MessageSquare, MicIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const BecomeReaderSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Join Our Team
          </Badge>
          <h2 className="text-3xl font-bold mb-4">Become a SoulSeer Reader</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your psychic gifts with the world and earn income while helping others on their spiritual journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="space-y-6">
              <div className="flex">
                <div className="mr-4 mt-1">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Set Your Own Schedule</h3>
                  <p className="text-muted-foreground">
                    Work whenever you want. Turn on your availability when you're ready to take readings.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 mt-1">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Earn Per Minute</h3>
                  <p className="text-muted-foreground">
                    Get paid for every minute you spend helping clients. Set your own rates based on your experience and skills.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 mt-1">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Multiple Communication Options</h3>
                  <p className="text-muted-foreground">
                    Connect with clients via video, audio, or chat - whatever works best for your reading style.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 mt-1">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Dedicated Dashboard</h3>
                  <p className="text-muted-foreground">
                    Track your earnings, manage your schedule, and connect with clients through our seamless platform.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link to="/reader/signup">
                  Apply to Become a Reader
                </Link>
              </Button>
              <Link to="/reader/requirements" className="ml-4 text-primary underline">
                View Requirements
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Competitive Earnings</h3>
                <p className="text-sm text-muted-foreground">
                  Top readers earn $1000+ per week providing spiritual guidance.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Flexible Schedule</h3>
                <p className="text-sm text-muted-foreground">
                  Set your own hours and work from anywhere around the world.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Pay Per Minute</h3>
                <p className="text-sm text-muted-foreground">
                  Get paid for every minute you spend with clients.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 flex-shrink-0">
                  <div className="flex items-center justify-center space-x-1">
                    <Video className="h-4 w-4 text-primary" />
                    <MicIcon className="h-4 w-4 text-primary" />
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">Multiple Channels</h3>
                <p className="text-sm text-muted-foreground">
                  Connect via video, audio, or chat based on your preferences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeReaderSection;
