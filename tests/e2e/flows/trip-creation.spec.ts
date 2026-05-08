import { test, expect } from '@playwright/test';

test('User can create a trip through full wizard flow', async ({ page }) => {
  await page.goto('/trips/new');
  await page.fill('[data-testid="destination-search"]', 'Tokyo, Japan');
  await page.click('text=Next');
  await page.click('text=😌 Calm');
  await page.click('text=Next');
  await page.click('text=Next');
  await page.click('text=Next');
  await page.click('text=Next');
  await expect(page.locator('text=Generate trip')).toBeVisible();
});
