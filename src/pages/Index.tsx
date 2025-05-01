
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import { Button } from '@/components/ui/button';
import { categories, getFeaturedProducts, getBestSellers, getNewArrivals } from '@/data/products';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();

  return (
    <Layout>
      <Hero />
      
      <FeaturedProducts 
        title="Featured Products" 
        subtitle="Discover our carefully selected collection of premium items"
        products={featuredProducts} 
        viewAllLink="/shop" 
      />
      
      <CategoryShowcase categories={categories} />
      
      <FeaturedProducts 
        title="Best Sellers" 
        subtitle="Our most popular products that customers love"
        products={bestSellers} 
        viewAllLink="/shop?filter=best-sellers" 
      />
      
      <section className="py-16 bg-boutique-700 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg text-boutique-100 mb-8">
              Subscribe to our newsletter to receive updates on new arrivals, special offers, and exclusive content.
            </p>
            <div className="flex flex-col items-center sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-md bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-boutique-300 flex-grow"
              />
              <Button className="bg-boutique-300 hover:bg-boutique-400 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-boutique-700 opacity-50"></div>
        <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-boutique-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-80 h-80 bg-boutique-600 rounded-full opacity-20 blur-3xl"></div>
      </section>
      
      <FeaturedProducts 
        title="New Arrivals" 
        subtitle="The latest additions to our collections"
        products={newArrivals} 
        viewAllLink="/shop?filter=new-arrivals" 
      />
      
    </Layout>
  );
};

export default Index;
