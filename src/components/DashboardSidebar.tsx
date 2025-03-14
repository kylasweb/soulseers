
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Home,
  Calendar,
  Users,
  User,
  Settings,
  Star,
  MessageSquare,
  Heart,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

const DashboardSidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="p-4 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center">
          <span className="text-xl font-semibold text-soulseer-gold">SoulSeer</span>
        </Link>
        <SidebarTrigger className="overflow-hidden">
          {({ collapsed }) => (
            <button className="rounded-full p-2 hover:bg-accent transition-colors">
              {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
            </button>
          )}
        </SidebarTrigger>
      </SidebarHeader>

      <SidebarContent className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActive('/dashboard') ? 'bg-accent' : ''}>
              <Link to="/dashboard" className="flex items-center">
                <Home size={18} className="mr-2" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActive('/dashboard/sessions') ? 'bg-accent' : ''}>
              <Link to="/dashboard/sessions" className="flex items-center">
                <Calendar size={18} className="mr-2" />
                <span>My Sessions</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActive('/dashboard/readers') ? 'bg-accent' : ''}>
              <Link to="/dashboard/readers" className="flex items-center">
                <Star size={18} className="mr-2" />
                <span>Favorite Readers</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActive('/dashboard/community') ? 'bg-accent' : ''}>
              <Link to="/dashboard/community" className="flex items-center">
                <Users size={18} className="mr-2" />
                <span>Community</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActive('/dashboard/forums') ? 'bg-accent' : ''}>
              <Link to="/dashboard/forums" className="flex items-center">
                <MessageSquare size={18} className="mr-2" />
                <span>Forums</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActive('/dashboard/journey') ? 'bg-accent' : ''}>
              <Link to="/dashboard/journey" className="flex items-center">
                <Heart size={18} className="mr-2" />
                <span>Spiritual Journey</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActive('/dashboard/profile') ? 'bg-accent' : ''}>
              <Link to="/dashboard/profile" className="flex items-center">
                <User size={18} className="mr-2" />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild className={isActive('/dashboard/settings') ? 'bg-accent' : ''}>
              <Link to="/dashboard/settings" className="flex items-center">
                <Settings size={18} className="mr-2" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/logout" className="flex items-center text-muted-foreground hover:text-foreground">
                <LogOut size={18} className="mr-2" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
