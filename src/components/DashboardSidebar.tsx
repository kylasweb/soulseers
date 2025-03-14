
import React from 'react';
import { cn } from "@/lib/utils";
import { 
  Home, 
  Calendar, 
  Users, 
  MessageSquare, 
  Heart, 
  Settings, 
  ChevronRight, 
  Menu, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
  collapsed,
  toggleSidebar
}) => {
  return (
    <aside className={cn(
      "sidebar h-screen fixed left-0 top-0 z-30 bg-sidebar transition-all duration-300 ease-in-out",
      collapsed ? "w-[60px]" : "w-[240px]"
    )}>
      <div className="flex items-center justify-between h-16 px-3 border-b border-border">
        {!collapsed && <h2 className="text-lg font-semibold">SoulSeer</h2>}
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
  const menuItems = [
    { icon: <Home size={18} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Calendar size={18} />, label: 'My Sessions', path: '/dashboard/sessions' },
    { icon: <Heart size={18} />, label: 'Favorite Readers', path: '/dashboard/favorites' },
    { icon: <Users size={18} />, label: 'Community', path: '/dashboard/community' },
    { icon: <MessageSquare size={18} />, label: 'Messages', path: '/dashboard/messages' },
    { icon: <Settings size={18} />, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <nav className="px-2 space-y-1">
      {menuItems.map((item, index) => (
        <a 
          key={index}
          href={item.path}
          className={cn(
            "flex items-center py-2 px-3 rounded-md text-sidebar-foreground hover:bg-sidebar-accent group transition-colors",
            index === 0 ? "bg-sidebar-accent/50" : ""
          )}
        >
          <span className="text-sidebar-primary">{item.icon}</span>
          {!collapsed && (
            <span className="ml-3 text-sm">{item.label}</span>
          )}
          {!collapsed && (
            <ChevronRight 
              size={16} 
              className="ml-auto text-sidebar-foreground/30 group-hover:text-sidebar-foreground/70 transition-colors"
            />
          )}
        </a>
      ))}
    </nav>
  );
};

export default DashboardSidebar;
