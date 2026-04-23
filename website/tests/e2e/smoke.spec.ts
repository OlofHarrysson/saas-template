import { expect, test } from "@playwright/test";
import { siteConfig } from "../../src/app/site-config";

test("marketing homepage renders core CTAs", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: /get started/i }).first()).toHaveAttribute(
    "href",
    siteConfig.auth.loginUrl,
  );
  await expect(page.getByRole("link", { name: /learn more/i })).toHaveAttribute(
    "href",
    "#features",
  );
  await expect(page.locator("#features")).toBeVisible();
});

test("mobile navigation drawer opens and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const drawer = page.getByTestId("mobile-navigation-drawer");

  await page.getByRole("button", { name: /open navigation menu/i }).click();
  await expect(drawer).toBeVisible();
  await expect(drawer.getByRole("link", { name: /features/i })).toBeVisible();

  await page.getByRole("button", { name: /close navigation menu/i }).last().click();
  await expect(drawer).not.toBeVisible();
});

test("login page renders both sign-in options", async ({ page }) => {
  await page.goto(siteConfig.auth.loginUrl);

  await expect(page.getByRole("heading", { name: /sign in to your account/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /continue with google/i })).toBeVisible();
  await expect(page.getByPlaceholder("Enter your email address")).toBeVisible();
  await expect(page.getByRole("button", { name: /send sign-in link/i })).toBeVisible();
});
