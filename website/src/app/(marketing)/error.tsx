"use client";

import { useEffect } from "react";
import Link from "next/link";
import RouteStateCard from "@/components/RouteStateCard";

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <RouteStateCard
      icon="😅"
      title="Whoops! Something went wrong."
      description="Looks like there&apos;s a glitch on this page."
      body="Try the page again, or head back home and retry from there."
      actions={
        <div className="mt-4 flex w-full max-w-sm flex-col gap-3">
          <button type="button" className="btn btn-primary w-full" onClick={() => reset()}>
            Try Again
          </button>
          <Link href="/" className="btn btn-ghost w-full">
            Back to Home
          </Link>
        </div>
      }
    />
  );
}
