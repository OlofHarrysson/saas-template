"use client";

import { useSession } from "next-auth/react";

/**
 * Simple auth hook that wraps NextAuth's useSession
 * Use this instead of directly importing useSession
 */
export function useAuth() {
  const { data: session, status } = useSession();

  return {
    session,
    user: session?.user ?? null,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
  };
}
