import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/config/site";

// Avoid caching this route
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin + siteConfig.auth.callbackUrl);
}
