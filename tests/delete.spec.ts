import { test , expect} from '@playwright/test';

import {LoginPage} from '../Pages/Login'

test.describe('Login Test' , () =>{
    test ('Valid Login' , async ({page}) => {
        const loginPage = new LoginPage (page);
        // await loginPage.goto();
        // await loginPage.Login('practice' , 'SuperSecretPassword!' )
        await loginPage.Login('practice' , 'SuperSecretPassword!');
        await loginPage.assertLoginPageText();
    });

    test ('InValidLogin' , async ({page}) => {
        const loginPage = new LoginPage (page);
        await loginPage.goto();
        await loginPage.Login('practice' , 'SuperSecretPassword');
    })

// await page.goto('https://practice.expandtesting.com/login');
// await page.getByLabel('username').fill("practice");
// await page.getByLabel('password').fill("SuperSecretPassword!");
// await page.getByRole('button' , {name: 'Login'}).click();
// await expect (page.getByText ('You logged into a secure area!')).toBeVisible();

// });

// test('InValidLogin' , async ({page}) => {
// await page.goto("https://practice.expandtesting.com/login");
// await page.locator("#username").fill("practice");
// await page.locator("#password").fill("SuperSecretPassword");
// await page.locator("#submit-login").click();
// await expect(page.locator("div[id='flash'] b")).toContainText("Your password is invalid!");


// });


});
