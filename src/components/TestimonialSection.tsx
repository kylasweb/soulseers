
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Sarah J.',
    location: 'New York, USA',
    text: 'My reading with Luna was transformative. She provided insights that helped me navigate a difficult career transition with confidence and clarity. I\'ve been a regular client ever since.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    rating: 5,
    date: '2 months ago'
  },
  {
    id: 2,
    name: 'Michael T.',
    location: 'London, UK',
    text: 'I was skeptical at first, but my session with Orion changed my perspective completely. The accuracy of his readings and the compassionate guidance he provided was exactly what I needed during a challenging time.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    rating: 5,
    date: '1 month ago'
  },
  {
    id: 3,
    name: 'Elena R.',
    location: 'Barcelona, Spain',
    text: 'Willow\'s intuitive healing session brought me a sense of peace I haven\'t felt in years. Her ability to identify and clear energy blockages is remarkable. I feel more centered and aligned with my purpose.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    rating: 4,
    date: '2 weeks ago'
  },
  {
    id: 4,
    name: 'David K.',
    location: 'Toronto, Canada',
    text: 'Jasper\'s reading was spot on in every way. He connected with aspects of my life that were incredibly specific, and his guidance has helped me make important decisions with confidence. Highly recommended!',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    rating: 5,
    date: '3 weeks ago'
  }
];

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('testimonials');
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

  const nextTestimonial = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setIsTransitioning(false);
    }, 300);
  };

  const prevTestimonial = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 300);
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        size={16} 
        className={`${index < rating ? 'text-soulseer-gold fill-soulseer-gold' : 'text-gray-300'}`} 
      />
    ));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-soulseer-cream/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4">Client Stories</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Community Says</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how SoulSeer has helped people find clarity, direction, and meaning in their spiritual journeys.
          </p>
        </div>

        <div 
          className={`max-w-4xl mx-auto transition-opacity duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          } ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="relative rounded-xl overflow-hidden shadow-medium bg-white p-6 md:p-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-soulseer-blue via-soulseer-green to-soulseer-gold"></div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-sm">
                  <img 
                    src={currentTestimonial.image} 
                    alt={currentTestimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-grow">
                <div className="flex items-center mb-2">
                  {renderStars(currentTestimonial.rating)}
                  <span className="ml-2 text-sm text-muted-foreground">{currentTestimonial.date}</span>
                </div>
                
                <blockquote className="text-lg md:text-xl mb-4 italic">
                  "{currentTestimonial.text}"
                </blockquote>
                
                <div>
                  <p className="font-semibold">{currentTestimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{currentTestimonial.location}</p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-6 right-6 flex space-x-2">
              <button 
                onClick={prevTestimonial} 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-accent transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextTestimonial} 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-accent transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 mx-1 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-soulseer-gold w-6' 
                    : 'bg-muted-foreground/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
