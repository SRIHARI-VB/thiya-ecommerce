import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { categories } from "@/data/products";
import { ArrowRight } from "lucide-react";

const Categories = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-12">
          Shop by Category
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.slug}`}
              className="group block"
            >
              <div className="relative h-[600px] overflow-hidden rounded-lg">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {category.name}
                  </h2>
                  <p className="text-white/90 mb-4 max-w-xs">
                    {category.description}
                  </p>
                  <div className="flex items-center text-boutique-300 font-medium">
                    <span>Shop Now</span>
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
