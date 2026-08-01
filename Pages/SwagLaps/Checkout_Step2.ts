import {expect, type Page, type Locator} from '@playwright/test';

export class Checkout_Step2 {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly finishBtn: Locator;
    readonly CancelBtn: Locator;
    readonly SuccessOrder: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByText('Checkout: Overview');
        this.finishBtn = page.getByRole('button', {name: 'Finish'});
        this.CancelBtn = page.getByRole('button', {name: 'Cancel'});
        this.SuccessOrder = page.getByText('Thank you for your order!');
}

async PageTitleAssertions(){
    await expect(this.pageTitle).toBeVisible();
}

async ClickFinish(){
    await this.finishBtn.click();
}

async ClickCancel(){
    await expect(this.CancelBtn).toBeVisible();
}

async SuccessOrderAssertions(){
    await expect(this.SuccessOrder).toBeVisible();  
}
}