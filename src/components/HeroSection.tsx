
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, VideoIcon, Clock } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-soulseer-blue/20 to-soulseer-green/20 z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-soulseer-blue/20 animate-float blur-xl"></div>
        <div className="absolute top-[50%] right-[15%] w-40 h-40 rounded-full bg-soulseer-green/20 animate-float blur-xl animation-delay-1000"></div>
        <div className="absolute bottom-[20%] left-[30%] w-24 h-24 rounded-full bg-soulseer-gold/20 animate-float blur-xl animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span 
            className={`inline-block text-sm font-medium px-4 py-1.5 rounded-full bg-soulseer-cream text-soulseer-gold mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Begin Your Spiritual Journey Today
          </span>
          
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Discover Your Inner <span className="text-soulseer-gold">Wisdom</span> & Spiritual <span className="text-soulseer-gold">Path</span>
          </h1>
          
          <p 
            className={`text-lg md:text-xl text-muted-foreground mb-8 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Connect with experienced guides who can help illuminate your journey through live video, audio, or chat consultations. Pay only for the time you use.
          </p>
          
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link to="/services" className="flex items-center justify-center">
                Start Live Consultation <VideoIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <Link to="/services" className="flex items-center justify-center">
                Explore Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div 
            className={`mt-6 flex items-center justify-center space-x-2 text-sm text-muted-foreground transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Clock className="h-4 w-4" />
            <span>Pay-per-minute: only pay for the time you use</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-foreground/30 animate-pulse-soft"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
