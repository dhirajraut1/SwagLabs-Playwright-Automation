# SwagLabs eCommerce Website Automation

This repository contains automated tests for the SwagLabs e-commerce website using Playwright and TypeScript. This test follows a Page Object Model (POM) where objects for each pages are created and tests are written based on the pages actions.

## Getting Started

To get started, follow these steps:

1. Install the dependencies:

   ```shell
   npm install
   ```

   Make sure to install the playwright dependencies and browsers as well.

   ```shell
   npx playwright install --with-deps
   ```
2. Run the tests:

```shell
npx playwright test --ui
```

## Tests

The tests can be found in the `tests` directory. The tests cover the following scenarios:

1. **Login Tests**

   * **Login with an Invalid User** : Tests the login functionality with an invalid user. Asserts the error message displayed after invalid login.

   * **Login with a Valid User** : Tests the login functionality with a valid user. Asserts the user is logged in and the inventory page is visible.


2. **Filter Tests**

   * **Filter Products by Name - Z to A** : Tests the functionality of filtering products by name from Z to A. Checks for the products sorted in descending order of their names.

   * **Filter Products by Price - Low to High** : Tests the functionality of filtering products by price from low to high. Checks if the products are sorted in ascending order of their prices by comparing the prices.


3. **Checkout Tests**

   * **Add items to the Cart** : Tests the ability to add items to the cart. Logins in the user before adding the items to the cart. Checks for the number and names of the added products.

   * **Perform Checkout** : Tests the checkout process, including filling in personal information and verifying the products in the checkout overview. Checks if the message and images are dispalyed.

## Pages

The tests interact with the following pages:

* **Login Page** : The login page is defined in the `pages/login.pom.ts` file.
* **Inventory Page:** The inventory page is defined in the `pages/inventory.pom.ts` file.
* **Checkout Your Info Page:** The checkout your info page is defined in the `pages/checkout-your-info.pom.ts` file.
* **Checkout Overview Page:** The checkout overview page is defined in the `pages/checkout-overview.pom.ts` file.
* **Checkout Complete Page:** The checkout complete page is defined in the `pages/checkout-complete.pom.ts` file.


## Reports

The test reports are generated in the `test-results` directory.

```shell
npx playwright show-report
```