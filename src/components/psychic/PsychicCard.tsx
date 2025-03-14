
import React from 'react';
import { cn } from '@/lib/utils';

interface PsychicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glowColor?: string;
}

const PsychicCard = React.forwardRef<HTMLDivElement, PsychicCardProps>(
  ({ className, hoverEffect = true, glowColor = "rgba(138, 43, 226, 0.4)", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-lg bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-purple-700/30 p-6 overflow-hidden",
          hoverEffect && "transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(138,43,226,0.2)]",
          className
        )}
        style={{
          boxShadow: `0 5px 15px ${glowColor}`,
        }}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800/5 to-indigo-900/5 z-0"></div>
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

PsychicCard.displayName = 'PsychicCard';

export { PsychicCard };
