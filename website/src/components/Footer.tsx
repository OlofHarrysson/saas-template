import Link from "next/link";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer footer-center p-8 sm:p-10 bg-background text-base-content border-t border-accent">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center text-sm">
        <div className="flex gap-6">
          <Link
            href="/terms"
            className="link link-hover hover:text-accent-foreground"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="link link-hover hover:text-accent-foreground"
          >
            Privacy Policy
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-red-500 animate-pulse" />
          <span>by</span>
          <Link
            href="https://tandemfuture.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover hover:text-accent-foreground font-medium"
          >
            Tandem Future
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
