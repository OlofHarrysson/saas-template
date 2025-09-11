import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { siteConfig } from "@/app/site-config";
import LoginForm from "@/components/auth/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  // Check if user is already authenticated on the server
  const session = await auth();

  // If authenticated, redirect to dashboard
  if (session) {
    redirect(siteConfig.auth.callbackUrl);
  }

  // Otherwise, show the login form
  return <LoginForm error={searchParams.error} />;
}
