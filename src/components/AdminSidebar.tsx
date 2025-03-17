
import React from 'react';
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BarChart, 
  Settings, 
  Shield,
  Pencil,
  CreditCard,
  Share,
  VideoIcon,
  ChevronRight, 
  Menu, 
  X,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from '@/context/ThemeContext';

interface AdminSidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  collapsed,
  toggleSidebar
}) => {
  const { theme } = useTheme();
  
  const sidebarClasses = cn(
    "sidebar h-screen fixed left-0 top-0 z-30 bg-card border-r border-border transition-all duration-300 ease-in-out",
    collapsed ? "w-[60px]" : "w-[240px]",
    theme === 'cyber' && "cyber-card"
  );
  
  return (
    <aside className={sidebarClasses}>
      <div className="flex items-center justify-between h-16 px-3 border-b border-border">
        {!collapsed && (
          <h2 className={cn(
            "text-lg font-semibold",
            theme === 'cyber' && "text-primary font-mono tracking-wide"
          )}>
            Admin Portal
          </h2>
        )}
        <Button variant="ghost" size="sm" onClick={toggleSidebar} className="ml-auto">
          {collapsed ? <Menu size={18} /> : <X size={18} />}
        </Button>
      </div>

      <div className="py-4">
        <SidebarContent collapsed={collapsed} />
      </div>
    </aside>
  );
};

const SidebarContent: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { theme } = useTheme();

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/admin' },
    { icon: <Users size={18} />, label: 'User Management', path: '/admin/users' },
    { icon: <BookOpen size={18} />, label: 'Reader Management', path: '/admin/readers' },
    { icon: <Pencil size={18} />, label: 'Frontend Manager', path: '/admin/frontend' },
    { icon: <CreditCard size={18} />, label: 'Payment Management', path: '/admin/payments' },
    { icon: <VideoIcon size={18} />, label: 'Consultations', path: '/admin/consultations' },
    { icon: <Share size={18} />, label: 'Social Media Manager', path: '/admin/social' },
    { icon: <FileText size={18} />, label: 'Content Management', path: '/admin/content' },
    { icon: <BarChart size={18} />, label: 'Analytics', path: '/admin/analytics' },
    { icon: <Settings size={18} />, label: 'System Settings', path: '/admin/settings' },
    { icon: <Shield size={18} />, label: 'Security', path: '/admin/security' },
  ];

  return (
    <nav className="px-2 space-y-1">
      {menuItems.map((item) => {
        const isActive = 
          (item.path === '/admin' && currentPath === '/admin') ||
          (item.path !== '/admin' && currentPath.startsWith(item.path));
          
        const itemClasses = cn(
          "flex items-center py-2 px-3 rounded-md text-foreground transition-colors",
          isActive ? 
            theme === 'cyber' ? 
              "bg-primary/20 text-primary cyber-glow" : 
              "bg-accent/50" 
            : "hover:bg-accent/30 group",
          theme === 'cyber' && "hover:bg-primary/10"
        );
          
        return (
          <Link 
            key={item.path}
            to={item.path}
            className={itemClasses}
          >
            <span className={cn(
              isActive ? "text-primary" : "text-muted-foreground",
              theme === 'cyber' && isActive && "text-foreground"
            )}>
              {item.icon}
            </span>
            {!collapsed && (
              <span className={cn(
                "ml-3 text-sm transition-all", 
                isActive && "font-medium"
              )}>
                {item.label}
              </span>
            )}
            {!collapsed && (
              <ChevronRight 
                size={16} 
                className={cn(
                  "ml-auto transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground/30 group-hover:text-muted-foreground/70"
                )}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default AdminSidebar;
