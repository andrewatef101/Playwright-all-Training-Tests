import {expect, type Locator, type Page} from '@playwright/test';

export class CreatAccountPage {
    readonly page: Page;
    readonly GenderTitle_Mr: Locator;
    readonly GenderTitle_Mrs: Locator;
    readonly PreAddedName: Locator;
    readonly PreAddedEmail: Locator;
    readonly PasswordInput: Locator;
    readonly DayOfBirth: Locator;
    readonly MonthOfBirth: Locator;
    readonly YearOfBirth: Locator;
    readonly NewsletterCheckbox: Locator;
    readonly OffersCheckbox: Locator;

    readonly FirstnameInput: Locator;
    readonly LastnameInput: Locator;   
    readonly CompanyInput: Locator;
    readonly AddressInput: Locator;
    readonly Address2Input: Locator;
    readonly ChooseCountry: Locator;
    readonly StateInput: Locator;
    readonly CityInput: Locator;
    readonly ZipInput: Locator;
    readonly PhoneInput: Locator;
    readonly createAccountBtn: Locator;
    readonly AssertAccountCreated: Locator;
    readonly ContinueBtn: Locator;


    constructor(page:Page){
        this.page = page;

        this.GenderTitle_Mr = page.getByLabel('Mr.' , {exact: true});
        this.GenderTitle_Mrs = page.getByLabel('Mrs.', {exact: true});

        this.PreAddedName = page.locator('#name');
        this.PreAddedEmail = page.locator('#email');

        this.PasswordInput = page.getByLabel('Password *')

        this.DayOfBirth = page.locator('#days');
        this.MonthOfBirth = page.locator('#months');
        this.YearOfBirth = page.locator('#years');

        this.NewsletterCheckbox = page.getByLabel('Sign up for our newsletter!');
        this.OffersCheckbox = page.getByLabel('Receive special offers from our partners!');

        this.FirstnameInput = page.getByLabel('First name *');
        this.LastnameInput = page.getByLabel('Last name *');
        this.CompanyInput = page.getByLabel('Company');
        this.AddressInput = page.getByLabel('Address * (Street address, P.O. Box, Company name, etc.)');
        this.Address2Input = page.getByLabel('Address 2');
        this.ChooseCountry = page.locator("//select[@id='country']");
        this.StateInput = page.getByLabel('State *');
        this.CityInput = page.getByLabel('City *');
        this.ZipInput = page.locator("#zipcode");
        this.PhoneInput = page.getByLabel('Mobile Number *');
        this.createAccountBtn = page.getByRole('button', {name: "Create Account"});
        this.AssertAccountCreated = page.getByText("Account Created!");
        this.ContinueBtn = page.getByRole('link', {name: "Continue"});

    }

    async ChooseGender(gender: 'Mr.'| 'Mrs.'){
        if (gender === 'Mr.'){
            await this.GenderTitle_Mr.check();
            await expect(this.GenderTitle_Mr).toBeChecked();
        }
        else if(gender === 'Mrs.'){
            await this.GenderTitle_Mrs.check();
            await expect(this.GenderTitle_Mrs).toBeChecked();
        
        }

    }
        async AssertPrefilledData (name: string, email: string){
            await expect(this.PreAddedName).toHaveValue(name);
            await expect(this.PreAddedEmail).toHaveValue(email);
        }

        async GivePasswordInput(password: string){
            await this.PasswordInput.fill(password);
        }

        async GiveBirthdateInput(day: string, month: string, year: string){
            await this.DayOfBirth.selectOption(day);
            await this.MonthOfBirth.selectOption(month);
            await this.YearOfBirth.selectOption(year);
        }

        async CheckBoxes(newsletter: boolean, offers: boolean){
            await this.NewsletterCheckbox.setChecked(newsletter);
            await this.OffersCheckbox.setChecked(offers);
        }

        async  GiveAddressInfo(FirstName: string, LastName: string, Address: string, country: string, state: string, city: string, zipcode: string, phone: string, company?: string, address2?: string){
            await this.FirstnameInput.fill(FirstName);
            await this.LastnameInput.fill(LastName);
            if (company){
                await this.CompanyInput.fill(company);
                }
            await this.AddressInput.fill(Address);
            if (address2){
            await this.Address2Input.fill(address2);
            }
            await this.ChooseCountry.selectOption(country);
            await this.StateInput.fill(state);
            await this.CityInput.fill(city);
            await this.ZipInput.fill(zipcode);
            await this.PhoneInput.fill(phone);
        }
        async CreatAccountClick(){
            await this.createAccountBtn.click();

        }

        async AccountCreatedText(){
            await expect(this.AssertAccountCreated).toBeVisible();

        }

        async ContineToNextPage(){
            await this.ContinueBtn.click();
        }


}