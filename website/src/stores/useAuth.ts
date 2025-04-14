import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { siteConfig } from "@/app/site-config";

export function useAuth() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signInWithEmail = async (email: string, password: string) => {
    setError("");
    setIsLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      router.refresh();
      router.push(siteConfig.auth.callbackUrl);
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setError("");
    setIsLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (signInError) {
        setError(signInError.message);
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setError("");
    setIsLoading(true);
    try {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) {
        setError(signOutError.message);
        return;
      }
      router.refresh();
      router.push("/");
    } catch (err) {
      console.error("Logout error:", err);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    signInWithEmail,
    signInWithGoogle,
    signOut,
  };
}
