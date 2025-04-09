export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'reader' | 'admin';
  createdAt: string;
  preferences?: UserPreferences;
  twoFactorEnabled: boolean;
  lastLogin?: string;
}

export interface Reader extends User {
  bio: string;
  specialties: string[];
  experience: string;
  rating: number;
  totalReviews: number;
  availability: {
    schedule: AvailabilitySlot[];
    timezone: string;
  };
  pricing: {
    perMinute: number;
    currency: string;
  };
  stats: {
    totalSessions: number;
    totalMinutes: number;
    totalEarnings: number;
  };
}

export interface Transaction {
  id: string;
  userId: string;
  readerId?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  type: 'payment' | 'refund';
  metadata: {
    sessionId?: string;
    productId?: string;
    description: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  media?: {
    type: 'image' | 'video';
    url: string;
  }[];
  likes: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  isModerated: boolean;
  moderationStatus?: 'pending' | 'approved' | 'rejected';
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'system' | 'social' | 'session' | 'payment';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  metadata?: Record<string, any>;
}

export interface Analytics {
  userStats: {
    total: number;
    active: number;
    new: number;
  };
  readerStats: {
    total: number;
    active: number;
    topPerformers: {
      readerId: string;
      name: string;
      sessions: number;
      earnings: number;
    }[];
  };
  transactionStats: {
    total: number;
    revenue: number;
    refunds: number;
  };
  sessionStats: {
    total: number;
    completed: number;
    cancelled: number;
  };
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  favoriteReaders: string[];
  language: string;
  timezone: string;
}

export interface AvailabilitySlot {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Review {
  id: string;
  userId: string;
  readerId: string;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  helpful: number;
  response?: {
    content: string;
    createdAt: string;
  };
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'image' | 'file';
  status: 'sent' | 'delivered' | 'read';
  createdAt: string;
}

export interface Session {
  id: string;
  userId: string;
  readerId: string;
  type: 'video' | 'audio' | 'chat';
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  startTime: string;
  endTime?: string;
  duration?: number;
  amount: number;
  rating?: number;
  review?: Review;
  notes?: string;
} 