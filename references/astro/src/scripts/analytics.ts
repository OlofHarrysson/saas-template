import { PUBLIC_ANALYTICS_ENABLED, PUBLIC_POSTHOG_KEY } from 'astro:env/client';

// Adapted from ai-girlfriend-content; product-specific events and cookies stay there.
const posthogKey = PUBLIC_POSTHOG_KEY;
if (import.meta.env.PROD && PUBLIC_ANALYTICS_ENABLED && posthogKey &&
    new URLSearchParams(window.location.search).get('analytics') !== 'off') {
  void import('posthog-js').then(({ default: posthog }) => {
    posthog.init(posthogKey, {
      api_host: 'https://eu.i.posthog.com',
      ui_host: 'https://eu.posthog.com',
      defaults: '2026-06-25',
      capture_pageview: true,
      autocapture: false,
      disable_session_recording: true,
      person_profiles: 'identified_only',
    });
  });
}
