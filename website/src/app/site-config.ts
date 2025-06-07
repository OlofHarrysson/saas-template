export const siteConfig = {
  name: "Your App Name",

  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  description: "Your description",

  // Add default keywords relevant to the whole site
  seo_keywords: ["Your keywords"],

  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domain: "yourdomain.com",

  auth: {
    // The path to log in users.
    loginUrl: "/login",
    // The path you want to redirect users after successfull login (i.e. /dashboard, /private).
    callbackUrl: "/p/dashboard",
    // The path for email verification flow
    verifyUrl: "/login/verify",
    // The path for email verification callback (from email links)
    verifyCallbackUrl: "/login/verify/callback",
    // The path for password reset flow
    resetUrl: "/login/reset",
    // The path for password reset callback (from email links)
    resetCallbackUrl: "/login/reset/callback",
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
