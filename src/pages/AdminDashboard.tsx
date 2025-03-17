
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AdminOverview from '@/components/admin/AdminOverview';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminContent from '@/components/admin/AdminContent';
import AdminAnalytics from '@/components/admin/AdminAnalytics';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminSecurity from '@/components/admin/AdminSecurity';
import AdminFrontend from '@/components/admin/AdminFrontend';
import AdminPayments from '@/components/admin/AdminPayments';
import AdminSocial from '@/components/admin/AdminSocial';
import AdminConsultations from '@/components/admin/AdminConsultations';
import AdminReaders from '@/components/admin/AdminReaders';

const AdminDashboard = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Determine which tab should be active based on the current path
  const getActiveTab = () => {
    if (currentPath.includes('/admin/users')) return 'users';
    if (currentPath.includes('/admin/frontend')) return 'frontend';
    if (currentPath.includes('/admin/payments')) return 'payments';
    if (currentPath.includes('/admin/social')) return 'social';
    if (currentPath.includes('/admin/content')) return 'content';
    if (currentPath.includes('/admin/analytics')) return 'analytics';
    if (currentPath.includes('/admin/settings')) return 'settings';
    if (currentPath.includes('/admin/security')) return 'security';
    if (currentPath.includes('/admin/consultations')) return 'consultations';
    if (currentPath.includes('/admin/readers')) return 'readers';
    return 'overview';
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/frontend" element={<AdminFrontend />} />
          <Route path="/payments" element={<AdminPayments />} />
          <Route path="/social" element={<AdminSocial />} />
          <Route path="/content" element={<AdminContent />} />
          <Route path="/analytics" element={<AdminAnalytics />} />
          <Route path="/settings" element={<AdminSettings />} />
          <Route path="/security" element={<AdminSecurity />} />
          <Route path="/consultations" element={<AdminConsultations />} />
          <Route path="/readers" element={<AdminReaders />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </AdminLayout>
    </SidebarProvider>
  );
};

export default AdminDashboard;
