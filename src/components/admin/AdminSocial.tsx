
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Share } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SocialStats from './social/SocialStats';
import PostList from './social/PostList';
import PostDetail from './social/PostDetail';
import CommentsList from './social/CommentsList';
import ReportsList from './social/ReportsList';
import ScheduledContent from './social/ScheduledContent';
import { useSocialManagement } from '@/hooks/use-social-management';

const AdminSocial = () => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const socialManagement = useSocialManagement();

  const handleSelectPost = (postId: string) => {
    setSelectedPost(postId);
  };

  const handleBackToPosts = () => {
    setSelectedPost(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Social Media Manager</h1>
          <p className="text-muted-foreground mt-2">
            Manage community posts, comments, and engagement
          </p>
        </div>
        <Share className="h-8 w-8 text-primary" />
      </div>
      
      <SocialStats />
      
      <Card>
        <CardHeader>
          <CardTitle>Community Management</CardTitle>
          <CardDescription>
            Monitor and moderate community activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="posts">
            <TabsList className="mb-4">
              <TabsTrigger value="posts">Recent Posts</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts">
              <div className="space-y-4">
                {selectedPost ? (
                  <PostDetail 
                    postId={selectedPost} 
                    onBack={handleBackToPosts}
                    onMarkFeatured={() => socialManagement.markAsFeatured(selectedPost)}
                    onRemovePost={() => {
                      socialManagement.removePost(selectedPost);
                      handleBackToPosts();
                    }}
                    onSubmitResponse={(response) => 
                      socialManagement.submitAdminResponse({ 
                        postId: selectedPost, 
                        response 
                      })
                    }
                  />
                ) : (
                  <PostList 
                    onSelectPost={handleSelectPost}
                    onRefresh={socialManagement.refreshData} 
                  />
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="comments">
              <CommentsList onRefresh={socialManagement.refreshData} />
            </TabsContent>
            
            <TabsContent value="reports">
              <ReportsList />
            </TabsContent>
            
            <TabsContent value="scheduled">
              <ScheduledContent />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSocial;
