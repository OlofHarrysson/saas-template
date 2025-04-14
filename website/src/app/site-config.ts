export const siteConfig = {
  name: "Your App Name",

  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  description: "Your description",

  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domain: "yourdomain.com",

  auth: {
    // REQUIRED — the path to log in users.
    loginUrl: "/login",
    // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private).
    callbackUrl: "/p/dashboard",
  },

  // Analytics
  analytics: {
    plausible: {
      trackOutboundLinks: true,
      hash: true,
    },
  },
  resend: {
    fromNoReply: `YourBrand <your@resend-email-address.com>`,
    fromAdmin: `Olof at TandemFuture <olof@tandemfuture.com>`,
  },
} as const;

export type SiteConfig = typeof siteConfig;
