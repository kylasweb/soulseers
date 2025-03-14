
import React from 'react';
import { useSidebar } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/AdminSidebar';
import { useTheme } from '@/context/ThemeContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { open, setOpen } = useSidebar();
  const { theme } = useTheme();
  
  const toggleSidebar = () => {
    setOpen(!open);
  };
  
  return (
    <div className={`min-h-screen flex w-full ${theme === 'cyber' ? 'cyber-grid' : ''}`}>
      <AdminSidebar collapsed={!open} toggleSidebar={toggleSidebar} />
      <main 
        className={`flex-1 p-6 overflow-auto transition-all duration-300 ease-in-out ${
          theme === 'cyber' ? 'cyber-text' : ''
        }`}
        style={{ marginLeft: !open ? '60px' : '240px' }}
      >
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
