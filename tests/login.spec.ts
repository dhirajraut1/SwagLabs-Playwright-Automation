import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.pom';

const test = base.extend<{
    loginPage: LoginPage;
}>({
    loginPage: ({ page }, use) => use(new LoginPage(page)),
});

test('Login with an Invalid User', {
    tag: ['@login', '@negative']
}, async ({ loginPage }) => {
  await loginPage.navigate();
  await loginPage.fillUserName('locked_out_user');
  await loginPage.fillPassword('secret_sauce_1');
  await loginPage.clickLoginButton();
  await loginPage.checkErrorMessage();
});

test('Login with a valid user', {
    tag: ['@login', '@positive']
}, async ({ page, loginPage }) => {
  await loginPage.navigate();
  await loginPage.fillUserName('standard_user');
  await loginPage.fillPassword('secret_sauce');
  await loginPage.clickLoginButton();
  await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
  await expect(page.locator('#inventory_container').nth(1)).toBeVisible();
  await expect(page.getByText('Products')).toBeVisible();
});
