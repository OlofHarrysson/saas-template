"use client";

import { useState, useEffect, Suspense } from "react";
import { useActionState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  signInWithMagicLink,
  signInWithGoogle,
  type FormState,
} from "@/lib/auth/actions";
import { useAuth } from "@/lib/auth/useAuth";
import { siteConfig } from "@/app/site-config";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

const initialState: FormState = {
  message: undefined,
  errors: {},
};

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

  const [emailSignInState, emailSignInAction] = useActionState(
    signInWithMagicLink,
    initialState
  );

  const getErrorMessage = (error: string) => {
    switch (error) {
      case "oauth_error":
      case "oauth_failed":
      case "oauth_callback_failed":
        return "Google sign-in failed. Please try again.";
      case "missing_magic_params":
      case "magic_link_failed":
        return "Sign-in link expired or invalid. Please request a new one.";
      case "auth_failed":
        return "Authentication failed. Please try signing in again.";
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
          <form action={signInWithGoogle}>
            <GoogleSignInButton />
          </form>

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

          {/* Email Sign-in Form */}
          <form action={emailSignInAction} className="mt-8 space-y-6">
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
                className={`input input-bordered w-full ${
                  emailSignInState?.errors?.email ? "input-error" : ""
                }`}
                placeholder="Enter your email address"
              />
              {emailSignInState?.errors?.email && (
                <div className="text-error text-sm mt-1">
                  {emailSignInState.errors.email[0]}
                </div>
              )}
            </div>

            {emailSignInState?.errors?.general && (
              <div className="alert alert-error">
                <span>{emailSignInState.errors.general[0]}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={emailSignInState?.success}
            >
              {emailSignInState?.success ? "Email Sent" : "Send Sign-in Link"}
            </button>

            <p className="text-xs text-center text-base-content/60">
              {emailSignInState?.success
                ? emailSignInState.message
                : "We'll email you a secure link to sign in instantly"}
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
