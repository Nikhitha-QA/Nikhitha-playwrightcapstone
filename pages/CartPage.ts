import type { Locator, Page } from '@playwright/test';

export default class CartPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly shoppingCartHeading: Locator;
  readonly cartRows: Locator;
  readonly deleteButtons: Locator;
  readonly emptyCartMessage: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.getByRole('link', { name: ' Cart' });
    this.shoppingCartHeading = page.getByText('Shopping Cart', { exact: true });
    this.cartRows = page.locator('.cart_info tbody tr');
    this.deleteButtons = page.locator('.cart_quantity_delete');
    this.emptyCartMessage = page.getByText('Cart is empty!');
    this.checkoutButton = page.locator('a.btn.btn-default.check_out');
  }
  getProductRow(productName: string): Locator { return this.cartRows.filter({ hasText: productName }); }
  getProductLink(productName: string): Locator { return this.getProductRow(productName).getByRole('link', { name: productName, exact: true }); }
  getProductPrice(productName: string): Locator { return this.getProductRow(productName).locator('.cart_price p'); }
  getProductTotal(productName: string): Locator { return this.getProductRow(productName).locator('.cart_total p'); }
  getRemoveProductButton(productName: string): Locator { return this.getProductRow(productName).locator('.cart_quantity_delete'); }
  async open(): Promise<void> { await this.cartLink.click(); }
  async removeProduct(productName: string): Promise<void> { await this.getRemoveProductButton(productName).click(); }
  async clearCart(): Promise<void> {
    await this.open();
    while (true) {
      const rowCountBefore = await this.cartRows.count();
      if (rowCountBefore === 0) break;
      await this.deleteButtons.first().click();
      await this.page.waitForFunction(
        (previousCount) => document.querySelectorAll('.cart_info tbody tr').length < previousCount,
        rowCountBefore,
      );
    }
  }
  async proceedToCheckout(): Promise<void> { await this.checkoutButton.click(); }
}
