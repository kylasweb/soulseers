import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Reader, Transaction, Post, Notification, Analytics } from '@/types';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  twoFactorEnabled: boolean;
  setUser: (user: User | null) => void;
  setTwoFactorEnabled: (enabled: boolean) => void;
  logout: () => void;
}

interface PaymentStore {
  transactions: Transaction[];
  pendingRefunds: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  requestRefund: (transactionId: string) => void;
  processRefund: (transactionId: string) => void;
}

interface SocialStore {
  posts: Post[];
  notifications: Notification[];
  addPost: (post: Post) => void;
  deletePost: (postId: string) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (notificationId: string) => void;
}

interface AnalyticsStore {
  data: Analytics;
  updateAnalytics: (data: Partial<Analytics>) => void;
}

interface UserPreferencesStore {
  theme: 'light' | 'dark' | 'system';
  favoriteReaders: string[];
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleFavoriteReader: (readerId: string) => void;
  updateNotificationPreferences: (preferences: { email?: boolean; push?: boolean; sms?: boolean }) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      twoFactorEnabled: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setTwoFactorEnabled: (enabled) => set({ twoFactorEnabled: enabled }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'auth-store' }
  )
);

export const usePaymentStore = create<PaymentStore>()(
  persist(
    (set) => ({
      transactions: [],
      pendingRefunds: [],
      addTransaction: (transaction) =>
        set((state) => ({ transactions: [...state.transactions, transaction] })),
      requestRefund: (transactionId) =>
        set((state) => ({
          pendingRefunds: [...state.pendingRefunds, state.transactions.find((t) => t.id === transactionId)!],
        })),
      processRefund: (transactionId) =>
        set((state) => ({
          pendingRefunds: state.pendingRefunds.filter((t) => t.id !== transactionId),
          transactions: state.transactions.map((t) =>
            t.id === transactionId ? { ...t, status: 'refunded' } : t
          ),
        })),
    }),
    { name: 'payment-store' }
  )
);

export const useSocialStore = create<SocialStore>()(
  persist(
    (set) => ({
      posts: [],
      notifications: [],
      addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
      deletePost: (postId) =>
        set((state) => ({ posts: state.posts.filter((p) => p.id !== postId) })),
      addNotification: (notification) =>
        set((state) => ({ notifications: [...state.notifications, notification] })),
      markNotificationAsRead: (notificationId) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === notificationId ? { ...n, read: true } : n
          ),
        })),
    }),
    { name: 'social-store' }
  )
);

export const useAnalyticsStore = create<AnalyticsStore>()(
  persist(
    (set) => ({
      data: {
        userStats: { total: 0, active: 0, new: 0 },
        readerStats: { total: 0, active: 0, topPerformers: [] },
        transactionStats: { total: 0, revenue: 0, refunds: 0 },
        sessionStats: { total: 0, completed: 0, cancelled: 0 },
      },
      updateAnalytics: (newData) =>
        set((state) => ({ data: { ...state.data, ...newData } })),
    }),
    { name: 'analytics-store' }
  )
);

export const useUserPreferencesStore = create<UserPreferencesStore>()(
  persist(
    (set) => ({
      theme: 'system',
      favoriteReaders: [],
      notifications: {
        email: true,
        push: true,
        sms: false,
      },
      setTheme: (theme) => set({ theme }),
      toggleFavoriteReader: (readerId) =>
        set((state) => ({
          favoriteReaders: state.favoriteReaders.includes(readerId)
            ? state.favoriteReaders.filter((id) => id !== readerId)
            : [...state.favoriteReaders, readerId],
        })),
      updateNotificationPreferences: (preferences) =>
        set((state) => ({
          notifications: { ...state.notifications, ...preferences },
        })),
    }),
    { name: 'user-preferences-store' }
  )
); 