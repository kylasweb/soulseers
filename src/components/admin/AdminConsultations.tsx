
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UserPlus, DollarSign, VideoIcon, Clock, Calendar, Edit, Eye } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';

// Define types for consultation data
interface Consultation {
  id: string;
  title: string;
  description: string;
  rate: number;
  minDuration: number;
  expertName: string;
  isActive: boolean;
}

// Define types for session data
interface Session {
  id: string;
  user: string;
  expert: string;
  date: string;
  duration: number;
  cost: number;
  status: 'completed' | 'scheduled' | 'in-progress';
}

// Form schema for consultation service
const consultationSchema = z.object({
  title: z.string().min(3, { message: 'Title is required' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  rate: z.coerce.number().min(0.5, { message: 'Rate must be at least $0.50' }),
  minDuration: z.coerce.number().min(1, { message: 'Minimum duration must be at least 1 minute' }),
  expertName: z.string().min(2, { message: 'Expert name is required' }),
  isActive: z.boolean().default(true),
});

type ConsultationFormValues = z.infer<typeof consultationSchema>;

// Mock data for sessions
const mockSessions: Session[] = [
  {
    id: '1',
    user: 'Emily Johnson',
    expert: 'Alexandra Rivers',
    date: '2023-07-15T14:30:00',
    duration: 24,
    cost: 71.76,
    status: 'completed',
  },
  {
    id: '2',
    user: 'Michael Chen',
    expert: 'David Thompson',
    date: '2023-07-16T10:15:00',
    duration: 15,
    cost: 44.85,
    status: 'completed',
  },
  {
    id: '3',
    user: 'Sarah Williams',
    expert: 'Maria Garcia',
    date: '2023-07-16T16:00:00',
    duration: 37,
    cost: 110.63,
    status: 'completed',
  },
  {
    id: '4',
    user: 'Robert Davis',
    expert: 'Alexandra Rivers',
    date: '2023-07-17T09:30:00',
    duration: 0,
    cost: 0,
    status: 'scheduled',
  },
  {
    id: '5',
    user: 'Jennifer Miller',
    expert: 'David Thompson',
    date: '2023-07-17T13:45:00',
    duration: 0,
    cost: 0,
    status: 'in-progress',
  },
];

// Mock data for consultations
const mockConsultations: Consultation[] = [
  {
    id: '1',
    title: 'Live Psychic Reading',
    description: 'One-on-one live video consultation with our experienced psychic readers. Get immediate insights and guidance.',
    rate: 2.99,
    minDuration: 15,
    expertName: 'Alexandra Rivers',
    isActive: true,
  },
  {
    id: '2',
    title: 'Tarot Card Analysis',
    description: 'Live tarot card reading sessions with real-time interpretation and guidance through video consultation.',
    rate: 3.49,
    minDuration: 10,
    expertName: 'David Thompson',
    isActive: true,
  },
  {
    id: '3',
    title: 'Astrology Consultation',
    description: 'Get personalized astrological insights from our experts through a pay-per-minute video session.',
    rate: 2.99,
    minDuration: 20,
    expertName: 'Maria Garcia',
    isActive: false,
  }
];

const AdminConsultations = () => {
  const [consultations, setConsultations] = useState<Consultation[]>(mockConsultations);
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [editingConsultation, setEditingConsultation] = useState<Consultation | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewingSession, setViewingSession] = useState<Session | null>(null);
  const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);
  
  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      title: '',
      description: '',
      rate: 2.99,
      minDuration: 15,
      expertName: '',
      isActive: true,
    },
  });
  
  const openNewConsultationDialog = () => {
    form.reset({
      title: '',
      description: '',
      rate: 2.99,
      minDuration: 15,
      expertName: '',
      isActive: true,
    });
    setEditingConsultation(null);
    setIsDialogOpen(true);
  };
  
  const openEditConsultationDialog = (consultation: Consultation) => {
    form.reset({
      title: consultation.title,
      description: consultation.description,
      rate: consultation.rate,
      minDuration: consultation.minDuration,
      expertName: consultation.expertName,
      isActive: consultation.isActive,
    });
    setEditingConsultation(consultation);
    setIsDialogOpen(true);
  };
  
  const viewSessionDetails = (session: Session) => {
    setViewingSession(session);
    setIsSessionDialogOpen(true);
  };
  
  const onSubmit = (data: ConsultationFormValues) => {
    if (editingConsultation) {
      // Update existing consultation
      setConsultations(consultations.map(c => 
        c.id === editingConsultation.id ? { ...c, ...data } : c
      ));
    } else {
      // Add new consultation
      const newConsultation: Consultation = {
        id: `${consultations.length + 1}`,
        title: data.title,
        description: data.description,
        rate: data.rate,
        minDuration: data.minDuration,
        expertName: data.expertName,
        isActive: data.isActive
      };
      
      setConsultations([...consultations, newConsultation]);
    }
    
    setIsDialogOpen(false);
  };
  
  const toggleConsultationStatus = (id: string, isActive: boolean) => {
    setConsultations(consultations.map(c => 
      c.id === id ? { ...c, isActive } : c
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pay-Per-Minute Consultations</h1>
        <Button onClick={openNewConsultationDialog}>
          <UserPlus className="mr-2 h-4 w-4" /> Add Consultation
        </Button>
      </div>
      
      <Tabs defaultValue="services">
        <TabsList>
          <TabsTrigger value="services">Consultation Services</TabsTrigger>
          <TabsTrigger value="sessions">Session History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manage Consultation Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Expert</TableHead>
                      <TableHead>Rate (per min)</TableHead>
                      <TableHead>Min Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consultations.map((consultation) => (
                      <TableRow key={consultation.id}>
                        <TableCell className="font-medium">{consultation.title}</TableCell>
                        <TableCell>{consultation.expertName}</TableCell>
                        <TableCell>${consultation.rate.toFixed(2)}</TableCell>
                        <TableCell>{consultation.minDuration} min</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              checked={consultation.isActive} 
                              onCheckedChange={(checked) => toggleConsultationStatus(consultation.id, checked)}
                            />
                            <span className={consultation.isActive ? "text-green-600" : "text-muted-foreground"}>
                              {consultation.isActive ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => openEditConsultationDialog(consultation)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Session History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Expert</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell className="font-medium">{session.user}</TableCell>
                        <TableCell>{session.expert}</TableCell>
                        <TableCell>{format(new Date(session.date), 'PP')}</TableCell>
                        <TableCell>
                          {session.status === 'scheduled' 
                            ? 'Not started' 
                            : session.status === 'in-progress' 
                            ? 'In progress' 
                            : `${session.duration} min`}
                        </TableCell>
                        <TableCell>
                          {session.status === 'scheduled' 
                            ? '-' 
                            : session.status === 'in-progress' 
                            ? 'Running' 
                            : `$${session.cost.toFixed(2)}`}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              session.status === 'completed' 
                                ? 'default' 
                                : session.status === 'in-progress' 
                                ? 'secondary' 
                                : 'outline'
                            }
                          >
                            {session.status === 'in-progress' ? 'In Progress' : 
                              session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => viewSessionDetails(session)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Dialog for adding/editing consultation services */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {editingConsultation ? 'Edit Consultation Service' : 'Add New Consultation Service'}
            </DialogTitle>
            <DialogDescription>
              Define the parameters for your pay-per-minute consultation service.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Live Psychic Reading" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Brief description of the service" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rate ($ per minute)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="minDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="expertName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expert Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name of the consultant" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Service Status</FormLabel>
                      <FormDescription>
                        Enable or disable this consultation service
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingConsultation ? 'Update' : 'Add'} Service
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Dialog for viewing session details */}
      <Dialog open={isSessionDialogOpen} onOpenChange={setIsSessionDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Session Details</DialogTitle>
            <DialogDescription>
              Details for session #{viewingSession?.id}
            </DialogDescription>
          </DialogHeader>
          
          {viewingSession && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-primary mr-2" />
                    <span>Date</span>
                  </div>
                  <div className="font-medium">{format(new Date(viewingSession.date), 'PPP')}</div>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-2" />
                    <span>Time</span>
                  </div>
                  <div className="font-medium">{format(new Date(viewingSession.date), 'p')}</div>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <div className="flex items-center">
                    <VideoIcon className="h-5 w-5 text-primary mr-2" />
                    <span>User</span>
                  </div>
                  <div className="font-medium">{viewingSession.user}</div>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <div className="flex items-center">
                    <UserPlus className="h-5 w-5 text-primary mr-2" />
                    <span>Expert</span>
                  </div>
                  <div className="font-medium">{viewingSession.expert}</div>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-2" />
                    <span>Duration</span>
                  </div>
                  <div className="font-medium">
                    {viewingSession.status === 'scheduled' 
                      ? 'Not started' 
                      : viewingSession.status === 'in-progress' 
                      ? 'In progress' 
                      : `${viewingSession.duration} minutes`}
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-primary mr-2" />
                    <span>Cost</span>
                  </div>
                  <div className="font-medium">
                    {viewingSession.status === 'scheduled' 
                      ? '-' 
                      : viewingSession.status === 'in-progress' 
                      ? 'Running' 
                      : `$${viewingSession.cost.toFixed(2)}`}
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <div className="flex items-center">
                    <span className="h-5 w-5 flex items-center justify-center bg-primary/10 rounded text-primary mr-2 text-xs font-medium">#</span>
                    <span>Status</span>
                  </div>
                  <Badge 
                    variant={
                      viewingSession.status === 'completed' 
                        ? 'default' 
                        : viewingSession.status === 'in-progress' 
                        ? 'secondary' 
                        : 'outline'
                    }
                  >
                    {viewingSession.status === 'in-progress' ? 'In Progress' : 
                      viewingSession.status.charAt(0).toUpperCase() + viewingSession.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsSessionDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminConsultations;
