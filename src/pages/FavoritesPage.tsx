import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Product } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";
import Layout from "@/components/layout/Layout";

const FavoritesPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { favorites, toggleFavorite, isLoading } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated && !redirected) {
      setRedirected(true); // Prevent redirect loop
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (isAuthenticated) {
      // Get products that are in favorites
      const favProducts = products.filter((product) =>
        favorites.includes(product.id)
      );
      setFavoriteProducts(favProducts);
    }
  }, [isAuthenticated, favorites, navigate, location.pathname, redirected]);

  const handleToggleFavorite = (productId: string) => {
    toggleFavorite(productId);
  };

  // If not authenticated, show loading state instead of null
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-boutique-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">My Favorites</h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-boutique-500"></div>
          </div>
        ) : favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={true}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Alert variant="default" className="max-w-md mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No favorites yet</AlertTitle>
              <AlertDescription>
                You haven't added any products to your favorites.
              </AlertDescription>
            </Alert>
            <Button
              className="mt-6 bg-boutique-600 hover:bg-boutique-700"
              onClick={() => navigate("/shop")}
            >
              Browse Products
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FavoritesPage;
