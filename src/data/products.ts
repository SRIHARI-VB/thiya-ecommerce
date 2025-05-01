import { Product, Category } from "../types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Women",
    description: "Women's fashion clothing",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop",
    slug: "women",
  },
  {
    id: "2",
    name: "Men",
    description: "Men's fashion clothing",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop",
    slug: "men",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Silk Blend V-Neck Sweater",
    description:
      "Luxurious silk blend V-neck sweater with ribbed trim. Perfect for layering or wearing alone.",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop",
    ],
    category: "Women",
    tags: ["sweater", "silk", "women", "luxury"],
    stock: 15,
    rating: 4.7,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Navy", "Cream", "Burgundy"],
    featured: true,
    bestSeller: true,
  },
  {
    id: "2",
    name: "Tailored Wool Blazer",
    description:
      "Classic tailored wool blazer with a modern fit. Features notched lapels and flap pockets.",
    price: 149.99,
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop",
    ],
    category: "Men",
    tags: ["blazer", "wool", "men", "formal"],
    stock: 8,
    discount: 15,
    rating: 4.5,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Charcoal", "Navy", "Black"],
    featured: true,
  },

  {
    id: "4",
    name: "Cashmere Throw Blanket",
    description:
      "Ultra-soft 100% cashmere throw blanket with fringed edges. Perfect for adding warmth and luxury to your living space.",
    price: 256,
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop",
    ],
    category: "Women",
    tags: ["blanket", "cashmere", "home", "luxury"],
    stock: 5,
    discount: 10,
    rating: 4.9,
    colors: ["Ivory", "Gray", "Camel"],
    featured: true,
    new: true,
  },

  {
    id: "7",
    name: "Linen Button-Down Shirt",
    description:
      "Relaxed fit linen button-down shirt. Breathable and perfect for warm weather.",
    price: 249.99,
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop",
    ],
    category: "Women",
    tags: ["watch", "gold", "accessories", "luxury"],
    stock: 7,
    rating: 4.9,
    featured: true,
  },
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

export const getBestSellers = (): Product[] => {
  return products.filter((product) => product.bestSeller);
};

export const getNewArrivals = (): Product[] => {
  return products.filter((product) => product.new);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};
