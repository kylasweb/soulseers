
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CyberIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
}

const CyberIcon: React.FC<CyberIconProps> = ({ 
  icon: Icon, 
  size = 24, 
  className = "" 
}) => {
  return (
    <div className={`relative inline-flex cyber-border rounded-md p-2 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-md"></div>
      <div className="animate-glow absolute inset-0 rounded-md"></div>
      <Icon size={size} className="relative z-10 text-primary" />
    </div>
  );
};

export default CyberIcon;
