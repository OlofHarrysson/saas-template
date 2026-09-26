import { expect, test } from '@playwright/test';
import { gunzipSync } from 'node:zlib';

test.beforeEach(async ({ page }) => {
  await page.route(/https:\/\/[^/]*posthog\.com\//, route =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }));
});

test('styled pages work on desktop and mobile', async ({ page }, info) => {
  await page.goto('/');
  const link = page.getByRole('link', { name: 'About this project' });
  await expect(link).toBeVisible();
  expect(await link.evaluate(el => getComputedStyle(el).display)).toBe('inline-flex');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: info.outputPath('home.png'), fullPage: true });
  await link.click();
  await expect(page.getByRole('heading', { name: 'About this project' })).toBeVisible();
});

test('analytics obeys deployment gate and sends actual pageview payloads', async ({ page }) => {
  const mode = process.env.REFERENCE_ANALYTICS_MODE ?? 'disabled';
  const events: { event: string; properties: Record<string, unknown> }[] = [];
  const requests: string[] = [];
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
    Object.defineProperty(navigator, 'userAgentData', { get: () => undefined });
  });
  await page.route(/https:\/\/[^/]*posthog\.com\//, async route => {
    requests.push(route.request().url());
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
  await page.goto('/');
  if (mode === 'enabled') {
    await expect.poll(() => events.filter(e => e.event === '$pageview').length).toBe(1);
    expect(events[0].properties.$current_url).toContain('127.0.0.1');
  } else {
    await page.waitForTimeout(1500);
    expect(requests).toEqual([]);
  }
});
