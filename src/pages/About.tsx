
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const About = () => {
  return (
    <MainLayout>
      <section className="py-20 bg-gradient-to-b from-background to-accent/20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2">Our Story</Badge>
            <h1 className="text-4xl font-bold mb-4">About SoulSeer</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our mission, values, and the people behind our spiritual journey
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-soulseer-gold">Our Mission</h2>
                <p className="text-lg">
                  At SoulSeer, our commitment to ethical, compassionate, and judgment-free spiritual guidance is unwavering. 
                  Our mission is twofold: to deliver genuine, heart-centered readings to our clients and to maintain the 
                  highest ethical standards for our readers.
                </p>
                
                <p className="text-lg">
                  Founded by the visionary psychic medium Emilynn, SoulSeer was born out of a desire to counteract the corporate 
                  greed that often plagues the psychic industry. We stand apart from other platforms by ensuring that our readers 
                  retain the majority of their earnings and actively participate in shaping the future of our community.
                </p>
                
                <p className="text-lg">
                  SoulSeer is more than just an app—it's a soul tribe. We are a community of gifted psychics, united by our shared 
                  calling to guide, heal, and empower those who seek clarity on their spiritual journeys. Together, we create a space 
                  where authenticity, integrity, and compassion thrive.
                </p>
                
                <p className="text-lg font-medium">
                  Join us at SoulSeer, where every reading is a sacred connection, and every interaction is a step towards a brighter, 
                  more enlightened path.
                </p>
              </div>
              
              <div>
                <Card className="overflow-hidden shadow-lg">
                  <div className="relative pb-4">
                    <img 
                      src="/lovable-uploads/c0d608f2-0ba3-4bd6-8821-c660301f59f9.png"
                      alt="Emily - Founder of SoulSeer" 
                      className="w-full object-cover rounded-t-lg"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="text-xl font-bold">Emily</h3>
                    <p className="text-soulseer-gold mb-2">Founder, Developer, & Reader</p>
                    <Separator className="my-4" />
                    <p className="italic">
                      "My vision for SoulSeer has always been to create a sacred space where authentic spiritual guidance can flourish, 
                      free from the constraints of corporate influence that too often diminishes the true essence of psychic work."
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="mt-20">
              <h2 className="text-2xl font-semibold text-center mb-8">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Authenticity",
                    description: "We believe in genuine spiritual connections, honest readings, and transparency in all our practices."
                  },
                  {
                    title: "Ethical Practice",
                    description: "We maintain the highest ethical standards, ensuring respect, confidentiality, and integrity in every interaction."
                  },
                  {
                    title: "Community Support",
                    description: "We foster a nurturing environment where both readers and clients can grow, learn, and support each other."
                  }
                ].map((value, index) => (
                  <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p>{value.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
