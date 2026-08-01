import { expect, type Page, type Locator } from '@playwright/test';

export class OpenAndLoginPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly UsernameInput: Locator;
    readonly PasswordInput: Locator;
    readonly LoginBtn: Locator;
    readonly FalseDataError: Locator;
    readonly EmptyLoginInputs: Locator;

    readonly URL: string = 'https://www.saucedemo.com/';

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByText('Swag Labs')
        this.UsernameInput = page.getByPlaceholder('Username');
        this.PasswordInput = page.getByPlaceholder('Password');
        this.LoginBtn = page.getByRole('button', {name: 'Login'});
        this.FalseDataError = page.getByText('Epic sadface: Username and password do not match any user in this service')
        this.EmptyLoginInputs = page.getByText('Epic sadface: Username is required');
    }

    async OpenWebsite(){
        await this.page.goto(this.URL);
        await expect(this.pageTitle).toBeVisible();
    }

    async Login(username: string, password: string){
        await this.UsernameInput.fill(username);
        await this.PasswordInput.fill(password);
        await this.LoginBtn.click();
    }

    async FalseDataErrorAssertions(){
        await expect(this.FalseDataError).toBeVisible();
    }

    async EmptyLoginInputsAssertions(){
        await expect(this.EmptyLoginInputs).toBeVisible();
    }
}
