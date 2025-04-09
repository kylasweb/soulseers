import { Review } from '@/types';

class ReviewService {
  async createReview(review: Omit<Review, 'id' | 'createdAt' | 'updatedAt' | 'helpful'>) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) {
        throw new Error('Failed to create review');
      }

      const newReview = await response.json();
      return newReview;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  }

  async getReaderReviews(readerId: string, options: {
    page?: number;
    limit?: number;
    sort?: 'latest' | 'helpful' | 'rating';
  } = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (options.page) queryParams.append('page', options.page.toString());
      if (options.limit) queryParams.append('limit', options.limit.toString());
      if (options.sort) queryParams.append('sort', options.sort);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/readers/${readerId}/reviews?${queryParams.toString()}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch reader reviews');
      }

      const reviews = await response.json();
      return reviews;
    } catch (error) {
      console.error('Error fetching reader reviews:', error);
      throw error;
    }
  }

  async getUserReviews(userId: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/reviews`);

      if (!response.ok) {
        throw new Error('Failed to fetch user reviews');
      }

      const reviews = await response.json();
      return reviews;
    } catch (error) {
      console.error('Error fetching user reviews:', error);
      throw error;
    }
  }

  async updateReview(reviewId: string, update: {
    rating?: number;
    content?: string;
  }) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
      });

      if (!response.ok) {
        throw new Error('Failed to update review');
      }

      const updatedReview = await response.json();
      return updatedReview;
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  }

  async deleteReview(reviewId: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete review');
      }

      return true;
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  }

  async markReviewHelpful(reviewId: string, userId: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${reviewId}/helpful`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to mark review as helpful');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error marking review as helpful:', error);
      throw error;
    }
  }

  async respondToReview(reviewId: string, response: {
    content: string;
  }) {
    try {
      const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${reviewId}/response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(response),
      });

      if (!apiResponse.ok) {
        throw new Error('Failed to respond to review');
      }

      const result = await apiResponse.json();
      return result;
    } catch (error) {
      console.error('Error responding to review:', error);
      throw error;
    }
  }

  async getReviewStats(readerId: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/readers/${readerId}/review-stats`);

      if (!response.ok) {
        throw new Error('Failed to fetch review statistics');
      }

      const stats = await response.json();
      return stats;
    } catch (error) {
      console.error('Error fetching review statistics:', error);
      throw error;
    }
  }
}

export const reviewService = new ReviewService(); 