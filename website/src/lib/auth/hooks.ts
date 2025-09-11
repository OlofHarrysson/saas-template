"use client";

import { useSession, signOut as nextAuthSignOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/app/site-config";

interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
}

interface UseAuthReturn {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

/**
 * Client-side auth hook using NextAuth
 * Maintains the same API as the previous useAuth hook
 */
export function useAuth(): UseAuthReturn {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  // Transform NextAuth user to our User interface
  const user: User | null = session?.user
    ? {
        id: session.user.id || "",
        email: session.user.email || "",
        name: session.user.name || "",
        image: session.user.image || undefined,
      }
    : null;

  const logout = async () => {
    await nextAuthSignOut({
      callbackUrl: siteConfig.auth.loginUrl,
    });
  };

  // Placeholder for checkAuth - NextAuth handles this automatically
  const checkAuth = async () => {
    // NextAuth automatically handles session checking
    // This is kept for API compatibility
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    logout,
    checkAuth,
  };
}
