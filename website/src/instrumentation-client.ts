import posthog from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (posthogKey && typeof window !== "undefined") {
  const optOutNow = new URLSearchParams(window.location.search).get("analytics") === "off";
  posthog.init(posthogKey, {
    api_host: "/improve-now", // Need to match your next.config.ts rewrites
    ui_host: "https://eu.posthog.com",
    defaults: "2025-05-24",
    capture_pageview: !optOutNow,
    capture_pageleave: !optOutNow,
    opt_out_capturing_by_default: optOutNow,
    opt_out_capturing_persistence_type: "cookie",
    consent_persistence_name: "olof_analytics_consent",
    cross_subdomain_cookie: true,
  });
  if (optOutNow) {
    posthog.opt_out_capturing();
    window.history.replaceState(null, "", window.location.pathname + window.location.hash);
  }
}
