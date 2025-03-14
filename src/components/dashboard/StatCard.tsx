
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  desc: string;
  linkUrl: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, desc, linkUrl }) => {
  return (
    <Card className="hover:shadow-medium transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-full bg-muted">{icon}</div>
          <Link 
            to={linkUrl} 
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            View
          </Link>
        </div>
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold mr-2">{value}</span>
          <span className="text-sm text-muted-foreground">{desc}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
