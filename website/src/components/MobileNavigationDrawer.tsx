"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { siteConfig } from "@/app/site-config";
import { useAuth } from "@/lib/auth/hooks";
import { getNavigationLinks } from "@/lib/navigation";

interface MobileNavigationDrawerProps {
  variant: "marketing" | "app";
  drawerId: string;
}

function closeDrawer(drawerId: string) {
  const drawerToggle = document.getElementById(drawerId);

  if (drawerToggle instanceof HTMLInputElement) {
    drawerToggle.checked = false;
  }
}

export default function MobileNavigationDrawer({
  variant,
  drawerId,
}: MobileNavigationDrawerProps) {
  const { isAuthenticated } = useAuth();
  const navigationLinks = getNavigationLinks(variant, "mobile");

  const handleNavigation = async (href: string) => {
    closeDrawer(drawerId);

    if (href === "/logout") {
      await signOut({ redirectTo: siteConfig.auth.loginUrl });
    }
  };

  return (
    <div className="drawer-side z-40 lg:hidden">
      <label
        htmlFor={drawerId}
        aria-label="Close navigation menu"
        className="drawer-overlay"
      />

      <aside
        data-testid="mobile-navigation-drawer"
        className="min-h-full w-80 max-w-[85vw] border-l border-base-300 bg-base-100 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-base-300 p-6">
          <div>
            <p className="text-sm text-base-content/60">Navigation</p>
            <h2 className="text-lg font-semibold text-base-content">Menu</h2>
          </div>
          <button
            type="button"
            onClick={() => closeDrawer(drawerId)}
            className="btn btn-ghost btn-sm"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-6">
          <ul className="menu menu-lg w-full gap-1 p-0">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                {link.href === "/logout" ? (
                  <button
                    type="button"
                    onClick={() => void handleNavigation(link.href)}
                    className="text-error hover:bg-error/10"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => closeDrawer(drawerId)}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {!isAuthenticated && variant === "marketing" ? (
            <div className="mt-6 border-t border-base-300 pt-6">
              <Link
                href={siteConfig.auth.loginUrl}
                className="btn btn-primary w-full"
                onClick={() => closeDrawer(drawerId)}
              >
                Login
              </Link>
            </div>
          ) : null}
        </nav>
      </aside>
    </div>
  );
}
