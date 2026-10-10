import { expect, test } from '@playwright/test';
import { siteConfig } from '../src/site-config';

const origin = `https://${siteConfig.domain}`;

test.beforeEach(async ({ page }) => {
  await page.route(/https:\/\/[^/]*posthog\.com\//, route =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }));
});

test('homepage identifies this product and host', async ({ page }) => {
  await page.goto('/?ref=identity-check');
  await expect(page).toHaveTitle(siteConfig.name);
  await expect(page.locator('meta[name="application-name"]')).toHaveAttribute('content', siteConfig.name);
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', siteConfig.name);
  const schema = page.locator('script[type="application/ld+json"]');
  await expect(schema).toHaveCount(1);
  expect(JSON.parse(await schema.innerText())).toEqual({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: `${origin}/`,
  });
});

test('pages keep their own canonical and social URLs', async ({ page }) => {
  for (const path of ['/', '/about/']) {
    await page.goto(`${path}?ref=identity-check`);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${origin}${path}`);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', `${origin}${path}`);
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', siteConfig.name);
    if (path !== '/') {
      await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
    }
  }
});
