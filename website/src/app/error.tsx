"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <div className="mb-2 text-6xl">😅</div>
          <h1 className="text-2xl font-bold">Whoops! Something went wrong.</h1>
          <p className="text-lg text-base-content/70">
            Looks like there&apos;s a glitch on this page. Our mistake!
          </p>
          <p className="text-base-content/70">
            The page hit an unexpected error. Try heading back home and retrying
            from there.
          </p>
          <Link href="/" className="btn btn-primary mt-4 w-full max-w-xs">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
