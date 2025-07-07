"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { AuthButton } from "@/components/AuthButton";
import { useState } from "react";

const marketingNavigationLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
] as const;

const appNavigationLinks = [
  { href: "/p/dashboard", label: "Dashboard" },
  { href: "/p/projects", label: "Projects" },
  { href: "/p/analytics", label: "Analytics" },
] as const;

interface NavbarProps {
  variant?: "marketing" | "app";
}

const MobileDrawer = ({
  navigationLinks,
}: {
  navigationLinks: readonly { href: string; label: string }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        onClick={openDrawer}
        className="btn btn-ghost lg:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeDrawer}
        />
      )}

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-base-100 shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={closeDrawer}
            className="btn btn-ghost btn-sm"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-6">
          <ul className="space-y-2">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3 px-4 text-base hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                  onClick={closeDrawer}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth Button */}
          <div className="pt-6 mt-6 border-t">
            <div onClick={closeDrawer}>
              <AuthButton />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

const DesktopNav = ({
  navigationLinks,
}: {
  navigationLinks: readonly { href: string; label: string }[];
}) => {
  return (
    <ul className="menu menu-horizontal px-1">
      {navigationLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="hover:bg-accent hover:text-accent-foreground"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Navbar = ({ variant = "marketing" }: NavbarProps) => {
  const navigationLinks =
    variant === "app" ? appNavigationLinks : marketingNavigationLinks;
  const logoHref = variant === "app" ? "/p/dashboard" : "/";

  return (
    <div className="navbar bg-background border-b border-accent">
      <div className="navbar-start">
        <Link href={logoHref} className="btn btn-ghost text-xl">
          Your Logo
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <DesktopNav navigationLinks={navigationLinks} />
      </div>
      <div className="navbar-end">
        <div className="hidden lg:flex">
          <AuthButton />
        </div>
        <MobileDrawer navigationLinks={navigationLinks} />
      </div>
    </div>
  );
};

export default Navbar;
