
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import HeroSection from '@/components/HeroSection';
import TestimonialSection from '@/components/TestimonialSection';
import FeaturedReaders from '@/components/FeaturedReaders';
import BecomeReaderSection from '@/components/BecomeReaderSection';

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedReaders />
      <TestimonialSection />
      <BecomeReaderSection />
    </MainLayout>
  );
};

export default Index;
