import { defineConfig, devices } from '@playwright/test';

const mode = process.env.REFERENCE_ANALYTICS_MODE ?? 'disabled';
const port = 3197;
export default defineConfig({
  testDir: './tests',
  use: { baseURL: `http://127.0.0.1:${port}`, trace: 'off' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 } } },
  ],
  webServer: {
    command: mode === 'dev' ? `npm run dev -- --host 127.0.0.1 --port ${port}` : `npm run build && npm run preview -- --host 127.0.0.1 --port ${port}`,
    port, reuseExistingServer: false,
    env: {
      PUBLIC_POSTHOG_KEY: mode === 'no-key' ? '' : 'phc_reference_fixture',
      PUBLIC_ANALYTICS_ENABLED: mode === 'disabled' ? 'false' : 'true',
    },
  },
});
