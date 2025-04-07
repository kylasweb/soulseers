
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, ArrowUpRight, ArrowDownRight, CreditCard, Wallet, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock payment data
const mockPayments = [
  {
    id: '1',
    reader: 'Willow Ravenwood',
    amount: 432.50,
    status: 'completed',
    date: '2023-06-15',
    method: 'Direct Deposit',
    sessions: 24
  },
  {
    id: '2',
    reader: 'Jasper Moonstone',
    amount: 567.75,
    status: 'pending',
    date: '2023-06-14',
    method: 'PayPal',
    sessions: 31
  },
  {
    id: '3',
    reader: 'Luna Starlight',
    amount: 128.25,
    status: 'completed',
    date: '2023-06-10',
    method: 'Direct Deposit',
    sessions: 7
  },
  {
    id: '4',
    reader: 'Seraphina Crystal',
    amount: 389.00,
    status: 'failed',
    date: '2023-06-05',
    method: 'Bank Transfer',
    sessions: 21
  },
  {
    id: '5',
    reader: 'Zephyr Nightshade',
    amount: 245.50,
    status: 'completed',
    date: '2023-06-02',
    method: 'PayPal',
    sessions: 14
  },
];

const ReaderPayments = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid (Month)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,568</div>
            <div className="flex items-center pt-1">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs text-green-500 font-medium">+12.5%</span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,285</div>
            <div className="flex items-center pt-1">
              <ArrowDownRight className="h-4 w-4 text-amber-500 mr-1" />
              <span className="text-xs text-amber-500 font-medium">Awaiting processing</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$7,954</div>
            <div className="flex items-center pt-1">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs text-green-500 font-medium">+8.2%</span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Success Rate</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.7%</div>
            <div className="flex items-center pt-1">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs text-green-500 font-medium">+0.3%</span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>
                Reader payments for the current month
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reader</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Sessions</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.reader}</TableCell>
                  <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{payment.sessions}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>
                    <Badge variant={
                      payment.status === 'completed' 
                        ? 'default' 
                        : payment.status === 'pending'
                          ? 'outline'
                          : 'destructive'
                    }>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View Details</Button>
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

export default ReaderPayments;
