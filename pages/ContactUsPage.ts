import type { Locator, Page } from '@playwright/test';

export interface ContactDetails {
  name: string;
  email: string;
  subject: string;
  message: string;
  successMessage: string;
}

export default class ContactUsPage {
  readonly page: Page;
  readonly contactUsLink: Locator;
  readonly form: Locator;
  readonly submitButton: Locator;
  readonly contactPage: Locator;
  readonly getInTouchHeading: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactUsLink = page.getByRole('link', { name: /Contact us/i });
    this.form = page.locator('form').filter({ has: page.locator('[data-qa="submit-button"]') });
    this.submitButton = this.form.locator('[data-qa="submit-button"]');
    this.contactPage = page.locator('#contact-page');
    this.getInTouchHeading = page.getByText('Get In Touch', { exact: true });
    this.nameInput = this.form.locator('[data-qa="name"]');
    this.emailInput = this.form.locator('[data-qa="email"]');
    this.subjectInput = this.form.locator('[data-qa="subject"]');
    this.messageInput = this.form.locator('[data-qa="message"]');
    this.successMessage = page.getByText(
      'Success! Your details have been submitted successfully.',
      { exact: true },
    );
  }
  async open(): Promise<void> { await this.contactUsLink.click(); }
  async submitEmpty(): Promise<void> { await this.submitButton.click(); }
  async submitForm(details: Omit<ContactDetails, 'successMessage'>): Promise<void> {
    await this.nameInput.fill(details.name);
    await this.emailInput.fill(details.email);
    await this.subjectInput.fill(details.subject);
    await this.messageInput.fill(details.message);
    await this.submitButton.click();
  }
}
