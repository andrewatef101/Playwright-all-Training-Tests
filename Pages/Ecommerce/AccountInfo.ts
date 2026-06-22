import {expect, type Locator, type Page} from '@playwright/test';

export class AccountInfo {
    readonly page: Page;
    readonly AccountInfoTitle: Locator;
    readonly TitleMr: Locator;
    readonly TitleMrs: Locator;
    readonly AddedName: Locator;
    readonly AddedEmail: Locator;
    readonly PasswordInput: Locator;
    readonly DayOfBirth: Locator;
    readonly MonthOfBirth: Locator;
    readonly YearOfBirth: Locator;
    readonly NewsletterCheckbox: Locator;
    readonly OffersCheckbox: Locator;

    readonly AddressInfoTitle: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly CompanyInput: Locator;
    readonly AddressInput: Locator;
    readonly Address2Input: Locator;
    readonly ChooseCountry: Locator;
    readonly StateInput: Locator;
    readonly CityInput: Locator;
    readonly ZipInput: Locator;    
    readonly PhoneInput: Locator;
    readonly createAccountBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.AccountInfoTitle = page.getByText('Enter Account Information');
        this.TitleMr = page.getByLabel('Mr.' , {exact: true});
        this.TitleMrs = page.getByLabel('Mrs.' , {exact: true});
        this.AddedName = page.locator('#name');
        this.AddedEmail = page.locator('#email');
        this.PasswordInput = page.getByLabel('Password *');
        this.DayOfBirth = page.locator('#days');
        this.MonthOfBirth = page.locator('#months');
        this.YearOfBirth = page.locator('#years');
        this.NewsletterCheckbox = page.getByLabel('Sign up for our newsletter!' , {exact: true});
        this.OffersCheckbox = page.getByLabel('Receive special offers from our partners!' , {exact: true});
        this.AddressInfoTitle = page.getByText('Address Information');
        this.firstNameInput = page.getByLabel('First name *');
        this.lastNameInput = page.getByLabel('Last name *');
        this.CompanyInput = page.getByLabel('Company');
        this.AddressInput = page.getByLabel('Address * (Street address, P.O. Box, Company name, etc.)');
        this.Address2Input = page.getByLabel('Address 2');
        this.ChooseCountry = page.locator("//select[@id='country']");
        this.StateInput = page.getByLabel('State *');
        this.CityInput = page.getByLabel('City *');
        this.ZipInput = page.locator('#zipcode');
        this.PhoneInput = page.getByLabel('Mobile Number *');
        this.createAccountBtn = page.getByRole('button', {name: 'Create Account'});


}

    async GenderTitleSelect(gender: 'Mr' | 'Mrs') {
        if (gender === 'Mr'){
            await this.TitleMr.check();
            await expect(this.TitleMr).toBeChecked();
        }
        else if (gender === 'Mrs'){
            await this.TitleMrs.check();
            await expect(this.TitleMrs).toBeChecked();
        }

    }

    async VerifyPrefilledData(name: string, email: string){
        await expect(this.AddedName).toHaveValue(name);
        await expect(this.AddedEmail).toHaveValue(email);
    }

    async GivePasswordInput(password: string){
        await this.PasswordInput.fill(password);
    }

    async GiveBirthdayInput(day: string, month: string, year: string){
        await this.DayOfBirth.selectOption(day);
        await this.MonthOfBirth.selectOption(month);
        await this.YearOfBirth.selectOption(year);
    }

    async MarkNewsLetterAndOffersCheckboxes(newsLetter: boolean, offers: boolean){
        await this.NewsletterCheckbox.setChecked(newsLetter);
        await this.OffersCheckbox.setChecked(offers);
    }

    async GiveAddressInfo(firstName: string, lastName: string, address: string, country: string, state: string, city: string, zip: string, phone: string, company?: string, address_2?: string){
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
         if (company){
            await this.CompanyInput.fill(company);
        }
        await this.AddressInput.fill(address);
        if (address_2){
            await this.Address2Input.fill(address_2);
        }
        await this.ChooseCountry.selectOption(country);
        await this.StateInput.fill(state);
        await this.CityInput.fill(city);
        await this.ZipInput.fill(zip);
        await this.PhoneInput.fill(phone); 
    }

    async ClickCreateAccountBtn(){
        await this.createAccountBtn.click();
    }







}