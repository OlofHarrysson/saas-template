import { BaseLayout } from "@/components/layouts/BaseLayout";
import Navbar from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BaseLayout navbar={<Navbar variant="marketing" />}>
      {children}
      <ScrollToTop />
    </BaseLayout>
  );
}
