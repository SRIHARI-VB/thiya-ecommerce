import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  ChevronUp,
  Star,
  Truck,
  ArrowLeft,
  Heart,
} from "lucide-react";
import { getProductById, getBestSellers } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import ProductGrid from "@/components/products/ProductGrid";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const relatedProducts = getBestSellers().slice(0, 4);

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);

      // Set default size and color if available
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }

      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
    }

    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="mb-8">
            Sorry, the product you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : null;

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // For products with sizes and colors, require selection
    if (
      (product.sizes && product.sizes.length > 0 && !selectedSize) ||
      (product.colors && product.colors.length > 0 && !selectedColor)
    ) {
      toast({
        title: "Selection Required",
        description: "Please select all required options",
        variant: "destructive",
      });
      return;
    }

    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      // Redirect to login
      toast({
        title: "Authentication Required",
        description: "Please login to add items to favorites",
        variant: "default",
      });
      return;
    }

    toggleFavorite(product.id);
    toast({
      title: isFavorite(product.id)
        ? "Removed from Favorites"
        : "Added to Favorites",
      description: isFavorite(product.id)
        ? `${product.name} has been removed from your favorites.`
        : `${product.name} has been added to your favorites.`,
      variant: "default",
    });
  };

  const truncatedDescription =
    product.description.length > 150
      ? `${product.description.substring(0, 150)}...`
      : product.description;

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <Link
            to="/shop"
            className="inline-flex items-center text-sm text-gray-600 hover:text-boutique-600"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Shop
          </Link>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="w-full md:w-1/2">
            <div className="sticky top-20">
              <div className="flex flex-col-reverse md:flex-row gap-4">
                {/* Thumbnails */}
                <div className="flex md:flex-col gap-2 mt-4 md:mt-0">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden border-2 ${
                        selectedImage === image
                          ? "border-boutique-500"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Main Image */}
                <div className="flex-1 aspect-square rounded-lg overflow-hidden">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Pricing */}
            <div className="mt-4 flex items-center">
              {discountedPrice ? (
                <>
                  <span className="text-2xl font-bold text-boutique-700">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="ml-2 bg-red-100 text-red-700 px-2 py-0.5 rounded-md text-sm font-medium">
                    {product.discount}% OFF
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating || 0)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  {product.rating} ({product.reviews?.length || 0} reviews)
                </span>
              </div>
            )}

            {/* Short Description */}
            <div className="mt-4">
              <p className="text-gray-600">
                {showFullDescription
                  ? product.description
                  : truncatedDescription}
                {product.description.length > 150 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="ml-1 text-boutique-600 hover:text-boutique-700 font-medium"
                  >
                    {showFullDescription ? "Read less" : "Read more"}
                  </button>
                )}
              </p>
            </div>

            <Separator className="my-6" />

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Color
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1 border rounded-md text-sm ${
                        selectedColor === color
                          ? "border-boutique-600 bg-boutique-50 text-boutique-700"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <button className="text-sm text-boutique-600 hover:text-boutique-700">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3rem] px-3 py-1 border rounded-md text-sm ${
                        selectedSize === size
                          ? "border-boutique-600 bg-boutique-50 text-boutique-700"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add-to-Cart */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  <span className={product.stock < 10 ? "text-red-500" : ""}>
                    {product.stock} items
                  </span>{" "}
                  available
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-boutique-600 hover:bg-boutique-700"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={handleToggleFavorite}
                  className={`flex items-center justify-center ${
                    isFavorite(product.id)
                      ? "text-red-500 border-red-500 hover:bg-red-50"
                      : "text-gray-700 hover:text-boutique-600"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 mr-2 ${
                      isFavorite(product.id) ? "fill-current" : ""
                    }`}
                  />
                  {isFavorite(product.id) ? "Favorited" : "Add to Favorites"}
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-boutique-600 mt-0.5 mr-2" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Free Shipping
                  </h4>
                  <p className="text-sm text-gray-600">
                    Free standard shipping on orders over $100
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-medium mb-4">
                  Product Description
                </h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-600 mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque diam pellentesque bibendum non dui volutpat fringilla
                  bibendum. Urna, elit augue urna, vitae feugiat pretium donec
                  id elementum. Ultrices mattis vitae mus risus. Lacus nisi, et
                  ac dapibus sit eu velit in consequat.
                </p>
                <ul className="mt-4 list-disc list-inside text-gray-600">
                  <li>Premium quality materials</li>
                  <li>Ethically sourced and manufactured</li>
                  <li>Designed for durability and long-lasting use</li>
                  <li>Perfect for everyday wear or special occasions</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="details" className="mt-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-medium mb-4">Product Details</h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                        Material
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        Premium quality
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                        Weight
                      </td>
                      <td className="py-3 text-sm text-gray-600">0.5 kg</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                        Dimensions
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        25 x 10 x 5 cm
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                        Origin
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        Ethically made in Italy
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                        Care
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        Hand wash or gentle machine wash cold, line dry
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                        SKU
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {product.id}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="prose max-w-none">
                <div className="flex flex-wrap justify-between items-start mb-8">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Customer Reviews
                    </h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating || 0)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="ml-2 text-sm text-gray-600">
                        Based on {product.reviews?.length || 0} reviews
                      </p>
                    </div>
                  </div>
                  <Button className="bg-boutique-600 hover:bg-boutique-700">
                    Write a Review
                  </Button>
                </div>

                {product.reviews && product.reviews.length > 0 ? (
                  <div className="space-y-8">
                    {product.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-200 pb-8"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{review.userName}</h4>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">No reviews yet</p>
                    <p className="text-gray-500 mb-6">
                      Be the first to review this product
                    </p>
                    <Button className="bg-boutique-600 hover:bg-boutique-700">
                      Write a Review
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-boutique-700 mb-8">
            You May Also Like
          </h2>
          <ProductGrid products={relatedProducts} />
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
