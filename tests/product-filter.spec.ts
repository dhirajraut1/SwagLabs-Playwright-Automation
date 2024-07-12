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

    test('Filter Products by Name - A to Z', {
        tag: ['@purchase', '@filter', '@name' ]
    }, async ({ inventoryPage }) => {
      await inventoryPage.selectProductFilter('Name (A to Z)');

      const productNames = await inventoryPage.getProductNames();
      expect(productNames).toHaveLength(6);

      const sortedProductNames = [...productNames].sort();
      expect(productNames).toEqual(sortedProductNames);
    }); 

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
