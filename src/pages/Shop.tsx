import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import FilterSidebar, {
  FilterValues,
} from "@/components/products/FilterSidebar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router-dom";
import { products } from "@/data/products";
import { Product } from "@/types";
import { FilterIcon, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useFavorites } from "@/context/FavoritesContext";
import ProductCard from "@/components/products/ProductCard";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const queryParam = searchParams.get("q");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // Get unique categories, colors, and sizes
  const allCategories = [...new Set(products.map((p) => p.category))];
  const allColors = [...new Set(products.flatMap((p) => p.colors || []))];
  const allSizes = [...new Set(products.flatMap((p) => p.sizes || []))];
  const minPrice = Math.min(...products.map((p) => p.price));
  const maxPrice = Math.max(...products.map((p) => p.price));

  const [filters, setFilters] = useState<FilterValues>({
    categories: categoryParam ? [categoryParam] : [],
    colors: [],
    sizes: [],
    priceRange: [minPrice, maxPrice],
  });

  // Applied filter chips
  const getActiveFilters = () => {
    const active = [];

    // Categories
    filters.categories.forEach((cat) =>
      active.push({ type: "category", value: cat })
    );

    // Colors
    filters.colors.forEach((color) =>
      active.push({ type: "color", value: color })
    );

    // Sizes
    filters.sizes.forEach((size) => active.push({ type: "size", value: size }));

    // Price Range
    if (filters.priceRange[0] > minPrice || filters.priceRange[1] < maxPrice) {
      active.push({
        type: "price",
        value: `$${filters.priceRange[0].toFixed(
          2
        )} - $${filters.priceRange[1].toFixed(2)}`,
      });
    }

    return active;
  };

  // Remove a single filter
  const removeFilter = (type: string, value: string) => {
    if (type === "category") {
      setFilters((prev) => ({
        ...prev,
        categories: prev.categories.filter((c) => c !== value),
      }));
    } else if (type === "color") {
      setFilters((prev) => ({
        ...prev,
        colors: prev.colors.filter((c) => c !== value),
      }));
    } else if (type === "size") {
      setFilters((prev) => ({
        ...prev,
        sizes: prev.sizes.filter((s) => s !== value),
      }));
    } else if (type === "price") {
      setFilters((prev) => ({
        ...prev,
        priceRange: [minPrice, maxPrice],
      }));
    }
  };

  // Handle filter changes from sidebar
  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  // Apply filters and sorting
  useEffect(() => {
    // Start with all products or search results
    let filtered = [...products];

    // Apply search query if exists
    if (queryParam) {
      const query = queryParam.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.tags && p.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    }

    // Apply category filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) =>
        filters.categories.includes(p.category)
      );
    }

    // Apply color filters
    if (filters.colors.length > 0) {
      filtered = filtered.filter(
        (p) =>
          p.colors && p.colors.some((color) => filters.colors.includes(color))
      );
    }

    // Apply size filters
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(
        (p) => p.sizes && p.sizes.some((size) => filters.sizes.includes(size))
      );
    }

    // Apply price filter
    filtered = filtered.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
        break;
      case "best-selling":
        filtered.sort(
          (a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0)
        );
        break;
      case "featured":
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
  }, [filters, sortBy, queryParam]);

  const activeFilters = getActiveFilters();

  const handleToggleFavorite = (productId: string) => {
    toggleFavorite(productId);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Page header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-boutique-700 mb-2">
            {queryParam
              ? `Search Results for "${queryParam}"`
              : "Shop All Products"}
          </h1>
          {!queryParam && (
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our curated collection of premium products, carefully
              selected for quality and style.
            </p>
          )}
        </div>

        {/* Main content area with filters and products */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-20">
              <FilterSidebar
                categories={allCategories}
                colors={allColors}
                sizes={allSizes}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>

          {/* Products area */}
          <div className="flex-1">
            {/* Mobile filter button and sorting */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden">
                    <FilterIcon className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[300px] sm:w-[350px] p-0"
                >
                  <FilterSidebar
                    categories={allCategories}
                    colors={allColors}
                    sizes={allSizes}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    onFilterChange={handleFilterChange}
                    onClose={() => setShowMobileFilters(false)}
                    isMobile={true}
                  />
                </SheetContent>
              </Sheet>

              <div className="flex items-center ml-auto">
                <span className="text-sm text-gray-500 mr-2">Sort by:</span>
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Featured" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="best-selling">Best Selling</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active filters */}
            {activeFilters.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-500">Active filters:</span>
                  {activeFilters.map((filter, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center bg-boutique-100 text-boutique-700 py-1 px-3 rounded-full text-sm"
                    >
                      {filter.value}
                      <button
                        onClick={() => removeFilter(filter.type, filter.value)}
                        className="ml-1 text-boutique-700 hover:text-boutique-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <Button
                    variant="link"
                    size="sm"
                    className="text-boutique-600 hover:text-boutique-700 py-0 h-auto"
                    onClick={() => {
                      setFilters({
                        categories: [],
                        colors: [],
                        sizes: [],
                        priceRange: [minPrice, maxPrice],
                      });
                    }}
                  >
                    Clear all
                  </Button>
                </div>
              </div>
            )}

            {/* Results count */}
            <div className="mb-6">
              <p className="text-sm text-gray-500">
                Showing {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            </div>

            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={isFavorite(product.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-gray-500">
                  No products match your criteria.
                </p>
                <Button
                  onClick={() => {
                    setFilters({
                      categories: [],
                      colors: [],
                      sizes: [],
                      priceRange: [minPrice, maxPrice],
                    });
                    setSortBy("featured");
                  }}
                  className="mt-4 bg-boutique-600 hover:bg-boutique-700 text-white"
                >
                  Reset Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {/* Add pagination component here when needed */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
