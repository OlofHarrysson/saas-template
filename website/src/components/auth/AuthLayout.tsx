interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  state?: "default" | "success" | "error" | "info" | "loading";
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  icon,
  state = "default",
}: AuthLayoutProps) {
  const getStateClasses = () => {
    switch (state) {
      case "success":
        return "text-success";
      case "error":
        return "text-error";
      case "info":
        return "text-info";
      case "loading":
        return "text-base-content";
      default:
        return "text-base-content";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {icon && (
            <div className={`text-6xl mb-4 ${getStateClasses()}`}>{icon}</div>
          )}
          <h2 className="text-3xl font-extrabold text-base-content">{title}</h2>
          {subtitle && (
            <p className="mt-2 text-sm text-base-content/70">{subtitle}</p>
          )}
        </div>
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
}
