
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSocialManagement } from '@/hooks/use-social-management';
import { formatDistance } from 'date-fns';

interface CommentsListProps {
  onRefresh: () => void;
}

const CommentsList: React.FC<CommentsListProps> = ({ onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const { comments } = useSocialManagement();
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };
  
  const filteredComments = React.useMemo(() => {
    if (!comments.data) return [];
    
    let filtered = comments.data;
    
    // Apply filter
    if (filter === 'flagged') {
      filtered = filtered.filter(comment => comment.isReported);
    } else if (filter === 'recent') {
      filtered = [...filtered].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    }
    
    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(comment => 
        comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.author.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [comments.data, filter, searchTerm]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input 
          placeholder="Search comments..." 
          className="max-w-sm" 
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="flex items-center gap-2">
          <select 
            className="px-2 py-1 border rounded-md text-sm"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="all">All Comments</option>
            <option value="flagged">Flagged</option>
            <option value="recent">Recent</option>
          </select>
          <Button onClick={onRefresh} disabled={comments.isLoading}>
            {comments.isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh
          </Button>
        </div>
      </div>
      
      {comments.isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : comments.isError ? (
        <div className="bg-destructive/10 p-4 rounded-md text-destructive">
          Error loading comments. Please try refreshing.
        </div>
      ) : filteredComments.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {searchTerm || filter !== 'all' ? "No comments match your criteria." : "No comments available."}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredComments.map((comment, i) => (
                <div key={comment.id} className="p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-start">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.author.avatar} alt="User" />
                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{comment.author.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistance(new Date(comment.timestamp), new Date(), { addSuffix: true })}
                          </p>
                        </div>
                        {comment.isReported && <Badge variant="destructive">Reported</Badge>}
                      </div>
                      <p className="text-sm mt-1">{comment.content}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="outline" size="sm">View Post</Button>
                        {comment.isReported && <Button variant="destructive" size="sm">Remove</Button>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CommentsList;
