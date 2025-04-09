import { useAuthStore } from '@/store';

class SecurityService {
  async setupTwoFactor(userId: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/security/2fa/setup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to setup 2FA');
      }

      const { qrCode, secret } = await response.json();
      return { qrCode, secret };
    } catch (error) {
      console.error('Error setting up 2FA:', error);
      throw error;
    }
  }

  async verifyTwoFactor(userId: string, token: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/security/2fa/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, token }),
      });

      if (!response.ok) {
        throw new Error('Failed to verify 2FA token');
      }

      const { valid } = await response.json();
      if (valid) {
        const { setTwoFactorEnabled } = useAuthStore.getState();
        setTwoFactorEnabled(true);
      }
      return valid;
    } catch (error) {
      console.error('Error verifying 2FA:', error);
      throw error;
    }
  }

  async disableTwoFactor(userId: string, token: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/security/2fa/disable`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, token }),
      });

      if (!response.ok) {
        throw new Error('Failed to disable 2FA');
      }

      const { success } = await response.json();
      if (success) {
        const { setTwoFactorEnabled } = useAuthStore.getState();
        setTwoFactorEnabled(false);
      }
      return success;
    } catch (error) {
      console.error('Error disabling 2FA:', error);
      throw error;
    }
  }

  async generateBackupCodes(userId: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/security/2fa/backup-codes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate backup codes');
      }

      const { codes } = await response.json();
      return codes;
    } catch (error) {
      console.error('Error generating backup codes:', error);
      throw error;
    }
  }

  async checkDeviceFingerprint() {
    try {
      const fingerprint = await this.generateDeviceFingerprint();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/security/device-check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fingerprint }),
      });

      if (!response.ok) {
        throw new Error('Failed to check device fingerprint');
      }

      const { trusted } = await response.json();
      return trusted;
    } catch (error) {
      console.error('Error checking device fingerprint:', error);
      throw error;
    }
  }

  async reportSuspiciousActivity(data: {
    userId: string;
    type: 'login' | 'payment' | 'session';
    details: Record<string, any>;
  }) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/security/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to report suspicious activity');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error reporting suspicious activity:', error);
      throw error;
    }
  }

  private async generateDeviceFingerprint(): Promise<string> {
    // Collect browser and device information
    const fingerprint = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      colorDepth: window.screen.colorDepth,
      hardwareConcurrency: navigator.hardwareConcurrency,
      deviceMemory: (navigator as any).deviceMemory,
      timestamp: new Date().getTime(),
    };

    // Convert to string and hash
    const fingerprintString = JSON.stringify(fingerprint);
    const encoder = new TextEncoder();
    const data = encoder.encode(fingerprintString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  }

  async getSecurityLogs(userId: string, startDate: string, endDate: string) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/security/logs/${userId}?start=${startDate}&end=${endDate}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch security logs');
      }

      const logs = await response.json();
      return logs;
    } catch (error) {
      console.error('Error fetching security logs:', error);
      throw error;
    }
  }
}

export const securityService = new SecurityService(); 