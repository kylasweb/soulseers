
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Users, FileText, BarChart3, Settings } from 'lucide-react';
import AdminLoginInfo from '@/components/AdminLoginInfo';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AdminOverview from '@/components/admin/AdminOverview';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminContent from '@/components/admin/AdminContent';
import AdminAnalytics from '@/components/admin/AdminAnalytics';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminSecurity from '@/components/admin/AdminSecurity';

const AdminDashboard = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Determine which tab should be active based on the current path
  const getActiveTab = () => {
    if (currentPath.includes('/admin/users')) return 'users';
    if (currentPath.includes('/admin/content')) return 'content';
    if (currentPath.includes('/admin/analytics')) return 'analytics';
    if (currentPath.includes('/admin/settings')) return 'settings';
    if (currentPath.includes('/admin/security')) return 'security';
    return 'overview';
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/content" element={<AdminContent />} />
          <Route path="/analytics" element={<AdminAnalytics />} />
          <Route path="/settings" element={<AdminSettings />} />
          <Route path="/security" element={<AdminSecurity />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </AdminLayout>
    </SidebarProvider>
  );
};

export default AdminDashboard;
