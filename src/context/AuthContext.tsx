import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  updateUserProfile: (data: { name: string; phone?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user for demo purposes
const MOCK_USER: User = {
  id: "1",
  name: "Demo User",
  email: "demo@example.com",
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    setLoading(true);

    // Simple validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Email and password are required",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      // Mock authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo: any email/password with demo@example.com works
      if (email === "demo@example.com") {
        setUser(MOCK_USER);
        localStorage.setItem("user", JSON.stringify(MOCK_USER));
        toast({
          title: "Success",
          description: "You have been successfully logged in",
        });
      } else {
        // Create a new user with this email
        const newUser = {
          id: Date.now().toString(),
          name: email.split("@")[0],
          email,
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        toast({
          title: "Success",
          description: "You have been successfully logged in",
        });
      }
    } catch (error) {
      console.error("Login error", error);
      toast({
        title: "Error",
        description: "Failed to log in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    // Simulate API call
    setLoading(true);

    try {
      // Mock authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock Google user data
      const googleUser = {
        id: "google-" + Date.now().toString(),
        name: "Google User",
        email: "google.user@example.com",
        provider: "google",
      };

      setUser(googleUser);
      localStorage.setItem("user", JSON.stringify(googleUser));

      toast({
        title: "Success",
        description: "You have been successfully logged in with Google",
      });
    } catch (error) {
      console.error("Google login error", error);
      toast({
        title: "Error",
        description: "Failed to log in with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    setLoading(true);

    // Simple validation
    if (!name || !email || !password) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      // Mock authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      toast({
        title: "Success",
        description: "Account created successfully",
      });
    } catch (error) {
      console.error("Registration error", error);
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const updateUserProfile = async (data: { name: string; phone?: string }) => {
    setLoading(true);
    try {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        loginWithGoogle,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
