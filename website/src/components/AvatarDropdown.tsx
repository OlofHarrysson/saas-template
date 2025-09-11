"use client";

import Link from "next/link";
import { signOutAction } from "@/lib/auth/nextauth-actions";
import { NavigationLink } from "@/lib/navigation";
import { Menu } from "lucide-react";

interface AvatarDropdownProps {
  avatarLinks: NavigationLink[];
}

export const AvatarDropdown = ({ avatarLinks }: AvatarDropdownProps) => {
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
              <form action={signOutAction} className="w-full">
                <button
                  type="submit"
                  className="text-error hover:bg-error/10 w-full text-left"
                >
                  {link.label}
                </button>
              </form>
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
