import {expect, type Page, type Locator} from '@playwright/test';

export class Checkout_Step1 {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly ZipCodeInput: Locator;
    readonly ContinueBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByText('Checkout: Your Information');
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.ZipCodeInput = page.getByPlaceholder("Zip/Postal Code");
        this.ContinueBtn = page.getByRole('button', {name: 'Continue'});
}

async PageTitleAssertions(){
    await expect(this.pageTitle).toBeVisible();
}

async fillUserInfo(firstNmae: string, LastName: string, ZipCode: string){
    await this.firstNameInput.fill(firstNmae);
    await this.lastNameInput.fill(LastName);
    await this.ZipCodeInput.fill(ZipCode);
}

async ClickContinue(){
    await this.ContinueBtn.click();
}

}