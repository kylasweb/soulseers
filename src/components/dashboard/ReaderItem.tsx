
import React from 'react';
import { Star } from 'lucide-react';

interface ReaderItemProps {
  name: string;
  specialty: string;
  image: string;
  rating: number;
}

const ReaderItem: React.FC<ReaderItemProps> = ({ name, specialty, image, rating }) => {
  return (
    <div className="flex items-center">
      <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="flex-grow">
        <h4 className="font-medium">{name}</h4>
        <p className="text-sm text-muted-foreground">{specialty}</p>
      </div>
      <div className="flex items-center">
        <Star className="h-4 w-4 text-soulseer-gold fill-soulseer-gold mr-1" />
        <span className="text-sm font-medium">{rating}</span>
      </div>
    </div>
  );
};

export default ReaderItem;
