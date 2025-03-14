
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SocialStatsCardProps {
  title: string;
  value: string;
  trend: string;
  trendColor?: string;
}

const SocialStatsCard: React.FC<SocialStatsCardProps> = ({ 
  title, value, trend, trendColor
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${trendColor ? trendColor : 'text-muted-foreground'} mt-1`}>{trend}</p>
      </CardContent>
    </Card>
  );
};

export default SocialStatsCard;
