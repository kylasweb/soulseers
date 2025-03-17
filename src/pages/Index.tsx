
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
  Star, 
  Clock,
  VideoIcon,
  MicIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      
      {/* Pay-Per-Minute Highlight Section */}
      <section className="py-16 bg-gradient-to-r from-soulseer-blue/10 to-soulseer-green/10 border-y border-soulseer-blue/20">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="max-w-xl mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Live Pay-Per-Minute Consultations
              </h2>
              <p className="text-muted-foreground mb-6">
                Connect instantly with our spiritual advisors through video, audio, or chat. 
                Our flexible pay-per-minute system means you only pay for the time you need.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-soulseer-cream text-foreground text-sm">
                  <VideoIcon className="h-4 w-4 mr-1.5 text-soulseer-blue" />
                  Video
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-soulseer-cream text-foreground text-sm">
                  <MicIcon className="h-4 w-4 mr-1.5 text-soulseer-blue" />
                  Audio
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-soulseer-cream text-foreground text-sm">
                  <MessageSquare className="h-4 w-4 mr-1.5 text-soulseer-blue" />
                  Chat
                </span>
              </div>
              <Button asChild>
                <Link to="/services">Start a Consultation</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-soulseer-gold/10 flex items-center justify-center overflow-hidden relative">
                <div className="absolute w-full h-full bg-gradient-to-br from-soulseer-blue/20 to-soulseer-green/20 animate-slow-spin"></div>
                <div className="relative z-10 text-center p-6">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-soulseer-gold" />
                  <h3 className="text-xl font-bold mb-2">Pay Only For What You Use</h3>
                  <p className="text-sm text-muted-foreground">
                    Sessions start at just $2.99/minute with no hidden fees or subscriptions
                  </p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                No Minimum Commitment
              </div>
            </div>
          </div>
        </div>
      </section>
      
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
                <Button variant="ghost" className="w-full justify-between group" asChild>
                  <Link to="/services">
                    Learn more 
                    <MessageSquare className="h-4 w-4 ml-2 opacity-70 group-hover:translate-x-1 transition-transform" />
                  </Link>
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
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link to="/services">Book a Reading</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/services">Explore Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
