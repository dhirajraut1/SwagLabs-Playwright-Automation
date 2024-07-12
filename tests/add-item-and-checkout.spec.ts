import { test as base, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.pom';
import { CheckoutYourInfoPage } from '../pages/checkout-your-info.pom';
import { CheckoutOverviewPage } from '../pages/checkout-overview.pom';
import { CheckoutCompletePage } from '../pages/checkout-complete.pom';

const test = base.extend<{
    inventoryPage: InventoryPage;
    checkOutYourInfoPage: CheckoutYourInfoPage;
    checkoutOverviewPage: CheckoutOverviewPage;
    checkoutCompletePage: CheckoutCompletePage;
}>({
    inventoryPage: ({ page }, use) => use(new InventoryPage(page)),
    checkOutYourInfoPage: ({ page }, use) => use(new CheckoutYourInfoPage(page)),
    checkoutOverviewPage: ({ page }, use) => use(new CheckoutOverviewPage(page)),
    checkoutCompletePage: ({ page }, use) => use(new CheckoutCompletePage(page)),
});

test.describe('Add item and checkout', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.navigate();
  });

    test('Add items to the Cart', async ({ inventoryPage }) => {
        const desiredProducts = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Onesie'];
        
        for (const product of desiredProducts) {
          await inventoryPage.addProductToCart(product);
        }
        await inventoryPage.checkShoppingCartCount(desiredProducts.length);
        await inventoryPage.clickShoppingCart();

        await inventoryPage.checkUrl('https://www.saucedemo.com/v1/cart.html');

        const cartProducts = await inventoryPage.checkCartProducts();
        expect(cartProducts).toHaveLength(desiredProducts.length);
        expect(cartProducts).toEqual(desiredProducts);

    });

    test('Perform Checkout', async ({ inventoryPage, checkOutYourInfoPage, checkoutOverviewPage, checkoutCompletePage }) => {
      const desiredProduct = ['Sauce Labs Backpack'];
      
      await inventoryPage.addProductToCart(desiredProduct[0]);
      await inventoryPage.checkShoppingCartCount(desiredProduct.length);
      await inventoryPage.clickShoppingCart();

      await inventoryPage.checkUrl('https://www.saucedemo.com/v1/cart.html');

      const cartProducts = await inventoryPage.checkCartProducts();
      expect(cartProducts).toEqual(desiredProduct);

      await inventoryPage.clickCheckout();

      await checkOutYourInfoPage.checkUrl('https://www.saucedemo.com/v1/checkout-step-one.html');

      await checkOutYourInfoPage.fillFirstName('Ram');
      await checkOutYourInfoPage.fillLastName('Bhai');
      await checkOutYourInfoPage.fillZipCode('12345');
      await checkOutYourInfoPage.clickContinueButton();

      await checkOutYourInfoPage.checkUrl('https://www.saucedemo.com/v1/checkout-step-two.html');

      const checkoutProducts = await checkoutOverviewPage.checkCheckoutProducts();
      expect(checkoutProducts).toEqual(desiredProduct);
      await checkoutOverviewPage.clickFinishButton();

      await checkoutCompletePage.checkUrl('https://www.saucedemo.com/v1/checkout-complete.html');
      await checkoutCompletePage.checksubHeader('THANK YOU FOR YOUR ORDER');
  });

});
