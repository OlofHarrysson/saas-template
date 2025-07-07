"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  createAdminClient,
  createSessionClient,
  SESSION_COOKIE,
} from "@/lib/appwrite/server";
import { siteConfig } from "@/app/site-config";
import { ID, OAuthProvider } from "node-appwrite";
import { getUser } from "./index";

// App URL for OAuth callbacks
const APP_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `https://${siteConfig.domain}`;

// Define the state type for form responses
export type FormState = {
  message?: string;
  success?: boolean;
  errors?: {
    email?: string[];
    general?: string[];
  };
};

// Helper to set session cookie
export async function setSessionCookie(session: any) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, session.secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(session.expire),
    path: "/",
  });
}

// Google OAuth sign in
export async function signInWithGoogle() {
  const { account } = createAdminClient();

  let redirectUrl: string;

  try {
    redirectUrl = await account.createOAuth2Token(
      OAuthProvider.Google,
      `${APP_URL}/api/auth/callback`,
      `${APP_URL}/login?error=oauth_error`
    );
  } catch (error: any) {
    console.error("OAuth error:", error);
    redirect("/login?error=oauth_failed");
  }

  redirect(redirectUrl);
}

// Magic Link sign in
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

  try {
    const { account } = createAdminClient();

    // Create magic URL token - this sends the email
    await account.createMagicURLToken(
      ID.unique(),
      email,
      `${APP_URL}/api/auth/magic-callback`
    );

    return {
      success: true,
      message: "Sign-in link sent! Check your email to continue.",
    };
  } catch (error: any) {
    return {
      errors: {
        general: [error.message || "Failed to send sign-in link"],
      },
    };
  }
}

export async function signOut() {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession("current");
  } catch (error) {
    // Ignore errors when signing out
  }

  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  revalidatePath("/");
  redirect(siteConfig.auth.loginUrl);
}

export async function getUserClient() {
  return await getUser();
}
