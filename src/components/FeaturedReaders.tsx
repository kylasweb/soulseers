
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Sample reader data (in a real app, this would come from an API)
const readers = [
  {
    id: 1,
    name: 'Luna Moonshadow',
    specialty: 'Tarot & Astrology',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    rating: 4.9,
    clients: 523,
    experience: '8 years',
    price: '$5.99/min',
    online: true,
    specialties: ['Relationships', 'Career']
  },
  {
    id: 2,
    name: 'Orion Starsight',
    specialty: 'Psychic Medium',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    rating: 4.8,
    clients: 347,
    experience: '12 years',
    price: '$6.50/min',
    online: true,
    specialties: ['Spiritual Growth', 'Past Lives']
  },
  {
    id: 3,
    name: 'Willow Ravenwood',
    specialty: 'Intuitive Healer',
    image: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    rating: 4.7,
    clients: 289,
    experience: '5 years',
    price: '$4.99/min',
    online: false,
    specialties: ['Healing', 'Chakra Balance']
  },
  {
    id: 4,
    name: 'Jasper Moonstone',
    specialty: 'Energy Reader',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    rating: 4.9,
    clients: 421,
    experience: '10 years',
    price: '$5.50/min',
    online: true,
    specialties: ['Life Path', 'Aura Reading']
  }
];

const FeaturedReaders: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('featured-readers');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="featured-readers" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4">Trusted Guidance</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Featured Readers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with our top-rated spiritual advisors who specialize in different areas of guidance and insight.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {readers.map((reader, index) => (
            <div 
              key={reader.id}
              className={`group rounded-lg overflow-hidden bg-white border border-border/50 shadow-soft hover:shadow-medium transition-all duration-300 transform ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={reader.image} 
                  alt={reader.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  {reader.online ? (
                    <Badge className="bg-green-500 text-white border-none">
                      Online
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                      Offline
                    </Badge>
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex items-center text-white">
                    <Star className="h-4 w-4 text-soulseer-gold fill-soulseer-gold mr-1" />
                    <span className="text-sm">{reader.rating}</span>
                    <span className="mx-2">•</span>
                    <span className="text-sm">{reader.price}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-1">{reader.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{reader.specialty}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {reader.specialties.map(specialty => (
                    <span 
                      key={specialty} 
                      className="px-2 py-1 text-xs rounded-full bg-soulseer-cream text-foreground"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{reader.clients} clients</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{reader.experience}</span>
                  </div>
                </div>
                
                <Button asChild className="w-full">
                  <Link to={`/reader/${reader.id}`}>
                    Book Now
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" asChild>
            <Link to="/readers" className="flex items-center">
              View All Readers <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedReaders;
