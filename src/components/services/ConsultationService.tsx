
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, VideoIcon, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

interface ConsultationServiceProps {
  title: string;
  description: string;
  rate: number;
  minDuration: number;
  isAvailable: boolean;
  expertName: string;
  expertImage: string;
}

const ConsultationService: React.FC<ConsultationServiceProps> = ({
  title,
  description,
  rate,
  minDuration,
  isAvailable,
  expertName,
  expertImage
}) => {
  const [showDetails, setShowDetails] = React.useState(false);
  const navigate = useNavigate();

  const handleBooking = () => {
    setShowDetails(false);
    navigate('/consultations/booking');
  };

  return (
    <>
      <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-center mb-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <VideoIcon className="h-6 w-6 text-primary" />
            </div>
            {isAvailable ? (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Available Now</Badge>
            ) : (
              <Badge variant="outline" className="bg-muted text-muted-foreground">Scheduled Only</Badge>
            )}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between">
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-primary mr-2" />
                <span className="font-medium">${rate}</span>
                <span className="text-muted-foreground ml-1">/ minute</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-muted-foreground">Min {minDuration} min</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                <img src={expertImage} alt={expertName} className="h-full w-full object-cover" />
              </div>
              <span className="text-sm">Expert: {expertName}</span>
            </div>
          </div>
          <div className="pt-4 space-y-2">
            <Button className="w-full" onClick={() => setShowDetails(true)}>
              Start Consultation
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/consultations/schedule">Schedule for Later</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-primary mr-2" />
                  <span>Rate</span>
                </div>
                <div className="font-medium">${rate} per minute</div>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  <span>Minimum Duration</span>
                </div>
                <div className="font-medium">{minDuration} minutes</div>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-primary mr-2" />
                  <span>Payment</span>
                </div>
                <div className="font-medium">Pay-as-you-go</div>
              </div>
            </div>
            <div className="mt-6 p-4 border rounded-lg bg-yellow-50 border-yellow-200">
              <p className="text-sm text-yellow-800">
                You will be charged <span className="font-bold">${rate}</span> per minute once the consultation starts. 
                The minimum session length is <span className="font-bold">{minDuration} minutes</span>.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetails(false)}>Cancel</Button>
            <Button onClick={handleBooking}>Proceed to Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConsultationService;
