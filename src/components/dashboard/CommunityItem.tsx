
import React from 'react';

interface CommunityItemProps {
  title: string;
  type: string;
  activity: string;
  timeago: string;
  icon: React.ReactNode;
}

const CommunityItem: React.FC<CommunityItemProps> = ({ 
  title, type, activity, timeago, icon 
}) => {
  return (
    <div className="flex items-start p-4 border border-border rounded-lg bg-muted/30">
      <div className="p-2 bg-accent rounded-full mr-4">
        {icon}
      </div>
      <div className="flex-grow">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{type}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-primary">{activity}</p>
        <p className="text-xs text-muted-foreground mt-1">{timeago}</p>
      </div>
    </div>
  );
};

export default CommunityItem;
