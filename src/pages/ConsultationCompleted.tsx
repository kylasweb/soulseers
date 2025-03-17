
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, DollarSign, Calendar, ArrowRight, AlertTriangle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { PaymentStatus } from '@/utils/paymentUtils';

const ConsultationCompleted = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { duration = 0, cost = 0, paymentStatus = 'completed' } = location.state || {};
  
  const formattedDuration = () => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes} min ${seconds} sec`;
  };
  
  const currentDate = format(new Date(), 'PPP');
  const sessionId = Math.floor(100000 + Math.random() * 900000);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className={
              paymentStatus === 'completed' 
                ? "bg-green-100 p-4 rounded-full" 
                : "bg-yellow-100 p-4 rounded-full"
            }>
              {paymentStatus === 'completed' ? (
                <CheckCircle className="h-16 w-16 text-green-600" />
              ) : (
                <AlertTriangle className="h-16 w-16 text-yellow-600" />
              )}
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-2">Session Completed</h1>
          <p className="text-center text-muted-foreground mb-8">
            {paymentStatus === 'completed' 
              ? "Thank you for using our pay-per-minute consultation service."
              : "Your session has been completed, but there was an issue with the payment."}
          </p>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Session Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  <span>Session Duration</span>
                </div>
                <div className="font-medium">{formattedDuration()}</div>
              </div>
              
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-primary mr-2" />
                  <span>Total Cost</span>
                </div>
                <div className="font-medium">${cost.toFixed(2)}</div>
              </div>
              
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-primary mr-2" />
                  <span>Payment Status</span>
                </div>
                <div className={`font-medium ${
                  paymentStatus === 'completed' 
                    ? 'text-green-600' 
                    : paymentStatus === 'failed' 
                    ? 'text-red-600' 
                    : 'text-yellow-600'
                }`}>
                  {paymentStatus === 'completed' && 'Paid'}
                  {paymentStatus === 'failed' && 'Failed'}
                  {paymentStatus === 'charging' && 'Processing'}
                  {paymentStatus === 'authorized' && 'Pending'}
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-primary mr-2" />
                  <span>Session Date</span>
                </div>
                <div className="font-medium">{currentDate}</div>
              </div>
              
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                <div className="flex items-center">
                  <span className="h-5 w-5 flex items-center justify-center bg-primary/10 rounded text-primary mr-2 text-xs font-medium">#</span>
                  <span>Session ID</span>
                </div>
                <div className="font-medium">{sessionId}</div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 flex justify-center">
              <p className="text-sm text-muted-foreground">
                {paymentStatus === 'completed' 
                  ? "A receipt has been sent to your email address."
                  : "Our team will review your payment and contact you if needed."}
              </p>
            </CardFooter>
          </Card>
          
          {paymentStatus !== 'completed' && (
            <div className="mb-8 p-4 border border-yellow-300 bg-yellow-50 rounded-lg">
              <h3 className="font-medium text-yellow-800 mb-2 flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Payment Issue Detected
              </h3>
              <p className="text-sm text-yellow-700 mb-3">
                We encountered an issue while processing your payment. Don't worry, we've recorded your session details and our team will look into this.
              </p>
              <Button variant="outline" size="sm" className="text-yellow-800 border-yellow-300 bg-yellow-100 hover:bg-yellow-200" asChild>
                <a href="mailto:support@soulseer.com">Contact Support</a>
              </Button>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/services')}
              className="flex-1"
            >
              Back to Services
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="flex-1"
            >
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ConsultationCompleted;
