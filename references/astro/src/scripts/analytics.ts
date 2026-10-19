import { PUBLIC_ANALYTICS_ENABLED, PUBLIC_POSTHOG_KEY } from 'astro:env/client';

// Adapted from ai-girlfriend-content; product-specific events and cookies stay there.
const posthogKey = PUBLIC_POSTHOG_KEY;
if (import.meta.env.PROD && PUBLIC_ANALYTICS_ENABLED && posthogKey) {
  const optOutNow = new URLSearchParams(window.location.search).get('analytics') === 'off';
  void import('posthog-js').then(({ default: posthog }) => {
    posthog.init(posthogKey, {
      api_host: 'https://eu.i.posthog.com',
      ui_host: 'https://eu.posthog.com',
      defaults: '2026-06-25',
      capture_pageview: !optOutNow,
      capture_pageleave: !optOutNow,
      opt_out_capturing_by_default: optOutNow,
      opt_out_capturing_persistence_type: 'cookie',
      consent_persistence_name: 'olof_analytics_consent',
      cross_subdomain_cookie: true,
      loaded(client) {
        if (!optOutNow) return;
        client.opt_out_capturing();
        const url = new URL(window.location.href);
        url.searchParams.delete('analytics');
        window.history.replaceState(window.history.state, '', url);
      },
      autocapture: false,
      disable_session_recording: true,
      person_profiles: 'identified_only',
    });
  });
}
