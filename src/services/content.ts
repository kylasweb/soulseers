import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { Post } from '@/types';
import { useSocialStore } from '@/store';

// Initialize Firebase
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

class ContentService {
  async uploadMedia(file: File, path: string) {
    try {
      const storageRef = ref(storage, `${path}/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error('Error uploading media:', error);
      throw error;
    }
  }

  async getMediaLibrary(path: string) {
    try {
      const storageRef = ref(storage, path);
      const result = await listAll(storageRef);
      const urls = await Promise.all(
        result.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return {
            name: item.name,
            url,
            path: item.fullPath,
          };
        })
      );
      return urls;
    } catch (error) {
      console.error('Error fetching media library:', error);
      throw error;
    }
  }

  async deleteMedia(path: string) {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Error deleting media:', error);
      throw error;
    }
  }

  async moderateContent(content: string): Promise<{
    isApproved: boolean;
    score: number;
    flags: string[];
  }> {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/content/moderate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error('Failed to moderate content');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error moderating content:', error);
      throw error;
    }
  }

  async moderateImage(imageUrl: string): Promise<{
    isApproved: boolean;
    score: number;
    flags: string[];
  }> {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/content/moderate-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to moderate image');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error moderating image:', error);
      throw error;
    }
  }

  async createPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'isModerated' | 'moderationStatus'>) {
    try {
      // First moderate the content
      const contentModeration = await this.moderateContent(post.content);
      
      // If there are images, moderate them too
      const imageModeration = await Promise.all(
        (post.media || [])
          .filter((m) => m.type === 'image')
          .map((m) => this.moderateImage(m.url))
      );

      // Check if content passes moderation
      const isApproved =
        contentModeration.isApproved &&
        imageModeration.every((result) => result.isApproved);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...post,
          isModerated: true,
          moderationStatus: isApproved ? 'approved' : 'rejected',
          moderationDetails: {
            content: contentModeration,
            images: imageModeration,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const newPost = await response.json();
      
      if (isApproved) {
        const { addPost } = useSocialStore.getState();
        addPost(newPost);
      }

      return newPost;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  async getContentVersions(contentId: string, type: 'post' | 'page') {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/content/${type}/${contentId}/versions`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch content versions');
      }

      const versions = await response.json();
      return versions;
    } catch (error) {
      console.error('Error fetching content versions:', error);
      throw error;
    }
  }

  async restoreVersion(contentId: string, versionId: string, type: 'post' | 'page') {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/content/${type}/${contentId}/restore/${versionId}`,
        {
          method: 'POST',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to restore content version');
      }

      const restoredContent = await response.json();
      return restoredContent;
    } catch (error) {
      console.error('Error restoring content version:', error);
      throw error;
    }
  }
}

export const contentService = new ContentService(); 