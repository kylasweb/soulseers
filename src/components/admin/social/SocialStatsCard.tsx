
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface SocialStatsCardProps {
  title: string;
  value: string;
  trend: string;
  trendColor?: string;
  icon?: string;
}

const SocialStatsCard: React.FC<SocialStatsCardProps> = ({ 
  title, value, trend, trendColor, icon
}) => {
  // Dynamically get the icon component if icon name is provided
  const IconComponent = icon ? LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon : null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {IconComponent && <IconComponent className="h-4 w-4 text-primary" />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${trendColor ? trendColor : 'text-muted-foreground'} mt-1`}>{trend}</p>
      </CardContent>
    </Card>
  );
};

export default SocialStatsCard;
