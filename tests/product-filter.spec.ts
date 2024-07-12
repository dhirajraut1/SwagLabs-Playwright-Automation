import { test as base, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.pom';
import { LoginPage } from '../pages/login.pom';

const test = base.extend<{
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
}>({
    loginPage: ({ page }, use) => use(new LoginPage(page)),
    inventoryPage: ({ page }, use) => use(new InventoryPage(page))
});

test.describe('Apply Filters', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.fillUserName('standard_user');
    await loginPage.fillPassword('secret_sauce');
    await loginPage.clickLoginButton();
    await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
  });
    /*
    This test case verifies that products can be filtered by name in descending order (Z to A).
    Steps:
    1. Select the filter option 'Name (Z to A)' from the dropdown.
    2. Retrieve the names of all products displayed.
    3. Verify that there are 6 products listed.
    4. Sort the product names in descending order (Z to A) and verify that the displayed order matches the sorted order.
    */
    test('Filter Products by Name - Z to A', {
        tag: ['@purchase', '@filter', '@name' ]
    }, async ({ inventoryPage }) => {
      await inventoryPage.selectProductFilter('Name (Z to A)');

      const productNames = await inventoryPage.getProductNames();
      expect(productNames).toHaveLength(6);

      const sortedProductNames = [...productNames].sort().reverse();
      expect(productNames).toEqual(sortedProductNames);
    }); 

    /*
    This test case verifies that products can be filtered by price in ascending order (Low to High).
    Steps:
    1. Select the filter option 'Price (low to high)' from the dropdown.
    2. Retrieve the prices of all products displayed.
    3. Verify that there are 6 products listed.
    4. Check that each product price is less than or equal to the next product price to ensure correct sorting.
    */
    test('Filter Products by Price - Low to High', {
        tag: ['@purchase', '@filter', '@price' ]
    }, async ({ inventoryPage }) => {
      await inventoryPage.selectProductFilter('Price (low to high)');

      const productPrices = await inventoryPage.getProductPrices();
      expect( productPrices).toHaveLength(6);

      for (let i = 0; i < productPrices.length - 1; i++) {
        expect(productPrices[i]).toBeLessThanOrEqual(productPrices[i + 1]);
      }
    });
});
