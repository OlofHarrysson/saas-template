"use server";

import { signIn, signOut } from "@/auth";
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
  await signIn("google", { redirectTo: siteConfig.auth.callbackUrl });
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
    // Note: Email provider needs to be configured in auth.ts first
    await signIn("email", { email, redirectTo: siteConfig.auth.callbackUrl });
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
  await signOut({ redirectTo: "/" });
}
