
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import HeroSection from '@/components/HeroSection';
import FeaturedReaders from '@/components/FeaturedReaders';
import TestimonialSection from '@/components/TestimonialSection';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Calendar, 
  Users, 
  MessageSquare, 
  Star
} from 'lucide-react';

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      
      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-background to-accent/20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Our Spiritual Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover clarity, guidance, and healing through our range of specialized spiritual services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Sparkles className="h-10 w-10 text-soulseer-blue" />,
                title: 'Psychic Readings',
                description: 'Gain insights into your past, present, and future with our intuitive psychic readings.'
              },
              {
                icon: <Star className="h-10 w-10 text-soulseer-gold" />,
                title: 'Tarot Guidance',
                description: 'Explore the symbolic wisdom of tarot to illuminate your path forward.'
              },
              {
                icon: <Calendar className="h-10 w-10 text-soulseer-green" />,
                title: 'Astrology Charts',
                description: 'Understand your cosmic blueprint with personalized astrological analysis.'
              },
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: 'Energy Healing',
                description: 'Experience spiritual cleansing and energy alignment for your well-being.'
              }
            ].map((service, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 flex justify-center">{service.icon}</div>
                <h3 className="text-xl font-medium mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Button variant="ghost" className="w-full justify-between group">
                  Learn more 
                  <MessageSquare className="h-4 w-4 ml-2 opacity-70 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <FeaturedReaders />
      <TestimonialSection />
      
      {/* Call to Action Section */}
      <section className="py-20 bg-primary/10">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Begin Your Spiritual Journey Today</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join our community of seekers and unlock deeper meaning, healing, and personal growth.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Book a Reading
            </Button>
            <Button size="lg" variant="outline">
              Explore Services
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
