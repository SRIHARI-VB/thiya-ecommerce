
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, price, images, discount, new: isNew, bestSeller } = product;
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const discountedPrice = discount ? price * (1 - discount / 100) : price;
  
  return (
    <div className="group product-card relative">
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
        <Link to={`/product/${id}`} aria-label={`View details for ${name}`}>
          {/* Primary image with lazy loading */}
          <img
            src={images[0]}
            alt={name}
            loading="lazy"
            width="400"
            height="400"
            onLoad={() => setImageLoaded(true)}
            className={cn(
              "h-full w-full object-cover object-center product-image",
              !imageLoaded && "opacity-0"
            )}
          />
          {/* Placeholder while loading */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="w-8 h-8 border-t-2 border-boutique-500 rounded-full animate-spin"></div>
            </div>
          )}
          {/* Hover image */}
          {images.length > 1 && (
            <img
              src={images[1]}
              alt={`Alternative view of ${name}`}
              loading="lazy"
              width="400"
              height="400"
              className="absolute top-0 left-0 h-full w-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          )}
        </Link>
        <div className="absolute top-2 right-2">
          <button 
            className="p-1 rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Add to wishlist"
          >
            <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
          </button>
        </div>
        {(isNew || bestSeller || discount) && (
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {isNew && (
              <Badge variant="secondary" className="bg-boutique-300 text-white hover:bg-boutique-300">
                New
              </Badge>
            )}
            {bestSeller && (
              <Badge variant="secondary" className="bg-boutique-500 text-white hover:bg-boutique-500">
                Best Seller
              </Badge>
            )}
            {discount && (
              <Badge variant="destructive">
                -{discount}%
              </Badge>
            )}
          </div>
        )}
      </div>
      <div className="space-y-1 text-center">
        <Link to={`/product/${id}`}>
          <h3 className="text-sm font-medium text-gray-900 hover:underline">{name}</h3>
        </Link>
        <div className="flex justify-center items-center space-x-2">
          {discount ? (
            <>
              <p className="text-sm font-medium text-gray-900">
                ${discountedPrice.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 line-through">
                ${price.toFixed(2)}
              </p>
            </>
          ) : (
            <p className="text-sm font-medium text-gray-900">
              ${price.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
