
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Share, MessageSquare, UserPlus, Heart, Flag, RefreshCw, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

const AdminSocial = () => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,487</div>
            <p className="text-xs text-muted-foreground mt-1">+210 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">984</div>
            <p className="text-xs text-muted-foreground mt-1">+15% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1 text-amber-500">Requires attention</p>
          </CardContent>
        </Card>
      </div>
      
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
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Button 
                        variant="ghost" 
                        onClick={() => setSelectedPost(null)}
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
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Input placeholder="Search posts..." className="max-w-sm" />
                      <Button>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                      </Button>
                    </div>
                    
                    {['post1', 'post2', 'post3', 'post4', 'post5'].map((postId) => (
                      <Card key={postId} className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => setSelectedPost(postId)}>
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
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="comments">
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
            </TabsContent>
            
            <TabsContent value="reports">
              <div className="space-y-4">
                <div className="rounded-md bg-amber-50 border border-amber-200 p-4 mb-4">
                  <div className="flex items-center">
                    <Flag className="h-5 w-5 text-amber-600 mr-2" />
                    <p className="text-amber-800 text-sm">There are 12 reports that require your attention.</p>
                  </div>
                </div>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="p-4 hover:bg-accent/50 transition-colors">
                          <div className="flex items-start">
                            <div className="p-2 rounded-full bg-red-100">
                              <Flag className="h-4 w-4 text-red-500" />
                            </div>
                            <div className="ml-3 flex-1">
                              <div className="flex flex-col sm:flex-row sm:justify-between">
                                <div>
                                  <p className="text-sm font-medium">Report #{['R-421', 'R-420', 'R-419', 'R-418', 'R-417'][i]}</p>
                                  <p className="text-xs text-muted-foreground">{['1 hour ago', '3 hours ago', '1 day ago', '2 days ago', '3 days ago'][i]}</p>
                                </div>
                                <Badge className="mt-1 sm:mt-0 w-fit" variant={i < 3 ? 'destructive' : 'outline'}>
                                  {i < 3 ? 'New' : 'Reviewing'}
                                </Badge>
                              </div>
                              <div className="mt-2">
                                <p className="text-sm font-medium">Reason: {[
                                  'Misleading content',
                                  'Inappropriate behavior',
                                  'Spam',
                                  'Harassment',
                                  'False information'
                                ][i]}</p>
                                <p className="text-sm mt-1">Reported by: {[
                                  'Michael Brown',
                                  'Jessica Taylor',
                                  'Thomas Garcia',
                                  'Rebecca Jones',
                                  'Kevin Lee'
                                ][i]}</p>
                                <p className="text-sm mt-1">Content by: {[
                                  'Emma Wilson',
                                  'Sarah Lee',
                                  'James Smith',
                                  'David Chen',
                                  'Maria Garcia'
                                ][i]}</p>
                              </div>
                              <div className="flex items-center gap-2 mt-3">
                                <Button variant="outline" size="sm">View Content</Button>
                                <Button variant="destructive" size="sm">Take Action</Button>
                                <Button variant="ghost" size="sm">Dismiss</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="scheduled">
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
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="p-4 hover:bg-accent/50 transition-colors">
                          <div className="flex items-start">
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:justify-between">
                                <p className="text-sm font-medium">Community Announcement #{i+1}</p>
                                <Badge className="mt-1 sm:mt-0 w-fit" variant="secondary">
                                  Scheduled
                                </Badge>
                              </div>
                              <p className="text-sm mt-1 line-clamp-2">
                                {[
                                  'Join us for our monthly community meditation session this weekend! All experience levels welcome.',
                                  'New spiritual reading packages available starting next week. Get 15% off when you book in the first 48 hours.',
                                  'Maintenance notice: The platform will be down for updates from 2-4am EST on Saturday.'
                                ][i]}
                              </p>
                              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>
                                  {[
                                    'Scheduled for: Tomorrow at 9:00 AM',
                                    'Scheduled for: Oct 18, 2023 at 12:00 PM',
                                    'Scheduled for: Oct 25, 2023 at 8:00 AM'
                                  ][i]}
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSocial;

