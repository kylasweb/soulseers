
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Eye, Home, Info, Users, Book, Wrench, Calendar, ShoppingCart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

const AdminFrontend = () => {
  const [activePage, setActivePage] = useState('home');
  
  const pages = [
    { id: 'home', name: 'Home Page', icon: <Home className="h-4 w-4" /> },
    { id: 'about', name: 'About Page', icon: <Info className="h-4 w-4" /> },
    { id: 'community', name: 'Community Page', icon: <Users className="h-4 w-4" /> },
    { id: 'readings', name: 'Readings Page', icon: <Book className="h-4 w-4" /> },
    { id: 'services', name: 'Services Page', icon: <Wrench className="h-4 w-4" /> },
    { id: 'sessions', name: 'Sessions Page', icon: <Calendar className="h-4 w-4" /> },
    { id: 'shop', name: 'Shop Page', icon: <ShoppingCart className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Frontend Manager</h1>
          <p className="text-muted-foreground mt-2">
            Edit and customize your website's public pages
          </p>
        </div>
        <Pencil className="h-8 w-8 text-primary" />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Page Editor</CardTitle>
          <CardDescription>
            Select a page to edit its content and appearance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activePage} onValueChange={setActivePage} className="w-full">
            <TabsList className="grid grid-cols-7 mb-6">
              {pages.map(page => (
                <TabsTrigger key={page.id} value={page.id} className="flex items-center gap-2">
                  {page.icon}
                  <span className="hidden md:inline">{page.name.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {pages.map(page => (
              <TabsContent key={page.id} value={page.id} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{page.name} Editor</h3>
                  <Button size="sm" variant="outline" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Page Title</label>
                      <Input defaultValue={`SoulSeer - ${page.name}`} className="mt-1" />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Hero Heading</label>
                      <Input defaultValue={`Welcome to ${page.name}`} className="mt-1" />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Hero Subheading</label>
                      <Textarea 
                        defaultValue={`This is the ${page.name.toLowerCase()} of SoulSeer, where you can find everything related to ${page.name.toLowerCase()}.`}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Main Content</label>
                      <Textarea 
                        defaultValue={`Main content for the ${page.name.toLowerCase()} goes here. You can edit this text to change what appears on the page.`}
                        className="mt-1"
                        rows={7}
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Reset</Button>
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 mt-6">
                  <h4 className="font-medium mb-2">Components</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button variant="outline" className="h-auto py-2 justify-start" size="sm">
                      Hero Section
                    </Button>
                    <Button variant="outline" className="h-auto py-2 justify-start" size="sm">
                      Feature Grid
                    </Button>
                    <Button variant="outline" className="h-auto py-2 justify-start" size="sm">
                      Testimonials
                    </Button>
                    <Button variant="outline" className="h-auto py-2 justify-start" size="sm">
                      Contact Form
                    </Button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFrontend;
