import posthog from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: "/improve-now", // Need to match your next.config.ts rewrites
    ui_host: "https://eu.posthog.com",
    defaults: "2025-05-24",
  });
}
