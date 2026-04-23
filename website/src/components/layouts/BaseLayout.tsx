import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import MobileNavigationDrawer from "@/components/MobileNavigationDrawer";
import Navbar from "@/components/Navbar";

interface BaseLayoutProps {
  children: React.ReactNode;
  variant: "marketing" | "app";
}

const MOBILE_DRAWER_ID = "mobile-navigation-drawer";

export function BaseLayout({ children, variant }: BaseLayoutProps) {
  return (
    <div className="drawer drawer-end">
      <input
        id={MOBILE_DRAWER_ID}
        type="checkbox"
        className="drawer-toggle"
      />

      <div className="drawer-content flex min-h-screen flex-col">
        <Navbar variant={variant} mobileDrawerId={MOBILE_DRAWER_ID} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            className:
              "!rounded-box !border !border-base-300 !bg-base-100 !p-4 !text-base-content !shadow-lg",
            success: {
              className: "toast-success",
              duration: 4000,
            },
            error: {
              className: "toast-error",
              duration: 4000,
            },
          }}
        />
      </div>

      <MobileNavigationDrawer
        variant={variant}
        drawerId={MOBILE_DRAWER_ID}
      />
    </div>
  );
}
