import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Transaction } from '@/types';
import { usePaymentStore } from '@/store';

class PaymentService {
  private stripe: Promise<Stripe | null>;

  constructor() {
    this.stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  }

  async createPaymentIntent(amount: number, currency: string = 'usd', metadata: any = {}) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/payments/create-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
          metadata,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const data = await response.json();
      return data.clientSecret;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }

  async processPayment(clientSecret: string, paymentMethod: any) {
    try {
      const stripe = await this.stripe;
      if (!stripe) throw new Error('Stripe not initialized');

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod,
      });

      if (error) {
        throw error;
      }

      // Create transaction record
      const transaction: Transaction = {
        id: paymentIntent!.id,
        userId: paymentIntent!.metadata.userId,
        readerId: paymentIntent!.metadata.readerId,
        amount: paymentIntent!.amount,
        currency: paymentIntent!.currency,
        status: 'completed',
        type: 'payment',
        metadata: {
          sessionId: paymentIntent!.metadata.sessionId,
          description: paymentIntent!.description || '',
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add transaction to store
      const { addTransaction } = usePaymentStore.getState();
      addTransaction(transaction);

      return transaction;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  }

  async requestRefund(transactionId: string, reason: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/payments/refund`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionId,
          reason,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to request refund');
      }

      const data = await response.json();
      
      // Update store
      const { requestRefund } = usePaymentStore.getState();
      requestRefund(transactionId);

      return data;
    } catch (error) {
      console.error('Error requesting refund:', error);
      throw error;
    }
  }

  async getTransactionHistory(userId: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/payments/history/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch transaction history');
      }

      const transactions: Transaction[] = await response.json();
      return transactions;
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      throw error;
    }
  }

  async getRefundStatus(refundId: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/payments/refund-status/${refundId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch refund status');
      }

      const data = await response.json();
      return data.status;
    } catch (error) {
      console.error('Error fetching refund status:', error);
      throw error;
    }
  }
}

export const paymentService = new PaymentService(); 