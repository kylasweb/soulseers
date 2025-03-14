
import React, { useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Edit, Trash2, User, BookOpen, Calendar, ShoppingBag, MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Reader {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  imageUrl: string;
  rating: number;
  available: boolean;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
}

interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  date: string;
}

const AdminDashboard = () => {
  const { toast } = useToast();
  
  // Readers management
  const [readers, setReaders] = useState<Reader[]>([
    {
      id: '1',
      name: 'Luna Starlight',
      specialty: 'Tarot Reading',
      bio: 'Luna has been practicing tarot for over 15 years and specializes in spiritual guidance and life path readings.',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      rating: 4.9,
      available: true
    },
    {
      id: '2',
      name: 'Orion Mystic',
      specialty: 'Astrology',
      bio: 'Orion combines traditional astrology with modern psychological insights to provide comprehensive birth chart readings.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      rating: 4.8,
      available: true
    }
  ]);
  const [currentReader, setCurrentReader] = useState<Reader | null>(null);
  const [isReaderDialogOpen, setIsReaderDialogOpen] = useState(false);
  
  // Services management
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Psychic Reading',
      description: 'Get insights into your past, present, and future with our intuitive psychic readings.',
      price: 49.99,
      duration: 30,
      category: 'Readings'
    },
    {
      id: '2',
      name: 'Tarot Guidance',
      description: 'Explore the symbolic wisdom of tarot to illuminate your path forward.',
      price: 39.99,
      duration: 30,
      category: 'Readings'
    }
  ]);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  
  // Testimonials management
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: '1',
      name: 'Sarah J.',
      location: 'New York, USA',
      text: 'My reading with Luna was transformative. She provided insights that helped me navigate a difficult career transition with confidence and clarity.',
      rating: 5,
      date: '2 months ago'
    },
    {
      id: '2',
      name: 'Michael T.',
      location: 'London, UK',
      text: 'I was skeptical at first, but my session with Orion changed my perspective completely. The accuracy of his readings was remarkable.',
      rating: 5,
      date: '1 month ago'
    }
  ]);
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(null);
  const [isTestimonialDialogOpen, setIsTestimonialDialogOpen] = useState(false);

  // Reader CRUD operations
  const handleAddReader = () => {
    setCurrentReader({
      id: Date.now().toString(),
      name: '',
      specialty: '',
      bio: '',
      imageUrl: '',
      rating: 5,
      available: true
    });
    setIsReaderDialogOpen(true);
  };

  const handleEditReader = (reader: Reader) => {
    setCurrentReader(reader);
    setIsReaderDialogOpen(true);
  };

  const handleDeleteReader = (id: string) => {
    setReaders(readers.filter(reader => reader.id !== id));
    toast({
      title: "Reader deleted",
      description: "The reader has been removed successfully.",
    });
  };

  const handleSaveReader = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentReader) return;
    
    const isNewReader = !readers.some(reader => reader.id === currentReader.id);
    
    if (isNewReader) {
      setReaders([...readers, currentReader]);
      toast({
        title: "Reader added",
        description: "New reader has been added successfully.",
      });
    } else {
      setReaders(readers.map(reader => 
        reader.id === currentReader.id ? currentReader : reader
      ));
      toast({
        title: "Reader updated",
        description: "Reader information has been updated successfully.",
      });
    }
    
    setIsReaderDialogOpen(false);
    setCurrentReader(null);
  };

  // Service CRUD operations
  const handleAddService = () => {
    setCurrentService({
      id: Date.now().toString(),
      name: '',
      description: '',
      price: 0,
      duration: 30,
      category: 'Readings'
    });
    setIsServiceDialogOpen(true);
  };

  const handleEditService = (service: Service) => {
    setCurrentService(service);
    setIsServiceDialogOpen(true);
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
    toast({
      title: "Service deleted",
      description: "The service has been removed successfully.",
    });
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentService) return;
    
    const isNewService = !services.some(service => service.id === currentService.id);
    
    if (isNewService) {
      setServices([...services, currentService]);
      toast({
        title: "Service added",
        description: "New service has been added successfully.",
      });
    } else {
      setServices(services.map(service => 
        service.id === currentService.id ? currentService : service
      ));
      toast({
        title: "Service updated",
        description: "Service information has been updated successfully.",
      });
    }
    
    setIsServiceDialogOpen(false);
    setCurrentService(null);
  };

  // Testimonial CRUD operations
  const handleAddTestimonial = () => {
    setCurrentTestimonial({
      id: Date.now().toString(),
      name: '',
      location: '',
      text: '',
      rating: 5,
      date: 'Just now'
    });
    setIsTestimonialDialogOpen(true);
  };

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setCurrentTestimonial(testimonial);
    setIsTestimonialDialogOpen(true);
  };

  const handleDeleteTestimonial = (id: string) => {
    setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
    toast({
      title: "Testimonial deleted",
      description: "The testimonial has been removed successfully.",
    });
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTestimonial) return;
    
    const isNewTestimonial = !testimonials.some(testimonial => testimonial.id === currentTestimonial.id);
    
    if (isNewTestimonial) {
      setTestimonials([...testimonials, currentTestimonial]);
      toast({
        title: "Testimonial added",
        description: "New testimonial has been added successfully.",
      });
    } else {
      setTestimonials(testimonials.map(testimonial => 
        testimonial.id === currentTestimonial.id ? currentTestimonial : testimonial
      ));
      toast({
        title: "Testimonial updated",
        description: "Testimonial has been updated successfully.",
      });
    }
    
    setIsTestimonialDialogOpen(false);
    setCurrentTestimonial(null);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage all aspects of your SoulSeer platform.</p>
        </div>
      </div>
      
      <Tabs defaultValue="readers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="readers" className="flex items-center gap-2">
            <User size={16} />
            <span>Readers</span>
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <BookOpen size={16} />
            <span>Services</span>
          </TabsTrigger>
          <TabsTrigger value="testimonials" className="flex items-center gap-2">
            <MessageSquare size={16} />
            <span>Testimonials</span>
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex items-center gap-2">
            <Calendar size={16} />
            <span>Bookings</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <ShoppingBag size={16} />
            <span>Products</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Readers Tab */}
        <TabsContent value="readers" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Reader Management</CardTitle>
              <Button onClick={handleAddReader} className="flex items-center gap-1">
                <PlusCircle size={16} />
                <span>Add Reader</span>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {readers.map((reader) => (
                    <TableRow key={reader.id}>
                      <TableCell className="font-medium">{reader.name}</TableCell>
                      <TableCell>{reader.specialty}</TableCell>
                      <TableCell>{reader.rating}</TableCell>
                      <TableCell>
                        <Badge variant={reader.available ? "default" : "outline"}>
                          {reader.available ? "Available" : "Unavailable"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditReader(reader)}>
                          <Edit size={16} className="mr-1" /> Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteReader(reader.id)}>
                          <Trash2 size={16} className="mr-1" /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Reader Dialog */}
          <Dialog open={isReaderDialogOpen} onOpenChange={setIsReaderDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{!currentReader?.name ? 'Add New Reader' : 'Edit Reader'}</DialogTitle>
                <DialogDescription>
                  Fill out the form below to {!currentReader?.name ? 'add a new reader' : 'update this reader\'s information'}.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSaveReader}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={currentReader?.name || ''}
                      onChange={(e) => setCurrentReader({ ...currentReader!, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Input
                      id="specialty"
                      value={currentReader?.specialty || ''}
                      onChange={(e) => setCurrentReader({ ...currentReader!, specialty: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={currentReader?.bio || ''}
                      onChange={(e) => setCurrentReader({ ...currentReader!, bio: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      value={currentReader?.imageUrl || ''}
                      onChange={(e) => setCurrentReader({ ...currentReader!, imageUrl: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="rating">Rating (1-5)</Label>
                    <Input
                      id="rating"
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={currentReader?.rating || 5}
                      onChange={(e) => setCurrentReader({ ...currentReader!, rating: parseFloat(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="available"
                      checked={currentReader?.available || false}
                      onChange={(e) => setCurrentReader({ ...currentReader!, available: e.target.checked })}
                      className="mr-2"
                    />
                    <Label htmlFor="available">Available for bookings</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsReaderDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        {/* Services Tab */}
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Service Management</CardTitle>
              <Button onClick={handleAddService} className="flex items-center gap-1">
                <PlusCircle size={16} />
                <span>Add Service</span>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.name}</TableCell>
                      <TableCell>{service.category}</TableCell>
                      <TableCell>${service.price.toFixed(2)}</TableCell>
                      <TableCell>{service.duration} mins</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditService(service)}>
                          <Edit size={16} className="mr-1" /> Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteService(service.id)}>
                          <Trash2 size={16} className="mr-1" /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Service Dialog */}
          <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{!currentService?.name ? 'Add New Service' : 'Edit Service'}</DialogTitle>
                <DialogDescription>
                  Fill out the form below to {!currentService?.name ? 'add a new service' : 'update this service\'s information'}.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSaveService}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Service Name</Label>
                    <Input
                      id="name"
                      value={currentService?.name || ''}
                      onChange={(e) => setCurrentService({ ...currentService!, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={currentService?.description || ''}
                      onChange={(e) => setCurrentService({ ...currentService!, description: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={currentService?.category || 'Readings'}
                      onValueChange={(value) => setCurrentService({ ...currentService!, category: value })}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Readings">Readings</SelectItem>
                        <SelectItem value="Healing">Healing</SelectItem>
                        <SelectItem value="Coaching">Coaching</SelectItem>
                        <SelectItem value="Astrology">Astrology</SelectItem>
                        <SelectItem value="Tarot">Tarot</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={currentService?.price || 0}
                      onChange={(e) => setCurrentService({ ...currentService!, price: parseFloat(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="5"
                      step="5"
                      value={currentService?.duration || 30}
                      onChange={(e) => setCurrentService({ ...currentService!, duration: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsServiceDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        {/* Testimonials Tab */}
        <TabsContent value="testimonials" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Testimonial Management</CardTitle>
              <Button onClick={handleAddTestimonial} className="flex items-center gap-1">
                <PlusCircle size={16} />
                <span>Add Testimonial</span>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell className="font-medium">{testimonial.name}</TableCell>
                      <TableCell>{testimonial.location}</TableCell>
                      <TableCell>{testimonial.rating}/5</TableCell>
                      <TableCell>{testimonial.date}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditTestimonial(testimonial)}>
                          <Edit size={16} className="mr-1" /> Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteTestimonial(testimonial.id)}>
                          <Trash2 size={16} className="mr-1" /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Testimonial Dialog */}
          <Dialog open={isTestimonialDialogOpen} onOpenChange={setIsTestimonialDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{!currentTestimonial?.name ? 'Add New Testimonial' : 'Edit Testimonial'}</DialogTitle>
                <DialogDescription>
                  Fill out the form below to {!currentTestimonial?.name ? 'add a new testimonial' : 'update this testimonial\'s information'}.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSaveTestimonial}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={currentTestimonial?.name || ''}
                      onChange={(e) => setCurrentTestimonial({ ...currentTestimonial!, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={currentTestimonial?.location || ''}
                      onChange={(e) => setCurrentTestimonial({ ...currentTestimonial!, location: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="text">Testimonial Text</Label>
                    <Textarea
                      id="text"
                      value={currentTestimonial?.text || ''}
                      onChange={(e) => setCurrentTestimonial({ ...currentTestimonial!, text: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="rating">Rating (1-5)</Label>
                    <Select
                      value={currentTestimonial?.rating.toString() || '5'}
                      onValueChange={(value) => setCurrentTestimonial({ ...currentTestimonial!, rating: parseInt(value) })}
                    >
                      <SelectTrigger id="rating">
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 - Poor</SelectItem>
                        <SelectItem value="2">2 - Fair</SelectItem>
                        <SelectItem value="3">3 - Good</SelectItem>
                        <SelectItem value="4">4 - Very Good</SelectItem>
                        <SelectItem value="5">5 - Excellent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      value={currentTestimonial?.date || ''}
                      onChange={(e) => setCurrentTestimonial({ ...currentTestimonial!, date: e.target.value })}
                      placeholder="e.g., 2 months ago"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsTestimonialDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        {/* Placeholder tabs for other features */}
        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking Management</CardTitle>
              <CardDescription>Manage client session bookings and scheduling</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-10 text-center">
                <h3 className="text-lg font-medium mb-2">Booking Management Module</h3>
                <p className="text-muted-foreground mb-4">View, approve, and manage all client bookings with readers</p>
                <p>Additional booking management functionality can be implemented based on requirements.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Management</CardTitle>
              <CardDescription>Manage the products in your spiritual shop</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-10 text-center">
                <h3 className="text-lg font-medium mb-2">Shop Product Management</h3>
                <p className="text-muted-foreground mb-4">Add, edit, and manage product inventory and categories</p>
                <p>Additional product management functionality can be implemented based on requirements.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminDashboard;
