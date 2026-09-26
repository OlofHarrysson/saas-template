import { expect, test } from '@playwright/test';
import { gunzipSync } from 'node:zlib';

test('PostHog emits a pageview through the proxy path', async ({ page }) => {
  const events: { event: string; properties: Record<string, unknown> }[] = [];
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
    Object.defineProperty(navigator, 'userAgentData', { get: () => undefined });
  });
  await page.route('**/improve-now/**', async route => {
    const request = route.request();
    const body = request.postDataBuffer();
    if (body && /\/(?:i\/v0\/)?e\//.test(new URL(request.url()).pathname)) {
      let decoded = body[0] === 0x1f && body[1] === 0x8b ? gunzipSync(body).toString() : body.toString();
      if (new URL(request.url()).searchParams.get('compression') === 'base64') {
        decoded = Buffer.from(new URLSearchParams(decoded).get('data')!, 'base64').toString();
      }
      const payload = JSON.parse(decoded);
      events.push(...(Array.isArray(payload) ? payload : payload.batch || [payload]));
    }
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
  });
  await page.route(/https:\/\/[^/]*posthog\.com\//, route => route.fulfill({ status: 200, body: '{}' }));
  await page.goto('/');
  await expect.poll(() => events.filter(e => e.event === '$pageview').length).toBe(1);
  expect(events[0].properties.$current_url).toContain('127.0.0.1');
});
