import {expect, type Locator, type Page} from '@playwright/test';

export class AllProducts{

    readonly page: Page;
    readonly search_input: Locator;
    readonly search_btn: Locator;
    readonly Product_hover: Locator;
    readonly add_to_cart_btn: Locator;
     readonly Cart_btn_click: Locator;

    constructor(page: Page){
        this.page = page;
        this.search_input =page.getByPlaceholder('Search Product');
        this.search_btn = page.locator('#submit_search');
        this.Product_hover = page.locator('.single-products').first();
        this.add_to_cart_btn = page.locator(".features_items .add-to-cart").first();
        this.Cart_btn_click = page.getByRole('link', {name: "Cart"});
    }

        async ProductSearch(ProductName: string){
            await this.search_input.fill(ProductName);
            await this.search_btn.click();
        }

        async addToCart(){
            await this.add_to_cart_btn.click({force: true});
        }
        
        async CartbtnClick() {
            await this.Cart_btn_click.click();
            }
    }