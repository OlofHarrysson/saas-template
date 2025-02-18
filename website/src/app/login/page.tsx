"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/stores/useAuth";

export default function LoginPage() {
  const { error, isLoading, signInWithEmail, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signInWithEmail(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100">
        <div className="card-body space-y-6">
          <h1 className="text-2xl font-bold text-center">Welcome back</h1>

          <button
            onClick={signInWithGoogle}
            type="button"
            className="flex items-center justify-center group mx-auto"
          >
            <Image
              src="/assets/google-oauth-icon.svg"
              alt="Continue with Google"
              width={200}
              height={50}
              className="transition-all group-hover:brightness-95"
              priority
            />
          </button>

          <div className="divider text-sm">or login with email</div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input input-bordered w-full"
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full"
                disabled={isLoading}
                required
              />
              <label className="label">
                <a
                  href="/login/reset-password"
                  className="label-text-alt link link-primary"
                >
                  Forgot password?
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="link link-primary">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
