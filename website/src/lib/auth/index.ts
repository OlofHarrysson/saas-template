import "server-only";
import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/appwrite/server";
import { siteConfig } from "@/app/site-config";

export async function getUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    redirect(siteConfig.auth.loginUrl);
  }

  // Require email verification for access to protected areas
  if (!user.emailVerification) {
    redirect(siteConfig.auth.verifyUrl);
  }

  return user;
}
