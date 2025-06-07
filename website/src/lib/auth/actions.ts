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
    password?: string[];
    general?: string[];
  };
};

// Helper function to set session cookie
export async function setSessionCookie(session: {
  secret: string;
  expire: string;
}) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(session.expire),
  });
}

// Helper function to validate email/password form data
function validateEmailPassword(formData: FormData): FormState | null {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      errors: {
        email: !email ? ["Email is required"] : undefined,
        password: !password ? ["Password is required"] : undefined,
      },
    };
  }

  return null; // No validation errors
}

// Server action to get current user - can be called from client components
export async function getUserClient() {
  return await getUser();
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

  // Redirect outside try-catch - clean and simple!
  redirect(redirectUrl);
}

export async function signInWithEmail(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Validate form data
  const validationError = validateEmailPassword(formData);
  if (validationError) {
    return validationError;
  }

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const { account } = createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    await setSessionCookie(session);
  } catch (error: any) {
    return {
      errors: {
        general: [error.message || "Invalid email or password"],
      },
    };
  }

  revalidatePath("/");
  redirect(siteConfig.auth.callbackUrl);
}

export async function signUpWithEmail(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Validate form data
  const validationError = validateEmailPassword(formData);
  if (validationError) {
    return validationError;
  }

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const { account } = createAdminClient();

    // Create account
    const userId = ID.unique();
    await account.create(userId, email, password);

    // Create session
    const session = await account.createEmailPasswordSession(email, password);

    await setSessionCookie(session);

    // Send verification email using session client (user must be logged in)
    const { account: sessionAccount } = await createSessionClient();
    await sessionAccount.createVerification(
      `${APP_URL}${siteConfig.auth.verifyCallbackUrl}`
    );
  } catch (error: any) {
    return {
      errors: {
        general: [error.message || "Failed to create account"],
      },
    };
  }

  revalidatePath("/");
  redirect(siteConfig.auth.verifyUrl);
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

// Send verification email for current user
export async function sendVerificationEmail(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const { account } = await createSessionClient();
    await account.createVerification(
      `${APP_URL}${siteConfig.auth.verifyCallbackUrl}`
    );
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to send verification email",
    };
  }
}

// Send password reset email
export async function sendPasswordResetEmail(
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
    await account.createRecovery(
      email,
      `${APP_URL}${siteConfig.auth.resetCallbackUrl}`
    );

    return {
      success: true,
      message: "Password reset email sent. Check your inbox.",
    };
  } catch (error: any) {
    return {
      errors: {
        general: [error.message || "Failed to send password reset email"],
      },
    };
  }
}

// Reset password using secret from email
export async function resetPassword(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const userId = formData.get("userId") as string;
  const secret = formData.get("secret") as string;
  const password = formData.get("password") as string;

  if (!userId || !secret || !password) {
    return {
      errors: {
        general: ["Invalid reset link or missing information"],
      },
    };
  }

  try {
    const { account } = createAdminClient();
    await account.updateRecovery(userId, secret, password);

    return {
      success: true,
      message: "Password reset successfully. You can now sign in.",
    };
  } catch (error: any) {
    return {
      errors: {
        general: [error.message || "Failed to reset password"],
      },
    };
  }
}
