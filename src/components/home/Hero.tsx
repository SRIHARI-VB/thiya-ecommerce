import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselItem {
  imageUrl: string;
  label: string;
  title: string;
}

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample carousel items - in a real app, these would come from props or an API
  const carouselItems: CarouselItem[] = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop",
      label: "New Collection",
      title: "Spring Essentials 2024",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop",
      label: "Featured Items",
      title: "Summer Elegance",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop",
      label: "Limited Edition",
      title: "Luxury Accessories",
    },
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselItems.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative overflow-hidden bg-boutique-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left mb-8 lg:mb-0 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-boutique-700">
              Discover Your{" "}
              <span className="text-boutique-400">Unique Style</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
              Curated collections featuring exclusive, high-quality products for
              those who appreciate refined elegance and timeless style.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-boutique-600 hover:bg-boutique-700 text-lg"
                asChild
              >
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-boutique-300 text-boutique-600 hover:bg-boutique-50 text-lg"
                asChild
              >
                <Link to="/categories">Explore Collections</Link>
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="relative h-80 sm:h-96 md:h-[450px] rounded-lg overflow-hidden animate-fade-in shadow-xl">
              {/* Carousel image */}
              <img
                src={carouselItems[currentIndex].imageUrl}
                alt={carouselItems[currentIndex].title}
                className="object-cover w-full h-full transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              {/* Carousel content */}
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-white/80 text-boutique-700 px-2 py-1 text-sm rounded-sm backdrop-blur-sm">
                  {carouselItems[currentIndex].label}
                </span>
                <h3 className="text-white text-2xl font-semibold mt-2">
                  {carouselItems[currentIndex].title}
                </h3>
              </div>

              {/* Carousel controls */}
              <div className="absolute inset-y-0 left-0 flex items-center">
                <button
                  onClick={goToPrevious}
                  className="bg-white/30 hover:bg-white/50 text-white p-2 rounded-r-lg backdrop-blur-sm"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={24} />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  onClick={goToNext}
                  className="bg-white/30 hover:bg-white/50 text-white p-2 rounded-l-lg backdrop-blur-sm"
                  aria-label="Next slide"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Carousel indicators */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                {carouselItems.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? "bg-white w-4" : "bg-white/50"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-boutique-200 rounded-full opacity-30 blur-3xl -z-10" />
            <div className="absolute -top-10 -left-10 w-60 h-60 bg-boutique-100 rounded-full opacity-40 blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
