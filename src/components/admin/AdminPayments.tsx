
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, DollarSign, RefreshCw, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

const AdminPayments = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage transactions, fees, and refunds
          </p>
        </div>
        <CreditCard className="h-8 w-8 text-primary" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$54,329.87</div>
            <p className="text-xs text-muted-foreground mt-1">+19% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,890.00</div>
            <p className="text-xs text-muted-foreground mt-1">8 transactions pending</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Refunds Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,240.50</div>
            <p className="text-xs text-muted-foreground mt-1">3 refunds this month</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Transaction Management</CardTitle>
          <CardDescription>
            View and manage all financial transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="recent">
            <TabsList className="mb-4">
              <TabsTrigger value="recent">Recent Transactions</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="refunds">Refunds</TabsTrigger>
              <TabsTrigger value="disputes">Disputes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recent">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: 'TX-9385', customer: 'Emma Wilson', date: '2023-10-12', amount: '$120.00', status: 'completed' },
                    { id: 'TX-9384', customer: 'James Brown', date: '2023-10-11', amount: '$85.50', status: 'completed' },
                    { id: 'TX-9383', customer: 'Sarah Lee', date: '2023-10-11', amount: '$220.00', status: 'completed' },
                    { id: 'TX-9382', customer: 'Mike Johnson', date: '2023-10-10', amount: '$45.99', status: 'completed' },
                    { id: 'TX-9381', customer: 'Anna Murphy', date: '2023-10-09', amount: '$199.00', status: 'completed' },
                  ].map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="font-medium">{tx.id}</TableCell>
                      <TableCell>{tx.customer}</TableCell>
                      <TableCell>{tx.date}</TableCell>
                      <TableCell>{tx.amount}</TableCell>
                      <TableCell>
                        <Badge variant="default">{tx.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="pending">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: 'TX-9390', customer: 'Robert Chen', date: '2023-10-14', amount: '$135.00', status: 'pending' },
                    { id: 'TX-9389', customer: 'Lisa Taylor', date: '2023-10-14', amount: '$79.99', status: 'pending' },
                    { id: 'TX-9388', customer: 'Thomas Garcia', date: '2023-10-13', amount: '$250.00', status: 'pending' },
                  ].map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="font-medium">{tx.id}</TableCell>
                      <TableCell>{tx.customer}</TableCell>
                      <TableCell>{tx.date}</TableCell>
                      <TableCell>{tx.amount}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{tx.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="mr-2">Approve</Button>
                        <Button variant="ghost" size="sm" className="text-destructive">Decline</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="refunds">
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Refund ID</TableHead>
                      <TableHead>Original Transaction</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { id: 'RF-1824', txId: 'TX-9375', customer: 'David Wilson', amount: '$85.00', reason: 'Changed mind', status: 'completed' },
                      { id: 'RF-1823', txId: 'TX-9370', customer: 'Karen Phillips', amount: '$120.50', reason: 'Service issue', status: 'processing' },
                      { id: 'RF-1822', txId: 'TX-9362', customer: 'John Davis', amount: '$35.00', reason: 'Duplicate charge', status: 'completed' },
                    ].map((refund) => (
                      <TableRow key={refund.id}>
                        <TableCell className="font-medium">{refund.id}</TableCell>
                        <TableCell>{refund.txId}</TableCell>
                        <TableCell>{refund.customer}</TableCell>
                        <TableCell>{refund.amount}</TableCell>
                        <TableCell>{refund.reason}</TableCell>
                        <TableCell>
                          <Badge variant={refund.status === 'completed' ? 'default' : 'secondary'}>
                            {refund.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="disputes">
              <div className="space-y-4">
                <div className="rounded-md bg-amber-50 border border-amber-200 p-4 mb-4">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-amber-600 mr-2" />
                    <p className="text-amber-800 text-sm">There are 2 active disputes that require your attention.</p>
                  </div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Dispute ID</TableHead>
                      <TableHead>Transaction</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { id: 'DS-421', txId: 'TX-9368', customer: 'Rebecca Jones', amount: '$150.00', reason: 'Service not provided', status: 'active' },
                      { id: 'DS-420', txId: 'TX-9355', customer: 'Alex Martin', amount: '$95.50', reason: 'Quality issue', status: 'active' },
                      { id: 'DS-419', txId: 'TX-9341', customer: 'Nicole Patel', amount: '$210.00', reason: 'Unauthorized charge', status: 'resolved' },
                    ].map((dispute) => (
                      <TableRow key={dispute.id}>
                        <TableCell className="font-medium">{dispute.id}</TableCell>
                        <TableCell>{dispute.txId}</TableCell>
                        <TableCell>{dispute.customer}</TableCell>
                        <TableCell>{dispute.amount}</TableCell>
                        <TableCell>{dispute.reason}</TableCell>
                        <TableCell>
                          <Badge variant={dispute.status === 'active' ? 'destructive' : 'default'}>
                            {dispute.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Respond</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPayments;
