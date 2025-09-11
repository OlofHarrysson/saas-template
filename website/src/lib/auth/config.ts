import GoogleProvider from "next-auth/providers/google";
import { siteConfig } from "@/app/site-config";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // TODO: Add email provider with Resend later
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after successful login
      if (url.startsWith("/"))
        return `${baseUrl}${siteConfig.auth.callbackUrl}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}${siteConfig.auth.callbackUrl}`;
    },
    async session({ session, token }) {
      // Add user id to session
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
