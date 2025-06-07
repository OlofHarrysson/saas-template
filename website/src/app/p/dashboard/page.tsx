import { requireAuth } from "@/lib/auth";
import { signOut } from "@/lib/auth/actions";

export default async function DashboardPage() {
  const user = await requireAuth();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl">
        <h1 className="text-2xl md:text-4xl font-bold mb-6">
          Welcome to your Dashboard
        </h1>

        <div className="card bg-base-200 shadow-xl mb-6">
          <div className="card-body">
            <h2 className="card-title">Your Account</h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">User ID:</span> {user.$id}
              </p>
              <p>
                <span className="font-semibold">Account Created:</span>{" "}
                {new Date(user.$createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Email Verified:</span>{" "}
                {user.emailVerification ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>

        <form action={signOut}>
          <button type="submit" className="btn btn-outline btn-error">
            Sign Out
          </button>
        </form>
      </div>
    </main>
  );
}
