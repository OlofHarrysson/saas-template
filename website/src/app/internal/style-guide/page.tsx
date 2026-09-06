import Link from "next/link";
import { notFound } from "next/navigation";
import { BaseLayout } from "@/components/layouts/BaseLayout";

const colors = [
  { name: "Base", className: "bg-base-100 text-base-content border border-base-300" },
  { name: "Raised", className: "bg-base-200 text-base-content" },
  { name: "Primary", className: "bg-primary text-primary-content" },
  { name: "Secondary", className: "bg-secondary text-secondary-content" },
  { name: "Accent", className: "bg-accent text-accent-content" },
  { name: "Error", className: "bg-error text-error-content" },
];

export default function StyleGuide() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <BaseLayout variant="marketing">
      <div className="mx-auto max-w-5xl space-y-12 px-6 py-12">
        <header className="max-w-2xl space-y-3">
          <p className="text-sm font-medium text-primary">Design reference</p>
          <h1 className="text-4xl font-bold tracking-tight">Style guide</h1>
          <p className="text-lg text-base-content/70">
            Explore the current theme, shared layout, and component states.
            Use the real pages to judge how they work together.
          </p>
        </header>

        <section aria-labelledby="pages-heading" className="space-y-4">
          <h2 id="pages-heading" className="text-2xl font-semibold">Pages and states</h2>
          <div className="flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/">Homepage</Link>
            <Link className="btn btn-outline" href="/login">Login page</Link>
            <Link className="btn btn-outline" href="/internal/fixtures/route-state?state=empty">Empty state</Link>
            <Link className="btn btn-outline" href="/internal/fixtures/route-state?state=error">Error state</Link>
          </div>
        </section>

        <section aria-labelledby="colors-heading" className="space-y-4">
          <h2 id="colors-heading" className="text-2xl font-semibold">Theme colors</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {colors.map(({ name, className }) => (
              <div key={name} className={`rounded-box p-6 font-medium ${className}`}>{name}</div>
            ))}
          </div>
        </section>

        <section aria-labelledby="type-heading" className="max-w-2xl space-y-4">
          <h2 id="type-heading" className="text-2xl font-semibold">Typography</h2>
          <p className="text-4xl font-bold tracking-tight">A clear next step</p>
          <p className="text-lg">Readable text supports the task. A heading establishes hierarchy, while supporting copy gives enough context to choose.</p>
          <p className="text-sm text-base-content/70">Supporting text should remain readable at smaller sizes.</p>
        </section>

        <section aria-labelledby="controls-heading" className="space-y-5">
          <h2 id="controls-heading" className="text-2xl font-semibold">Controls</h2>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className="btn btn-primary">Primary</button>
            <button type="button" className="btn btn-secondary">Secondary</button>
            <button type="button" className="btn btn-ghost">Quiet</button>
            <button type="button" className="btn btn-primary" disabled>Disabled</button>
          </div>
          <label className="fieldset max-w-sm">
            <span className="fieldset-legend">Example field</span>
            <input className="input w-full" placeholder="Try keyboard focus" />
          </label>
        </section>
      </div>
    </BaseLayout>
  );
}
