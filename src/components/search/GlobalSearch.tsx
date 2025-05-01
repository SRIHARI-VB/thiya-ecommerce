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
import { Product } from "@/types";

interface GlobalSearchProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle Cmd/Ctrl + K to toggle dialog
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

  // Reset state and focus input when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setResults([]);
      inputRef.current?.focus();
    } else {
      setSearchQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // Real-time search
  useEffect(() => {
    if (!searchQuery) {
      setResults([]);
      return;
    }

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
      .slice(0, 8);

    setResults(filteredResults);
  }, [searchQuery]);

  const handleSelect = (productId: string) => {
    setIsOpen(false);
    navigate(`/product/${productId}`);
    setSearchQuery("");
    setResults([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
      setSearchQuery("");
      setResults([]);
    }
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <form onSubmit={handleSubmit}>
        <CommandInput
          ref={inputRef}
          placeholder="Search products..."
          value={searchQuery}
          onValueChange={(value) => setSearchQuery(value)}
          className="border-none focus-visible:ring-0"
        />
      </form>
      <ul>
        {searchQuery && results.length > 0 ? (
          <>
            {results.map((product) => (
              <li
                key={product.id}
                onClick={() => handleSelect(product.id)}
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
              </li>
            ))}
            <li
              onClick={() => {
                navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                setIsOpen(false);
                setSearchQuery("");
                setResults([]);
              }}
              className="text-boutique-600 justify-center font-medium px-4 py-2 cursor-pointer"
            >
              View all results ({results.length})
            </li>
          </>
        ) : searchQuery ? (
          <li className="py-6 text-center text-sm">
            No products found for "{searchQuery}"
          </li>
        ) : (
          <li className="py-6 text-center text-sm text-gray-500">
            <Search className="h-4 w-4 mx-auto mb-2" />
            <p>Type to search for products</p>
          </li>
        )}
      </ul>
      <CommandGroup heading="Quick Links">
        <CommandItem
          value="all-products"
          onSelect={() => {
            navigate("/shop");
            setIsOpen(false);
          }}
        >
          All Products
        </CommandItem>
        <CommandItem
          value="categories"
          onSelect={() => {
            navigate("/categories");
            setIsOpen(false);
          }}
        >
          Categories
        </CommandItem>
      </CommandGroup>
    </CommandDialog>
  );
};

export default GlobalSearch;
