"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut, getUserClient } from "./actions";

interface User {
  id: string;
  email: string;
  name: string;
}

interface UseAuthReturn {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  const checkAuth = async () => {
    try {
      const userData = await getUserClient();

      if (userData) {
        setIsAuthenticated(true);
        setUser({
          id: userData.$id,
          email: userData.email,
          name: userData.name,
        });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await signOut();
  };

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  return {
    isAuthenticated,
    user,
    isLoading,
    logout,
    checkAuth,
  };
}
