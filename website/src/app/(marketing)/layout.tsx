import { BaseLayout } from "@/components/layouts/BaseLayout";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BaseLayout variant="marketing">
      {children}
      <ScrollToTop />
    </BaseLayout>
  );
}
