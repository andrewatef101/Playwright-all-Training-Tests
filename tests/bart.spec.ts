import {test , expect} from '@playwright/test';

test.describe('Login' , ()=>{
    
    test('ValidLogin' , async ({page})=>{
        await page.goto('https://practicetestautomation.com/practice-test-login/');
        await page.getByLabel('username').fill("student");
        await page.getByLabel('password').fill("Password123");
        await page.getByRole('button' , {name: 'Submit'}).click();
        await expect (page.getByText('Logged In Successfully')).toBeVisible();
        await expect (page.getByText('Congratulations student. You successfully logged in!')).toBeVisible();
        await expect (page.getByRole('link' , {name: 'Log out'})).toBeVisible();
    })
})