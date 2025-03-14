
import React from 'react';
import { useSidebar } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { open, setOpen } = useSidebar();
  
  const toggleSidebar = () => {
    setOpen(!open);
  };
  
  return (
    <div className="min-h-screen flex w-full">
      <DashboardSidebar collapsed={!open} toggleSidebar={toggleSidebar} />
      <main className="flex-1 p-6 overflow-auto ml-[60px] transition-all duration-300 ease-in-out"
            style={{ marginLeft: !open ? '60px' : '240px' }}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
