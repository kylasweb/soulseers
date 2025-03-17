
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Star, ShieldCheck, Clock, VideoIcon, MicIcon, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConsultationService from '@/components/services/ConsultationService';
import { Badge } from '@/components/ui/badge';

const Services = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive spiritual guidance and support for your journey
          </p>
        </div>

        {/* Pay-Per-Minute Featured Banner */}
        <div className="mb-16 bg-gradient-to-r from-soulseer-blue/20 to-soulseer-green/20 rounded-lg p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-10">
              <Badge variant="secondary" className="mb-3">New Feature</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Live Pay-Per-Minute Consultations</h2>
              <p className="text-lg mb-4 max-w-xl">
                Connect instantly with our spiritual advisors through video, audio, or chat. Pay only for the time you need.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-card text-foreground text-sm">
                  <VideoIcon className="h-4 w-4 mr-1.5 text-soulseer-blue" />
                  Video
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-card text-foreground text-sm">
                  <MicIcon className="h-4 w-4 mr-1.5 text-soulseer-blue" />
                  Audio
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-card text-foreground text-sm">
                  <MessageSquare className="h-4 w-4 mr-1.5 text-soulseer-blue" />
                  Chat
                </span>
              </div>
              <Button asChild size="lg">
                <a href="#consultations">View Available Experts</a>
              </Button>
            </div>
            <div className="flex items-center justify-center bg-card rounded-lg p-6 shadow-lg w-full md:w-auto">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Clock className="h-12 w-12 text-soulseer-gold" />
                </div>
                <p className="text-3xl font-bold mb-1">
                  <span className="text-soulseer-gold">$2.99</span>
                  <span className="text-sm font-normal">/minute</span>
                </p>
                <p className="text-muted-foreground text-sm">Starting rate</p>
                <div className="border-t border-border mt-4 pt-4 text-sm text-muted-foreground">
                  <p>No subscription required</p>
                  <p>Pay only for what you use</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="consultations" className="mb-12">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="consultations">Live Consultations</TabsTrigger>
              <TabsTrigger value="services">Core Services</TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
              <TabsTrigger value="specialty">Specialty Services</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="consultations" className="space-y-6" id="consultations">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Pay-Per-Minute Live Consultations</h2>
              <p className="text-muted-foreground mb-6">
                Connect with our experts in real-time through video, audio, or chat consultations. Pay only for the time you use.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {consultationServices.map((service) => (
                  <ConsultationService 
                    key={service.id}
                    title={service.title}
                    description={service.description}
                    rate={service.rate}
                    minDuration={service.minDuration}
                    isAvailable={service.isAvailable}
                    expertName={service.expertName}
                    expertImage={service.expertImage}
                  />
                ))}
              </div>
            </div>
            
            <div className="bg-primary/5 rounded-lg p-6 md:p-8">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <VideoIcon className="h-5 w-5 mr-2 text-primary" />
                  How Our Pay-Per-Minute Consultations Work
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-card p-4 rounded-lg">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold mb-3">1</div>
                    <h4 className="font-medium mb-2">Choose an Expert</h4>
                    <p className="text-sm text-muted-foreground">Select from our available experts based on their specialties and ratings.</p>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold mb-3">2</div>
                    <h4 className="font-medium mb-2">Select Communication Type</h4>
                    <p className="text-sm text-muted-foreground">Choose between video, audio, or chat based on your comfort and needs.</p>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold mb-3">3</div>
                    <h4 className="font-medium mb-2">Pay Only For What You Use</h4>
                    <p className="text-sm text-muted-foreground">You're billed per minute for the duration of your consultation.</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link to="/consultations/booking">Book a Consultation</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/consultations/experts">View All Experts</Link>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="packages" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {servicePackages.map((pkg) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="specialty" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialtyServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-muted rounded-lg p-6 md:p-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Custom Services</h2>
            <p className="mb-6 text-muted-foreground">
              Looking for something specific? Our experts can create personalized spiritual services tailored to your unique needs and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link to="/contact">Request Custom Service</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/consultations">Free Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const ServiceCard = ({ service }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="mb-3">
          {service.icon}
        </div>
        <CardTitle>{service.title}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="space-y-3 mb-4">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-soulseer-green cyber:text-primary mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
        <div className="pt-4">
          <div className="flex justify-between items-baseline mb-4">
            <span className="text-lg font-bold">${service.price}</span>
            <span className="text-sm text-muted-foreground">{service.unit}</span>
          </div>
          <Button className="w-full" asChild>
            <Link to={service.bookLink}>Book Now</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const PackageCard = ({ package: pkg }) => {
  return (
    <Card className={`h-full flex flex-col relative overflow-hidden ${pkg.popular ? 'border-primary dark:border-soulseer-blue cyber:border-accent border-2' : ''}`}>
      {pkg.popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-primary dark:bg-soulseer-blue cyber:bg-accent text-primary-foreground dark:text-foreground cyber:text-accent-foreground px-3 py-1 text-xs font-medium transform rotate-0 translate-x-2 -translate-y-0">
            Most Popular
          </div>
        </div>
      )}
      <CardHeader>
        <CardTitle>{pkg.title}</CardTitle>
        <CardDescription>{pkg.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div>
          <div className="mb-6">
            <span className="text-3xl font-bold">${pkg.price}</span>
            {pkg.discountedFrom && (
              <span className="text-lg line-through ml-2 text-muted-foreground">${pkg.discountedFrom}</span>
            )}
            <p className="text-sm text-muted-foreground mt-1">{pkg.billingPeriod}</p>
          </div>
          <div className="space-y-3 mb-6">
            {pkg.services.map((service, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-soulseer-green cyber:text-primary mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{service}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-4">
          <Button variant={pkg.popular ? "default" : "outline"} className="w-full" asChild>
            <Link to={pkg.linkUrl}>Choose {pkg.title}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const coreServices = [
  {
    id: 1,
    title: "Tarot Reading",
    description: "Discover insights through the ancient wisdom of tarot cards",
    icon: <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 cyber:bg-primary/20 flex items-center justify-center">
      <Star className="h-6 w-6 text-primary" />
    </div>,
    features: [
      "Comprehensive card interpretation",
      "Past, present, future insights",
      "Relationship and career guidance",
      "Follow-up questions included"
    ],
    price: 60,
    unit: "per session",
    bookLink: "/readings/tarot"
  },
  {
    id: 2,
    title: "Astrology Reading",
    description: "Explore your natal chart and cosmic influences",
    icon: <div className="w-12 h-12 rounded-full bg-secondary/10 dark:bg-secondary/20 cyber:bg-secondary/20 flex items-center justify-center">
      <Star className="h-6 w-6 text-secondary" />
    </div>,
    features: [
      "Comprehensive birth chart analysis",
      "Personality and life path insights",
      "Current planetary transits",
      "Future predictions and guidance"
    ],
    price: 75,
    unit: "per session",
    bookLink: "/readings/astrology"
  },
  {
    id: 3,
    title: "Psychic Consultation",
    description: "Connect with our gifted psychics for guidance",
    icon: <div className="w-12 h-12 rounded-full bg-accent/10 dark:bg-accent/20 cyber:bg-accent/20 flex items-center justify-center">
      <Star className="h-6 w-6 text-accent" />
    </div>,
    features: [
      "Intuitive spiritual guidance",
      "Clear answers to specific questions",
      "Connection with higher wisdom",
      "Actionable life advice"
    ],
    price: 65,
    unit: "per session",
    bookLink: "/readings/psychic"
  }
];

const specialtyServices = [
  {
    id: 4,
    title: "Past Life Regression",
    description: "Journey into your past lives to resolve present issues",
    icon: <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 cyber:bg-primary/20 flex items-center justify-center">
      <Clock className="h-6 w-6 text-primary" />
    </div>,
    features: [
      "Guided meditation experience",
      "Access to past life memories",
      "Resolve karmic patterns",
      "Healing emotional wounds"
    ],
    price: 120,
    unit: "90-minute session",
    bookLink: "/specialty/past-life"
  },
  {
    id: 5,
    title: "Energy Healing",
    description: "Restore balance to your energy centers and aura",
    icon: <div className="w-12 h-12 rounded-full bg-secondary/10 dark:bg-secondary/20 cyber:bg-secondary/20 flex items-center justify-center">
      <ShieldCheck className="h-6 w-6 text-secondary" />
    </div>,
    features: [
      "Chakra balancing and clearing",
      "Aura cleansing and protection",
      "Energy blockage removal",
      "Spiritual alignment"
    ],
    price: 85,
    unit: "per session",
    bookLink: "/specialty/energy-healing"
  },
  {
    id: 6,
    title: "Mediumship Session",
    description: "Connect with loved ones who have passed on",
    icon: <div className="w-12 h-12 rounded-full bg-accent/10 dark:bg-accent/20 cyber:bg-accent/20 flex items-center justify-center">
      <Star className="h-6 w-6 text-accent" />
    </div>,
    features: [
      "Spirit communication",
      "Evidence of continuation",
      "Messages from loved ones",
      "Closure and healing"
    ],
    price: 90,
    unit: "per session",
    bookLink: "/specialty/mediumship"
  }
];

const servicePackages = [
  {
    id: 7,
    title: "Essential",
    description: "Perfect for beginners starting their spiritual journey",
    price: 99,
    billingPeriod: "One-time package",
    services: [
      "1 Tarot Reading (30 min)",
      "1 Guided Meditation Session",
      "Access to Beginners Workshop",
      "1 Week Community Access"
    ],
    popular: false,
    linkUrl: "/packages/essential"
  },
  {
    id: 8,
    title: "Illumination",
    description: "Our most comprehensive spiritual guidance package",
    price: 249,
    discountedFrom: 299,
    billingPeriod: "One-time package",
    services: [
      "1 Comprehensive Natal Chart Reading",
      "2 Tarot Readings (45 min each)",
      "1 Past Life Regression Session",
      "1 Energy Healing Session",
      "1 Month Community Access",
      "Personal Spiritual Development Plan"
    ],
    popular: true,
    linkUrl: "/packages/illumination"
  },
  {
    id: 9,
    title: "Monthly Guidance",
    description: "Ongoing support for your spiritual journey",
    price: 89,
    billingPeriod: "Monthly subscription",
    services: [
      "Monthly Tarot Reading (30 min)",
      "Monthly Astrology Update",
      "Unlimited Community Access",
      "Weekly Group Meditations",
      "Discounts on Additional Services"
    ],
    popular: false,
    linkUrl: "/packages/monthly"
  }
];

const consultationServices = [
  {
    id: '1',
    title: 'Live Psychic Reading',
    description: 'One-on-one live video, audio, or chat consultation with our experienced psychic readers. Get immediate insights and guidance.',
    rate: 2.99,
    minDuration: 15,
    isAvailable: true,
    expertName: 'Alexandra Rivers',
    expertImage: '/placeholder.svg',
  },
  {
    id: '2',
    title: 'Tarot Card Analysis',
    description: 'Live tarot card reading sessions with real-time interpretation and guidance through video, audio, or chat consultation.',
    rate: 3.49,
    minDuration: 10,
    isAvailable: false,
    expertName: 'David Thompson',
    expertImage: '/placeholder.svg',
  },
  {
    id: '3',
    title: 'Astrology Consultation',
    description: 'Get personalized astrological insights from our experts through a pay-per-minute video, audio, or chat session.',
    rate: 2.99,
    minDuration: 20,
    isAvailable: true,
    expertName: 'Maria Garcia',
    expertImage: '/placeholder.svg',
  }
];

export default Services;
