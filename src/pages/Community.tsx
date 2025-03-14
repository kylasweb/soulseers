
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { 
  Heart, MessageCircle, Share2, Users, Calendar, Clock, 
  Bookmark, BookOpen, ThumbsUp, SendHorizontal, UserPlus,
  Facebook, Twitter, Instagram, Youtube, Linkedin, Mail
} from 'lucide-react';

const Community = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">SoulSeer Community</h1>
          <p className="text-lg text-muted-foreground">
            Connect, share and grow with like-minded spiritual seekers
          </p>
        </div>

        {isLoggedIn ? (
          <LoggedInCommunity />
        ) : (
          <GuestCommunity setIsLoggedIn={setIsLoggedIn} />
        )}
      </div>
    </MainLayout>
  );
};

const GuestCommunity = ({ setIsLoggedIn }) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Join Our Community</CardTitle>
              <CardDescription>
                Connect with thousands of spiritual seekers sharing their journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-3 text-soulseer-blue cyber:text-primary" />
                    <div>
                      <h3 className="font-medium">Supportive Network</h3>
                      <p className="text-sm text-muted-foreground">Connect with like-minded individuals</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-3 text-soulseer-gold cyber:text-accent" />
                    <div>
                      <h3 className="font-medium">Discussion Forums</h3>
                      <p className="text-sm text-muted-foreground">Engage in meaningful conversations</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-soulseer-green cyber:text-secondary" />
                    <div>
                      <h3 className="font-medium">Virtual Events</h3>
                      <p className="text-sm text-muted-foreground">Attend workshops and meditations</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-3 text-soulseer-blue cyber:text-primary" />
                    <div>
                      <h3 className="font-medium">Resource Library</h3>
                      <p className="text-sm text-muted-foreground">Access exclusive spiritual content</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 mr-3 text-soulseer-gold cyber:text-accent" />
                    <div>
                      <h3 className="font-medium">Support Circles</h3>
                      <p className="text-sm text-muted-foreground">Find guidance during challenging times</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-3 text-soulseer-green cyber:text-secondary" />
                    <div>
                      <h3 className="font-medium">Expert Mentorship</h3>
                      <p className="text-sm text-muted-foreground">Learn from spiritual teachers</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button asChild>
                  <Link to="/signup">Join Community</Link>
                </Button>
                <Button variant="outline" onClick={() => setIsLoggedIn(true)}>
                  Log In (Demo)
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Featured Discussions</h2>
            <div className="space-y-4">
              {featuredDiscussions.map((discussion) => (
                <Card key={discussion.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage src={discussion.authorImage} alt={discussion.author} />
                        <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center mb-1">
                          <Badge variant="outline" className="mr-2 text-xs">
                            {discussion.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {discussion.timeAgo}
                          </span>
                        </div>
                        <h3 className="font-medium truncate">{discussion.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {discussion.preview}
                        </p>
                        <div className="flex items-center mt-3 text-muted-foreground text-xs">
                          <div className="flex items-center mr-4">
                            <MessageCircle className="h-3.5 w-3.5 mr-1" />
                            {discussion.comments}
                          </div>
                          <div className="flex items-center mr-4">
                            <Heart className="h-3.5 w-3.5 mr-1" />
                            {discussion.likes}
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            {discussion.views}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="text-center mt-6">
                <Button variant="outline" onClick={() => setIsLoggedIn(true)}>
                  View More Discussions
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Community Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Members</span>
                  <span className="font-medium">12,458</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discussions</span>
                  <span className="font-medium">3,721</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Today</span>
                  <span className="font-medium">248</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Events This Month</span>
                  <span className="font-medium">37</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Connect With Us</CardTitle>
              <CardDescription>Follow us on social media</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <SocialButton icon={<Facebook className="h-5 w-5" />} href="https://facebook.com" color="bg-blue-500 hover:bg-blue-600" />
                <SocialButton icon={<Twitter className="h-5 w-5" />} href="https://twitter.com" color="bg-sky-500 hover:bg-sky-600" />
                <SocialButton icon={<Instagram className="h-5 w-5" />} href="https://instagram.com" color="bg-pink-500 hover:bg-pink-600" />
                <SocialButton icon={<Youtube className="h-5 w-5" />} href="https://youtube.com" color="bg-red-500 hover:bg-red-600" />
                <SocialButton icon={<Linkedin className="h-5 w-5" />} href="https://linkedin.com" color="bg-blue-700 hover:bg-blue-800" />
                <SocialButton icon={<Mail className="h-5 w-5" />} href="mailto:contact@soulseer.com" color="bg-gray-500 hover:bg-gray-600" />
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">Subscribe to our newsletter</h3>
                <div className="flex gap-2">
                  <Input placeholder="Your email" />
                  <Button size="sm" className="whitespace-nowrap">
                    Subscribe
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="bg-muted rounded-lg p-6 md:p-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Upcoming Community Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {communityEvents.slice(0, 3).map((event) => (
              <Card key={event.id} className="h-full">
                <CardContent className="p-4">
                  <div className="mb-3">
                    <Badge variant="outline" className="mb-2">
                      {event.type}
                    </Badge>
                    <h3 className="font-medium">{event.title}</h3>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setIsLoggedIn(true)}>
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" onClick={() => setIsLoggedIn(true)}>
              View All Events
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const LoggedInCommunity = () => {
  return (
    <>
      <Tabs defaultValue="feed" className="mb-12">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="feed">Community Feed</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TabsContent value="feed" className="mt-0">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="User" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Textarea placeholder="Share your spiritual insights with the community..." className="min-h-[80px]" />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Event
                      </Button>
                      <Button variant="outline" size="sm">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Article
                      </Button>
                    </div>
                    <Button size="sm">
                      Post
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                {communityPosts.map((post) => (
                  <CommunityPost key={post.id} post={post} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="groups" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {communityGroups.map((group) => (
                  <Card key={group.id} className="overflow-hidden">
                    <div className="h-32 bg-muted">
                      <img 
                        src={group.coverImage} 
                        alt={group.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">{group.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {group.members} members
                          </p>
                        </div>
                        <Badge variant="outline">
                          {group.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {group.description}
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Join Group
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="events" className="mt-0">
              <div className="space-y-4">
                {communityEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/4 flex flex-col justify-center bg-muted p-4 rounded-md">
                          <div className="text-center">
                            <div className="text-2xl font-bold">{event.dateFormatted.day}</div>
                            <div className="text-sm text-muted-foreground">
                              {event.dateFormatted.month}
                            </div>
                            <div className="mt-2 text-xs font-medium">
                              {event.time}
                            </div>
                          </div>
                        </div>
                        <div className="md:w-3/4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <Badge variant="outline" className="mb-2">
                                {event.type}
                              </Badge>
                              <h3 className="font-medium text-lg">{event.title}</h3>
                            </div>
                            {event.isOnline && (
                              <Badge className="bg-green-500 hover:bg-green-600">Online</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">
                            {event.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Users className="h-4 w-4 mr-2" />
                              <span>{event.attendees} attending</span>
                            </div>
                            <Button size="sm">
                              Join Event
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {communityResources.map((resource) => (
                  <Card key={resource.id} className="overflow-hidden">
                    <div className="h-40 bg-muted">
                      <img 
                        src={resource.image} 
                        alt={resource.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <Badge variant="outline">
                          {resource.type}
                        </Badge>
                        <div className="flex items-center text-muted-foreground text-xs">
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          {resource.views}
                        </div>
                      </div>
                      <h3 className="font-medium mb-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {resource.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage src={resource.authorImage} alt={resource.author} />
                            <AvatarFallback>{resource.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-muted-foreground">{resource.author}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <Bookmark className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <Avatar className="h-16 w-16 mr-4">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="User" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Christina Nguyen</h3>
                    <p className="text-sm text-muted-foreground">Member since June 2022</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-muted p-3 rounded text-center">
                    <p className="text-lg font-bold">28</p>
                    <p className="text-xs text-muted-foreground">Posts</p>
                  </div>
                  <div className="bg-muted p-3 rounded text-center">
                    <p className="text-lg font-bold">142</p>
                    <p className="text-xs text-muted-foreground">Connections</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Full Profile
                </Button>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Your Groups</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userGroups.map((group) => (
                  <div key={group.id} className="flex items-center">
                    <div className="w-10 h-10 rounded-md overflow-hidden mr-3">
                      <img 
                        src={group.image} 
                        alt={group.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{group.name}</h4>
                      <p className="text-xs text-muted-foreground">{group.unread} new posts</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  View All Groups
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {communityEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className="flex items-start">
                    <div className="bg-muted p-2 rounded text-center mr-3 w-12">
                      <p className="text-lg font-bold leading-none">{event.dateFormatted.day}</p>
                      <p className="text-xs text-muted-foreground">{event.dateFormatted.month}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">{event.time}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  View All Events
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
      
      <div className="bg-muted rounded-lg p-6 md:p-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Connect with SoulSeer</h2>
          <p className="mb-6 text-muted-foreground">
            Follow us on social media for daily inspiration, spiritual guidance, and community updates
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            <SocialButton icon={<Facebook className="h-5 w-5" />} href="https://facebook.com" color="bg-blue-500 hover:bg-blue-600" />
            <SocialButton icon={<Twitter className="h-5 w-5" />} href="https://twitter.com" color="bg-sky-500 hover:bg-sky-600" />
            <SocialButton icon={<Instagram className="h-5 w-5" />} href="https://instagram.com" color="bg-pink-500 hover:bg-pink-600" />
            <SocialButton icon={<Youtube className="h-5 w-5" />} href="https://youtube.com" color="bg-red-500 hover:bg-red-600" />
            <SocialButton icon={<Linkedin className="h-5 w-5" />} href="https://linkedin.com" color="bg-blue-700 hover:bg-blue-800" />
            <SocialButton icon={<Mail className="h-5 w-5" />} href="mailto:contact@soulseer.com" color="bg-gray-500 hover:bg-gray-600" />
          </div>
        </div>
      </div>
    </>
  );
};

const CommunityPost = ({ post }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start mb-4">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={post.authorImage} alt={post.author} />
            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{post.author}</h3>
            <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="mb-4">{post.content}</p>
          {post.image && (
            <div className="rounded-md overflow-hidden mb-4">
              <img src={post.image} alt="Post" className="w-full" />
            </div>
          )}
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <div className="flex items-center mr-4">
            <ThumbsUp className="h-4 w-4 mr-1" />
            {post.likes}
          </div>
          <div>
            {post.comments} comments
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex justify-between mb-4">
          <Button variant="ghost" size="sm">
            <Heart className="h-4 w-4 mr-2" />
            Like
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-4 w-4 mr-2" />
            Comment
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
        
        {post.showComments && (
          <div className="mt-4 space-y-4">
            {post.commentList?.map((comment, index) => (
              <div key={index} className="flex items-start">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={comment.authorImage} alt={comment.author} />
                  <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted p-3 rounded-md">
                    <h4 className="text-sm font-medium">{comment.author}</h4>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <button className="mr-3">Like</button>
                    <button className="mr-3">Reply</button>
                    <span>{comment.timeAgo}</span>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex items-center mt-4">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="User" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex-1 relative">
                <Input placeholder="Write a comment..." className="pr-10" />
                <Button size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
                  <SendHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const SocialButton = ({ icon, href, color }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${color} text-white rounded-md p-3 flex items-center justify-center transition-colors`}
    >
      {icon}
    </a>
  );
};

// Mock data
const featuredDiscussions = [
  {
    id: 1,
    title: "Finding Balance in Chaotic Times",
    preview: "I've been struggling with maintaining my spiritual practice during these uncertain times. Any advice on finding balance?",
    author: "Sarah K.",
    authorImage: "https://images.unsplash.com/photo-1510227272981-87123e259b17?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Self-Growth",
    timeAgo: "2 hours ago",
    comments: 24,
    likes: 47,
    views: 183
  },
  {
    id: 2,
    title: "Dreams about water - spiritual meaning?",
    preview: "I've been having recurring dreams about being in water. Sometimes I'm swimming, other times I'm just floating. I'm curious about what this might symbolize...",
    author: "Michael T.",
    authorImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Dream Interpretation",
    timeAgo: "1 day ago",
    comments: 32,
    likes: 29,
    views: 216
  }
];

const communityEvents = [
  {
    id: 1,
    title: "Full Moon Meditation Circle",
    type: "Meditation",
    date: "Apr 22, 2023",
    dateFormatted: { day: "22", month: "Apr" },
    time: "8:00 PM ET",
    description: "Join us for a powerful full moon meditation to harness lunar energy for manifestation and release.",
    attendees: 32,
    isOnline: true
  },
  {
    id: 2,
    title: "Introduction to Energy Healing",
    type: "Workshop",
    date: "Apr 24, 2023",
    dateFormatted: { day: "24", month: "Apr" },
    time: "2:00 PM ET",
    description: "Learn the basics of energy healing and how to use it for yourself and others in this introductory workshop.",
    attendees: 18,
    isOnline: true
  },
  {
    id: 3,
    title: "Crystals for Beginners",
    type: "Class",
    date: "Apr 28, 2023",
    dateFormatted: { day: "28", month: "Apr" },
    time: "6:30 PM ET",
    description: "Discover how to select, cleanse, and use crystals for various spiritual and healing purposes.",
    attendees: 27,
    isOnline: false
  },
  {
    id: 4,
    title: "Astrology & Your Life Path",
    type: "Workshop",
    date: "May 2, 2023",
    dateFormatted: { day: "2", month: "May" },
    time: "7:00 PM ET",
    description: "Explore how your birth chart influences your life path and purpose with our expert astrologer.",
    attendees: 23,
    isOnline: true
  }
];

const communityPosts = [
  {
    id: 1,
    author: "Maya Rivers",
    authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    timeAgo: "2 hours ago",
    content: "Just finished a powerful meditation session using the new techniques I learned in last week's workshop. The difference in my energy is remarkable! Has anyone else tried combining breath work with crystal meditation?",
    image: "https://images.unsplash.com/photo-1518934313919-b9c5975d6d56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    likes: 24,
    comments: 7,
    showComments: true,
    commentList: [
      {
        author: "Jordan Chen",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        content: "I've been doing this for a few weeks now! Try adding selenite to your practice - it really enhances the energy flow.",
        timeAgo: "45m ago"
      },
      {
        author: "Leila Moon",
        authorImage: "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        content: "Could you share more details about the technique? I'd love to try it myself!",
        timeAgo: "20m ago"
      }
    ]
  },
  {
    id: 2,
    author: "Orion Starsight",
    authorImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    timeAgo: "5 hours ago",
    content: "I'm excited to announce that my new course on astrology fundamentals is now open for enrollment! Learn how to read birth charts and understand planetary influences at your own pace. Use code COMMUNITY for 20% off this week.",
    likes: 47,
    comments: 12,
    showComments: false
  }
];

const communityGroups = [
  {
    id: 1,
    name: "Meditation Masters",
    description: "A supportive community for sharing meditation experiences and techniques for deeper spiritual connection.",
    members: 843,
    type: "Public",
    coverImage: "https://images.unsplash.com/photo-1486783046960-64d2ef3219f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    name: "Tarot & Oracle Readers",
    description: "Discuss card meanings, spreads, and intuitive reading techniques with fellow tarot enthusiasts.",
    members: 1254,
    type: "Public",
    coverImage: "https://images.unsplash.com/photo-1601158935942-52255782d322?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    name: "Energy Healing Circle",
    description: "Share experiences and techniques for channeling energy for healing yourself and others.",
    members: 578,
    type: "Private",
    coverImage: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 4,
    name: "Astrology Enthusiasts",
    description: "Discuss planetary movements, birth chart interpretations, and astrological events.",
    members: 921,
    type: "Public",
    coverImage: "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

const communityResources = [
  {
    id: 1,
    title: "Beginner's Guide to Chakra Balancing",
    description: "Learn how to identify, cleanse, and balance your seven major chakras with this comprehensive guide.",
    type: "Guide",
    author: "Violet Sky",
    authorImage: "https://images.unsplash.com/photo-1563620915-8478189e6e62?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    views: "1.2K",
    image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    title: "Understanding Your Birth Chart",
    description: "A step-by-step tutorial on how to read and interpret the different elements of your astrological birth chart.",
    type: "Tutorial",
    author: "Orion Starsight",
    authorImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    views: "876",
    image: "https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    title: "Moon Rituals for Manifestation",
    description: "Discover powerful rituals for each phase of the moon to enhance your manifestation practice.",
    type: "Article",
    author: "Luna Moonshadow",
    authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    views: "1.5K",
    image: "https://images.unsplash.com/photo-1532767153582-b1a0e5145009?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 4,
    title: "Crystal Healing Properties Database",
    description: "An extensive database of crystals and their healing properties, with guidance on how to use them effectively.",
    type: "Resource",
    author: "Amber Crystal",
    authorImage: "https://images.unsplash.com/photo-1557555187-23d685287bc3?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    views: "2.3K",
    image: "https://images.unsplash.com/photo-1517976547737-f7757a3a2735?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

const userGroups = [
  {
    id: 1,
    name: "Meditation Masters",
    image: "https://images.unsplash.com/photo-1486783046960-64d2ef3219f1?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    unread: 3
  },
  {
    id: 2,
    name: "Energy Healing Circle",
    image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    unread: 12
  },
  {
    id: 3,
    name: "Astrology Enthusiasts",
    image: "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    unread: 0
  }
];

// Add missing Eye component
const Eye = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
};

export default Community;
