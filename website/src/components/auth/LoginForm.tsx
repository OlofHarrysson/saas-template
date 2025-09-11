"use client";

import { useState } from "react";
import { signInWithGoogle } from "@/lib/auth/nextauth-actions";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

interface LoginFormProps {
  error?: string;
}

export default function LoginForm({ error }: LoginFormProps) {
  const [email, setEmail] = useState("");

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
        {error && (
          <div className="alert alert-error">
            <span>{getErrorMessage(error)}</span>
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
  );
}
