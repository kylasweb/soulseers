
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ScheduledContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
          <h3 className="text-lg font-medium">Scheduled Content</h3>
        </div>
        <Button>Create New Post</Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4 hover:bg-accent/50 transition-colors">
                <div className="flex items-start">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <p className="text-sm font-medium">Community Announcement #{i+1}</p>
                      <Badge className="mt-1 sm:mt-0 w-fit" variant="secondary">
                        Scheduled
                      </Badge>
                    </div>
                    <p className="text-sm mt-1 line-clamp-2">
                      {[
                        'Join us for our monthly community meditation session this weekend! All experience levels welcome.',
                        'New spiritual reading packages available starting next week. Get 15% off when you book in the first 48 hours.',
                        'Maintenance notice: The platform will be down for updates from 2-4am EST on Saturday.'
                      ][i]}
                    </p>
                    <div className="flex items-center mt-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>
                        {[
                          'Scheduled for: Tomorrow at 9:00 AM',
                          'Scheduled for: Oct 18, 2023 at 12:00 PM',
                          'Scheduled for: Oct 25, 2023 at 8:00 AM'
                        ][i]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduledContent;
