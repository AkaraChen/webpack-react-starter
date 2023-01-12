import { test, expect } from '@playwright/test';

test('Has heading', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  const heading = page.getByRole('heading', { name: 'Hello, World!' });
  await expect(heading).toHaveClass('text-blue-400');
});
