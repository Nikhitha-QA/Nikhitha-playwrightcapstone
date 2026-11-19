import type { Locator, Page } from '@playwright/test';

export interface RegistrationDetails {
  title: string;
  password: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  firstName: string;
  lastName: string;
  address: string;
  state: string;
  city: string;
  zipCode: string;
  mobileNumber: string;
}

export default class RegistrationPage {
  readonly page: Page;
  readonly signupHeading: Locator;
  readonly nameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly accountInformationHeading: Locator;
  readonly accountCreatedMessage: Locator;
  readonly passwordInput: Locator;
  readonly birthDaySelect: Locator;
  readonly birthMonthSelect: Locator;
  readonly birthYearSelect: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipCodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;
  readonly continueLink: Locator;

  constructor(page: Page) {
    this.page = page;
    const signupForm = page.locator('form').filter({ has: page.getByRole('button', { name: 'Signup' }) });
    this.signupHeading = page.getByText('New User Signup!');
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.signupEmailInput = signupForm.getByPlaceholder('Email Address');
    this.signupButton = signupForm.getByRole('button', { name: 'Signup' });
    this.accountInformationHeading = page.getByText('Enter Account Information');
    this.accountCreatedMessage = page.getByText('Account Created!', { exact: true });
    this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
    this.birthDaySelect = page.locator('#days');
    this.birthMonthSelect = page.locator('#months');
    this.birthYearSelect = page.locator('#years');
    this.firstNameInput = page.getByRole('textbox', { name: 'First name *' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last name *' });
    this.addressInput = page.getByRole('textbox', { name: 'Address * (Street address, P.' });
    this.stateInput = page.getByRole('textbox', { name: 'State *' });
    this.cityInput = page.locator('#city');
    this.zipCodeInput = page.locator('#zipcode');
    this.mobileNumberInput = page.getByRole('textbox', { name: 'Mobile Number *' });
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
    this.continueLink = page.getByRole('link', { name: 'Continue' });
  }

  async startSignup(name: string, email: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async completeAccountDetails(details: RegistrationDetails): Promise<void> {
    await this.page.getByRole('radio', { name: details.title }).check();
    await this.passwordInput.fill(details.password);
    await this.birthDaySelect.selectOption(details.birthDay);
    await this.birthMonthSelect.selectOption(details.birthMonth);
    await this.birthYearSelect.selectOption(details.birthYear);
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.addressInput.fill(details.address);
    await this.stateInput.fill(details.state);
    await this.cityInput.fill(details.city);
    await this.zipCodeInput.fill(details.zipCode);
    await this.mobileNumberInput.fill(details.mobileNumber);
    await this.createAccountButton.click();
  }

  async continueAfterCreation(): Promise<void> {
    await this.continueLink.click();
  }
}
