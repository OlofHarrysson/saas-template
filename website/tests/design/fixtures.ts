import { writeFile } from "node:fs/promises";
import { test as base, expect, type Locator } from "@playwright/test";

type Capture = (name: string, region?: Locator) => Promise<void>;
const screenshotStyle = "nextjs-portal { display: none; }";

export const test = base.extend<{ capture: Capture }>({
  capture: async ({ page }, use, testInfo) => {
    const browserIssues: string[] = [];
    page.on("pageerror", (error) => browserIssues.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") browserIssues.push(message.text());
    });
    await page.route("**/api/auth/session", (route) =>
      route.fulfill({ json: null }),
    );

    await use(async (name, region) => {
      await page.evaluate(() => document.fonts.ready);
      const target = region ?? page.locator("body");
      await expect(target).toBeVisible();
      const screenshotPath = testInfo.outputPath(`${name}.png`);
      const diagnosticsPath = testInfo.outputPath(`${name}.json`);
      if (region) {
        await region.screenshot({ path: screenshotPath, animations: "disabled", style: screenshotStyle });
      } else {
        await page.screenshot({ path: screenshotPath, fullPage: true, animations: "disabled", style: screenshotStyle });
      }
      const overflow = await page.evaluate(() =>
        Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
      );
      await writeFile(diagnosticsPath, JSON.stringify({
        capturedAt: new Date().toISOString(),
        name,
        url: page.url(),
        viewport: page.viewportSize(),
        region: await target.boundingBox(),
        horizontalOverflow: overflow,
        browserIssues,
      }, null, 2));
      await testInfo.attach(name, { path: screenshotPath, contentType: "image/png" });
      await testInfo.attach(`${name}-diagnostics`, { path: diagnosticsPath, contentType: "application/json" });
      expect(overflow, "Page should fit the viewport").toBeLessThanOrEqual(1);
      expect(browserIssues, "Capture should have no browser errors").toEqual([]);
    });
    expect(browserIssues, "The full interaction should have no browser errors").toEqual([]);
  },
});

export { expect };
