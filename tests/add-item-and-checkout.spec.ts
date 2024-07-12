import { test as base, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.pom';
import { InventoryPage } from '../pages/inventory.pom';
import { CheckoutYourInfoPage } from '../pages/checkout-your-info.pom';
import { CheckoutOverviewPage } from '../pages/checkout-overview.pom';
import { CheckoutCompletePage } from '../pages/checkout-complete.pom';

const test = base.extend<{
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    checkOutYourInfoPage: CheckoutYourInfoPage;
    checkoutOverviewPage: CheckoutOverviewPage;
    checkoutCompletePage: CheckoutCompletePage;
}>({
    loginPage: ({ page }, use) => use(new LoginPage(page)),
    inventoryPage: ({ page }, use) => use(new InventoryPage(page)),
    checkOutYourInfoPage: ({ page }, use) => use(new CheckoutYourInfoPage(page)),
    checkoutOverviewPage: ({ page }, use) => use(new CheckoutOverviewPage(page)),
    checkoutCompletePage: ({ page }, use) => use(new CheckoutCompletePage(page)),
});

test.describe('Add item and checkout', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.navigate();
    await loginPage.fillUserName(process.env.STANDARD_USERNAME);
    await loginPage.fillPassword(process.env.PASSWORD);
    await loginPage.clickLoginButton();
    await loginPage.checkUrl('https://www.saucedemo.com/v1/inventory.html');
    await inventoryPage.navigate();
  });

    /*
    This test case verifies that the user can add multiple items to the cart and validate the cart contents.
    Steps:
    1. Define an array of desired products to add to the cart.
    2. Iterate over the array and add each product to the cart.
    3. Check that the shopping cart count matches the number of products added.
    4. Click on the shopping cart to view its contents.
    5. Verify that the URL is correct.
    6. Check that the products in the cart match the desired products and that their count is correct.
    */
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

    /*
    This test case verifies that the user can add an item to the cart, fill out the checkout information, and complete the checkout process.
    Steps:
    1. Define an array with the desired product to add to the cart.
    2. Add the product to the cart and verify the cart count.
    3. Click on the shopping cart to view its contents.
    4. Verify that the redirected URL is correct.
    5. Check that the product in the cart matches the desired product.
    6. Click the checkout button.
    7. Verify that the redirected URL is correct.
    8. Fill out the checkout information form with first name, last name, and zip code.
    9. Click the continue button.
    10. Verify that the redicted URL is correct.
    11. Check that the product on the checkout overview page matches the desired product.
    12. Click the finish button.
    13. Verify that the URL is correct and that the order completion message is displayed.
    */
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
