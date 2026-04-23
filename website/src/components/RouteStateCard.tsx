"use client";

import Link from "next/link";

interface RouteStateCardProps {
  icon: string;
  title: string;
  description: string;
  body: string;
  href?: string;
  ctaLabel?: string;
  actions?: React.ReactNode;
}

export default function RouteStateCard({
  icon,
  title,
  description,
  body,
  href,
  ctaLabel,
  actions,
}: RouteStateCardProps) {
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="card w-full border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <div className="mb-2 text-6xl">{icon}</div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-lg text-base-content/70">{description}</p>
          <p className="text-base-content/70">{body}</p>
          {actions ?? (href && ctaLabel ? (
            <Link href={href} className="btn btn-primary mt-4 w-full max-w-xs">
              {ctaLabel}
            </Link>
          ) : null)}
        </div>
      </div>
    </div>
  );
}
