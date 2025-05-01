import React from "react";
import { Product } from "@/types";
import ProductGrid from "../products/ProductGrid";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import ProductCard from "../products/ProductCard";

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  columns?: number;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  title,
  subtitle,
  products,
  viewAllLink,
  columns = 4,
}) => {
  const isMobile = useIsMobile();

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-boutique-700">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-gray-600 max-w-2xl">{subtitle}</p>
            )}
          </div>
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="group flex items-center text-boutique-600 hover:text-boutique-700 mt-4 md:mt-0"
            >
              <span>View all</span>
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        {isMobile ? (
          <div className="mt-6 -mx-4 px-4">
            <Carousel
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {products.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="pl-2 md:pl-4 basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-end gap-2 mt-4">
                <CarouselPrevious className="static transform-none h-8 w-8 translate-y-0" />
                <CarouselNext className="static transform-none h-8 w-8 translate-y-0" />
              </div>
            </Carousel>
          </div>
        ) : (
          <ProductGrid products={products} columns={columns} />
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
