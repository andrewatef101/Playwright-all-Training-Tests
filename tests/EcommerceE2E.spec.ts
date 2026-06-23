import {test, expect} from '@playwright/test';

import {E2EHomePage} from '../Pages/Ecommerce/E2EHomePage';
import {AllProducts} from '../Pages/Ecommerce/AllProductsPage';
import {CartPage} from '../Pages/Ecommerce/CartPage';
import {CheckoutPage} from '../Pages/Ecommerce/CheckoutPage';
import {Register_LoginE2E} from '../Pages/Ecommerce/Register_LoginE2E';
import {CreatAccountPage} from '../Pages/Ecommerce/AccountInfo';

test('E2E Ecommerce Test', async ({page}) =>{
    const homepage = new E2EHomePage(page);
    const allproductspage = new AllProducts(page);
    const cartpage = new CartPage(page);
    const checkoutpage = new CheckoutPage(page);
    const register_LoginE2E = new Register_LoginE2E(page);
    const creatAccountPage = new CreatAccountPage(page);

    await homepage.goto();
    await homepage.ConsentbtnCheck();
    await homepage.ClickProductsbtn();

    await allproductspage.ProductSearch('dress');
    await allproductspage.addToCart();

    await cartpage.PopUpAssertions();
    await cartpage.GoToCart();
    await cartpage.GetCartDetails('Sleeveless Dress', 'Rs. 1000', '1', 'Rs. 1000')
    await cartpage.RemoveItembtn(); 
    await cartpage.ProceedToCheckout();

    await checkoutpage.CheckoutPopUpAssertions();
    await checkoutpage.ProceedToCheckout();

    await register_LoginE2E.LoginOptionAssertions();
    await register_LoginE2E.ORTextAssertions();
    await register_LoginE2E.NewUserSignupAssertions();
    await register_LoginE2E.NewUserSignupAction('Andrew Ibrahim', 'Andrewatw@outlook.com');

    await creatAccountPage.ChooseGender('Mr.');
    await creatAccountPage.AssertPrefilledData('Andrew Ibrahim', 'Andrewatw@outlook.com');
    await creatAccountPage.GivePasswordInput('12345678');
    await creatAccountPage.GiveBirthdateInput('4', 'May', '1999');
    await creatAccountPage.CheckBoxes(false, true);
    await creatAccountPage.GiveAddressInfo('Andrew', 'Ibrahim', '123, Main Street', 'Singapore', 'London', 'London', '31134', '+44 7777 77777', undefined, undefined);
    await creatAccountPage.CreatAccountClick();
    await creatAccountPage.AccountCreatedText();

});