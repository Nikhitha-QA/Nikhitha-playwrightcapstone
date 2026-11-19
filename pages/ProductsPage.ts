import type { Locator, Page } from '@playwright/test';

export default class ProductsPage {
  readonly page: Page;
  readonly productsLink: Locator;
  readonly allProductsHeading: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsHeading: Locator;
  readonly productTitles: Locator;
  readonly productCards: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsLink = page.getByRole('link', { name: ' Products' });
    this.allProductsHeading = page.getByRole('heading', { name: 'All Products' });
    this.searchInput = page.getByPlaceholder('Search Product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsHeading = page.getByRole('heading', { name: 'Searched Products' });
    this.productTitles = page.locator('.features_items .productinfo p');
    this.productCards = page.locator('.features_items .productinfo');
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
  }

  getProductCard(productName: string): Locator {
    return this.productCards.filter({ has: this.page.getByText(productName, { exact: true }) });
  }
  getProductPrice(productName: string): Locator {
    return this.getProductCard(productName).locator('h2');
  }
  getAddToCartAction(productName: string): Locator {
    return this.getProductCard(productName).getByText('Add to cart', { exact: true });
  }
  async open(): Promise<void> { await this.productsLink.click(); }
  async search(searchTerm: string): Promise<void> {
    await this.searchInput.fill(searchTerm);
    await this.searchButton.click();
  }
  async addNamedProduct(productName: string): Promise<string> {
    const price = (await this.getProductPrice(productName).innerText()).trim();
    await this.getAddToCartAction(productName).click();
    await this.continueShoppingButton.click();
    return price;
  }
}
