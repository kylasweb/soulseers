
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  mockPosts, 
  mockComments, 
  mockReports, 
  mockScheduledPosts, 
  mockSocialStats,
  SocialPost,
  SocialComment,
  SocialReport,
  ScheduledPost,
  SocialStats
} from '@/lib/mock-social-data';
import { toast } from '@/components/ui/use-toast';

// API functions (mocked using our mock data)
const fetchPosts = async (): Promise<SocialPost[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockPosts];
};

const fetchComments = async (): Promise<SocialComment[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockComments];
};

const fetchReports = async (): Promise<SocialReport[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockReports];
};

const fetchScheduledPosts = async (): Promise<ScheduledPost[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockScheduledPosts];
};

const fetchSocialStats = async (): Promise<SocialStats> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { ...mockSocialStats };
};

const fetchPostById = async (id: string): Promise<SocialPost | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockPosts.find(post => post.id === id);
};

const fetchPostComments = async (postId: string): Promise<SocialComment[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockComments.filter(comment => comment.postId === postId);
};

// Mutation functions
const markPostAsFeatured = async (postId: string): Promise<SocialPost> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const post = mockPosts.find(p => p.id === postId);
  if (!post) throw new Error('Post not found');
  
  // In a real app, this would update the backend
  post.isFeatured = true;
  return post;
};

const removePost = async (postId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  // In a real app, this would call an API to remove the post
  console.log(`Post ${postId} would be removed`);
};

const submitAdminResponse = async ({ postId, response }: { postId: string, response: string }): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  // In a real app, this would call an API to submit the response
  console.log(`Admin response to post ${postId}: ${response}`);
};

export function useSocialManagement() {
  const queryClient = useQueryClient();

  // Queries
  const postsQuery = useQuery({
    queryKey: ['socialPosts'],
    queryFn: fetchPosts,
  });

  const commentsQuery = useQuery({
    queryKey: ['socialComments'],
    queryFn: fetchComments,
  });

  const reportsQuery = useQuery({
    queryKey: ['socialReports'],
    queryFn: fetchReports,
  });

  const scheduledPostsQuery = useQuery({
    queryKey: ['scheduledPosts'],
    queryFn: fetchScheduledPosts,
  });

  const socialStatsQuery = useQuery({
    queryKey: ['socialStats'],
    queryFn: fetchSocialStats,
  });

  // Function to fetch a specific post and its comments
  const getPostDetails = (postId: string) => {
    return {
      post: useQuery({
        queryKey: ['socialPosts', postId],
        queryFn: () => fetchPostById(postId),
        enabled: !!postId,
      }),
      comments: useQuery({
        queryKey: ['socialComments', postId],
        queryFn: () => fetchPostComments(postId),
        enabled: !!postId,
      }),
    };
  };

  // Mutations
  const markAsFeaturedMutation = useMutation({
    mutationFn: markPostAsFeatured,
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(['socialPosts', updatedPost.id], updatedPost);
      queryClient.invalidateQueries({ queryKey: ['socialPosts'] });
      toast({
        title: "Success",
        description: "Post has been marked as featured",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to mark post as featured",
        variant: "destructive",
      });
      console.error("Error marking post as featured:", error);
    },
  });

  const removePostMutation = useMutation({
    mutationFn: removePost,
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ['socialPosts'] });
      toast({
        title: "Success",
        description: "Post has been removed",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to remove post",
        variant: "destructive",
      });
      console.error("Error removing post:", error);
    },
  });

  const submitAdminResponseMutation = useMutation({
    mutationFn: submitAdminResponse,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['socialPosts', variables.postId] });
      toast({
        title: "Success",
        description: "Your response has been posted",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to post response",
        variant: "destructive",
      });
      console.error("Error posting admin response:", error);
    },
  });

  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ['socialPosts'] });
    queryClient.invalidateQueries({ queryKey: ['socialComments'] });
    queryClient.invalidateQueries({ queryKey: ['socialReports'] });
    queryClient.invalidateQueries({ queryKey: ['scheduledPosts'] });
    queryClient.invalidateQueries({ queryKey: ['socialStats'] });
  };

  return {
    // Queries
    posts: postsQuery,
    comments: commentsQuery,
    reports: reportsQuery,
    scheduledPosts: scheduledPostsQuery,
    socialStats: socialStatsQuery,
    getPostDetails,
    
    // Mutations
    markAsFeatured: markAsFeaturedMutation.mutate,
    removePost: removePostMutation.mutate,
    submitAdminResponse: submitAdminResponseMutation.mutate,
    
    // Utility functions
    refreshData,
    
    // Loading states
    isLoading: 
      postsQuery.isLoading || 
      commentsQuery.isLoading || 
      reportsQuery.isLoading || 
      scheduledPostsQuery.isLoading || 
      socialStatsQuery.isLoading,
      
    // Error states
    hasError: 
      postsQuery.isError || 
      commentsQuery.isError || 
      reportsQuery.isError || 
      scheduledPostsQuery.isError || 
      socialStatsQuery.isError
  };
}
