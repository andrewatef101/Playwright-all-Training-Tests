import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await expect(page.getByRole('heading', { name: 'Welcome to the-internet' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Available Examples' })).toBeVisible();
  await page.getByRole('link', { name: 'Form Authentication' }).click();
  await expect(page.getByRole('heading', { name: 'This is where you can log' })).toBeVisible();
  await expect(page.locator('h4')).toContainText('This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith ');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
  await page.getByRole('button', { name: ' Login' }).click();
  await expect(page.getByText('Your username is invalid! ×')).toBeVisible();
});