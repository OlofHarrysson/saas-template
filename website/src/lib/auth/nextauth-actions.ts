"use server";

import { signIn, signOut } from "@/auth";
import { siteConfig } from "@/app/site-config";

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: siteConfig.auth.callbackUrl });
}

export async function signOutAction() {
  await signOut({ redirectTo: siteConfig.auth.loginUrl });
}
