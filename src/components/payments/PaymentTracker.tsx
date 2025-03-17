
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { DollarSign, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { PaymentStatus, captureOngoingPayment } from '@/utils/paymentUtils';

interface PaymentTrackerProps {
  isRunning: boolean;
  elapsedTime: number; // in seconds
  rate: number; // per minute
  authorizationId?: string;
  onPaymentError: () => void;
}

const PaymentTracker: React.FC<PaymentTrackerProps> = ({
  isRunning,
  elapsedTime,
  rate,
  authorizationId,
  onPaymentError
}) => {
  const [currentCost, setCurrentCost] = useState(0);
  const [status, setStatus] = useState<PaymentStatus>('authorized');
  const [lastCaptureTime, setLastCaptureTime] = useState(0);
  const { toast } = useToast();

  // Calculate cost based on elapsed time
  useEffect(() => {
    const costPerSecond = rate / 60;
    const newCost = parseFloat((elapsedTime * costPerSecond).toFixed(2));
    setCurrentCost(newCost);
  }, [elapsedTime, rate]);

  // Handle periodic payment captures (every 5 minutes)
  useEffect(() => {
    const captureInterval = 5 * 60; // 5 minutes in seconds
    
    if (isRunning && authorizationId && elapsedTime - lastCaptureTime >= captureInterval) {
      const handleCapture = async () => {
        setStatus('charging');
        
        try {
          const result = await captureOngoingPayment(authorizationId, currentCost);
          
          if (result.success) {
            setStatus('authorized');
            setLastCaptureTime(elapsedTime);
            
            toast({
              title: "Payment Updated",
              description: `Your payment has been updated to $${currentCost.toFixed(2)}`,
              duration: 3000
            });
          } else {
            setStatus('failed');
            toast({
              variant: "destructive",
              title: "Payment Error",
              description: result.error || "There was an error processing your payment",
              duration: 5000
            });
            onPaymentError();
          }
        } catch (error) {
          setStatus('failed');
          toast({
            variant: "destructive",
            title: "Payment Error",
            description: "Failed to process payment update",
            duration: 5000
          });
          onPaymentError();
        }
      };
      
      handleCapture();
    }
  }, [isRunning, elapsedTime, currentCost, authorizationId, lastCaptureTime, toast, onPaymentError]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Session Billing</h3>
          <Badge 
            variant={
              status === 'authorized' ? 'outline' : 
              status === 'charging' ? 'secondary' :
              status === 'completed' ? 'default' : 'destructive'
            }
          >
            {status === 'authorized' && 'Active'}
            {status === 'charging' && 'Updating...'}
            {status === 'completed' && 'Completed'}
            {status === 'failed' && 'Failed'}
          </Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-muted-foreground mr-2" />
            <span>Time</span>
          </div>
          <div className="font-medium">{formatTime(elapsedTime)}</div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-muted-foreground mr-2" />
            <span>Current Cost</span>
          </div>
          <div className="font-medium">${currentCost.toFixed(2)}</div>
        </div>
        
        {status === 'charging' && (
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-xs text-muted-foreground">Processing payment update...</span>
            </div>
            <Progress value={80} className="h-1" />
          </div>
        )}
        
        {status === 'failed' && (
          <div className="flex items-center text-destructive bg-destructive/10 p-2 rounded-md">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <span className="text-xs">Payment issue detected. The session may end.</span>
          </div>
        )}
        
        {isRunning && status === 'authorized' && (
          <div className="flex items-center text-green-600 bg-green-50 p-2 rounded-md">
            <CheckCircle className="h-4 w-4 mr-2" />
            <span className="text-xs">Your payment is being processed in real-time</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentTracker;
