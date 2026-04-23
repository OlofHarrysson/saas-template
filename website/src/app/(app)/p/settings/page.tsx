import { requireAuth } from "@/lib/auth/server";

export default async function SettingsPage() {
  const user = await requireAuth();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold md:text-4xl">Settings</h1>
          <p className="mt-2 text-base-content/70">
            A minimal placeholder page for account settings.
          </p>
        </div>

        <div className="card card-border bg-base-100 shadow-xl">
          <div className="card-body gap-4">
            <h2 className="card-title">Account</h2>
            <p className="text-base-content/70">
              Signed in as <span className="font-medium">{user.email}</span>
            </p>
            <p className="text-sm text-base-content/60">
              Add real profile, billing, and notification settings here when
              the project needs them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
