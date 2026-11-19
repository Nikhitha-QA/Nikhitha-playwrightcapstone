import { test as baseTest, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import ContactUsPage from '../pages/ContactUsPage';

type Fixtures = {
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  contactUsPage: ContactUsPage;
};

export const test = baseTest.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  registrationPage: async ({ page }, use) => use(new RegistrationPage(page)),
  productsPage: async ({ page }, use) => use(new ProductsPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  contactUsPage: async ({ page }, use) => use(new ContactUsPage(page)),
});

export { expect };
