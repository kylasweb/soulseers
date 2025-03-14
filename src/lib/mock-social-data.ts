
// Mock data for social media management
import { User } from './mock-data';

export interface SocialPost {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isReported: boolean;
  isFeatured: boolean;
  metadata?: {
    serviceReferenced?: string;
  };
}

export interface SocialComment {
  id: string;
  postId: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  isReported: boolean;
}

export interface SocialReport {
  id: string;
  contentId: string;
  contentType: 'post' | 'comment';
  reason: string;
  reportedBy: {
    id: string;
    name: string;
  };
  timestamp: string;
  status: 'new' | 'reviewing' | 'resolved';
  contentAuthor: {
    id: string;
    name: string;
  };
}

export interface ScheduledPost {
  id: string;
  title: string;
  content: string;
  scheduledFor: string;
  status: 'scheduled' | 'published' | 'cancelled';
}

export interface SocialStats {
  totalPosts: number;
  postsTrend: string;
  activeUsers: number;
  usersTrend: string;
  reports: number;
  reportsTrend: string;
}

// Mock posts data
export const mockPosts: SocialPost[] = [
  {
    id: 'post1',
    author: {
      id: 'user1',
      name: 'Sarah Lee',
      avatar: 'https://i.pravatar.cc/150?u=sarah'
    },
    content: 'I just had my first reading with a SoulSeer spiritualist, and it was incredible! I\'ve gained so much clarity about my path. Has anyone else tried this service?',
    timestamp: '2023-10-10T14:30:00Z',
    likes: 24,
    comments: 7,
    isReported: false,
    isFeatured: false,
    metadata: {
      serviceReferenced: 'Spiritual Reading'
    }
  },
  {
    id: 'post2',
    author: {
      id: 'user2',
      name: 'James Wilson',
      avatar: 'https://i.pravatar.cc/150?u=james'
    },
    content: 'Looking for recommendations on which crystal set to purchase for a beginner. Any suggestions from the community?',
    timestamp: '2023-10-09T10:15:00Z',
    likes: 8,
    comments: 3,
    isReported: false,
    isFeatured: false
  },
  {
    id: 'post3',
    author: {
      id: 'user3',
      name: 'Maria Garcia',
      avatar: 'https://i.pravatar.cc/150?u=maria'
    },
    content: 'This service is a complete scam. They charged me and then canceled my appointment without any explanation.',
    timestamp: '2023-10-08T16:45:00Z',
    likes: 2,
    comments: 5,
    isReported: true,
    isFeatured: false
  },
  {
    id: 'post4',
    author: {
      id: 'user4',
      name: 'David Chen',
      avatar: 'https://i.pravatar.cc/150?u=david'
    },
    content: 'Just completed my third session and feeling so enlightened. The journey has been incredible so far.',
    timestamp: '2023-10-07T09:20:00Z',
    likes: 15,
    comments: 0,
    isReported: false,
    isFeatured: false
  },
  {
    id: 'post5',
    author: {
      id: 'user5',
      name: 'Alex Smith',
      avatar: 'https://i.pravatar.cc/150?u=alex'
    },
    content: 'Has anyone tried the new meditation course? Worth the investment?',
    timestamp: '2023-10-06T12:30:00Z',
    likes: 6,
    comments: 2,
    isReported: false,
    isFeatured: false
  }
];

// Mock comments data
export const mockComments: SocialComment[] = [
  {
    id: 'comment1',
    postId: 'post1',
    author: {
      id: 'user6',
      name: 'Lisa Taylor',
      avatar: 'https://i.pravatar.cc/150?u=lisa'
    },
    content: 'This meditation technique changed my life! Highly recommend it to everyone.',
    timestamp: '2023-10-10T15:30:00Z',
    isReported: false
  },
  {
    id: 'comment2',
    postId: 'post2',
    author: {
      id: 'user7',
      name: 'John Smith',
      avatar: 'https://i.pravatar.cc/150?u=john'
    },
    content: 'Has anyone tried the advanced reading package? Is it worth the extra cost?',
    timestamp: '2023-10-10T13:45:00Z',
    isReported: false
  },
  {
    id: 'comment3',
    postId: 'post3',
    author: {
      id: 'user8',
      name: 'Emma Wilson',
      avatar: 'https://i.pravatar.cc/150?u=emma'
    },
    content: 'This is completely false advertising. The reader was not able to connect with my energy at all.',
    timestamp: '2023-10-10T11:15:00Z',
    isReported: true
  },
  {
    id: 'comment4',
    postId: 'post4',
    author: {
      id: 'user9',
      name: 'Robert Chen',
      avatar: 'https://i.pravatar.cc/150?u=robert'
    },
    content: 'Thank you for sharing your experience. I\'ve been considering this service for a while.',
    timestamp: '2023-10-09T16:20:00Z',
    isReported: false
  },
  {
    id: 'comment5',
    postId: 'post5',
    author: {
      id: 'user10',
      name: 'Amy Johnson',
      avatar: 'https://i.pravatar.cc/150?u=amy'
    },
    content: 'The customer service team was very helpful when I had issues with my booking.',
    timestamp: '2023-10-09T10:30:00Z',
    isReported: false
  }
];

// Mock reports data
export const mockReports: SocialReport[] = [
  {
    id: 'R-421',
    contentId: 'post3',
    contentType: 'post',
    reason: 'Misleading content',
    reportedBy: {
      id: 'user11',
      name: 'Michael Brown'
    },
    timestamp: '2023-10-10T14:00:00Z',
    status: 'new',
    contentAuthor: {
      id: 'user3',
      name: 'Emma Wilson'
    }
  },
  {
    id: 'R-420',
    contentId: 'comment3',
    contentType: 'comment',
    reason: 'Inappropriate behavior',
    reportedBy: {
      id: 'user12',
      name: 'Jessica Taylor'
    },
    timestamp: '2023-10-10T12:30:00Z',
    status: 'new',
    contentAuthor: {
      id: 'user8',
      name: 'Sarah Lee'
    }
  },
  {
    id: 'R-419',
    contentId: 'post2',
    contentType: 'post',
    reason: 'Spam',
    reportedBy: {
      id: 'user13',
      name: 'Thomas Garcia'
    },
    timestamp: '2023-10-09T15:45:00Z',
    status: 'new',
    contentAuthor: {
      id: 'user2',
      name: 'James Smith'
    }
  },
  {
    id: 'R-418',
    contentId: 'comment4',
    contentType: 'comment',
    reason: 'Harassment',
    reportedBy: {
      id: 'user14',
      name: 'Rebecca Jones'
    },
    timestamp: '2023-10-08T11:20:00Z',
    status: 'reviewing',
    contentAuthor: {
      id: 'user9',
      name: 'David Chen'
    }
  },
  {
    id: 'R-417',
    contentId: 'post5',
    contentType: 'post',
    reason: 'False information',
    reportedBy: {
      id: 'user15',
      name: 'Kevin Lee'
    },
    timestamp: '2023-10-07T09:15:00Z',
    status: 'reviewing',
    contentAuthor: {
      id: 'user5',
      name: 'Maria Garcia'
    }
  }
];

// Mock scheduled posts
export const mockScheduledPosts: ScheduledPost[] = [
  {
    id: 'scheduled1',
    title: 'Community Announcement #1',
    content: 'Join us for our monthly community meditation session this weekend! All experience levels welcome.',
    scheduledFor: '2023-10-12T09:00:00Z',
    status: 'scheduled'
  },
  {
    id: 'scheduled2',
    title: 'Community Announcement #2',
    content: 'New spiritual reading packages available starting next week. Get 15% off when you book in the first 48 hours.',
    scheduledFor: '2023-10-18T12:00:00Z',
    status: 'scheduled'
  },
  {
    id: 'scheduled3',
    title: 'Community Announcement #3',
    content: 'Maintenance notice: The platform will be down for updates from 2-4am EST on Saturday.',
    scheduledFor: '2023-10-25T08:00:00Z',
    status: 'scheduled'
  }
];

// Mock social stats
export const mockSocialStats: SocialStats = {
  totalPosts: 3487,
  postsTrend: '+210 this month',
  activeUsers: 984,
  usersTrend: '+15% from last month',
  reports: 12,
  reportsTrend: 'Requires attention'
};
