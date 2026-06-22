import {expect, type Locator, type Page} from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly ProductAddedPopUp: Locator;
    readonly ViewCartBtn: Locator;
    readonly ContinueShoppingbtn: Locator;
    
    readonly ProceedToCheckoutBtn: Locator;
    readonly RemoveBtn: Locator;
    readonly InfoItem: Locator;
    readonly InfoDesc: Locator;
    readonly InfoPrice: Locator;
    readonly InfoQty: Locator;
    readonly InfoTotal: Locator;

    readonly AddedTitle: Locator;
    readonly AddedMessage:Locator; 


    constructor(page: Page) {
        this.page = page;
        this.ProductAddedPopUp = page.locator('.modal-content');
        this.AddedTitle = page.getByText("Added!");
        this.AddedMessage = page.getByText("Your product has been added to cart.");
        this.ViewCartBtn = page.getByRole('link', {name: "View Cart"});
        this.ContinueShoppingbtn = page.getByRole('button', {name: "Continue Shopping"});
      
        
        this.ProceedToCheckoutBtn = page.locator('.btn.btn-default.check_out');
        
        this.RemoveBtn = page.locator('.fa.fa-times').first();
        this.InfoItem = page.locator("img[alt='Product Image']").first();
        this.InfoDesc = page.locator("td[class='cart_description'] h4").first();
        this.InfoPrice = page.locator(".cart_price").first();
        this.InfoQty = page.locator('.cart_quantity').first();
        this.InfoTotal = page.locator('.cart_total').first ();

    }

    async PopUpAssertions() {
        await expect(this.ProductAddedPopUp).toBeVisible();
        await expect(this.AddedTitle).toBeVisible();
        await expect(this.AddedMessage).toBeVisible();
        await expect(this.ViewCartBtn).toBeVisible();
        await expect(this.ContinueShoppingbtn).toBeVisible();
    }

    async GoToCart() {
        await this.ViewCartBtn.click();
    }

    async GetCartDetails(expectedName: string, expectedPrice: string, expectedQty: string, expectedTotal: string) {
        await expect(this.InfoDesc).toHaveText(expectedName);
        await expect(this.InfoPrice).toHaveText(expectedPrice);
        await expect(this.InfoQty).toHaveText(expectedQty);
        await expect(this.InfoTotal).toHaveText(expectedTotal);

    }
        
        async RemoveItembtn() {
            await expect(this.RemoveBtn).toBeVisible();
        }

        async ProceedToCheckout() {
            await expect(this.ProceedToCheckoutBtn).toBeVisible();
            await this.ProceedToCheckoutBtn.click();
        }
    }