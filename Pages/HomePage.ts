import {expect, type Locator, type Page} from '@playwright/test';

export class LoginFun {
    readonly page: Page;
    readonly username_tb: Locator;
    readonly password_tb: Locator;
    readonly login_btn: Locator;
    readonly SuccessfulLoginText: Locator;
    readonly InvalidLoginText: Locator;

    readonly url: string= 'https://practice.expandtesting.com/login';
    readonly SuccessfulLoginMessage: string = 'You logged into a secure area!';
    readonly InvalidLoginMessage: string = 'Your password is invalid!';

    constructor(page:Page){
        this.page = page;
        this.username_tb = page.getByLabel('username');
        this.password_tb = page.getByLabel('password');
        this.login_btn = page.getByRole('button' , {name: 'Login'});
        this.SuccessfulLoginText = page.getByText('You logged into a secure area!');
        this.InvalidLoginText = page.getByText('Your password is invalid!');
    }
        

        async goto () {
            await this.page.goto(this.url);
        }

        async login (username: string , password: string){
            await this.page.goto(this.url);
            await this.username_tb.fill(username);
            await this.password_tb.fill(password);
            await this.login_btn.click();
        }
        async assertLoginPage(){
            await expect(this.SuccessfulLoginText).toBeVisible();
        
        }
        async assertInvalidLoginPage (){
              await expect(this.InvalidLoginText).toBeVisible();

        }
      
    }
