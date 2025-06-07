"use client";

import Link from "next/link";
import { siteConfig } from "@/app/site-config";
import { useAuth } from "@/lib/auth/useAuth";

export const AuthButton = () => {
  const { isAuthenticated, logout } = useAuth();

  return isAuthenticated ? (
    <button onClick={logout} className="btn btn-outline hover:btn-error">
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
