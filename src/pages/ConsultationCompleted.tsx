
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, DollarSign, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';

const ConsultationCompleted = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { duration = 0, cost = 0 } = location.state || {};
  
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
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-2">Session Completed</h1>
          <p className="text-center text-muted-foreground mb-8">
            Thank you for using our pay-per-minute consultation service.
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
                A receipt has been sent to your email address.
              </p>
            </CardFooter>
          </Card>
          
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
