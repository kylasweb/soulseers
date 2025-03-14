
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReaderItem from './ReaderItem';

const RecommendedReaders = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Readers</CardTitle>
        <CardDescription>Based on your interests</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ReaderItem 
          name="Willow Ravenwood"
          specialty="Intuitive Healer"
          image="https://images.unsplash.com/photo-1535295972055-1c762f4483e5?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          rating={4.7}
        />
        <ReaderItem 
          name="Jasper Moonstone"
          specialty="Energy Reader"
          image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          rating={4.9}
        />
        <div className="mt-4">
          <Button variant="outline" asChild size="sm">
            <Link to="/dashboard/readers" className="flex items-center">
              View All Readers <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedReaders;
