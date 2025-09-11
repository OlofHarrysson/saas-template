"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useAuth } from "@/lib/auth/hooks";
import { siteConfig } from "@/app/site-config";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

// Placeholder for future magic link functionality

// Component that handles search params - needs to be wrapped in Suspense
function SearchParamsHandler({
  onError,
}: {
  onError: (error: string | null) => void;
}) {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    onError(error);
  }, [error, onError]);

  return null;
}

// Main login component
function LoginContent() {
  const [email, setEmail] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect authenticated users to callback URL
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(siteConfig.auth.callbackUrl);
    }
  }, [isAuthenticated, isLoading, router]);

  // Placeholder action for email form (does nothing for now)
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement magic link functionality later
  };

  const getErrorMessage = (error: string) => {
    switch (error) {
      case "OAuthSignin":
      case "OAuthCallback":
      case "OAuthCreateAccount":
      case "EmailCreateAccount":
      case "Callback":
        return "Google sign-in failed. Please try again.";
      case "OAuthAccountNotLinked":
        return "Account already exists with different provider.";
      case "SessionRequired":
        return "Please sign in to access this page.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  return (
    <>
      <Suspense fallback={null}>
        <SearchParamsHandler onError={setUrlError} />
      </Suspense>

      <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-base-content">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-base-content/60">
              Choose your preferred sign-in method
            </p>
          </div>

          {/* URL Error Display */}
          {urlError && (
            <div className="alert alert-error">
              <span>{getErrorMessage(urlError)}</span>
            </div>
          )}

          {/* Google OAuth Button */}
          <div onClick={() => signIn("google")}>
            <GoogleSignInButton />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-base-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-base-100 text-base-content">
                Or sign in with email
              </span>
            </div>
          </div>

          {/* Email Sign-in Form - UI only, functionality to be added later */}
          <form onSubmit={handleEmailSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter your email address"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Send Sign-in Link
            </button>

            <p className="text-xs text-center text-base-content/60">
              We'll email you a secure link to sign in instantly
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default function LoginPage() {
  return <LoginContent />;
}
