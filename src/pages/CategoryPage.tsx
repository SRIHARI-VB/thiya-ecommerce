import React from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import { getProductsByCategory, categories } from "@/data/products";
import { useFavorites } from "@/context/FavoritesContext";
import ProductCard from "@/components/products/ProductCard";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((c) => c.slug === slug);
  const products = getProductsByCategory(category?.name || "");
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleToggleFavorite = (productId: string) => {
    toggleFavorite(productId);
  };

  if (!category) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Category Not Found
          </h1>
          <p>Sorry, we couldn't find the category you're looking for.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* <div className="relative h-[600px] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              {category.name}
            </h1>
            <p className="text-white/90 max-w-lg mx-auto">
              {category.description}
            </p>
          </div>
        </div>
      </div> */}

      <div className="container mx-auto px-4 py-12">
        {products.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold mb-8">
              All {category.name} Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={isFavorite(product.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">No products found</h2>
            <p className="text-gray-600">
              We are currently updating our collection. Please check back later!
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
