import { BaseLayout } from "@/components/layouts/BaseLayout";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BaseLayout variant="app">{children}</BaseLayout>;
}
