import { createHash, randomBytes } from "node:crypto";
import { Pool } from "@neondatabase/serverless";
import { type NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/app/site-config";

export const runtime = "nodejs";

const DEV_AUTH_EMAIL = "codex-dev@example.test";
const TOKEN_TTL_MS = 10 * 60 * 1000;

function hashVerificationToken(token: string, secret: string) {
  return createHash("sha256").update(`${token}${secret}`).digest("hex");
}

function getRedirectPath(request: NextRequest) {
  const redirectPath =
    request.nextUrl.searchParams.get("redirect") ?? siteConfig.auth.callbackUrl;

  if (!redirectPath.startsWith("/") || redirectPath.startsWith("//")) {
    return siteConfig.auth.callbackUrl;
  }

  return redirectPath;
}

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return new Response(null, { status: 404 });
  }

  if (!process.env.AUTH_SECRET || !process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "Dev auth requires AUTH_SECRET and DATABASE_URL." },
      { status: 500 }
    );
  }

  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + TOKEN_TTL_MS);
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    await pool.query(
      `delete from verification_token where identifier = $1 or expires < now()`,
      [DEV_AUTH_EMAIL]
    );

    await pool.query(
      `insert into verification_token (identifier, token, expires)
       values ($1, $2, $3)`,
      [DEV_AUTH_EMAIL, hashVerificationToken(token, process.env.AUTH_SECRET), expires]
    );
  } finally {
    await pool.end();
  }

  const callbackUrl = new URL("/api/auth/callback/resend", request.url);
  callbackUrl.searchParams.set("callbackUrl", getRedirectPath(request));
  callbackUrl.searchParams.set("token", token);
  callbackUrl.searchParams.set("email", DEV_AUTH_EMAIL);

  return NextResponse.redirect(callbackUrl);
}
