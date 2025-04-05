import { siteConfig } from "./site-config";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-4 sm:p-8">
      <main className="max-w-3xl w-full space-y-6 text-center">
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
      </main>
    </div>
  );
}
