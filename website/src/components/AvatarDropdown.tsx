"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth/useAuth";
import { NavigationLink } from "@/lib/navigation";
import { Menu } from "lucide-react";

interface AvatarDropdownProps {
  avatarLinks: NavigationLink[];
}

export const AvatarDropdown = ({ avatarLinks }: AvatarDropdownProps) => {
  const { logout } = useAuth();

  const handleLinkClick = (href: string) => {
    if (href === "/logout") {
      logout();
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-accent"
      >
        {/* Navigation Links */}
        {avatarLinks.map((link) => (
          <li key={link.href}>
            {link.href === "/logout" ? (
              <button
                onClick={() => handleLinkClick(link.href)}
                className="text-error hover:bg-error/10"
              >
                {link.label}
              </button>
            ) : (
              <Link href={link.href} className="hover:bg-accent">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
