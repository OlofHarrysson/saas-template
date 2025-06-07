"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/app/site-config";
import { sendVerificationEmail } from "@/lib/auth/actions";
import { useAuth } from "@/lib/auth/useAuth";
import AuthLayout from "@/components/auth/AuthLayout";

export default function VerifyPage() {
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<string>("");
  const [canResend, setCanResend] = useState(true);
  const router = useRouter();
  const { user, isLoading } = useAuth();

  // Redirect if user is not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push(siteConfig.auth.loginUrl);
    }
  }, [user, isLoading, router]);

  // Redirect if user is already verified
  useEffect(() => {
    if (user?.emailVerification) {
      router.push(siteConfig.auth.callbackUrl);
    }
  }, [user, router]);

  const handleResendEmail = async () => {
    setIsResending(true);
    setResendMessage("");
    setCanResend(false);

    try {
      const result = await sendVerificationEmail();

      if (result.success) {
        setResendMessage("Verification email sent! Check your inbox.");
        // Re-enable resend after 30 seconds
        setTimeout(() => setCanResend(true), 30000);
      } else {
        setResendMessage(result.error || "Failed to send verification email");
        setCanResend(true);
      }
    } catch (error) {
      setResendMessage("Failed to send verification email");
      setCanResend(true);
    } finally {
      setIsResending(false);
    }
  };

  // Show loading while checking auth
  if (isLoading) {
    return (
      <AuthLayout
        title="Loading..."
        icon={<div className="loading loading-spinner loading-lg"></div>}
        state="loading"
      >
        <div></div>
      </AuthLayout>
    );
  }

  // Don't render if user is not logged in (will redirect)
  if (!user) {
    return null;
  }

  return (
    <AuthLayout
      title="Check Your Email"
      subtitle="We've sent a verification link to your email address. Click the link in the email to verify your account."
      icon="📧"
      state="info"
    >
      <div className="space-y-4">
        <p className="text-sm text-base-content/60 text-center">
          Don't see the email? Check your spam folder.
        </p>

        {resendMessage && (
          <div
            className={`text-sm text-center ${
              resendMessage.includes("sent") ? "text-success" : "text-error"
            }`}
          >
            {resendMessage}
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={handleResendEmail}
            disabled={isResending || !canResend}
            className="btn btn-primary"
          >
            {isResending ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Sending...
              </>
            ) : (
              "Resend Email"
            )}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
