import { test, expect } from '@playwright/test';

import {OpenAndLoginPage} from '../../Pages/SwagLaps/LoginPage';
import {ProductsPage} from '../../Pages/SwagLaps/Products_Page';
import {Cartpage} from '../../Pages/SwagLaps/Cart_Page';
import {Checkout_Step1} from '../../Pages/SwagLaps/Checkout_Step1';
import {Checkout_Step2} from '../../Pages/SwagLaps/Checkout_Step2';
import testData from '../../data/testData.json';

test.describe('Swag Page Tests', () => {
    let openAndLoginPage: OpenAndLoginPage;
    let productsPage: ProductsPage;
    let cartPage: Cartpage;
    let checkoutStep1: Checkout_Step1;
    let checkoutStep2: Checkout_Step2;

    test.beforeEach(async ({page}) => {
        openAndLoginPage = new OpenAndLoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new Cartpage(page);
        checkoutStep1 = new Checkout_Step1(page);
        checkoutStep2 = new Checkout_Step2(page);

        await openAndLoginPage.OpenWebsite();
    });

    test('Swag Page First', async ({page}) => {
    await openAndLoginPage.Login(testData.validUser.username, testData.validUser.password);

    await productsPage.ProductPageOpen();
    await productsPage.OptionMenuAssert();
    await productsPage.FilterOptionsAssert();
    //await productsPage.AddFirstProductAndGetDetails();

    const addedProduct = await productsPage.AddFirstProductAndGetDetails();


    await cartPage.goToCartPage();
    await cartPage.cartPageGeneralAssert();
    await cartPage.cartItemAssert(addedProduct.firstProductName, addedProduct.firstProductPrice);

    await cartPage.CheckoutClick();

    await checkoutStep1.PageTitleAssertions();
    await checkoutStep1.fillUserInfo(testData.shippingInfo.firstName, testData.shippingInfo.lastName, testData.shippingInfo.zipCode);
    await checkoutStep1.ClickContinue();


    await checkoutStep2.PageTitleAssertions();
    await checkoutStep2.ClickFinish();
    await checkoutStep2.SuccessOrderAssertions();

})

    test('Swag Page Empty Login Inputs', async ({page}) => {
    await openAndLoginPage.Login('','');
    await openAndLoginPage.EmptyLoginInputsAssertions();
})


    test('swag Page Unhappy Login', async ({page}) => {
    await openAndLoginPage.Login('standard_user', 'standard_user');
    await openAndLoginPage.FalseDataErrorAssertions();

})
})