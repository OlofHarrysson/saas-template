import RouteStateCard from "@/components/RouteStateCard";

export default function MarketingNotFound() {
  return (
    <RouteStateCard
      icon="🤔"
      title="Hmm, we can&apos;t seem to find that page."
      description="Maybe it moved, or perhaps the link was a bit off?"
      body="Don&apos;t worry, let&apos;s get you back to familiar territory."
      href="/"
      ctaLabel="Go Back Home"
    />
  );
}
