import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/reference',
  outputDir: './test-results/reference',
  use: { ...devices['Desktop Chrome'], baseURL: 'http://127.0.0.1:3198', trace: 'off' },
  webServer: {
    command: 'npm run build && npm run start -- --hostname 127.0.0.1 --port 3198',
    port: 3198, reuseExistingServer: false, timeout: 120000,
    env: { NEXT_PUBLIC_POSTHOG_KEY: 'phc_reference_fixture' },
  },
});
