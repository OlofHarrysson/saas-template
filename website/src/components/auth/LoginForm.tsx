"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { siteConfig } from "@/app/site-config";

interface LoginFormProps {
  error?: string;
}

export default function LoginForm({ error }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEmailLoading(true);

    try {
      const result = await signIn("resend", {
        email,
        redirect: false,
      });

      if (!result?.error) {
        setEmailSent(true);
      }
    } catch (submitError) {
      console.error("Email sign-in failed:", submitError);
    } finally {
      setIsEmailLoading(false);
    }
  };

  const getErrorMessage = (currentError: string) => {
    switch (currentError) {
      case "OAuthSignin":
      case "OAuthCallback":
      case "OAuthCreateAccount":
      case "EmailCreateAccount":
      case "Callback":
        return "Google sign-in failed. Please try again.";
      case "OAuthAccountNotLinked":
        return "Account already exists with different provider.";
      case "EmailSignin":
        return "Unable to send magic link. Please check your email address and try again.";
      case "Verification":
        return "Invalid or expired magic link. Please request a new one.";
      case "SessionRequired":
        return "Please sign in to access this page.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  return (
    <div className="bg-base-200 px-4 py-10">
      <div className="card mx-auto w-full max-w-md border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body gap-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-extrabold text-base-content">
              Sign in to your account
            </h2>
            <p className="text-sm text-base-content/70">
              Choose your preferred sign-in method
            </p>
          </div>

          {error && (
            <div className="alert alert-error alert-soft">
              <span>{getErrorMessage(error)}</span>
            </div>
          )}

          <GoogleSignInButton
            onClick={() =>
              signIn("google", { redirectTo: siteConfig.auth.callbackUrl })
            }
            disabled={isEmailLoading}
          />

          <div className="divider text-sm text-base-content/60">
            Or sign in with email
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-5">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email address</legend>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full"
                placeholder="Enter your email address"
                disabled={isEmailLoading || emailSent}
              />
            </fieldset>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isEmailLoading || emailSent}
            >
              {isEmailLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Sending...
                </>
              ) : emailSent ? (
                "Email Sent"
              ) : (
                "Send Sign-in Link"
              )}
            </button>

            <p className="text-center text-xs text-base-content/70">
              {emailSent
                ? "Check your email for the sign-in link"
                : "We'll email you a secure link to sign in instantly"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
