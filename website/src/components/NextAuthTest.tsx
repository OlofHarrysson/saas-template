"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function NextAuthTest() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (session) {
    return (
      <div className="p-4 border rounded">
        <h3 className="text-lg font-semibold mb-2">
          NextAuth Test - Signed In
        </h3>
        <p>Signed in as {session.user?.email}</p>
        <p>Name: {session.user?.name}</p>
        <button onClick={() => signOut()} className="btn btn-secondary mt-2">
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
      <button onClick={() => signIn("google")} className="btn btn-primary mt-2">
        Sign in with Google
      </button>
    </div>
  );
}
