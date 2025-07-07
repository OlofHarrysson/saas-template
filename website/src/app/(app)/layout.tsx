import type { Metadata, Viewport } from "next";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";
// TODO: Import your actual server auth function
// import { checkAuthOnServer } from "@/lib/auth/server";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO: Uncomment and implement server auth check
  // const authState = await checkAuthOnServer();
  //
  // if (!authState.isAuthenticated) {
  //   redirect('/login');
  // }

  return <BaseLayout navbar={<Navbar variant="app" />}>{children}</BaseLayout>;
}
