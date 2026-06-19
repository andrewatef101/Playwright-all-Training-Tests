import { expect , type Locator, type Page } from "@playwright/test";

export class LoginPage {
    //locator
    readonly page: Page;
    readonly username_tb: Locator;
    readonly password_tb: Locator;
    readonly Login_btn: Locator;
    readonly SuccessfulLoginText: Locator;
    //varibels
    readonly url: string = 'https://practice.expandtesting.com/login';
    readonly SuccessfullLoginText: string = 'You logged into a secure area!';
    //constractor
    constructor(page:Page){
        this.page= page;
        this.username_tb =  page.getByLabel('username');
        this.password_tb = page.getByLabel('password');
        this.Login_btn = page.getByRole('button' , {name: 'Login'});
        this.SuccessfulLoginText = page.getByText ('You logged into a secure area!');

    }
    //Methods
    //Actions
    async goto (){
        await this.page.goto(this.url);
    }
    async Login (username : string , password: string){
        await this.page.goto(this.url);
        await this.username_tb.fill('practice');
        await this.password_tb.fill('SuperSecretPassword!');
        await this.Login_btn.click();
    }
    //Assertion
    async assertLoginPageText () {
        await expect(this.SuccessfulLoginText).toBeVisible();
    }
}