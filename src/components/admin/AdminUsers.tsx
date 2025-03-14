
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const AdminUsers = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-2">
            View and manage all platform users
          </p>
        </div>
        <Users className="h-8 w-8 text-primary" />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>User Database</CardTitle>
          <CardDescription>
            All registered users of the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="flex items-center justify-between border-b p-4 font-medium">
              <div className="w-1/4">Name</div>
              <div className="w-1/4">Email</div>
              <div className="w-1/4">Role</div>
              <div className="w-1/4">Status</div>
            </div>
            <div className="p-4">
              <p className="text-muted-foreground">User list would appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
