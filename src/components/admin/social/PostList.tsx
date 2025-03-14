
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageSquare, RefreshCw, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSocialManagement } from '@/hooks/use-social-management';
import { formatDistance } from 'date-fns';

interface PostListProps {
  onSelectPost: (postId: string) => void;
  onRefresh: () => void;
}

const PostList: React.FC<PostListProps> = ({ onSelectPost, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { posts } = useSocialManagement();
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredPosts = React.useMemo(() => {
    if (!posts.data) return [];
    return posts.data.filter(post => 
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts.data, searchTerm]);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input 
          placeholder="Search posts..." 
          className="max-w-sm" 
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button onClick={onRefresh} disabled={posts.isLoading}>
          {posts.isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Refresh
        </Button>
      </div>
      
      {posts.isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : posts.isError ? (
        <div className="bg-destructive/10 p-4 rounded-md text-destructive">
          Error loading posts. Please try refreshing.
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {searchTerm ? "No posts found matching your search." : "No posts available."}
        </div>
      ) : (
        filteredPosts.map((post) => (
          <Card key={post.id} className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => onSelectPost(post.id)}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{post.author.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistance(new Date(post.timestamp), new Date(), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                {post.isReported && (
                  <Badge variant="destructive" className="mr-2">Reported</Badge>
                )}
                {post.isFeatured && (
                  <Badge variant="secondary" className="mr-2">Featured</Badge>
                )}
              </div>
              <div className="mt-2">
                <p className="text-sm line-clamp-2">{post.content}</p>
              </div>
              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                <div className="flex items-center mr-4">
                  <Heart className="h-3 w-3 mr-1" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
      
      {filteredPosts.length > 0 && (
        <div className="flex justify-center mt-4">
          <Button variant="outline" size="sm">Load More</Button>
        </div>
      )}
    </div>
  );
};

export default PostList;
