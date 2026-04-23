import Link from "next/link";
import { siteConfig } from "../site-config";

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <section className="hero min-h-[85vh] w-full bg-base-100 px-4 py-16 sm:px-8">
        <div className="hero-content w-full max-w-[var(--marketing-content-max-width)] flex-col gap-10 text-center">
          <div className="badge badge-primary badge-outline badge-lg px-4 py-4">
            ✨ Welcome to the future
          </div>
          <div className="space-y-6">
            <h1 className="font-display text-5xl font-black tracking-tight sm:text-7xl">
              Welcome to{" "}
              <span className="inline-block text-primary">{siteConfig.name}</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-base-content/70 sm:text-2xl">
              {siteConfig.description} for people who want to get things done
              without the complexity.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
            <Link href={siteConfig.auth.loginUrl} className="btn btn-primary btn-lg">
              Get Started
            </Link>
            <a href="#features" className="btn btn-outline btn-lg">
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section className="w-full bg-base-200 px-4 py-20 sm:px-8">
        <div className="mx-auto max-w-4xl space-y-10">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl font-bold sm:text-5xl">
              💭 The Problem We Solve
            </h2>
            <p className="text-xl text-base-content/70">
              Understanding the challenges you face and why it matters
            </p>
          </div>
          <div className="card border border-base-300 bg-base-100 shadow-lg">
            <div className="card-body text-center">
              <p className="text-2xl font-medium text-primary">
                Brief description of the problem your app solves and{" "}
                <span className="font-extrabold">why it matters</span> to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="w-full bg-base-100 px-4 py-20 sm:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl font-bold sm:text-5xl">✨ Key Features</h2>
            <p className="text-xl text-base-content/70">
              Everything you need to succeed
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {["Feature 1", "Feature 2", "Feature 3"].map((feature, i) => (
              <div
                key={i}
                className="card card-border bg-base-100 shadow-lg transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="card-body gap-4">
                  <div className="text-3xl">🚀</div>
                  <h3 className="card-title text-xl">{feature}</h3>
                  <p className="text-base-content/70">
                    Feature description goes here. Explain how this feature
                    helps your users achieve their goals.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="w-full bg-base-200 px-4 py-20 sm:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl font-bold sm:text-5xl">💰 Simple Pricing</h2>
            <p className="text-xl text-base-content/70">
              Choose the plan that works for you
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            <div className="card card-border bg-base-100 shadow-xl">
              <div className="card-body gap-5">
                <h3 className="card-title text-2xl">Basic</h3>
                <p className="text-4xl font-bold text-primary">
                  $9<span className="text-lg text-base-content/60">/mo</span>
                </p>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>Feature 1</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>Feature 2</span>
                  </li>
                </ul>
                <div className="card-actions pt-2">
                  <Link href={siteConfig.auth.loginUrl} className="btn btn-outline w-full">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>

            <div className="card card-border relative bg-base-100 shadow-glow">
              <div className="absolute left-6 top-6">
                <span className="badge badge-primary">Popular</span>
              </div>
              <div className="card-body gap-5 pt-14">
                <h3 className="card-title text-2xl">Pro</h3>
                <p className="text-4xl font-bold text-primary">
                  $19<span className="text-lg text-base-content/60">/mo</span>
                </p>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>Everything in Basic</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>Pro features</span>
                  </li>
                </ul>
                <div className="card-actions pt-2">
                  <Link href={siteConfig.auth.loginUrl} className="btn btn-primary w-full">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="w-full bg-base-100 px-4 py-20 sm:px-8">
        <div className="mx-auto max-w-4xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl font-bold sm:text-5xl">🤔 FAQ</h2>
            <p className="text-xl text-base-content/70">
              Quick answers to common questions
            </p>
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            {["Question 1?", "Question 2?", "Question 3?"].map((q, i) => (
              <div
                key={i}
                className="collapse collapse-plus border border-base-300 bg-base-100 shadow-xs"
              >
                <input
                  type="radio"
                  name="marketing-faq"
                  defaultChecked={i === 0}
                />
                <div className="collapse-title text-xl font-semibold">{q}</div>
                <div className="collapse-content text-base-content/70">
                  <p>
                    Answer goes here. Provide helpful information that addresses
                    common concerns or questions your users might have.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hero w-full bg-primary px-4 py-20 text-primary-content sm:px-8">
        <div className="hero-content max-w-3xl text-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold sm:text-6xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto max-w-2xl text-xl opacity-90 sm:text-2xl">
              Join thousands of happy users today and transform your workflow.
            </p>
            <Link href={siteConfig.auth.loginUrl} className="btn btn-secondary btn-lg">
              🚀 Sign Up Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
