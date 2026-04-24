import { expect, test } from "@playwright/test";

test("protected dashboard redirects anonymous route requests to login", async ({
  request,
}) => {
  const response = await request.get("/p/dashboard", { maxRedirects: 0 });

  expect([307, 308]).toContain(response.status());
  expect(response.headers().location).toContain("/login");
});
