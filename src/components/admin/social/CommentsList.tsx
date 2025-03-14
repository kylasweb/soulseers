
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CommentsList: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input placeholder="Search comments..." className="max-w-sm" />
        <div className="flex items-center gap-2">
          <select className="px-2 py-1 border rounded-md text-sm">
            <option>All Comments</option>
            <option>Flagged</option>
            <option>Recent</option>
          </select>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-4 hover:bg-accent/50 transition-colors">
                <div className="flex items-start">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=comment${i}`} alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{['Lisa Taylor', 'John Smith', 'Emma Wilson', 'Robert Chen', 'Amy Johnson'][i]}</p>
                        <p className="text-xs text-muted-foreground">{['1 hour ago', '3 hours ago', '5 hours ago', 'Yesterday', '2 days ago'][i]}</p>
                      </div>
                      {i === 2 && <Badge variant="destructive">Reported</Badge>}
                    </div>
                    <p className="text-sm mt-1">
                      {[
                        'This meditation technique changed my life! Highly recommend it to everyone.',
                        'Has anyone tried the advanced reading package? Is it worth the extra cost?',
                        'This is completely false advertising. The reader was not able to connect with my energy at all.',
                        'Thank you for sharing your experience. I&apos;ve been considering this service for a while.',
                        'The customer service team was very helpful when I had issues with my booking.'
                      ][i]}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="outline" size="sm">View Post</Button>
                      {i === 2 && <Button variant="destructive" size="sm">Remove</Button>}
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

export default CommentsList;
