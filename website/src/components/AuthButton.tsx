"use client";

import Link from "next/link";
import { useAuth } from "@/stores/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { siteConfig } from "@/app/site-config";

export const AuthButton = () => {
  const { signOut } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return isAuthenticated ? (
    <button onClick={signOut} className="btn btn-outline hover:btn-error">
      Logout
    </button>
  ) : (
    <Link
      href={siteConfig.auth.loginUrl}
      className="btn btn-primary text-primary-foreground"
    >
      Login
    </Link>
  );
};
