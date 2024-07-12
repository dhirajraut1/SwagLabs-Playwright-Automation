import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly elements: {
    productSortContainer : Locator;
    inventoryItems : Locator;
    productName : Locator;
    productPrice : Locator;
    productAddToCartButton : Locator;
    productRemoveButton : Locator;
    shoppingCart : Locator;
    cartItems : Locator;
    checkoutButton : Locator;

  };
  
  constructor(page: Page) {
    this.page = page;
    this.elements = {
      productSortContainer: page.getByRole('combobox'),
      inventoryItems: page.locator('.inventory_item'),
      productName: page.locator('.inventory_item_name'),
      productPrice: page.locator('.inventory_item_price'),
      productAddToCartButton: page.getByRole('button', { name: 'ADD TO CART'}),
      productRemoveButton: page.getByRole('button', { name: 'REMOVE'}),
      shoppingCart: page.locator('#shopping_cart_container'),
      cartItems: page.locator('.inventory_item_name'),
      checkoutButton: page.getByRole('link', { name: 'CHECKOUT' }),
    };
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/v1/inventory.html');
  }

  async checkUrl(url: string) {
    await expect(this.page).toHaveURL(url);
  }

  async selectProductFilter(filter: string) {
    await this.elements.productSortContainer.selectOption(filter);
  }

  async getProductNames(): Promise<string[]> {
    return await this.elements.productName.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const priceStrings = await this.elements.productPrice.allTextContents();
    return priceStrings.map(price => parseFloat(price.replace('$', '')));
  }

  async addProductToCart(productName: string) {
    const item = this.elements.inventoryItems.filter({ hasText: productName });
    const addButton = item.locator(this.elements.productAddToCartButton);
    await addButton.click();
  }

  async checkShoppingCartCount(count: number) {
    await expect(this.elements.shoppingCart).toHaveText(`${count}`);
  }

  async clickShoppingCart() {
    await this.elements.shoppingCart.click();
  }

  async checkCartProducts(): Promise<string[]> {
    return await this.elements.cartItems.allTextContents();
  }

  async clickCheckout() {
    await this.elements.checkoutButton.click();
  }

}
