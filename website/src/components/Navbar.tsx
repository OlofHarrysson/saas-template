"use client";

import { Menu } from "lucide-react";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/p/dashboard", label: "Dashboard" },
] as const;

const MobileNav = () => {
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <Menu className="h-5 w-5" />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content mt-3 z-[1] p-2 shadow rounded-md bg-popover w-52"
      >
        {navigationLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="py-3 text-base hover:bg-accent hover:text-accent-foreground"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const DesktopNav = () => {
  return (
    <ul className="menu menu-horizontal px-1">
      {navigationLinks.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            className="hover:bg-accent hover:text-accent-foreground"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

const Navbar = () => {
  return (
    <div className="navbar bg-background border-b border-accent">
      <div className="navbar-start">
        <MobileNav />
        <a className="btn btn-ghost text-xl">Your Logo</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <DesktopNav />
      </div>
      <div className="navbar-end">
        <a className="btn btn-primary text-primary-foreground">Login</a>
      </div>
    </div>
  );
};

export default Navbar;
