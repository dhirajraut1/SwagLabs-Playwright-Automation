import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly elements: {
    userNameInput : Locator;
    passwordInput : Locator;
    loginButton : Locator;
    errorText : Locator;
  };
  
  constructor(page: Page) {
    this.page = page;
    this.elements = {
      userNameInput : page.getByTestId('username'),
      passwordInput : page.getByTestId('password'),
      loginButton : page.locator('#login-button'),
      errorText : page.getByTestId('error'),
    };
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/v1/index.html');
  }

  async checkUrl(url: string) {
    await expect(this.page).toHaveURL(url);
  }
  async fillUserName(username) {
    await this.elements.userNameInput.fill(username);
  }

  async fillPassword(password) {
    await this.elements.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.elements.loginButton.click();
  }

  async checkErrorMessage() {
    await expect(this.elements.errorText).toContainText('Epic sadface: Username and password do not match any user in this service');
  }

}
