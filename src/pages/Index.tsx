
import React, { useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import HeroSection from '@/components/HeroSection';
import FeaturedReaders from '@/components/FeaturedReaders';
import TestimonialSection from '@/components/TestimonialSection';
import { Button } from '@/components/ui/button';
import { ArrowRight, Crystal, Sparkles, Stars, Heart, BookOpen, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <HeroSection />
      
      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4">Our Offerings</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Spiritual Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our range of services designed to support your spiritual growth and personal development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Crystal className="h-10 w-10 text-soulseer-gold" />}
              title="Psychic Readings"
              description="Gain insights into your past, present, and future with our experienced psychic advisors."
              link="/services/psychic-readings"
            />
            <ServiceCard 
              icon={<Sparkles className="h-10 w-10 text-soulseer-blue" />}
              title="Tarot & Oracle"
              description="Discover hidden truths and possibilities through symbolic card readings tailored to your questions."
              link="/services/tarot"
            />
            <ServiceCard 
              icon={<Stars className="h-10 w-10 text-soulseer-green" />}
              title="Astrology Consultations"
              description="Understand the cosmic influences shaping your life path through personalized astrological analysis."
              link="/services/astrology"
            />
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link to="/services" className="flex items-center">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <FeaturedReaders />
      
      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-soulseer-cream/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4">Simple Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How SoulSeer Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Begin your spiritual journey in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-soulseer-blue via-soulseer-green to-soulseer-gold"></div>
            
            <StepCard 
              number={1}
              title="Choose Your Reader"
              description="Browse our diverse community of spiritual advisors and find the perfect match for your needs."
            />
            <StepCard 
              number={2}
              title="Book Your Session"
              description="Select a convenient time for your reading and choose between chat, voice, or video consultation."
            />
            <StepCard 
              number={3}
              title="Receive Guidance"
              description="Connect with your reader and receive the insights and clarity you're seeking on your spiritual journey."
            />
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild className="px-8">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <TestimonialSection />
      
      {/* Community Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Badge variant="outline" className="mb-4">Join Our Community</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Connect With Like-Minded Souls</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Become part of our thriving spiritual community where you can share experiences, 
                learn from others, and grow together on your spiritual journey.
              </p>
              
              <div className="space-y-4 mb-8">
                <FeatureItem 
                  icon={<Users className="h-5 w-5 text-soulseer-gold" />}
                  title="Supportive Forums"
                  description="Engage in meaningful discussions about spiritual topics with our global community."
                />
                <FeatureItem 
                  icon={<BookOpen className="h-5 w-5 text-soulseer-gold" />}
                  title="Learning Resources"
                  description="Access exclusive articles, guides, and videos to deepen your spiritual knowledge."
                />
                <FeatureItem 
                  icon={<Heart className="h-5 w-5 text-soulseer-gold" />}
                  title="Group Meditations"
                  description="Join regular online meditation sessions guided by experienced practitioners."
                />
              </div>
              
              <Button asChild>
                <Link to="/community">Explore Community</Link>
              </Button>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -top-5 -left-5 w-full h-full rounded-2xl border border-soulseer-gold/30"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-medium">
                  <img 
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                    alt="SoulSeer Community" 
                    className="w-full h-full object-cover aspect-video"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, link }) => {
  return (
    <div className="rounded-lg p-6 bg-white border border-border/50 shadow-soft hover:shadow-medium transition-all duration-300 group">
      <div className="mb-4 rounded-full w-16 h-16 flex items-center justify-center bg-accent group-hover:bg-primary/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground mb-5">{description}</p>
      <Link 
        to={link} 
        className="flex items-center text-sm font-medium text-primary hover:text-primary/80 animated-underline"
      >
        Learn More <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
};

interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-soulseer-cream border border-soulseer-gold/50 flex items-center justify-center text-2xl font-bold text-soulseer-gold mb-6 relative z-10">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => {
  return (
    <div className="flex items-start">
      <div className="mr-4 bg-primary/10 rounded-full p-2 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-base font-semibold mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Index;
