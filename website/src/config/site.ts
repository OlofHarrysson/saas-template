export const siteConfig = {
  name: "Your App Name",

  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  description: "Your description",

  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domain: "yourdomain.com",

  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/signin",
    // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
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
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `YourBrand <your@resend-email-address.com>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `Olof at TandemFuture <olof@tandemfuture.com>`,
  },
} as const;

export type SiteConfig = typeof siteConfig;
