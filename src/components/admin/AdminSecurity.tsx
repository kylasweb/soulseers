
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminSecurity = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security</h1>
          <p className="text-muted-foreground mt-2">
            Manage platform security settings
          </p>
        </div>
        <Shield className="h-8 w-8 text-primary" />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Admin Accounts</CardTitle>
          <CardDescription>
            Manage administrator access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="flex items-center justify-between border-b p-4 font-medium">
              <div className="w-1/3">Name</div>
              <div className="w-1/3">Email</div>
              <div className="w-1/3">Last Login</div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between py-2">
                <div className="w-1/3">Admin User</div>
                <div className="w-1/3">admin@soulseer.com</div>
                <div className="w-1/3">Today at 10:45 AM</div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button size="sm">Add Admin</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Security Logs</CardTitle>
          <CardDescription>
            Recent security events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Security logs would appear here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSecurity;
