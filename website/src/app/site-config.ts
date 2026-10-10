export const siteConfig = {
  name: "Your App Name",

  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  description: "Your description",

  // Add default keywords relevant to the whole site
  seo_keywords: ["Your keywords"],

  // Production hostname, including the product subdomain when applicable.
  // No protocol or path; do not add www unless it is part of the deployed host.
  domain: "www.yourdomain.com",

  auth: {
    // The path to log in users.
    loginUrl: "/login",
    // The path you want to redirect users after successfull login (i.e. /dashboard, /private).
    callbackUrl: "/p/dashboard",
  },

  resend: {
    fromNoReply: `YourBrand <your@resend-email-address.com>`,
    fromAdmin: `Olof at TandemFuture <olof@tandemfuture.com>`,
  },
} as const;

export type SiteConfig = typeof siteConfig;
