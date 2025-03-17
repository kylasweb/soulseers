
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Edit, Trash, Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock service data
const mockServices = [
  {
    id: '1',
    name: 'Tarot Reading',
    description: 'Comprehensive tarot card reading session',
    price: 3.99,
    duration: 'Per Minute',
    category: 'Divination',
    status: 'active',
    readers: 12
  },
  {
    id: '2',
    name: 'Aura Cleansing',
    description: 'Energy cleansing and realignment',
    price: 4.50,
    duration: 'Per Minute',
    category: 'Energy Work',
    status: 'active',
    readers: 8
  },
  {
    id: '3',
    name: 'Past Life Regression',
    description: 'Explore your past lives and karmic patterns',
    price: 5.99,
    duration: 'Per Minute',
    category: 'Spiritual Guidance',
    status: 'inactive',
    readers: 5
  },
  {
    id: '4',
    name: 'Chakra Alignment',
    description: 'Balance and align your energy centers',
    price: 4.25,
    duration: 'Per Minute',
    category: 'Energy Work',
    status: 'active',
    readers: 14
  },
  {
    id: '5',
    name: 'Spirit Communication',
    description: 'Connect with loved ones who have passed',
    price: 6.50,
    duration: 'Per Minute',
    category: 'Mediumship',
    status: 'active',
    readers: 7
  },
];

const ReaderServices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter services based on search and filters
  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Service Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Card className="border-2 border-primary/50">
              <CardContent className="p-4 text-center">
                <h3 className="font-medium">Divination</h3>
                <p className="text-sm text-muted-foreground mt-1">12 services</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <h3 className="font-medium">Energy Work</h3>
                <p className="text-sm text-muted-foreground mt-1">8 services</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <h3 className="font-medium">Spiritual Guidance</h3>
                <p className="text-sm text-muted-foreground mt-1">10 services</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <h3 className="font-medium">Mediumship</h3>
                <p className="text-sm text-muted-foreground mt-1">5 services</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <h3 className="font-medium">Astrology</h3>
                <p className="text-sm text-muted-foreground mt-1">7 services</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="w-full md:w-48">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Divination">Divination</SelectItem>
              <SelectItem value="Energy Work">Energy Work</SelectItem>
              <SelectItem value="Spiritual Guidance">Spiritual Guidance</SelectItem>
              <SelectItem value="Mediumship">Mediumship</SelectItem>
              <SelectItem value="Astrology">Astrology</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-40">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button className="flex">
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price (per min)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Active Readers</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-muted-foreground">{service.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{service.category}</TableCell>
                  <TableCell>${service.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={service.status === 'active' ? 'default' : 'destructive'}>
                      {service.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{service.readers}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
                  No services found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ReaderServices;
