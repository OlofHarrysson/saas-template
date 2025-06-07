"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { resetPassword, type FormState } from "@/lib/auth/actions";
import AuthLayout from "@/components/auth/AuthLayout";

const initialState: FormState = {
  message: undefined,
  errors: {},
};

export default function ResetPasswordCallbackPage() {
  const [state, action] = useActionState(resetPassword, initialState);
  const [isValidLink, setIsValidLink] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    if (!userId || !secret) {
      setIsValidLink(false);
    } else {
      setIsValidLink(true);
    }
  }, [searchParams]);

  if (!isValidLink) {
    return (
      <AuthLayout
        title="Invalid Reset Link"
        subtitle="This password reset link is invalid or has expired. Please request a new one."
        icon="⚠️"
        state="error"
      >
        <div className="text-center">
          <Link href="/login/reset" className="btn btn-primary">
            Request New Reset Link
          </Link>
        </div>
      </AuthLayout>
    );
  }

  if (state?.success) {
    return (
      <AuthLayout
        title="Password Reset Successfully!"
        subtitle={state.message}
        icon="✓"
        state="success"
      >
        <div className="text-center">
          <Link href="/login" className="btn btn-primary">
            Sign In
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Set New Password"
      subtitle="Enter your new password below."
    >
      <form action={action} className="space-y-6">
        {/* Hidden fields for userId and secret */}
        <input
          type="hidden"
          name="userId"
          value={searchParams.get("userId") || ""}
        />
        <input
          type="hidden"
          name="secret"
          value={searchParams.get("secret") || ""}
        />

        <div>
          <label htmlFor="password" className="sr-only">
            New Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className={`input input-bordered w-full ${
              state?.errors?.password ? "input-error" : ""
            }`}
            placeholder="New password"
            minLength={8}
          />
          {state?.errors?.password && (
            <div className="text-error text-sm mt-1">
              {state.errors.password[0]}
            </div>
          )}
        </div>

        {state?.errors?.general && (
          <div className="alert alert-error">
            <span>{state.errors.general[0]}</span>
          </div>
        )}

        <div className="space-y-4">
          <button type="submit" className="btn btn-primary w-full">
            Set New Password
          </button>
        </div>

        <div className="text-center">
          <Link href="/login" className="btn btn-ghost btn-sm">
            Back to Sign In
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
