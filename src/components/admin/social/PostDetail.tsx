
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Flag, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSocialManagement } from '@/hooks/use-social-management';
import { formatDistance } from 'date-fns';

interface PostDetailProps {
  postId: string;
  onBack: () => void;
  onMarkFeatured: () => void;
  onRemovePost: () => void;
  onSubmitResponse: (response: string) => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ 
  postId, 
  onBack,
  onMarkFeatured,
  onRemovePost, 
  onSubmitResponse
}) => {
  const [response, setResponse] = useState('');
  const { getPostDetails } = useSocialManagement();
  const { post, comments } = getPostDetails(postId);

  const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(e.target.value);
  };

  const handleSubmitResponse = () => {
    if (response.trim()) {
      onSubmitResponse(response);
      setResponse('');
    }
  };

  if (post.isLoading || comments.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading post details...</p>
      </div>
    );
  }

  if (post.isError || !post.data) {
    return (
      <div>
        <Button variant="ghost" onClick={onBack} className="pl-0 mb-4">
          ← Back to all posts
        </Button>
        <div className="bg-destructive/10 p-6 rounded-md text-destructive text-center">
          Error loading post details. This post may have been removed.
        </div>
      </div>
    );
  }

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
          <Button 
            variant="outline" 
            size="sm"
            onClick={onMarkFeatured}
            disabled={post.data.isFeatured}
          >
            <Flag className="h-4 w-4 mr-2" />
            {post.data.isFeatured ? 'Featured' : 'Mark as Featured'}
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={onRemovePost}
          >
            Remove Post
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.data.author.avatar} alt={post.data.author.name} />
              <AvatarFallback>{post.data.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <div className="flex items-center">
                <p className="font-medium text-sm">{post.data.author.name}</p>
                <span className="text-xs text-muted-foreground ml-2">
                  Posted {formatDistance(new Date(post.data.timestamp), new Date(), { addSuffix: true })}
                </span>
              </div>
              <div className="text-sm">
                <p className="mb-4">{post.data.content}</p>
                <div className="rounded-md bg-muted p-2 mb-4">
                  <p className="text-xs font-medium">Metadata:</p>
                  {post.data.metadata?.serviceReferenced && (
                    <p className="text-xs text-muted-foreground">
                      Service referenced: {post.data.metadata.serviceReferenced}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Likes: {post.data.likes} | Comments: {post.data.comments}
                  </p>
                </div>
                {comments.data && comments.data.length > 0 && (
                  <div className="space-y-3">
                    <p className="font-medium text-sm">Comments:</p>
                    {comments.data.map(comment => (
                      <div key={comment.id} className="border-l-2 pl-4 py-2">
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-medium ml-2">{comment.author.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            {formatDistance(new Date(comment.timestamp), new Date(), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-xs mt-1">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-2">
        <p className="text-sm font-medium">Admin Response:</p>
        <Textarea 
          placeholder="Add a moderation note or official response..." 
          rows={3} 
          value={response}
          onChange={handleResponseChange}
        />
        <div className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              console.log('Add private note:', response);
              setResponse('');
            }}
          >
            Add Note (Private)
          </Button>
          <Button 
            size="sm"
            onClick={handleSubmitResponse}
            disabled={!response.trim()}
          >
            Post Response
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
