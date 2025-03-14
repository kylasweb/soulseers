
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Flag } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface PostDetailProps {
  postId: string;
  onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ postId, onBack }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="pl-0 mb-2"
        >
          ← Back to all posts
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Flag className="h-4 w-4 mr-2" />
            Mark as Featured
          </Button>
          <Button variant="destructive" size="sm">
            Remove Post
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://i.pravatar.cc/150?u=sarah" alt="User" />
              <AvatarFallback>SL</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <div className="flex items-center">
                <p className="font-medium text-sm">Sarah Lee</p>
                <span className="text-xs text-muted-foreground ml-2">Posted 2 days ago</span>
              </div>
              <div className="text-sm">
                <p className="mb-4">I just had my first reading with a SoulSeer spiritualist, and it was incredible! I&apos;ve gained so much clarity about my path. Has anyone else tried this service?</p>
                <div className="rounded-md bg-muted p-2 mb-4">
                  <p className="text-xs font-medium">Metadata:</p>
                  <p className="text-xs text-muted-foreground">Service referenced: Spiritual Reading</p>
                  <p className="text-xs text-muted-foreground">Likes: 24 | Comments: 7</p>
                  <p className="text-xs text-muted-foreground">User joined: Jan 2023 | Posts: 15</p>
                </div>
                <div className="space-y-3">
                  <p className="font-medium text-sm">Comments:</p>
                  <div className="border-l-2 pl-4 py-2">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="https://i.pravatar.cc/150?u=mike" alt="User" />
                        <AvatarFallback>MJ</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium ml-2">Mike Johnson</span>
                      <span className="text-xs text-muted-foreground ml-2">1 day ago</span>
                    </div>
                    <p className="text-xs mt-1">Yes! My experience was similar. The insights were spot on!</p>
                  </div>
                  <div className="border-l-2 pl-4 py-2">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="https://i.pravatar.cc/150?u=emily" alt="User" />
                        <AvatarFallback>EN</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium ml-2">Emily Nguyen</span>
                      <span className="text-xs text-muted-foreground ml-2">1 day ago</span>
                    </div>
                    <p className="text-xs mt-1">Which reader did you choose? I&apos;m thinking of booking a session.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-2">
        <p className="text-sm font-medium">Admin Response:</p>
        <Textarea placeholder="Add a moderation note or official response..." rows={3} />
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">Add Note (Private)</Button>
          <Button size="sm">Post Response</Button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
