import Image from "next/image";
import { requireAuth } from "@/lib/auth/server";

export default async function DashboardPage() {
  const user = await requireAuth();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="space-y-6">
        <h1 className="mb-6 text-2xl font-bold md:text-4xl">
          Welcome to your Dashboard
        </h1>

        <div className="card card-border bg-base-100 shadow-xl">
          <div className="card-body gap-6">
            <div className="flex items-center gap-4">
              {user.image ? (
                <div className="avatar">
                  <div className="w-16 rounded-full">
                    <Image
                      src={user.image}
                      alt="Profile"
                      width={64}
                      height={64}
                    />
                  </div>
                </div>
              ) : (
                <div className="avatar avatar-placeholder">
                  <div className="bg-primary text-primary-content w-16 rounded-full">
                    <span className="text-xl">
                      {user.name?.[0] ?? user.email?.[0] ?? "U"}
                    </span>
                  </div>
                </div>
              )}
              <div>
                <h2 className="card-title">Your Account</h2>
                <p className="text-sm text-base-content/70">
                  Basic profile information for the signed-in user.
                </p>
              </div>
            </div>

            <ul className="list rounded-box border border-base-300 bg-base-100">
              <li className="list-row">
                <div className="font-medium text-base-content/70">Email</div>
                <div className="list-col-grow">{user.email}</div>
              </li>
              <li className="list-row">
                <div className="font-medium text-base-content/70">User ID</div>
                <div className="list-col-grow break-all">{user.id}</div>
              </li>
              <li className="list-row">
                <div className="font-medium text-base-content/70">Name</div>
                <div className="list-col-grow">{user.name ?? "No name set"}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
