
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Star } from 'lucide-react';

const Readings = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Reading</h1>
          <p className="text-lg text-muted-foreground">
            Connect with our experienced psychics for guidance, clarity, and spiritual insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {readingTypes.map((reading) => (
            <Card key={reading.id} className="transition-all duration-300 hover:shadow-medium overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  {reading.icon}
                  <span className="ml-2">{reading.title}</span>
                </CardTitle>
                <CardDescription>{reading.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center">
                      <Clock className="h-4 w-4 mr-1" /> {reading.duration}
                    </span>
                    <span className="font-medium">${reading.price}</span>
                  </div>
                  <Button className="w-full">Book Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted rounded-lg p-6 md:p-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">How Readings Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="space-y-2">
                <div className="bg-primary/10 cyber:bg-primary/20 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="font-medium">Choose Your Reader</h3>
                <p className="text-sm text-muted-foreground">Browse our selection of skilled psychics and find the perfect match for your needs.</p>
              </div>
              <div className="space-y-2">
                <div className="bg-primary/10 cyber:bg-primary/20 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="font-medium">Select Reading Type</h3>
                <p className="text-sm text-muted-foreground">Pick from various reading styles and durations based on your questions and preferences.</p>
              </div>
              <div className="space-y-2">
                <div className="bg-primary/10 cyber:bg-primary/20 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="font-medium">Connect & Receive Guidance</h3>
                <p className="text-sm text-muted-foreground">Meet with your reader via video, audio, or chat and receive the insights you seek.</p>
              </div>
            </div>
            <Button variant="outline" className="w-full sm:w-auto">Learn More About Our Process</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const readingTypes = [
  {
    id: 1,
    title: 'Tarot Reading',
    description: 'Gain insights about past, present, and future through ancient tarot symbolism',
    duration: '30 minutes',
    price: 45,
    icon: <Star className="h-5 w-5 text-soulseer-gold cyber:text-accent" />
  },
  {
    id: 2,
    title: 'Psychic Consultation',
    description: 'Direct intuitive guidance for specific questions and life challenges',
    duration: '45 minutes',
    price: 60,
    icon: <User className="h-5 w-5 text-soulseer-blue cyber:text-primary" />
  },
  {
    id: 3,
    title: 'Astrology Reading',
    description: 'Birth chart analysis to understand your life path and potentials',
    duration: '60 minutes',
    price: 75,
    icon: <Calendar className="h-5 w-5 text-soulseer-green cyber:text-secondary" />
  }
];

export default Readings;
