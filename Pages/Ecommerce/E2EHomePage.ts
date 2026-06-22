import { expect, type Locator, type Page } from '@playwright/test';

export class E2EHomePage {
    readonly page: Page;
    readonly products_btn: Locator;
    readonly consent_btn: Locator;

    readonly url: string = 'https://automationexercise.com';

    constructor(page:Page){
        this.page = page;
        this.products_btn = page.getByRole('link' , {name: 'Products'});
        this.consent_btn = page.getByRole('button' , {name: 'Consent'})
    }

    async goto () {
        await this.page.goto(this.url);
    }

    async ConsentbtnCheck (){
        if (await this.consent_btn.isVisible()) {
        await this.consent_btn.click();
        }
        
    }

    async ClickProductsbtn () {
        await this.products_btn.click();
    }

}