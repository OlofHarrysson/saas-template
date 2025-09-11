"use server";

import { signIn, signOut } from "@/auth";

/**
 * Server action for Google OAuth sign in
 */
export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/p/dashboard" });
}

/**
 * Server action for signing out
 */
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
