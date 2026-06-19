import { test, expect } from '@playwright/test';

import {LoginFun} from '../Pages/HomePage';

test.describe('Login test', ()=> {

test('valid login', async ({ page }) => {
    const loginpage = new LoginFun(page);
    await loginpage.login('practice' , 'SuperSecretPassword!');
    await loginpage.assertLoginPage();
//  await page.goto('https://practice.expandtesting.com/login');
//     await page.getByLabel('username').fill('practice');
//     await page.getByLabel('password').fill('SuperSecretPassword!');
//     await page.getByRole('button', {name: 'login'}).click();
//     await expect(page.getByText("You logged into a secure area!")).toBeVisible();   

});

    test ('InvalidLogin' , async ({page}) => {
        const loginpage = new LoginFun(page);
        await loginpage.login('practice' , 'SuperSecretPassword');
        await loginpage.assertInvalidLoginPage();
    } )

// test('invalid login', async ({ page }) => {
//     await page.goto('https://practice.expandtesting.com/login');
//     await page.locator("//input[@id='username']").fill('practice');
//     await page.locator("//input[@id='password']").fill('SuperSecretPassword');
//     await page.locator("//button[normalize-space()='Login']").click();
//     await expect(page.locator("div[id='flash'] b")).toContainText('Your password is invalid!');

// });
});
// Test login scenario