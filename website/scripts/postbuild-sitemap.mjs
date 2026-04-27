import { spawnSync } from "node:child_process";

const isVercelProduction =
  process.env.VERCEL === "1" && process.env.VERCEL_ENV === "production";

if (!isVercelProduction) {
  console.log(
    "Skipping sitemap generation outside Vercel production. Run `npm run sitemap` to generate it explicitly.",
  );
  process.exit(0);
}

const result = spawnSync("next-sitemap", {
  stdio: "inherit",
  shell: process.platform === "win32",
});

process.exit(result.status ?? 1);
