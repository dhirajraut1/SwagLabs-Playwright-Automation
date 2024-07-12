import { expect, Locator, Page } from '@playwright/test';

export class CheckoutYourInfoPage {
  readonly page: Page;
  readonly elements: {
    firstNameInput : Locator;
    lastNameInput : Locator;
    zipCodeInput : Locator;
    continueButton : Locator;
    cancelButton : Locator;
  };
  
  constructor(page: Page) {
    this.page = page;
    this.elements = {
      firstNameInput: page.getByTestId('firstName'),
      lastNameInput: page.getByTestId('lastName'),
      zipCodeInput: page.getByTestId('postalCode'),
      continueButton: page.getByRole('button', { name: 'CONTINUE'}),
      cancelButton: page.getByRole('button', { name: 'CANCEL'}),
    };
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/v1/checkout-step-one.html');
  }

  async checkUrl(url: string) {
    await expect(this.page).toHaveURL(url);
  }

  async fillFirstName(firstName: string) {
    await this.elements.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.elements.lastNameInput.fill(lastName);
  }

  async fillZipCode(zipCode: string) {
    await this.elements.zipCodeInput.fill(zipCode);
  }

  async clickContinueButton() {
    await this.elements.continueButton.click();
  }

}
