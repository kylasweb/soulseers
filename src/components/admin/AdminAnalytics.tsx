
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from 'lucide-react';

const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Platform usage and performance metrics
          </p>
        </div>
        <BarChart className="h-8 w-8 text-primary" />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Usage Metrics</CardTitle>
          <CardDescription>
            Platform engagement over time
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <div className="h-full w-full flex items-center justify-center bg-muted/30 rounded-md">
            <p className="text-muted-foreground">Analytics charts would appear here</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>
              Most visited pages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Page analytics would appear here</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>User Acquisition</CardTitle>
            <CardDescription>
              How users find your platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Acquisition data would appear here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
