import RouteStateCard from "@/components/RouteStateCard";
import { siteConfig } from "@/app/site-config";

export default function AppNotFound() {
  return (
    <RouteStateCard
      icon="🧭"
      title="We couldn&apos;t find that app page."
      description="The page may have moved, or the link may no longer exist."
      body="Head back to your dashboard and continue from there."
      href={siteConfig.auth.callbackUrl}
      ctaLabel="Back to Dashboard"
    />
  );
}
