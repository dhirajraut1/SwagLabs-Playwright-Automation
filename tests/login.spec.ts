import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.pom';

const test = base.extend<{
    loginPage: LoginPage;
}>({
    loginPage: ({ page }, use) => use(new LoginPage(page)),
});

/*
This test case verifies that an error message is displayed when attempting to log in with an invalid user.
Steps:
1. Navigate to the login page.
2. Fill in the username with 'locked_out_user'.
3. Fill in the password with 'secret_sauce_1'.
4. Click the login button.
5. Check that an error message is displayed indicating the login failure.
*/
test('Login with an Invalid User', {
    tag: ['@login', '@negative']
}, async ({ loginPage }) => {
  await loginPage.navigate();
  await loginPage.fillUserName(process.env.LOCKED_OUT_USERNAME);
  await loginPage.fillPassword(process.env.INVALID_PASSWORD);
  await loginPage.clickLoginButton();
  await loginPage.checkErrorMessage();
});

/*
This test case verifies that a valid user can log in successfully.
Steps:
1. Navigate to the login page.
2. Fill in the username with 'standard_user'.
3. Fill in the password with 'secret_sauce'.
4. Click the login button.
5. Verify that the URL is correct and that the user is redirected to the inventory page.
6. Check that the inventory container is visible and that the 'Products' text is displayed.
*/
test('Login with a valid user', {
    tag: ['@login', '@positive']
}, async ({ page, loginPage }) => {
  await loginPage.navigate();
  await loginPage.fillUserName(process.env.STANDARD_USERNAME);
  await loginPage.fillPassword(process.env.PASSWORD);
  await loginPage.clickLoginButton();
  await loginPage.checkUrl('https://www.saucedemo.com/v1/inventory.html');
  await expect(page.locator('#inventory_container').nth(1)).toBeVisible();
  await expect(page.getByText('Products')).toBeVisible();
});
