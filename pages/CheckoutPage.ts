import type { Locator, Page } from '@playwright/test';

export interface PaymentDetails {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}

export default class CheckoutPage {
  readonly page: Page;
  readonly checkoutRows: Locator;
  readonly addressDetailsHeading: Locator;
  readonly reviewOrderHeading: Locator;
  readonly orderCommentInput: Locator;
  readonly placeOrderLink: Locator;
  readonly cardNameInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cardCvcInput: Locator;
  readonly cardExpiryMonthInput: Locator;
  readonly cardExpiryYearInput: Locator;
  readonly payAndConfirmButton: Locator;
  readonly orderConfirmationMessage: Locator;
  readonly adCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutRows = page.locator('.cart_info tbody tr');
    this.addressDetailsHeading = page.getByText('Address Details', { exact: true });
    this.reviewOrderHeading = page.getByText('Review Your Order', { exact: true });
    this.orderCommentInput = page.locator('textarea[name="message"]');
    this.placeOrderLink = page.getByRole('link', { name: 'Place Order' });
    this.cardNameInput = page.locator('[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('[data-qa="card-number"]');
    this.cardCvcInput = page.locator('[data-qa="cvc"]');
    this.cardExpiryMonthInput = page.locator('[data-qa="expiry-month"]');
    this.cardExpiryYearInput = page.locator('[data-qa="expiry-year"]');
    this.payAndConfirmButton = page.locator('[data-qa="pay-button"]');
    this.orderConfirmationMessage = page.getByText('Congratulations! Your order has been confirmed!', { exact: true });
    this.adCloseButton = page.getByText('Close', { exact: true });
  }
  getCheckoutRow(productName: string): Locator { return this.checkoutRows.filter({ hasText: productName }); }
  getProductLink(productName: string): Locator { return this.getCheckoutRow(productName).getByRole('link', { name: productName, exact: true }); }
  getProductPrice(productName: string): Locator { return this.getCheckoutRow(productName).locator('.cart_price p'); }
  getProductTotal(productName: string): Locator { return this.getCheckoutRow(productName).locator('.cart_total p'); }
  async placeOrder(comment: string): Promise<void> {
    await this.orderCommentInput.fill(comment);
    await this.placeOrderLink.click();
  }
  async dismissAdIfPresent(): Promise<void> {
    if (await this.adCloseButton.isVisible()) await this.adCloseButton.click();
  }
  async payAndConfirm(payment: PaymentDetails): Promise<void> {
    await this.dismissAdIfPresent();
    await this.cardNameInput.fill(payment.nameOnCard);
    await this.cardNumberInput.fill(payment.cardNumber);
    await this.cardCvcInput.fill(payment.cvc);
    await this.cardExpiryMonthInput.fill(payment.expiryMonth);
    await this.cardExpiryYearInput.fill(payment.expiryYear);
    await this.payAndConfirmButton.click();
  }
}
