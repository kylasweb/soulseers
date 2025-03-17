
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Edit, Trash, Eye, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';

// Mock reader data
const mockReaders = [
  {
    id: '1',
    name: 'Willow Ravenwood',
    specialty: 'Intuitive Healer',
    email: 'willow@example.com',
    status: 'active',
    rating: 4.8,
    sessionsCompleted: 342,
    joinDate: '2023-02-15',
  },
  {
    id: '2',
    name: 'Jasper Moonstone',
    specialty: 'Energy Reader',
    email: 'jasper@example.com',
    status: 'active',
    rating: 4.9,
    sessionsCompleted: 421,
    joinDate: '2023-01-10',
  },
  {
    id: '3',
    name: 'Luna Starlight',
    specialty: 'Astrologer',
    email: 'luna@example.com',
    status: 'inactive',
    rating: 4.5,
    sessionsCompleted: 128,
    joinDate: '2023-04-22',
  },
  {
    id: '4',
    name: 'Orion Blackwood',
    specialty: 'Tarot Reader',
    email: 'orion@example.com',
    status: 'pending',
    rating: 0,
    sessionsCompleted: 0,
    joinDate: '2023-06-05',
  },
  {
    id: '5',
    name: 'Seraphina Crystal',
    specialty: 'Medium',
    email: 'seraphina@example.com',
    status: 'active',
    rating: 4.7,
    sessionsCompleted: 267,
    joinDate: '2023-03-18',
  },
];

const ReadersTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  
  // Filter readers based on search and filters
  const filteredReaders = mockReaders.filter(reader => {
    const matchesSearch = reader.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        reader.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || reader.status === statusFilter;
    const matchesSpecialty = specialtyFilter === 'all' || reader.specialty === specialtyFilter;
    
    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search readers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
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
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-48">
          <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              <SelectItem value="Intuitive Healer">Intuitive Healer</SelectItem>
              <SelectItem value="Energy Reader">Energy Reader</SelectItem>
              <SelectItem value="Astrologer">Astrologer</SelectItem>
              <SelectItem value="Tarot Reader">Tarot Reader</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button>Add Reader</Button>
      </div>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Sessions</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReaders.length > 0 ? (
              filteredReaders.map((reader) => (
                <TableRow key={reader.id}>
                  <TableCell className="font-medium">{reader.name}</TableCell>
                  <TableCell>{reader.specialty}</TableCell>
                  <TableCell>
                    <Badge variant={
                      reader.status === 'active' 
                        ? 'default' 
                        : reader.status === 'inactive' 
                          ? 'destructive' 
                          : 'outline'
                    }>
                      {reader.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {reader.rating > 0 ? (
                        <>
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                          <span>{reader.rating}</span>
                        </>
                      ) : (
                        <span className="text-muted-foreground">N/A</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{reader.sessionsCompleted}</TableCell>
                  <TableCell>{new Date(reader.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
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
                <TableCell colSpan={7} className="text-center text-muted-foreground py-6">
                  No readers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ReadersTable;
