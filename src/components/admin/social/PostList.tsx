
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw } from 'lucide-react';

interface PostListProps {
  onSelectPost: (postId: string) => void;
}

const PostList: React.FC<PostListProps> = ({ onSelectPost }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input placeholder="Search posts..." className="max-w-sm" />
        <Button>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
      
      {['post1', 'post2', 'post3', 'post4', 'post5'].map((postId) => (
        <Card key={postId} className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => onSelectPost(postId)}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${postId}`} alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium">
                    {postId === 'post1' ? 'Sarah Lee' : 
                     postId === 'post2' ? 'James Wilson' : 
                     postId === 'post3' ? 'Maria Garcia' : 
                     postId === 'post4' ? 'David Chen' : 'Alex Smith'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {postId === 'post1' ? '2 days ago' : 
                     postId === 'post2' ? '3 days ago' : 
                     postId === 'post3' ? '4 days ago' : 
                     postId === 'post4' ? '5 days ago' : '1 week ago'}
                  </p>
                </div>
              </div>
              {postId === 'post3' && (
                <Badge variant="destructive" className="mr-2">Reported</Badge>
              )}
              {postId === 'post1' && (
                <Badge variant="secondary" className="mr-2">Popular</Badge>
              )}
            </div>
            <div className="mt-2">
              <p className="text-sm line-clamp-2">
                {postId === 'post1' ? 'I just had my first reading with a SoulSeer spiritualist, and it was incredible! I&apos;ve gained so much clarity about my path. Has anyone else tried...' : 
                 postId === 'post2' ? 'Looking for recommendations on which crystal set to purchase for a beginner. Any suggestions from the community?' : 
                 postId === 'post3' ? 'This service is a complete scam. They charged me and then canceled my appointment without any explanation.' : 
                 postId === 'post4' ? 'Just completed my third session and feeling so enlightened. The journey has been incredible so far.' : 
                 'Has anyone tried the new meditation course? Worth the investment?'}
              </p>
            </div>
            <div className="flex items-center mt-2 text-xs text-muted-foreground">
              <div className="flex items-center mr-4">
                <Heart className="h-3 w-3 mr-1" />
                <span>
                  {postId === 'post1' ? '24' : 
                   postId === 'post2' ? '8' : 
                   postId === 'post3' ? '2' : 
                   postId === 'post4' ? '15' : '6'}
                </span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-3 w-3 mr-1" />
                <span>
                  {postId === 'post1' ? '7' : 
                   postId === 'post2' ? '3' : 
                   postId === 'post3' ? '5' : 
                   postId === 'post4' ? '0' : '2'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <div className="flex justify-center mt-4">
        <Button variant="outline" size="sm">Load More</Button>
      </div>
    </div>
  );
};

export default PostList;
