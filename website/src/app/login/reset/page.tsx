"use client";

import { useState } from "react";
import { useActionState } from "react";
import Link from "next/link";
import { sendPasswordResetEmail, type FormState } from "@/lib/auth/actions";
import AuthLayout from "@/components/auth/AuthLayout";

const initialState: FormState = {
  message: undefined,
  errors: {},
};

export default function ResetPasswordPage() {
  const [state, action] = useActionState(sendPasswordResetEmail, initialState);

  return (
    <AuthLayout
      title={state?.success ? "Check your email" : "Reset your password"}
      subtitle={
        state?.success
          ? "We've sent you a password reset link."
          : "Enter your email address and we'll send you a link to reset your password."
      }
      icon={state?.success ? "📧" : "🔐"}
      state={state?.success ? "info" : "default"}
    >
      {state?.success ? (
        <div className="space-y-6">
          <p className="text-sm text-base-content/60 text-center">
            Don't see it? Check your spam or junk folder.
          </p>
          <div className="text-center">
            <Link href="/login" className="btn btn-primary">
              Back to Sign In
            </Link>
          </div>
        </div>
      ) : (
        <form action={action} className="space-y-6">
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
              className={`input input-bordered w-full ${
                state?.errors?.email ? "input-error" : ""
              }`}
              placeholder="Email address"
            />
            {state?.errors?.email && (
              <div className="text-error text-sm mt-1">
                {state.errors.email[0]}
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
              Send Reset Link
            </button>
          </div>

          <div className="text-center">
            <Link href="/login" className="btn btn-ghost btn-sm">
              Back to Sign In
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
