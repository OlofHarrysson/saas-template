import { defineConfig, devices } from "@playwright/test";

const PLAYWRIGHT_PORT = 3001;
const designCapture = process.env.PLAYWRIGHT_DESIGN === "1";
const baseURL =
  process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${PLAYWRIGHT_PORT}`;

export default defineConfig({
  testDir: designCapture ? "./tests/design" : "./tests/e2e",
  outputDir: designCapture ? "./test-results/design" : "./test-results/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: designCapture
    ? [["list"], ["html", { outputFolder: "playwright-report/design", open: "never" }]]
    : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    ...(designCapture ? { reducedMotion: "reduce" as const } : {}),
  },
  projects: designCapture ? [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "mobile",
      use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
    },
  ] : [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: designCapture
          ? `npm run dev -- --hostname 127.0.0.1 --port ${PLAYWRIGHT_PORT}`
          : `npm run build && npm run start -- --hostname 127.0.0.1 --port ${PLAYWRIGHT_PORT}`,
        url: baseURL,
        reuseExistingServer: false,
        stdout: "pipe",
        stderr: "pipe",
        timeout: 120_000,
      },
});
