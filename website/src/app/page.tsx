import { siteConfig } from "./site-config";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center w-full p-4 sm:p-8 min-h-[80vh]">
        <div className="max-w-3xl w-full space-y-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Welcome to <span className="text-primary">{siteConfig.name}</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            {siteConfig.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a href={siteConfig.auth.loginUrl} className="btn btn-primary">
              Get Started
            </a>
            <a href="/docs" className="btn btn-outline">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="w-full bg-muted/50 py-16 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">
            The Problem We Solve
          </h2>
          <p className="text-lg text-muted-foreground">
            Brief description of the problem your app solves and why it matters.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            Key Features
          </h2>
          <div className="space-y-4">
            {["Feature 1", "Feature 2", "Feature 3"].map((feature, i) => (
              <div key={i} className="collapse collapse-plus bg-base-200">
                <input type="radio" name="features" />
                <div className="collapse-title text-xl font-medium">
                  {feature}
                </div>
                <div className="collapse-content">
                  <p>Feature description goes here.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full bg-muted/50 py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Simple Pricing</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Basic</h3>
                <p className="text-3xl font-bold">$9/mo</p>
                <ul className="space-y-2 text-left">
                  <li>✓ Feature 1</li>
                  <li>✓ Feature 2</li>
                </ul>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Pro</h3>
                <p className="text-3xl font-bold">$19/mo</p>
                <ul className="space-y-2 text-left">
                  <li>✓ Everything in Basic</li>
                  <li>✓ Pro features</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">FAQ</h2>
          <div className="space-y-4">
            {["Question 1?", "Question 2?", "Question 3?"].map((q, i) => (
              <div key={i} className="collapse collapse-plus bg-base-200">
                <input type="radio" name="faq" />
                <div className="collapse-title text-xl font-medium">{q}</div>
                <div className="collapse-content">
                  <p>Answer goes here.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary text-primary-foreground py-16 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="text-lg">Join thousands of happy users today.</p>
          <a
            href={siteConfig.auth.loginUrl}
            className="btn btn-accent bg-white text-primary hover:bg-white/90"
          >
            Sign Up Now
          </a>
        </div>
      </section>
    </div>
  );
}
