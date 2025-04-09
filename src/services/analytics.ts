import { Analytics } from '@/types';
import { useAnalyticsStore } from '@/store';

class AnalyticsService {
  async fetchAnalytics() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/analytics/dashboard`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics data');
      }

      const data: Analytics = await response.json();
      const { updateAnalytics } = useAnalyticsStore.getState();
      updateAnalytics(data);
      return data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }

  async getUserStats(startDate: string, endDate: string) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/analytics/users?start=${startDate}&end=${endDate}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch user statistics');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user stats:', error);
      throw error;
    }
  }

  async getReaderPerformance(readerId: string, period: 'day' | 'week' | 'month' | 'year') {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/analytics/readers/${readerId}/performance?period=${period}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch reader performance data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching reader performance:', error);
      throw error;
    }
  }

  async getSessionAnalytics(filters: {
    startDate?: string;
    endDate?: string;
    readerId?: string;
    type?: 'video' | 'audio' | 'chat';
  }) {
    try {
      const queryParams = new URLSearchParams();
      if (filters.startDate) queryParams.append('start', filters.startDate);
      if (filters.endDate) queryParams.append('end', filters.endDate);
      if (filters.readerId) queryParams.append('reader', filters.readerId);
      if (filters.type) queryParams.append('type', filters.type);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/analytics/sessions?${queryParams.toString()}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch session analytics');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching session analytics:', error);
      throw error;
    }
  }

  async getRevenueAnalytics(period: 'day' | 'week' | 'month' | 'year') {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/analytics/revenue?period=${period}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch revenue analytics');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching revenue analytics:', error);
      throw error;
    }
  }

  async generateReport(options: {
    type: 'user' | 'reader' | 'session' | 'revenue';
    format: 'csv' | 'pdf';
    startDate: string;
    endDate: string;
    filters?: Record<string, any>;
  }) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/analytics/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${options.type}-${new Date().toISOString()}.${options.format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  }
}

export const analyticsService = new AnalyticsService(); 