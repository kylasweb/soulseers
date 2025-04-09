import { UserPreferences } from '@/types';
import { useUserPreferencesStore } from '@/store';

class PreferencesService {
  async getUserPreferences(userId: string): Promise<UserPreferences> {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/preferences`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user preferences');
      }

      const preferences = await response.json();
      return preferences;
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      throw error;
    }
  }

  async updateUserPreferences(userId: string, preferences: Partial<UserPreferences>) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/preferences`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        throw new Error('Failed to update user preferences');
      }

      const updatedPreferences = await response.json();
      
      // Update local store
      const store = useUserPreferencesStore.getState();
      if (preferences.theme) store.setTheme(preferences.theme);
      if (preferences.notifications) store.updateNotificationPreferences(preferences.notifications);
      
      return updatedPreferences;
    } catch (error) {
      console.error('Error updating user preferences:', error);
      throw error;
    }
  }

  async toggleFavoriteReader(userId: string, readerId: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/favorites/readers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ readerId }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle favorite reader');
      }

      const result = await response.json();
      
      // Update local store
      const { toggleFavoriteReader } = useUserPreferencesStore.getState();
      toggleFavoriteReader(readerId);
      
      return result;
    } catch (error) {
      console.error('Error toggling favorite reader:', error);
      throw error;
    }
  }

  async getFavoriteReaders(userId: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/favorites/readers`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch favorite readers');
      }

      const readers = await response.json();
      return readers;
    } catch (error) {
      console.error('Error fetching favorite readers:', error);
      throw error;
    }
  }

  async updateLanguage(userId: string, language: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/preferences/language`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language }),
      });

      if (!response.ok) {
        throw new Error('Failed to update language preference');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating language preference:', error);
      throw error;
    }
  }

  async updateTimezone(userId: string, timezone: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/preferences/timezone`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ timezone }),
      });

      if (!response.ok) {
        throw new Error('Failed to update timezone preference');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating timezone preference:', error);
      throw error;
    }
  }

  async getNotificationPreferences(userId: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/preferences/notifications`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch notification preferences');
      }

      const preferences = await response.json();
      return preferences;
    } catch (error) {
      console.error('Error fetching notification preferences:', error);
      throw error;
    }
  }

  async updateNotificationPreferences(
    userId: string,
    preferences: {
      email?: boolean;
      push?: boolean;
      sms?: boolean;
    }
  ) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/preferences/notifications`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        throw new Error('Failed to update notification preferences');
      }

      const result = await response.json();
      
      // Update local store
      const { updateNotificationPreferences } = useUserPreferencesStore.getState();
      updateNotificationPreferences(preferences);
      
      return result;
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      throw error;
    }
  }
}

export const preferencesService = new PreferencesService(); 