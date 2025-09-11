"use server";

import { signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { siteConfig } from "@/app/site-config";

// Form state type for compatibility
export type FormState = {
  message?: string;
  success?: boolean;
  errors?: {
    email?: string[];
    general?: string[];
  };
};

/**
 * Server action for Google OAuth sign in
 */
export async function signInWithGoogle() {
  redirect("/api/auth/signin/google");
}

/**
 * Server action for magic link sign in
 */
export async function signInWithMagicLink(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email") as string;

  if (!email) {
    return {
      errors: {
        email: ["Email is required"],
      },
    };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      errors: {
        email: ["Please enter a valid email address"],
      },
    };
  }

  try {
    // Redirect to NextAuth email signin
    redirect(`/api/auth/signin/email?email=${encodeURIComponent(email)}`);
  } catch (error) {
    return {
      errors: {
        general: ["Failed to send sign-in link. Please try again."],
      },
    };
  }
}

/**
 * Server action for signing out
 */
export async function signOutAction() {
  redirect("/api/auth/signout");
}
