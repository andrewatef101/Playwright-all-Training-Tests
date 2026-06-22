import {expect, type Locator, type Page} from '@playwright/test';

export class Register_LoginE2E {
    readonly page: Page;

    readonly LoginOption: Locator;
    readonly TypeEmailLogin: Locator;
    readonly TypePassword: Locator;
    readonly LoginBtn: Locator;

    readonly ORtext: Locator;

    readonly NewUserSignup: Locator;
    readonly TypeName: Locator;
    readonly TypeEmailSignup: Locator;
    readonly SignupBtn: Locator;

    
    constructor(page: Page) {
        this.page = page;

        this.LoginOption = page.getByText('Login to your account')
        this.TypeEmailLogin = page.locator("input[data-qa='login-email']");
        this.TypePassword = page.getByPlaceholder("Password");
        this.LoginBtn = page.getByRole('button', {name: 'Login'});

        this.ORtext = page.getByRole('heading', { name: /OR/i });

        this.NewUserSignup = page.getByText('New User Signup!');
        this.TypeName = page.getByPlaceholder('Name');
        this.TypeEmailSignup = page.locator("input[data-qa='signup-email']");
        this.SignupBtn = page.getByRole('button', {name: 'Signup'});
    }
    
    async LoginOptionAssertions() {
        await expect(this.LoginOption).toBeVisible();
        await expect(this.TypeEmailLogin).toBeVisible();
        await expect(this.TypePassword).toBeVisible();
        await expect(this.LoginBtn).toBeVisible();
}

    async ORTextAssertions() {
        await expect(this.ORtext).toBeVisible();
    }

    async NewUserSignupAssertions() {
        await expect(this.NewUserSignup).toBeVisible();
        await expect(this.TypeName).toBeVisible();
        await expect(this.TypeEmailSignup).toBeVisible();
        await expect(this.SignupBtn).toBeVisible();
    }

    async NewUserSignupAction (Name: string, Email: string) {
        await this.TypeName.fill(Name);
        await this.TypeEmailSignup.fill(Email);
        await this.SignupBtn.click();
    }
}