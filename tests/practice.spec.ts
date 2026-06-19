import { test, expect , type Locator , type Page } from '@playwright/test';

test ('test' , async ({page})=> {
    await page.goto('https://www.kleinanzeigen.de/s-anzeige/');
    await page.getByLabel('username').fill('andrew10');
    await page.getByLabel('password').fill('byby');
    await page.getByRole('button' , {name:'Login'});
    await expect(page.getByText('You logged in succesfully')).toBeVisible();

})


export class LoginPage {
    readonly page: Page;
    readonly username_tbx: Locator;
    readonly password_tbx: Locator;
    readonly Login_btn: Locator;
    readonly ValidLoginText: Locator;

    readonly Url: string= 'https://www.kleinanzeigen.de/s-anzeige/';
    readonly ValidLoginMessage: string=  'You Successfully Loged in';

    constructor(page: page) {
        this.page=page;
        this.username_tbx= page.getByLabel('username');
        this.password_tbx= page.getByLabel('password');
        this.Login_btn= page.getByRole('button' , {name: 'Login'});
        this.ValidLoginText= page.getByText('You Logged in Successfully');
    }
        async goto (){
            await this.page.goto(this.Url);
        }
        
        async Loginpage(username:string , password: string){
            await this.username_tbx.fill(username);
            await this.password_tbx.fill('bye bye');
            await this.Login_btn.click();
             }

            async AssertValidLoginMessage(){
                await this.ValidLoginText.toHaveText(this.ValidLoginMessage);
            }
        }
    




