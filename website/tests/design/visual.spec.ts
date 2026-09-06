import { test, expect } from "./fixtures";

test.describe("Rendered review", { tag: "@US-003" }, () => {
  test("style guide", async ({ page, capture }) => {
    await page.goto("/internal/style-guide");
    await expect(page.getByRole("heading", { name: "Style guide", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Empty state", exact: true })).toHaveAttribute(
      "href", "/internal/fixtures/route-state?state=empty",
    );
    await capture("style-guide");
  });

  for (const state of ["empty", "error"] as const) {
    test(`route state: ${state}`, async ({ page, capture }) => {
      await page.goto(`/internal/fixtures/route-state?state=${state}`);
      await expect(page.getByRole("heading", {
        name: state === "empty" ? "Nothing here yet" : "Something went wrong",
      })).toBeVisible();
      await expect(page.getByRole("link", { name: "Back to style guide" })).toHaveAttribute(
        "href", "/internal/style-guide",
      );
      await capture(`route-state-${state}`, page.locator(".card"));
    });
  }

  test("homepage", async ({ page, capture }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /get started/i }).first()).toBeVisible();
    await capture("homepage");
  });

  test("login", async ({ page, capture }) => {
    await page.goto("/login");
    await expect(page.getByRole("button", { name: /send sign-in link/i })).toBeVisible();
    await capture("login");
  });

  test("navigation states", async ({ page, capture, isMobile }) => {
    await page.goto("/");
    if (!isMobile) {
      await expect(page.getByRole("link", { name: "Features", exact: true }).first()).toBeVisible();
      await capture("navigation-desktop", page.locator(".navbar"));
      return;
    }
    const drawer = page.getByTestId("mobile-navigation-drawer");
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole("link", { name: "Features", exact: true })).toBeVisible();
    await capture("navigation-open", page.locator(".drawer-side"));
    await drawer.getByRole("button", { name: "Close navigation menu" }).click();
    await expect(drawer).not.toBeVisible();
    await capture("navigation-closed", page.locator(".navbar"));
  });
});
