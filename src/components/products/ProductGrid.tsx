import React from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { useFavorites } from "@/context/FavoritesContext";

interface ProductGridProps {
  products: Product[];
  columns?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  columns = 4,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleToggleFavorite = (productId: string) => {
    toggleFavorite(productId);
  };

  const getColumnsClass = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 5:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
      case 4:
      default:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
    }
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <div className={`grid ${getColumnsClass()} gap-6`}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          isFavorite={isFavorite(product.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
