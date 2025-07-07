"use client";

import { ChevronDown, User } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/useAuth";
import { NavigationLink } from "@/lib/navigation";

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
        className="btn btn-ghost btn-circle avatar hover:bg-accent"
      >
        <div className="w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-5 w-5 text-primary" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-accent"
      >
        {/* User Info Section */}
        <li className="menu-title px-3 py-2">
          <div className="flex flex-col">
            <span className="font-semibold text-sm">John Doe</span>
            <span className="text-xs text-muted-foreground">
              john@example.com
            </span>
          </div>
        </li>
        <div className="divider my-1"></div>

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
