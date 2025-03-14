
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const AdminContent = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage all content on the platform
          </p>
        </div>
        <FileText className="h-8 w-8 text-primary" />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Content Library</CardTitle>
          <CardDescription>
            All articles, pages, and media content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="flex items-center justify-between border-b p-4 font-medium">
              <div className="w-1/4">Title</div>
              <div className="w-1/4">Type</div>
              <div className="w-1/4">Date</div>
              <div className="w-1/4">Status</div>
            </div>
            <div className="p-4">
              <p className="text-muted-foreground">Content list would appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminContent;
