import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { products } from "@/data/products";
import { useDebounce } from "../../hooks/use-debounce";
import { Product } from "@/types";

interface GlobalSearchProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 200); // Shorter debounce time for more responsive feel
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle escape key to close dialog
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, setIsOpen]);

  // Focus search input when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Real-time search as user types (without waiting for debounce)
  useEffect(() => {
    if (!searchQuery) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    // Immediate search for responsive feel
    const quickSearch = () => {
      const lowercaseQuery = searchQuery.toLowerCase();
      const filteredResults = products
        .filter((product) => {
          const searchInName = product.name
            .toLowerCase()
            .includes(lowercaseQuery);
          const searchInDescription = product.description
            .toLowerCase()
            .includes(lowercaseQuery);
          const searchInCategory = product.category
            ?.toLowerCase()
            .includes(lowercaseQuery);
          const searchInTags = product.tags?.some((tag) =>
            tag.toLowerCase().includes(lowercaseQuery)
          );

          return (
            searchInName ||
            searchInDescription ||
            searchInCategory ||
            searchInTags
          );
        })
        .slice(0, 5); // Limit to 5 results for better performance

      setResults(filteredResults);
      setIsLoading(false);
    };

    // Execute search immediately for real-time results
    quickSearch();
  }, [searchQuery]);

  // More comprehensive search with debounce
  useEffect(() => {
    if (!debouncedSearchQuery) {
      return;
    }

    // This will run after the debounce period for more detailed results if needed
    const fullSearch = () => {
      const lowercaseQuery = debouncedSearchQuery.toLowerCase();
      const filteredResults = products
        .filter((product) => {
          const searchInName = product.name
            .toLowerCase()
            .includes(lowercaseQuery);
          const searchInDescription = product.description
            .toLowerCase()
            .includes(lowercaseQuery);
          const searchInCategory = product.category
            ?.toLowerCase()
            .includes(lowercaseQuery);
          const searchInTags = product.tags?.some((tag) =>
            tag.toLowerCase().includes(lowercaseQuery)
          );

          return (
            searchInName ||
            searchInDescription ||
            searchInCategory ||
            searchInTags
          );
        })
        .slice(0, 8); // Show more results after debounce

      setResults(filteredResults);
    };

    fullSearch();
  }, [debouncedSearchQuery]);

  const handleSelect = (productId: string) => {
    setIsOpen(false);
    navigate(`/product/${productId}`);
    setSearchQuery("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <form onSubmit={handleSubmit}>
        <CommandInput
          ref={inputRef}
          placeholder="Search products..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          className="border-none focus-visible:ring-0"
        />
      </form>
      <CommandList>
        {searchQuery && isLoading ? (
          <div className="py-6 text-center text-sm">
            <p>Searching...</p>
          </div>
        ) : (
          <>
            {results.length > 0 ? (
              <CommandGroup heading="Products">
                {results.map((product) => (
                  <CommandItem
                    key={product.id}
                    onSelect={() => handleSelect(product.id)}
                    className="flex items-center gap-2 px-4 py-2 cursor-pointer"
                  >
                    <div className="w-10 h-16 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                      <img
                        src={
                          product.images && product.images[0]
                            ? product.images[0]
                            : "/placeholder.svg"
                        }
                        alt={product.name}
                        className="max-w-full max-h-full object-cover"
                        width={40}
                        height={40}
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate">{product.name}</p>
                      <p className="text-sm text-gray-500 truncate">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </CommandItem>
                ))}
                {results.length > 0 && (
                  <CommandItem
                    onSelect={() => {
                      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                      setIsOpen(false);
                    }}
                    className="text-boutique-600 justify-center font-medium"
                  >
                    View all results ({results.length})
                  </CommandItem>
                )}
              </CommandGroup>
            ) : searchQuery ? (
              <CommandEmpty>No products found for "{searchQuery}"</CommandEmpty>
            ) : (
              <div className="py-6 text-center text-sm text-gray-500">
                <Search className="h-4 w-4 mx-auto mb-2" />
                <p>Type to search for products</p>
              </div>
            )}
            <CommandGroup heading="Quick Links">
              <CommandItem
                onSelect={() => {
                  navigate("/shop");
                  setIsOpen(false);
                }}
              >
                All Products
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  navigate("/categories");
                  setIsOpen(false);
                }}
              >
                Categories
              </CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
};

export default GlobalSearch;
