import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock orders data
const mockOrders = [
  {
    id: 'ORD12345',
    date: '2023-10-15',
    status: 'delivered',
    total: 129.99,
    items: 3
  },
  {
    id: 'ORD12346',
    date: '2023-09-28',
    status: 'processing',
    total: 79.50,
    items: 2
  },
  {
    id: 'ORD12347',
    date: '2023-08-12',
    status: 'delivered',
    total: 245.00,
    items: 4
  }
];

// Helper function for status badge
const getStatusBadge = (status: string) => {
  switch(status) {
    case 'delivered':
      return <Badge className="bg-green-500">Delivered</Badge>;
    case 'processing':
      return <Badge className="bg-blue-500">Processing</Badge>;
    case 'shipped':
      return <Badge className="bg-purple-500">Shipped</Badge>;
    case 'cancelled':
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const AccountOrdersList = () => {
  if (mockOrders.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-3">No orders yet</h3>
        <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
        <Link to="/shop">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>A list of your recent orders.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Items</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockOrders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
            <TableCell>{getStatusBadge(order.status)}</TableCell>
            <TableCell>{order.items}</TableCell>
            <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
            <TableCell className="text-right">
              <Link to={`/order/${order.id}`}>
                <Button variant="outline" size="sm">View</Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AccountOrdersList;