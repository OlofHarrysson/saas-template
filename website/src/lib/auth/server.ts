import "server-only";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { siteConfig } from "@/app/site-config";
import { authOptions } from "./config";

/**
 * Get the current user session on the server side
 * Returns the session if authenticated, null if not
 */
export async function getUser() {
  try {
    const session = await getServerSession(authOptions);
    return session?.user || null;
  } catch {
    return null;
  }
}

/**
 * Require authentication for a page/route
 * Redirects to login if not authenticated
 * Returns the user session if authenticated
 */
export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    redirect(siteConfig.auth.loginUrl);
  }
  return user;
}

/**
 * Get the current session on the server side
 * Returns the full session object or null
 */
export async function getSession() {
  try {
    return await getServerSession(authOptions);
  } catch {
    return null;
  }
}
