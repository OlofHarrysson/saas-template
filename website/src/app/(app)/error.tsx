"use client";

import { useEffect } from "react";
import Link from "next/link";
import RouteStateCard from "@/components/RouteStateCard";
import { siteConfig } from "@/app/site-config";

export default function AppError({
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
      icon="😵"
      title="Something broke in the app."
      description="This screen hit an unexpected error."
      body="Try reloading this section, or head back to the dashboard."
      actions={
        <div className="mt-4 flex w-full max-w-sm flex-col gap-3">
          <button type="button" className="btn btn-primary w-full" onClick={() => reset()}>
            Try Again
          </button>
          <Link href={siteConfig.auth.callbackUrl} className="btn btn-ghost w-full">
            Back to Dashboard
          </Link>
        </div>
      }
    />
  );
}
