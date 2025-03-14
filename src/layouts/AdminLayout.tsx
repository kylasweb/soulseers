
import React from 'react';
import { useSidebar } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { collapsed, setCollapsed } = useSidebar();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <div className="min-h-screen flex w-full">
      <AdminSidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <main className="flex-1 p-6 overflow-auto ml-[60px] transition-all duration-300 ease-in-out"
            style={{ marginLeft: collapsed ? '60px' : '240px' }}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
