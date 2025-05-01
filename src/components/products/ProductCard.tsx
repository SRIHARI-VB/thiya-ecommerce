import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface ProductCardProps {
  product: Product;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onToggleFavorite,
  isFavorite = false,
}) => {
  const { id, name, price, images, discount, new: isNew, bestSeller } = product;
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isAuthenticated } = useAuth();

  const discountedPrice = discount ? price * (1 - discount / 100) : price;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      // Redirect to login or show login prompt
      window.location.href = "/login?redirect=favorites";
      return;
    }

    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
  };

  return (
    <div className="group product-card relative h-[450px] flex flex-col">
      <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 mb-4 relative flex-grow">
        <Link to={`/product/${id}`} aria-label={`View details for ${name}`}>
          {/* Primary image with lazy loading */}
          <img
            src={images[0]}
            alt={name}
            loading="lazy"
            width="400"
            height="600"
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
              height="600"
              className="absolute top-0 left-0 h-full w-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          )}
        </Link>
        <button
          className={cn(
            "absolute top-2 right-2 p-2 rounded-full bg-white shadow-sm transition-colors",
            isFavorite ? "text-red-500" : "text-gray-500 hover:text-red-500"
          )}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={handleFavoriteClick}
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors",
              isFavorite ? "fill-current" : ""
            )}
          />
        </button>
        {(isNew || bestSeller || discount) && (
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {isNew && (
              <Badge
                variant="secondary"
                className="bg-boutique-300 text-white hover:bg-boutique-300"
              >
                New
              </Badge>
            )}
            {bestSeller && (
              <Badge
                variant="secondary"
                className="bg-boutique-500 text-white hover:bg-boutique-500"
              >
                Best Seller
              </Badge>
            )}
            {discount && <Badge variant="destructive">-{discount}%</Badge>}
          </div>
        )}
      </div>
      <div className="space-y-1 text-center mt-auto">
        <Link to={`/product/${id}`}>
          <h3 className="text-sm font-medium text-gray-900 hover:underline">
            {name}
          </h3>
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
