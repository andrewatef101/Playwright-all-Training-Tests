import { expect, type Page, type Locator } from '@playwright/test';

export class Cartpage { 
    readonly page: Page;
    readonly cartbtn: Locator;
    readonly pageTitle: Locator;
    readonly cartitemName: Locator;
    readonly CartItemprice: Locator;
    readonly removeitem: Locator;
    readonly continueshopping: Locator;
    readonly checkoutbtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartbtn = page.locator('.shopping_cart_link');
        this.pageTitle = page.getByText('Your Cart');
        this.cartitemName = page.locator('.inventory_item_name');
        this.CartItemprice = page.locator('.inventory_item_price');
        this.removeitem = page.getByRole('button', {name: 'Remove'});
        this.continueshopping = page.getByRole('button', {name: 'Continue Shopping'});
        this.checkoutbtn = page.getByRole('button', {name: 'Checkout'});
    }

    async goToCartPage(){
    await this.cartbtn.click(); 
    }

    async cartPageGeneralAssert(){
        await expect(this.pageTitle).toBeVisible();
        await expect(this.cartitemName).toBeVisible();
        await expect(this.CartItemprice).toBeVisible();
        await expect(this.removeitem).toBeVisible();
        await expect(this.continueshopping).toBeVisible();
        await expect(this.checkoutbtn).toBeVisible();
    }

    async cartItemAssert(ProductName: string, ProductPrice: string){
        await expect(this.cartitemName).toHaveText(ProductName);
        await expect(this.CartItemprice).toHaveText(ProductPrice);
}

    async CheckoutClick(){
        await this.checkoutbtn.click();
    }

    
}
