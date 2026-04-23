import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer footer-center border-t border-base-300 bg-base-100 px-6 py-10 text-base-content">
      <nav className="grid grid-flow-col gap-6 text-sm">
        <Link href="/about" className="link link-hover">
          About
        </Link>
        <Link href="/terms" className="link link-hover">
          Terms of Service
        </Link>
        <Link href="/privacy" className="link link-hover">
          Privacy Policy
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
