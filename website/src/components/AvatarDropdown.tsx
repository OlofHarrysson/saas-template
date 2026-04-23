"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { NavigationLink } from "@/lib/navigation";
import { Menu } from "lucide-react";
import { siteConfig } from "@/app/site-config";

interface AvatarDropdownProps {
  avatarLinks: NavigationLink[];
}

// Used in the logged in state for desktop
export const AvatarDropdown = ({ avatarLinks }: AvatarDropdownProps) => {
  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        tabIndex={0}
        className="btn btn-ghost"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content z-10 mt-3 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow-xl"
      >
        {avatarLinks.map((link) => (
          <li key={link.href}>
            {link.href === "/logout" ? (
              <button
                type="button"
                onClick={() =>
                  signOut({ redirectTo: siteConfig.auth.loginUrl })
                }
                className="text-error"
              >
                {link.label}
              </button>
            ) : (
              <Link href={link.href}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
