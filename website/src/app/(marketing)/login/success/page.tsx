"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/auth/hooks";
import { siteConfig } from "@/app/site-config";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";

export default function LoginSuccessPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // Authenticated - redirect to dashboard
        router.replace(siteConfig.auth.callbackUrl);
      } else {
        // Not authenticated - something went wrong, back to login
        router.replace("/login?error=auth_failed");
      }
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <AuthLayout
      title="Signing you in..."
      subtitle="Please wait while we complete your sign in."
      icon={<div className="loading loading-spinner loading-lg"></div>}
      state="loading"
    >
      <div></div>
    </AuthLayout>
  );
}
