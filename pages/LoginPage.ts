import type { Locator, Page } from '@playwright/test';

export default class LoginPage {
  readonly page: Page;
  readonly loginForm: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly loggedInUser: Locator;
  readonly loginHeading: Locator;
  readonly logoutLink: Locator;
  readonly invalidLoginMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginForm = page.locator('form[action="/login"]');
    this.loginEmailInput = this.loginForm.getByRole('textbox', { name: 'Email Address' });
    this.loginPasswordInput = this.loginForm.getByRole('textbox', { name: 'Password' });
    this.loginButton = this.loginForm.getByRole('button', { name: 'Login' });
    this.loggedInUser = page.locator('a').filter({ hasText: 'Logged in as' });
    this.loginHeading = page.getByRole('heading', { name: 'Login to your account' });
    this.logoutLink = page.getByRole('link', { name: /Logout/ });
    this.invalidLoginMessage = page.getByText('Your email or password is incorrect!', { exact: true });
  }

  async open(baseUrl: string): Promise<void> {
    await this.page.goto(new URL('login', baseUrl).toString(), {
      waitUntil: 'domcontentloaded',
    });
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }
}
