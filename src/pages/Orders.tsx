import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import OrdersList from "@/components/orders/OrdersList";

const Orders: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  // Redirect if not authenticated
  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Loading state
  if (loading) {
    return (
      <Layout title="My Orders | Thiya's Boutique">
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
          <div className="w-full max-w-md text-center">
            <p className="text-lg text-gray-600">Loading orders...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="My Orders | Thiya's Boutique"
      description="View and track all your orders from Thiya's Boutique."
      canonical="/orders"
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        <OrdersList />
      </div>
    </Layout>
  );
};

export default Orders;
