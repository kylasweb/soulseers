
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
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart2,
  Settings,
  Shield,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
  UserCog,
  ShoppingBag,
  Calendar,
  MessageSquare,
  BookOpen,
  Bell,
  Lock,
  Database,
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="p-4 flex items-center justify-between">
        <Link to="/admin" className="flex items-center">
          <span className="text-xl font-semibold text-soulseer-gold">SoulSeer Admin</span>
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
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive('/admin') ? 'bg-accent' : ''}>
                  <Link to="/admin" className="flex items-center">
                    <LayoutDashboard size={18} className="mr-2" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>User Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive('/admin/users') ? 'bg-accent' : ''}>
                  <Link to="/admin/users" className="flex items-center">
                    <Users size={18} className="mr-2" />
                    <span>All Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive('/admin/readers') ? 'bg-accent' : ''}>
                  <Link to="/admin/readers" className="flex items-center">
                    <UserCog size={18} className="mr-2" />
                    <span>Readers</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Content Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive('/admin/services') ? 'bg-accent' : ''}>
                  <Link to="/admin/services" className="flex items-center">
                    <FileText size={18} className="mr-2" />
                    <span>Services</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive('/admin/blog') ? 'bg-accent' : ''}>
                  <Link to="/admin/blog" className="flex items-center">
                    <BookOpen size={18} className="mr-2" />
                    <span>Blog</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive('/admin/shop') ? 'bg-accent' : ''}>
                  <Link to="/admin/shop" className="flex items-center">
                    <ShoppingBag size={18} className="mr-2" />
                    <span>Shop</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive('/admin/community') ? 'bg-accent' : ''}>
                  <Link to="/admin/community" className="flex items-center">
                    <MessageSquare size={18} className="mr-2" />
                    <span>Community</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive('/admin/events') ? 'bg-accent' : ''}>
                  <Link to="/admin/events" className="flex items-center">
                    <Calendar size={18} className="mr-2" />
                    <span>Events</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive('/admin/analytics') ? 'bg-accent' : ''}>
                  <Link to="/admin/analytics" className="flex items-center">
                    <BarChart2 size={18} className="mr-2" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive('/admin/notifications') ? 'bg-accent' : ''}>
                  <Link to="/admin/notifications" className="flex items-center">
                    <Bell size={18} className="mr-2" />
                    <span>Notifications</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive('/admin/settings') ? 'bg-accent' : ''}>
                  <Link to="/admin/settings" className="flex items-center">
                    <Settings size={18} className="mr-2" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive('/admin/database') ? 'bg-accent' : ''}>
                  <Link to="/admin/database" className="flex items-center">
                    <Database size={18} className="mr-2" />
                    <span>Database</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive('/admin/security') ? 'bg-accent' : ''}>
                  <Link to="/admin/security" className="flex items-center">
                    <Shield size={18} className="mr-2" />
                    <span>Security</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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

export default AdminSidebar;
