
// Payment provider types
export type PaymentProvider = 'stripe' | 'paypal';

// Payment status type
export type PaymentStatus = 'authorized' | 'charging' | 'completed' | 'failed';

// Payment session interface
export interface PaymentSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in seconds
  rate: number; // per minute
  currentCost: number;
  status: PaymentStatus;
  provider: PaymentProvider;
  authorizationId?: string;
}

// Mock function to simulate payment authorization
export const authorizePayment = async (
  provider: PaymentProvider,
  amount: number,
  userId: string
): Promise<{ success: boolean; authorizationId?: string; error?: string }> => {
  // In a real app, this would connect to Stripe, PayPal, etc.
  console.log(`Authorizing ${amount} via ${provider} for user ${userId}`);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate successful authorization
  return {
    success: true,
    authorizationId: `auth_${Math.random().toString(36).substring(2, 10)}`
  };
};

// Capture ongoing payment (increase authorized amount)
export const captureOngoingPayment = async (
  authorizationId: string,
  amount: number
): Promise<{ success: boolean; error?: string }> => {
  // In a real app, this would update the authorized amount
  console.log(`Capturing ongoing payment of ${amount} for auth ${authorizationId}`);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return { success: true };
};

// Complete payment at the end of session
export const completePayment = async (
  authorizationId: string,
  finalAmount: number
): Promise<{ success: boolean; transactionId?: string; error?: string }> => {
  // In a real app, this would finalize the payment
  console.log(`Completing payment of ${finalAmount} for auth ${authorizationId}`);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    success: true,
    transactionId: `txn_${Math.random().toString(36).substring(2, 10)}`
  };
};
