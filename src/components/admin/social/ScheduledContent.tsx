
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Loader2, Plus, Edit, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSocialManagement } from '@/hooks/use-social-management';
import { format } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ScheduledContent: React.FC = () => {
  const { scheduledPosts } = useSocialManagement();

  if (scheduledPosts.isLoading) {
    return (
      <Card className="border-t-4 border-t-secondary shadow-md">
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
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
    <Card className="border-t-4 border-t-secondary shadow-md animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            <h3 className="text-lg font-medium">Scheduled Content</h3>
          </div>
          <Button className="gap-1"><Plus size={16} /> Create Post</Button>
        </div>
        
        <div className="divide-y rounded-md border bg-card">
          {scheduledPosts.data.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              No scheduled posts found. Create your first post!
            </div>
          ) : (
            scheduledPosts.data.map((post) => (
              <div key={post.id} className="p-4 hover:bg-accent/30 transition-colors">
                <div className="flex items-start">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <p className="text-sm font-medium">{post.title}</p>
                      <Badge className="mt-1 sm:mt-0 w-fit" variant={post.status === "scheduled" ? 'secondary' : 'outline'}>
                        {post.status}
                      </Badge>
                    </div>
                    <p className="text-sm mt-1 line-clamp-2 text-muted-foreground">{post.content}</p>
                    <div className="flex items-center mt-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>
                        Scheduled for: {format(new Date(post.scheduledFor), 'PPP')} at {format(new Date(post.scheduledFor), 'p')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-1"><Edit size={14} /> Edit</Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit this scheduled post</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-destructive gap-1"><X size={14} /> Cancel</Button>
                          </TooltipTrigger>
                          <TooltipContent>Cancel this scheduled post</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduledContent;
