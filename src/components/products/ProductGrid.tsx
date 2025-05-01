
import React from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  columns?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, columns = 4 }) => {
  const gridClassMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };
  
  const gridClass = columns <= 4 && columns >= 1 ? gridClassMap[columns as 1 | 2 | 3 | 4] : gridClassMap[4];
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12" aria-live="polite">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }
  
  return (
    <div 
      className={`grid ${gridClass} gap-x-6 gap-y-10`}
      role="list"
      aria-label="Products grid"
    >
      {products.map(product => (
        <div key={product.id} role="listitem">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
