export const siteConfig = {
  name: "Your Name",

  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  description: "Your description",

  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domain: "yourdomain.com",

  // Analytics
  analytics: {
    plausible: {
      trackOutboundLinks: true,
      hash: true,
    },
  },
  resend: {
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `ShipFast <noreply@resend.shipfa.st>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `Marc at ShipFast <marc@resend.shipfa.st>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "marc.louvion@gmail.com",
  },
  // Add other configuration sections as needed
  // e.g., features, social links, etc.
} as const

export type SiteConfig = typeof siteConfig