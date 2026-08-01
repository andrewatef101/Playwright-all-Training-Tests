import { expect, type Page, type Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly pageTitle: Locator;

    readonly OptionMenuBtn: Locator;
    readonly AllItemsBtn: Locator;
    readonly AboutBtn: Locator;
    readonly LogoutBtn: Locator;
    readonly ResetAppStateBtn: Locator;
    readonly CloseMenuBtn: Locator;


    readonly CartBtn: Locator;

    readonly FilterBtn: Locator;
    readonly A_ToZ: Locator;
   
    readonly firstProductName: Locator;
    readonly firstProductPrice: Locator;
    readonly firstProductAddToCartBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByText('Products');

        this.OptionMenuBtn = page.locator('#react-burger-menu-btn');
        this.AllItemsBtn = page.getByRole('link', {name: 'All Items'});
        this.AboutBtn = page.getByRole('link', {name: 'About'});
        this.LogoutBtn = page.getByRole('link', {name: 'Logout'});
        this.ResetAppStateBtn = page.getByRole('link', {name: 'Reset App State'});
        this.CloseMenuBtn = page.locator('#react-burger-cross-btn');

        this.CartBtn = page.locator('.shopping_cart_link');

        this.FilterBtn = page.locator('.product_sort_container');
        this.A_ToZ = page.getByLabel('Name (A to Z)');
       
        this.firstProductName = page.locator('.inventory_item_name ').first();
        this.firstProductPrice = page.locator('.inventory_item_price').first();
        this.firstProductAddToCartBtn = page.getByRole('button', {name: 'Add to cart'}).first();
    }

        async ProductPageOpen(){
            await expect(this.pageTitle).toBeVisible();
        }

        async OptionMenuAssert(){
            await this.OptionMenuBtn.click();
            await expect(this.AllItemsBtn).toBeVisible();
            await expect(this.AboutBtn).toBeVisible();
            await expect(this.LogoutBtn).toBeVisible();
            await expect(this.ResetAppStateBtn).toBeVisible();
            await this.CloseMenuBtn.click();
        }

        async FilterOptionsAssert(){
            await this.FilterBtn.selectOption('za');
            await expect (this.FilterBtn).toHaveValue('za');
           
        }

        async AddFirstProductAndGetDetails(){
            await this.firstProductAddToCartBtn.click();
            await expect(this.CartBtn).toHaveText('1');
            const firstProductName = await this.firstProductName.innerText();
            const firstProductPrice = await this.firstProductPrice.innerText();

            return {firstProductName, firstProductPrice};
            
        }

    }




    
