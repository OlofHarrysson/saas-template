"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/app/site-config";
import { AvatarDropdown } from "@/components/AvatarDropdown";
import { getNavigationLinks, NavigationLink } from "@/lib/navigation";

interface NavbarProps {
  variant?: "marketing" | "app";
  mobileDrawerId: string;
}

function openDrawer(drawerId: string) {
  const drawerToggle = document.getElementById(drawerId);

  if (drawerToggle instanceof HTMLInputElement) {
    drawerToggle.checked = true;
  }
}

const DesktopNav = ({ navbarLinks }: { navbarLinks: NavigationLink[] }) => {
  return (
    <ul className="menu menu-horizontal gap-1 px-1">
      {navbarLinks.map((link) => (
        <li key={link.href}>
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};

const Navbar = ({ variant = "marketing", mobileDrawerId }: NavbarProps) => {
  const inApp = variant === "app";
  const logoHref = inApp ? siteConfig.auth.callbackUrl : "/";
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50 || currentScrollY < lastScrollYRef.current) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollYRef.current) {
        setIsVisible(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarLinks = getNavigationLinks(variant, "navbar");
  const avatarLinks = getNavigationLinks(variant, "avatar");

  return (
    <>
      <div className="h-[var(--app-navbar-height)]" />
      <div
        className={`navbar fixed left-0 right-0 top-0 z-30 min-h-[var(--app-navbar-height)] border-b border-base-300 bg-base-100/90 shadow-xs backdrop-blur-md transition-transform duration-300 lg:translate-y-0 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="navbar-start">
          <Link
            href={logoHref}
            className="inline-flex items-center rounded-box px-3 py-2 text-xl font-semibold tracking-tight text-base-content/90 transition duration-[2000ms] ease-out hover:text-base-content motion-safe:hover:scale-[1.03] motion-safe:active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            Your Logo
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <DesktopNav navbarLinks={navbarLinks} />
        </div>
        <div className="navbar-end">
          <div className="hidden lg:flex">
            {inApp ? (
              <AvatarDropdown avatarLinks={avatarLinks} />
            ) : (
              <Link href={siteConfig.auth.loginUrl} className="btn btn-primary">
                Login
              </Link>
            )}
          </div>
          <button
            type="button"
            onClick={() => openDrawer(mobileDrawerId)}
            className="btn btn-ghost lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
