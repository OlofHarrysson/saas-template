export type NavigationLink = {
  href: string;
  label: string;
  showInNavbar: boolean; // true = navbar, false = avatar dropdown
};

const marketingNavigationLinks: NavigationLink[] = [
  { href: "#features", label: "Features", showInNavbar: true },
  { href: "#pricing", label: "Pricing", showInNavbar: true },
  { href: "#faq", label: "FAQ", showInNavbar: true },
  // These would show in avatar dropdown when user is logged in on marketing pages
  { href: "/p/dashboard", label: "Go to Dashboard", showInNavbar: false },
  { href: "/settings", label: "Settings", showInNavbar: false },
] as const;

const appNavigationLinks: NavigationLink[] = [
  { href: "/p/dashboard", label: "Dashboard", showInNavbar: true },
  { href: "/p/projects", label: "Projects", showInNavbar: true },
  { href: "/p/analytics", label: "Analytics", showInNavbar: true },
  // These would show in avatar dropdown
  { href: "/p/settings", label: "Settings", showInNavbar: false },
  { href: "/p/billing", label: "Billing", showInNavbar: false },
  { href: "/", label: "Back to Home", showInNavbar: false },
  { href: "/logout", label: "Logout", showInNavbar: false },
] as const;

export function getNavigationLinks(
  variant: "marketing" | "app",
  section: "navbar" | "avatar" | "mobile"
): NavigationLink[] {
  const allLinks =
    variant === "app" ? appNavigationLinks : marketingNavigationLinks;

  if (section === "mobile") {
    return [...allLinks]; // All links for mobile (no distinction)
  }

  return allLinks.filter((link) =>
    section === "navbar" ? link.showInNavbar : !link.showInNavbar
  );
}
