
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure global platform settings
          </p>
        </div>
        <Settings className="h-8 w-8 text-primary" />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>
            Platform-wide configuration options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Platform Name</label>
                <input 
                  type="text" 
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  defaultValue="SoulSeer"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Contact Email</label>
                <input 
                  type="email" 
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  defaultValue="admin@soulseer.com"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button size="sm">Save Changes</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Manage external service credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">API key management would appear here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
