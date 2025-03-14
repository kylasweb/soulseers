
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SessionCardProps {
  name: string;
  type: string;
  image: string;
  date: string;
  time: string;
  duration: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const SessionCard: React.FC<SessionCardProps> = ({ 
  name, type, image, date, time, duration, status 
}) => {
  return (
    <div className="flex items-center p-4 border border-border rounded-lg bg-muted/30">
      <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="flex-grow">
        <h4 className="font-medium">{name}</h4>
        <p className="text-sm text-muted-foreground">{type}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium">{date} at {time}</p>
        <div className="flex items-center justify-end mt-1">
          <p className="text-xs text-muted-foreground mr-2">{duration}</p>
          <Badge 
            variant={status === 'confirmed' ? 'default' : status === 'pending' ? 'outline' : 'destructive'}
            className="capitalize text-xs"
          >
            {status}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
