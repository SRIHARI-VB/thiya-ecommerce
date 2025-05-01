import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types";
import { useAuth } from "./AuthContext";

interface FavoritesContextType {
  favorites: string[];
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  favoriteProducts: Product[];
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const { isAuthenticated, user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load favorites from localStorage or API when component mounts
  useEffect(() => {
    const loadFavorites = async () => {
      setIsLoading(true);

      if (isAuthenticated && user) {
        try {
          // In a real implementation, fetch from API
          // const response = await fetch('/api/favorites', {
          //   headers: { Authorization: `Bearer ${authToken}` }
          // });
          // const data = await response.json();
          // setFavorites(data.items.map((item: any) => item.productId));
          // setFavoriteProducts(data.items);

          // For now, just load from localStorage
          const storedFavorites = localStorage.getItem(`favorites_${user.id}`);
          if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
          }
        } catch (error) {
          console.error("Failed to fetch favorites:", error);
        }
      } else {
        // Clear favorites when logged out
        setFavorites([]);
        setFavoriteProducts([]);
      }

      setIsLoading(false);
    };

    loadFavorites();
  }, [isAuthenticated, user]);

  // Save favorites to localStorage when they change
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites));
    }
  }, [favorites, isAuthenticated, user]);

  const addToFavorites = (productId: string) => {
    if (!isAuthenticated) {
      // Redirect to login
      window.location.href = "/login?redirect=favorites";
      return;
    }

    if (!favorites.includes(productId)) {
      setFavorites([...favorites, productId]);

      // In a real implementation, call API
      // fetch('/api/favorites', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${authToken}`
      //   },
      //   body: JSON.stringify({ productId })
      // });
    }
  };

  const removeFromFavorites = (productId: string) => {
    if (!isAuthenticated) return;

    setFavorites(favorites.filter((id) => id !== productId));
    setFavoriteProducts(
      favoriteProducts.filter((product) => product.id !== productId)
    );

    // In a real implementation, call API
    // fetch(`/api/favorites/${productId}`, {
    //   method: 'DELETE',
    //   headers: { Authorization: `Bearer ${authToken}` }
    // });
  };

  const toggleFavorite = (productId: string) => {
    if (isFavorite(productId)) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
  };

  const isFavorite = (productId: string) => {
    return favorites.includes(productId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
        favoriteProducts,
        isLoading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
