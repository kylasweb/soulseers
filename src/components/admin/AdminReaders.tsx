
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReadersOverview from '@/components/admin/readers/ReadersOverview';
import ReadersTable from '@/components/admin/readers/ReadersTable';
import ReaderServices from '@/components/admin/readers/ReaderServices';
import ReaderPayments from '@/components/admin/readers/ReaderPayments';
import ReaderApplications from '@/components/admin/readers/ReaderApplications';

const AdminReaders = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reader Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage psychic readers, their services, applications and payments.
        </p>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="readers">Readers</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <ReadersOverview />
        </TabsContent>
        
        <TabsContent value="readers" className="space-y-4">
          <ReadersTable />
        </TabsContent>
        
        <TabsContent value="services" className="space-y-4">
          <ReaderServices />
        </TabsContent>
        
        <TabsContent value="payments" className="space-y-4">
          <ReaderPayments />
        </TabsContent>
        
        <TabsContent value="applications" className="space-y-4">
          <ReaderApplications />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminReaders;
