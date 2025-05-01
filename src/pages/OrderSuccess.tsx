
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Your Order!</h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Your order has been placed successfully and is now being processed.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <p className="text-sm text-gray-600 mb-2">Order Reference</p>
            <p className="text-xl font-semibold text-boutique-700">{orderNumber}</p>
          </div>
          
          <p className="text-gray-600 mb-8">
            We've sent a confirmation email to your registered email address with all the order details.
            You can also check the status of your order by visiting your account.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-boutique-600 hover:bg-boutique-700">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/orders">View My Orders</Link>
            </Button>
          </div>
          
          <div className="mt-10 text-sm text-gray-500">
            <p>Need help with your order?</p>
            <p>
              <Link to="/contact" className="text-boutique-600 hover:text-boutique-700 font-medium">
                Contact our customer support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccess;
