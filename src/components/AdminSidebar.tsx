
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
  ChevronRight, 
  Menu, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

interface AdminSidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  collapsed,
  toggleSidebar
}) => {
  return (
    <aside className={cn(
      "sidebar h-screen fixed left-0 top-0 z-30 bg-card border-r border-border transition-all duration-300 ease-in-out",
      collapsed ? "w-[60px]" : "w-[240px]"
    )}>
      <div className="flex items-center justify-between h-16 px-3 border-b border-border">
        {!collapsed && <h2 className="text-lg font-semibold">Admin Portal</h2>}
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

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/admin' },
    { icon: <Users size={18} />, label: 'User Management', path: '/admin/users' },
    { icon: <Pencil size={18} />, label: 'Frontend Manager', path: '/admin/frontend' },
    { icon: <CreditCard size={18} />, label: 'Payment Management', path: '/admin/payments' },
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
          
        return (
          <Link 
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center py-2 px-3 rounded-md text-foreground hover:bg-accent group transition-colors",
              isActive ? "bg-accent/50" : ""
            )}
          >
            <span className="text-primary">{item.icon}</span>
            {!collapsed && (
              <span className="ml-3 text-sm">{item.label}</span>
            )}
            {!collapsed && (
              <ChevronRight 
                size={16} 
                className="ml-auto text-muted-foreground/30 group-hover:text-muted-foreground/70 transition-colors"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default AdminSidebar;
