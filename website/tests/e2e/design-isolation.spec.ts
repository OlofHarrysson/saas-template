import { test, expect } from "@playwright/test";

test("review routes are unavailable in production", { tag: "@US-003" }, async ({ request }) => {
  test.skip(Boolean(process.env.PLAYWRIGHT_BASE_URL), "External server mode is unknown; use the owned production server for isolation proof.");
  for (const [path, content] of [
    ["/internal/style-guide", "Theme colors"],
    ["/internal/fixtures/route-state?state=empty", "Nothing here yet"],
    ["/internal/fixtures/route-state?state=error", "We could not load this item"],
  ]) {
    const response = await request.get(path);
    expect(response.status()).toBe(404);
    expect((await response.text()).includes(content), `${path} must not serialize fixture content`).toBe(false);
  }
});
