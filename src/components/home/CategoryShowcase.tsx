
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/types';
import { ArrowRight } from 'lucide-react';

interface CategoryShowcaseProps {
  categories: Category[];
}

const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ categories }) => {
  return (
    <section className="py-12 md:py-16 bg-boutique-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-boutique-700 text-center mb-10">Shop by Category</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="h-60 md:h-72 w-full">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="text-xl md:text-2xl font-semibold text-white">{category.name}</h3>
                  <p className="text-white/80 text-sm mb-3">{category.description}</p>
                  <div className="flex items-center text-white text-sm font-medium transition-colors group-hover:text-boutique-300">
                    <span>Shop Now</span>
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
