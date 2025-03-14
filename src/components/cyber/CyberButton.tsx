
import React from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { LucideIcon } from 'lucide-react';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'accent' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  icon?: LucideIcon;
  asChild?: boolean;
}

const CyberButton = React.forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'default', 
    icon: Icon, 
    asChild = false,
    children, 
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    const baseStyles = "relative overflow-hidden rounded-sm font-mono tracking-wide transition-all duration-300 focus:outline-none";
    
    const variantStyles = {
      default: "bg-card text-primary border border-primary/30 hover:bg-primary/10",
      accent: "bg-accent text-accent-foreground border border-accent/30 hover:bg-accent/80",
      outline: "bg-transparent text-primary border border-primary hover:bg-primary/10"
    };
    
    const sizeStyles = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-8 px-3 py-1 text-xs",
      lg: "h-12 px-6 py-3 text-base",
      icon: "h-10 w-10 p-2"
    };
    
    return (
      <Comp
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="absolute inset-0 overflow-hidden">
          <span className="absolute -translate-x-full top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent transform skew-x-12 transition-transform duration-1000 ease-out group-hover:translate-x-full"></span>
        </span>
        <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></span>
        <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></span>
        <span className="relative flex items-center justify-center gap-2">
          {Icon && <Icon className="w-4 h-4" />}
          {children}
        </span>
      </Comp>
    );
  }
);

CyberButton.displayName = 'CyberButton';

export { CyberButton };
