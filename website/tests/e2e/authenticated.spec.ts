import { expect, test } from "@playwright/test";

const devAuthEnabled = process.env.PLAYWRIGHT_USE_DEV_AUTH === "1";

test.describe("authenticated app routes", () => {
  test.skip(
    !devAuthEnabled,
    "Dev auth tests require PLAYWRIGHT_USE_DEV_AUTH=1 against next dev."
  );

  test("dev auth signs in and allows dashboard navigation", async ({ page }) => {
    await page.goto("/api/dev-auth/login?redirect=/p/dashboard");

    await expect(page).toHaveURL(/\/p\/dashboard$/);
    await expect(
      page.getByRole("heading", { name: "Welcome to your Dashboard" })
    ).toBeVisible();
    await expect(page.getByText("codex-dev@example.test")).toBeVisible();

    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("link", { name: "Settings" }).click();

    await expect(page).toHaveURL(/\/p\/settings$/);
    await expect(page.getByRole("heading", { name: "Settings" })).toBeVisible();
    await expect(page.getByText("codex-dev@example.test")).toBeVisible();
  });
});
