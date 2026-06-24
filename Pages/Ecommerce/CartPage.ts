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

    async GetCartDetails(ItemDescription: string, ItemPrice: string, ItemQty: string, ItemTotal: string) {
        await expect(this.InfoDesc).toHaveText(ItemDescription);
        await expect(this.InfoPrice).toHaveText(ItemPrice);
        await expect(this.InfoQty).toHaveText(ItemQty);
        await expect(this.InfoTotal).toHaveText(ItemTotal);

    }
        
        async RemoveItembtnVisible() {
            await expect(this.RemoveBtn).toBeVisible();
        }

        async ProceedToCheckoutClick() {
            await expect(this.ProceedToCheckoutBtn).toBeVisible();
            await this.ProceedToCheckoutBtn.click();
        }

       
    }