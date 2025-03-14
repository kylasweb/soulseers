
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSocialManagement } from '@/hooks/use-social-management';
import { format } from 'date-fns';

const ScheduledContent: React.FC = () => {
  const { scheduledPosts } = useSocialManagement();

  if (scheduledPosts.isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (scheduledPosts.isError || !scheduledPosts.data) {
    return (
      <div className="bg-destructive/10 p-4 rounded-md text-destructive mb-4">
        Error loading scheduled content. Please refresh the page.
      </div>
    );
  }

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
            {scheduledPosts.data.map((post) => (
              <div key={post.id} className="p-4 hover:bg-accent/50 transition-colors">
                <div className="flex items-start">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <p className="text-sm font-medium">{post.title}</p>
                      <Badge className="mt-1 sm:mt-0 w-fit" variant="secondary">
                        {post.status}
                      </Badge>
                    </div>
                    <p className="text-sm mt-1 line-clamp-2">{post.content}</p>
                    <div className="flex items-center mt-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>
                        Scheduled for: {format(new Date(post.scheduledFor), 'PPP')} at {format(new Date(post.scheduledFor), 'p')}
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
