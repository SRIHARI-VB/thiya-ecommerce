import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock order data
const mockOrder = {
  id: 'ORD12345',
  orderNumber: 'LX12345',
  date: '2023-10-15T14:30:00Z',
  status: 'delivered',
  items: [
    {
      id: '1',
      name: 'Silk Dress',
      price: 49.99,
      quantity: 1,
      size: 'M',
      color: 'Blue',
      image: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Linen Shirt',
      price: 39.99,
      quantity: 2,
      size: 'L',
      color: 'White',
      image: '/placeholder.svg'
    }
  ],
  shippingAddress: {
    name: 'John Doe',
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
    phone: '+1 (555) 123-4567'
  },
  paymentMethod: 'razorpay',
  subtotal: 129.97,
  taxes: 10.40,
  shipping: 4.99,
  discount: 0,
  total: 145.36
};

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

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { isAuthenticated, loading } = useAuth();
  
  // In a real app, you would fetch the specific order using the orderId
  // For now, we'll just use our mock data
  const order = mockOrder;
  
  // Redirect if not authenticated
  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Loading state
  if (loading) {
    return (
      <Layout title="Order Details | Thiya's Boutique">
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
          <div className="w-full max-w-md text-center">
            <p className="text-lg text-gray-600">Loading order details...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Order not found state
  if (!order) {
    return (
      <Layout title="Order Not Found | Thiya's Boutique">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
            <p className="text-gray-600 mb-6">
              We couldn't find the order you're looking for.
            </p>
            <Button asChild>
              <a href="/orders">Back to Orders</a>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout 
      title={`Order ${order.orderNumber} | Thiya's Boutique`}
      description={`View details for your order ${order.orderNumber} from Thiya's Boutique.`}
      canonical={`/order/${orderId}`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <a href="/orders" className="text-sm text-gray-600 hover:text-boutique-600 mb-2 inline-block">
              &larr; Back to Orders
            </a>
            <h1 className="text-3xl font-bold">Order {order.orderNumber}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Order Date</p>
              <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
            </div>
            {getStatusBadge(order.status)}
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="bg-gray-100 w-20 h-20 rounded flex items-center justify-center flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          Size: {item.size}, Color: {item.color}
                        </p>
                        <div className="flex justify-between mt-1">
                          <p className="text-sm">{item.quantity} × ${item.price.toFixed(2)}</p>
                          <p className="font-medium">${(item.quantity * item.price).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="font-medium">{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.street}</p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                    <p className="pt-2">{order.shippingAddress.phone}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">
                    <span className="font-medium">Payment Method:</span> {order.paymentMethod === 'razorpay' ? 'Razorpay' : order.paymentMethod}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Payment Status:</span> {order.status === 'cancelled' ? 'Cancelled' : 'Completed'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${order.taxes.toFixed(2)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${order.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
              
              {order.status !== 'cancelled' && (
                <div className="mt-6">
                  <Button variant="outline" className="w-full mb-3">
                    Track Order
                  </Button>
                  <Button variant="outline" className="w-full">
                    Download Invoice
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail;