"use client";

import { useAuth } from "@/lib/auth/hooks";
import { signInWithGoogle } from "@/lib/auth/nextauth-actions";

export default function NextAuthTest() {
  const { user, isLoading, isAuthenticated, signOut } = useAuth();

  if (isLoading) return <p>Loading...</p>;

  if (isAuthenticated && user) {
    return (
      <div className="p-4 border rounded">
        <h3 className="text-lg font-semibold mb-2">
          NextAuth Test - Signed In
        </h3>
        <p>Signed in as {user.email}</p>
        <p>Name: {user.name}</p>
        <button onClick={signOut} className="btn btn-secondary mt-2">
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-semibold mb-2">
        NextAuth Test - Not Signed In
      </h3>
      <p>Not signed in</p>
      <form action={signInWithGoogle}>
        <button type="submit" className="btn btn-primary mt-2">
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
