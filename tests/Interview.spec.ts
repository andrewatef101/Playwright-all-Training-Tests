import {test, expect} from '@playwright/test';

test.describe('Login Tests' , () =>{

    test ('ValidLoginTest' , async ({page}) => {
    await page.goto('https://practice.expandtesting.com/login');
    await page.locator("//input[@id='username']").fill('practice');
    await page.locator("//input[@id='password']").fill('SuperSecretPassword!');
    await page.locator("//button[@id='submit-login']").click();
    await expect(page.locator("(//b[normalize-space()='You logged into a secure area!'])[1]")).toContainText('You logged into a secure area!');

});

test ('InvalidLogintest' , async ({page}) => {
    await page.goto('https://practice.expandtesting.com/login');
    await page.locator("//input[@id='username']").fill('practicee');
    await page.locator("//input[@id='password']").fill('SuperSecretPassword!');
    await page.locator("//button[@id='submit-login']").click();
    await expect(page.locator("div[id='flash'] b")).toContainText('Your password is invalid!');


});
});