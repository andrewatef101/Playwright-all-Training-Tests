import {test, expect} from '@playwright/test';

import {E2EHomePage} from '../Pages/Ecommerce/E2EHomePage';
import {AllProducts} from '../Pages/Ecommerce/AllProductsPage';
import {CartPage} from '../Pages/Ecommerce/CartPage';
import {CheckoutPage} from '../Pages/Ecommerce/CheckoutPage';
import {Register_LoginE2E} from '../Pages/Ecommerce/Register_LoginE2E';
import {AccountInfo} from '../Pages/Ecommerce/AccountInfo';

test('E2E Ecommerce Test', async ({page}) =>{
    const homepage = new E2EHomePage(page);
    const allproductspage = new AllProducts(page);
    const cartpage = new CartPage(page);
    const checkoutpage = new CheckoutPage(page);
    const register_LoginE2E = new Register_LoginE2E(page);
    const accountinfo = new AccountInfo(page);

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
    await register_LoginE2E.NewUserSignupAction('Andrew Ibrahim', 'Andrewateoo@outlook.com');

    await accountinfo.GenderTitleSelect('Mr');        
    await accountinfo.VerifyPrefilledData('Andrew Ibrahim', 'Andrewateoo@outlook.com');
    await accountinfo.GivePasswordInput('Wa7edshay!');
    await accountinfo.GiveBirthdayInput('4', 'May', '2001');
    await accountinfo.MarkNewsLetterAndOffersCheckboxes(false, true);
    await accountinfo.GiveAddressInfo('Andrew', 'Ibrahim', 'WollenWeberstr. 58', 'Canada', 'Niedersachsen', 'Hildesheim', '31134', '+1 (123) 456-7890', undefined, undefined);
    await accountinfo.ClickCreateAccountBtn();
    


})