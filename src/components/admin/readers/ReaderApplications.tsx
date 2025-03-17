
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Check, X } from 'lucide-react';

// Mock application data
const mockApplications = [
  {
    id: '1',
    name: 'Ophelia Dreamweaver',
    email: 'ophelia@example.com',
    specialty: 'Dream Interpreter',
    experience: '8 years',
    status: 'pending',
    date: '2023-06-12',
  },
  {
    id: '2',
    name: 'Magnus Vortex',
    email: 'magnus@example.com',
    specialty: 'Remote Viewing',
    experience: '12 years',
    status: 'pending',
    date: '2023-06-10',
  },
  {
    id: '3',
    name: 'Celeste Nightshade',
    email: 'celeste@example.com',
    specialty: 'Tarot Reading',
    experience: '5 years',
    status: 'approved',
    date: '2023-06-05',
  },
  {
    id: '4',
    name: 'Raven Blackwood',
    email: 'raven@example.com',
    specialty: 'Medium',
    experience: '10 years',
    status: 'rejected',
    date: '2023-06-02',
  },
  {
    id: '5',
    name: 'Aurora Crystalheart',
    email: 'aurora@example.com',
    specialty: 'Energy Healer',
    experience: '7 years',
    status: 'approved',
    date: '2023-05-28',
  },
];

const ReaderApplications = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">This week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting decision</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.name}</TableCell>
                  <TableCell>{application.email}</TableCell>
                  <TableCell>{application.specialty}</TableCell>
                  <TableCell>{application.experience}</TableCell>
                  <TableCell>{new Date(application.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={
                      application.status === 'approved' 
                        ? 'default' 
                        : application.status === 'pending'
                          ? 'outline'
                          : 'destructive'
                    }>
                      {application.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {application.status === 'pending' && (
                        <>
                          <Button variant="outline" size="sm" className="text-green-500 hover:text-green-700">
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReaderApplications;
