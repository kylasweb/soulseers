
import React from 'react';

interface MilestoneItemProps {
  title: string;
  progress: number;
}

const MilestoneItem: React.FC<MilestoneItemProps> = ({ title, progress }) => {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-soulseer-gold h-2 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default MilestoneItem;
