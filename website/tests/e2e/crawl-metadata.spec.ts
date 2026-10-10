import { expect, test } from "@playwright/test";
import { siteConfig } from "../../src/app/site-config";

const origin = `https://${siteConfig.domain}`;

test("sitemap serves only public pages on the configured domain", { tag: "@US-005" }, async ({ request, page }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("xml");

  const xml = await response.text();
  const sitemap = await page.evaluate((text) => {
    const document = new DOMParser().parseFromString(text, "application/xml");
    return {
      root: document.documentElement.localName,
      errors: document.querySelectorAll("parsererror").length,
      urls: Array.from(document.querySelectorAll("loc"), (node) => node.textContent),
    };
  }, xml);
  expect(sitemap.errors).toBe(0);
  expect(sitemap.root).toBe("urlset");
  expect(sitemap.urls).toEqual([
    origin,
    `${origin}/about`,
    `${origin}/privacy`,
    `${origin}/terms`,
  ]);
});

test("robots points crawlers to the configured sitemap", { tag: "@US-005" }, async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("text/plain");
  const text = await response.text();
  expect(text).toMatch(/^User-Agent: \*$/im);
  expect(text).toMatch(/^Allow: \/$/m);
  expect(text).toContain(`Sitemap: ${origin}/sitemap.xml`);
});
