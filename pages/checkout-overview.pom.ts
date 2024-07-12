import { expect, Locator, Page } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly elements: {
    cartItems : Locator;
    productPrice : Locator;
    productQuantity : Locator;
    totalPrice : Locator;
    finishButton : Locator;
    cancelButton : Locator;
  };
  
  constructor(page: Page) {
    this.page = page;
    this.elements = {
      cartItems: page.locator('.inventory_item_name'),
      productPrice: page.locator('.inventory_item_price'),
      productQuantity: page.locator('.summary_quantity'),
      totalPrice: page.locator('.summary_subtotal_label'),
      finishButton: page.getByRole('link', { name: 'FINISH'}),
      cancelButton: page.getByRole('link', { name: 'CANCEL'}),
    };
  }

  async checkUrl(url: string) {
    await expect(this.page).toHaveURL(url);
  }

  async checkCheckoutProducts(): Promise<string[]> {
    return await this.elements.cartItems.allTextContents();
  }
  async clickFinishButton() {
    await this.elements.finishButton.click();
  }

}
