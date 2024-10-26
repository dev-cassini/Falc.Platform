import {expect, test} from "@playwright/test";

test.describe('Home page', () => {
  test('should have title falc', async ({ page }) => {
    await page.goto('./home')

    await expect(page.getByRole('heading')).toContainText('falc')
  });
});
