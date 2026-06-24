import {expect, type Locator, type Page} from '@playwright/test';
export class CheckoutPage {
    
    readonly page: Page;
    readonly CheckoutPopUp: Locator;
    readonly Register_LoginText: Locator;
    readonly Register_LoginLink: Locator;
    readonly ContinueCartbtn: Locator;

    readonly DeliveryAddressAllInfo: Locator;
    readonly DeliveryTitleAndName: Locator;
    readonly DeliveryStreetAndNumber: Locator;
    readonly DeliveryCityAndZip: Locator;
    readonly DeliveryCountry: Locator;
    readonly DeliveryPhone: Locator;

    readonly BillingAddressAllInfo: Locator;
    readonly BillingTitleAndName: Locator;
    readonly BillingStreetAndNumber: Locator;
    readonly BillingCityAndZip: Locator;
    readonly BillingCountry: Locator;
    readonly BillingPhone: Locator;

    readonly ReviewOrder: Locator;
    readonly CartBox: Locator;
    readonly ReviewDescription: Locator;
    readonly ReviewPrice: Locator;
    readonly ReviewQty: Locator;
    readonly ReviewTotal: Locator;
    readonly ReviewTotalAmount: Locator;

    readonly CommentField: Locator;
    readonly PlaceOrderBtn: Locator;
    



    constructor(page: Page) {
        this.page = page;
        this.CheckoutPopUp = page.locator('.modal-content');
        this.Register_LoginText = page.getByText('Register / Login account to proceed on checkout.');
        this.Register_LoginLink = page.getByRole('link', {name:'Register / Login'});
        this.ContinueCartbtn = page.getByRole('button', {name:"Continue On Cart"});

        this.DeliveryAddressAllInfo = page.locator('#address_delivery');
        this.DeliveryTitleAndName = this.DeliveryAddressAllInfo.locator('.address_firstname');
        this.DeliveryStreetAndNumber = this.DeliveryAddressAllInfo.locator('.address_address1').filter({hasNotText: /^$/});
        this.DeliveryCityAndZip = this.DeliveryAddressAllInfo.locator('.address_city');
        this.DeliveryCountry = this.DeliveryAddressAllInfo.locator('.address_country_name');
        this.DeliveryPhone = this.DeliveryAddressAllInfo.locator('.address_phone');

        this.BillingAddressAllInfo = page.locator('#address_invoice');
        this.BillingTitleAndName = this.BillingAddressAllInfo.locator('.address_firstname');
        this.BillingStreetAndNumber = this.BillingAddressAllInfo.locator('.address_address1').filter({hasNotText: /^$/});
        this.BillingCityAndZip = this.BillingAddressAllInfo.locator('.address_city');
        this.BillingCountry = this.BillingAddressAllInfo.locator('.address_country_name');
        this.BillingPhone = this.BillingAddressAllInfo.locator('.address_phone');

        this.ReviewOrder = page.locator('div:nth-child(4) h2:nth-child(1)');

        this.CartBox = page.locator('.table.table-condensed');
        this.ReviewDescription = this.CartBox.locator('.cart_description').first();
        this.ReviewPrice = this.CartBox.locator('.cart_price').first(); 
        this.ReviewQty = this.CartBox.locator('.cart_quantity').first();
        this.ReviewTotal = this.CartBox.locator('.cart_total').first();
        this.ReviewTotalAmount = this.CartBox.locator('.cart_total_price');


        this.CommentField = page.locator("textarea[name='message']");
        this.PlaceOrderBtn = page.getByRole('link', {name:"Place Order"});

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
        
        async VerifyDeliveryAddress(
         gender: 'Mr.' | 'Mrs.' ,
         fnmae: string,
         lname: string,
         streetWitNumber: string,
         city: string,
         State: string,
         zip: string,
         country: string,
         phone: string
         ) {
          
            const expectedFullName = `${gender} ${fnmae} ${lname}`;
            const expectedAddress = `${city} ${State} ${zip}`;

            await expect(this.DeliveryTitleAndName).toHaveText(expectedFullName);
            await expect(this.DeliveryStreetAndNumber).toHaveText(streetWitNumber);
            await expect(this.DeliveryCityAndZip).toHaveText(expectedAddress);
            await expect(this.DeliveryCountry).toHaveText(country);
            await expect(this.DeliveryPhone).toHaveText(phone);
         }


         async VerifyBillingAddress(
             title: 'Mr.' | 'Mrs.' ,
             fnmae: string,
             lname: string,
             streetWitNumber: string,
             city: string,
             state: string,
             zip: string,
             country: string,
             phone: string
         ) {
            const expectedFullName = `${title} ${fnmae} ${lname}`;
            const expectedAddress = `${city} ${state} ${zip}`;

            await expect (this.BillingTitleAndName).toHaveText(expectedFullName);
            await expect (this.BillingStreetAndNumber).toHaveText(streetWitNumber);
            await expect (this.BillingCityAndZip).toHaveText(expectedAddress);
            await expect (this.BillingCountry).toHaveText(country);
            await expect (this.BillingPhone).toHaveText(phone);
         }


         async AssertCartInfo(
            ItemDescription: string,
            ItemPrice: string,
            ItemQty: string,
            ItemTotal: string,
            CartTotalAmount: string
         ){
            await expect(this.ReviewDescription).toContainText(ItemDescription);
            await expect(this.ReviewPrice).toContainText(ItemPrice);
            await expect(this.ReviewQty).toContainText(ItemQty);
            await expect(this.ReviewTotal).toContainText(ItemTotal);
            await expect(this.ReviewTotalAmount.last()).toContainText(CartTotalAmount);
            
         }

         async WriteComment(comment: string){
            await this.CommentField.fill(comment);
         }

         async PlaceOrderClick(){
            await this.PlaceOrderBtn.click();
         }

         
    
}