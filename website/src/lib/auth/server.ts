import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

/**
 * Get the current session on the server side
 * Returns the full session object or null
 */
export async function getSession() {
  return await auth();
}

/**
 * Get the current user on the server side
 * Returns the user object or null
 */
export async function getUser() {
  const session = await getSession();
  return session?.user ?? null;
}

/**
 * Require authentication for a page/route
 * Redirects to login if not authenticated
 * Returns the user if authenticated
 */
export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}
