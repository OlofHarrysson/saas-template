import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // Add the current path to the headers for the server components that the middleware is running on
  // const headers = new Headers(request.headers);
  // headers.set("x-current-path", request.nextUrl.pathname);

  let supabaseResponse = NextResponse.next({
    request,
    // headers, // Note: This overwrites the headers which is bad!
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // refreshing the auth token
  const user = await supabase.auth.getUser();
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isProtectedPage = request.nextUrl.pathname.startsWith("/p");

  // Redirect to dashboard if accessing login while authenticated
  if (!user.error && isLoginPage) {
    return NextResponse.redirect(new URL("/p/feeds", request.url));
  }

  // Redirect to login if trying to access protected routes without auth
  if (user.error && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return supabaseResponse;
}
