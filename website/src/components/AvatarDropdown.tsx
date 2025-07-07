"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
        className="btn btn-ghost btn-circle avatar hover:bg-accent flex items-center justify-center"
      >
        <Image
          src="/assets/avatar.png"
          alt="User avatar"
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
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
