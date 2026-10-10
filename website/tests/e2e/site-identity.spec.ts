import { expect, test } from "@playwright/test";
import { siteConfig } from "../../src/app/site-config";

const origin = `https://${siteConfig.domain}`;

test("homepage identifies this product and host", { tag: "@US-006" }, async ({ page }) => {
  await page.goto("/?ref=identity-check");
  await expect(page.locator('meta[name="application-name"]')).toHaveAttribute("content", siteConfig.name);
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", siteConfig.name);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", origin);
  const schema = page.locator('script[type="application/ld+json"]');
  await expect(schema).toHaveCount(1);
  expect(JSON.parse(await schema.innerText())).toEqual({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: `${origin}/`,
  });
});

test("public pages keep their own canonical and social URLs", { tag: "@US-006" }, async ({ page }) => {
  for (const path of ["/", "/about", "/privacy", "/terms"]) {
    await page.goto(`${path}?ref=identity-check`);
    const url = path === "/" ? origin : `${origin}${path}`;
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", url);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", url);
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", siteConfig.name);
    if (path !== "/") {
      await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
    }
  }
});
