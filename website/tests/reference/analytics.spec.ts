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


test('founder opt-out survives navigation and preserves other URL parameters', async ({ page, context }) => {
  const captures: string[] = [];
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
    Object.defineProperty(navigator, 'userAgentData', { get: () => undefined });
  });
  await page.route('**/improve-now/**', async route => {
    if (/\/(e|s)\//.test(new URL(route.request().url()).pathname)) captures.push(route.request().url());
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
  });
  await page.goto('/?analytics=off&keep=value#details');
  await expect(page).toHaveURL(/\/\?keep=value#details$/);
  expect(await context.cookies()).toEqual(expect.arrayContaining([
    expect.objectContaining({ name: 'olof_analytics_consent', value: '0' }),
  ]));
  await page.goto('/about');
  await page.reload();
  await page.waitForTimeout(1500);
  expect(captures).toEqual([]);
});
