import {expect, type Locator, type Page} from '@playwright/test';
export class CheckoutPage {
    
    readonly page: Page;
    readonly CheckoutPopUp: Locator;
    readonly Register_LoginText: Locator;
    readonly Register_LoginLink: Locator;
    readonly ContinueCartbtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.CheckoutPopUp = page.locator('.modal-content');
        this.Register_LoginText = page.getByText('Register / Login account to proceed on checkout.');
        this.Register_LoginLink = page.getByRole('link', {name:'Register / Login'});
        this.ContinueCartbtn = page.getByRole('button', {name:"Continue On Cart"});
    }


    async CheckoutPopUpAssertions() {
        await expect(this.CheckoutPopUp).toBeVisible();
        await expect(this.Register_LoginText).toBeVisible();
        await expect(this.Register_LoginLink).toBeVisible();
        await expect(this.ContinueCartbtn).toBeVisible();
    }

        async ProceedToCheckout() {
            await this.Register_LoginLink.click();
        }
        


    
}