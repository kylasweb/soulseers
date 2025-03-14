
import React from 'react';
import { 
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { InfoIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminLoginInfo: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <InfoIcon className="h-5 w-5" />
          <span>Admin Access Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertTitle>Default Admin Credentials</AlertTitle>
          <AlertDescription>
            <p className="mb-2">Use these credentials to access the admin dashboard:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Email: <span className="font-mono bg-muted px-1 rounded">admin@soulseer.com</span></li>
              <li>Password: <span className="font-mono bg-muted px-1 rounded">Admin123!</span></li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              For security reasons, please change the default password after your first login
              through the user profile settings.
            </p>
          </AlertDescription>
        </Alert>
        
        <div className="text-sm space-y-2">
          <h4 className="font-medium">How to Add New Admin Users:</h4>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Navigate to the "User Management" section in the sidebar</li>
            <li>Find the user you want to promote to admin</li>
            <li>Click the "Edit" button next to their name</li>
            <li>Change their role to "Admin" in the dropdown menu</li>
            <li>Save the changes</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminLoginInfo;
