import { expect, Locator, Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly elements: {
    subHeader: Locator;
    successImage: Locator;
  };
  
  constructor(page: Page) {
    this.page = page;
    this.elements = {
      subHeader: page.locator('.complete-header'),
      successImage: page.locator('.pony_express').first(),
    };
  }

  async checkUrl(url: string) {
    await expect(this.page).toHaveURL(url);
  }

  async checksubHeader(text: string){
    return expect(this.elements.subHeader).toContainText(text);
  }

  async checkSuccessImage(){
    return expect(this.elements.successImage).toBeVisible();
  }

}
