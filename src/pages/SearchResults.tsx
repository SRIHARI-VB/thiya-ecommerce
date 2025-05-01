
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { products } from '@/data/products';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const filteredProducts = products.filter(product => {
    const lowercaseQuery = query.toLowerCase();
    return (
      product.name.toLowerCase().includes(lowercaseQuery) || 
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
    );
  });
  
  // SEO friendly title and description
  const title = `Search Results for "${query}" | Thiya's Boutique`;
  const description = `Browse ${filteredProducts.length} products matching "${query}" in our premium collection.`;
  
  return (
    <Layout title={title} description={description} canonical={`/search?q=${encodeURIComponent(query)}`}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">
          Search Results for "{query}"
        </h1>
        
        <p className="text-gray-600 mb-8">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
        </p>
        
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div 
            className="text-center py-12 bg-gray-50 rounded-lg"
            role="alert"
            aria-live="polite"
          >
            <h2 className="text-xl font-semibold mb-4">No products found</h2>
            <p className="text-gray-600 mb-4">
              We couldn't find any products matching your search.
            </p>
            <p className="text-gray-600">
              Try using different keywords or check out our collections.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchResults;
