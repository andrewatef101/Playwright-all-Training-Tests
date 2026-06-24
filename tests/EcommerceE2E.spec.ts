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

    const gender: 'Mr.' | 'Mrs.' = 'Mr.';
    const fname: string = 'Andrew';
    const lname: string = 'Ibrahim';
    const StreetWithNumber: string = 'Wollenweberstr. 58';
    const city: string = 'Hildesheim';
    const State: string = 'Niedersachsen';
    const zip: string = '31134';
    const country: string = 'Singapore';
    const phone: string = '+44 7777 77777';
    const company: string | undefined = undefined;
    const address2: string | undefined = undefined;
    
    const ItemDescription: string = 'Sleeveless Dress';
    const ItemPrice: string = 'Rs. 1000';
    const ItemQty: string = '1';
    const ItemTotal: string = 'Rs. 1000';
    const CartTotalAmount: string = 'Rs. 1000';

    await homepage.goto();
    await homepage.ConsentbtnCheck();
    await homepage.ClickProductsbtn();

    await allproductspage.ProductSearch('dress');
    await allproductspage.addToCart();

    await cartpage.PopUpAssertions();
    await cartpage.GoToCart();
    await cartpage.GetCartDetails(ItemDescription, ItemPrice, ItemQty, ItemTotal);
    await cartpage.RemoveItembtnVisible(); 
    await cartpage.ProceedToCheckoutClick();

    await checkoutpage.CheckoutPopUpAssertions();
    await checkoutpage.ProceedToCheckout();

    await register_LoginE2E.LoginOptionAssertions();
    await register_LoginE2E.ORTextAssertions();
    await register_LoginE2E.NewUserSignupAssertions();
    await register_LoginE2E.NewUserSignupAction('Andrew Ibrahim', 'Andr5@outlook.com');

    await creatAccountPage.ChooseGender(gender);
    await creatAccountPage.AssertPrefilledData('Andrew Ibrahim', 'Andr5@outlook.com');
    await creatAccountPage.GivePasswordInput('12345678');
    await creatAccountPage.GiveBirthdateInput('4', 'May', '1999');
    await creatAccountPage.CheckBoxes(false, true);
    await creatAccountPage.GiveAddressInfo(fname, lname, StreetWithNumber, country, city, State, zip, phone, company, address2);
    await creatAccountPage.CreatAccountClick();
    await creatAccountPage.AccountCreatedText();
    await creatAccountPage.ContineToNextPage();
    await allproductspage.CartbtnClick();
    await cartpage.ProceedToCheckoutClick();
    await checkoutpage.VerifyDeliveryAddress(gender,fname, lname, StreetWithNumber, State, city, zip, country, phone);
    await checkoutpage.VerifyBillingAddress(gender,fname, lname, StreetWithNumber, State, city, zip, country, phone);
    await checkoutpage.AssertCartInfo(ItemDescription, ItemPrice, ItemQty, ItemTotal, CartTotalAmount);
    await checkoutpage.WriteComment('Danke');
    await checkoutpage.PlaceOrderClick();



});