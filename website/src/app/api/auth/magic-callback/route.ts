import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/app/site-config";
import { createAdminClient } from "@/lib/appwrite/server";
import { revalidatePath } from "next/cache";
import { setSessionCookie } from "@/lib/auth/actions";

// Avoid caching this route
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const userId = requestUrl.searchParams.get("userId");
  const secret = requestUrl.searchParams.get("secret");

  if (!userId || !secret) {
    return NextResponse.redirect(
      new URL("/login?error=missing_magic_params", requestUrl)
    );
  }

  try {
    // Create Magic URL session
    const { account } = createAdminClient();
    const session = await account.updateMagicURLSession(userId, secret);

    // Set session cookie using shared helper
    await setSessionCookie(session);

    // Revalidate to clear any cached auth state
    revalidatePath("/");
  } catch (error: any) {
    console.error("Magic link callback error:", error);
    return NextResponse.redirect(
      new URL("/login?error=magic_link_failed", requestUrl)
    );
  }

  // Redirect to success page that handles client-side redirect
  return NextResponse.redirect(new URL("/login/success", requestUrl));
}
