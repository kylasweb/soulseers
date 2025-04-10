import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Reader, Transaction, Post, Notification, Analytics, FeatureModule } from '@/types';

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

interface FeatureManagementStore {
  modules: FeatureModule[];
  updateFeature: (moduleId: string, featureId: string, enabled: boolean) => void;
  updateModule: (moduleId: string, enabled: boolean) => void;
  getFeatureState: (moduleId: string, featureId: string) => boolean;
  getModuleState: (moduleId: string) => boolean;
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

export const useFeatureManagementStore = create<FeatureManagementStore>()(
  persist(
    (set, get) => ({
      modules: [
        {
          id: 'user-management',
          name: 'User Management',
          description: 'Control user-related features and capabilities',
          enabled: true,
          features: [
            {
              id: 'user-registration',
              name: 'User Registration',
              description: 'Allow new users to register',
              enabled: true,
              module: 'user-management'
            },
            {
              id: 'two-factor-auth',
              name: 'Two-Factor Authentication',
              description: 'Enable 2FA for users',
              enabled: true,
              module: 'user-management'
            }
          ]
        },
        {
          id: 'payment-system',
          name: 'Payment System',
          description: 'Control payment and transaction features',
          enabled: true,
          features: [
            {
              id: 'credit-payments',
              name: 'Credit Payments',
              description: 'Allow credit card payments',
              enabled: true,
              module: 'payment-system'
            },
            {
              id: 'refund-system',
              name: 'Refund System',
              description: 'Enable refund processing',
              enabled: true,
              module: 'payment-system'
            }
          ]
        },
        {
          id: 'reader-features',
          name: 'Reader Features',
          description: 'Control reader-specific features',
          enabled: true,
          features: [
            {
              id: 'reader-scheduling',
              name: 'Reader Scheduling',
              description: 'Enable scheduling system for readers',
              enabled: true,
              module: 'reader-features'
            },
            {
              id: 'reader-analytics',
              name: 'Reader Analytics',
              description: 'Enable analytics for readers',
              enabled: true,
              module: 'reader-features'
            }
          ]
        },
        {
          id: 'social-features',
          name: 'Social Features',
          description: 'Control social interaction features',
          enabled: true,
          features: [
            {
              id: 'posts',
              name: 'Posts',
              description: 'Enable post creation and interaction',
              enabled: true,
              module: 'social-features'
            },
            {
              id: 'comments',
              name: 'Comments',
              description: 'Enable commenting on posts',
              enabled: true,
              module: 'social-features'
            }
          ]
        }
      ],
      updateFeature: (moduleId, featureId, enabled) =>
        set((state) => ({
          modules: state.modules.map((module) =>
            module.id === moduleId
              ? {
                  ...module,
                  features: module.features.map((feature) =>
                    feature.id === featureId
                      ? { ...feature, enabled, lastUpdated: new Date() }
                      : feature
                  ),
                }
              : module
          ),
        })),
      updateModule: (moduleId, enabled) =>
        set((state) => ({
          modules: state.modules.map((module) =>
            module.id === moduleId
              ? {
                  ...module,
                  enabled,
                  features: module.features.map((feature) => ({
                    ...feature,
                    enabled: enabled ? feature.enabled : false,
                  })),
                }
              : module
          ),
        })),
      getFeatureState: (moduleId, featureId) => {
        const state = get();
        const module = state.modules.find((m) => m.id === moduleId);
        if (!module || !module.enabled) return false;
        const feature = module.features.find((f) => f.id === featureId);
        return feature ? feature.enabled : false;
      },
      getModuleState: (moduleId) => {
        const state = get();
        const module = state.modules.find((m) => m.id === moduleId);
        return module ? module.enabled : false;
      },
    }),
    { name: 'feature-management-store' }
  )
);
