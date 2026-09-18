# Mobile WebDriverIO Automation Framework

A scalable mobile test automation framework built using **WebdriverIO, Appium, TypeScript, Mocha, and Allure** for automating Android mobile applications.

The framework follows **Page Object Model (POM)** and uses a centralized **Pages Fixture** to manage Page Object instances.

---

## 1. Technology Stack

| Technology       | Version / Purpose         |
| ---------------- | ------------------------- |
| Node.js          | 24.x                      |
| TypeScript       | Latest configured version |
| WebdriverIO      | 9.x                       |
| Appium           | 3.x                       |
| UiAutomator2     | Android automation        |
| Mocha            | Test framework            |
| Allure           | Test reporting            |
| Android Emulator | Android 8.0 / API 26      |
| VS Code          | Development / Debugging   |


| Technology      | Purpose                       |
|-----------------|-------------------------------|
| Node.js         | JavaScript/TypeScript runtime |
| TypeScript      | Programming language          |
| WebdriverIO     | Mobile automation framework  |
| Appium          | Mobile automation server     |
| UiAutomator2    | Android automation driver    |
| Mocha           | Test framework                |
| Allure          | Test reporting               |
| Android Emulator| Android test execution        |
| VS Code         | Development and debugging     |

---

## 2. Application Under Test

The current framework automates the **Sauce Labs Mobile Sample Application**.

### Android Application

```text
Application: Sauce Labs Mobile Sample App
Package:     com.swaglabsmobileapp
Activity:    .SplashActivity
Platform:    Android
Automation:  UiAutomator2
```

Application APK:

```text
app/android/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk
```

---

## 3. Framework Architecture

The framework follows a layered structure:

```text
Test Specifications
        │
        ▼
     Fixtures
        │
        ▼
    Page Objects
        │
        ▼
      Appium
        │
        ▼
 Android Application
```

### Main design principles

* Page Object Model
* Centralized Page Object creation
* Reusable login hook
* Test data separated from test scripts
* Environment-specific configuration
* Allure reporting
* TypeScript
* Mocha
* Reusable utility methods
* Independent test execution

---

## 4. Project Structure

```text
mobile_webdriverio_framework_tdd
│
├── app
│   └── android
│       └── Android.SauceLabs.Mobile.Sample.app.2.7.1.apk
│
├── config
│   └── qa.config.ts
│
├── env
│   └── qa.env
│
├── src
│   ├── data
│   │   ├── TC_002_AddProductToCart.json
│   │   └── TC_003_CheckOut.json
│   │
│   └── pages
│       ├── LoginPage.ts
│       ├── ProductsPage.ts
│       ├── YourCartPage.ts
│       ├── CheckoutInformationPage.ts
│       ├── CheckoutOverviewPage.ts
│       └── CheckoutCompletePage.ts
│
├── test
│   ├── fixtures
│   │   └── pages.fixture.ts
│   │
│   ├── hooks
│   │   └── login.hooks.ts
│   │
│   └── specs
│       ├── TC_001_SearchProduct.spec.ts
│       ├── TC_002_AddProductToCart.spec.ts
│       └── TC_003_CheckOut.spec.ts
│
├── allure-results
├── allure-report
├── wdio.conf.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

# 5. Page Object Model

Each application screen is represented by a dedicated Page Object.

For example:

```text
LoginPage
ProductsPage
YourCartPage
CheckoutInformationPage
CheckoutOverviewPage
CheckoutCompletePage
```

Page Objects contain:

* Locators
* Page-specific actions
* Reusable methods
* Verification methods

Test cases should contain business-level test flow rather than locator implementation.

### Example

Instead of:

```ts
await $('~test-Username').setValue(username);
await $('~test-Password').setValue(password);
await $('~test-LOGIN').click();
```

the test uses:

```ts
await pages.loginPage.login(username, password);
```

This keeps the test readable and maintainable.

---

# 6. Pages Fixture

The framework uses a centralized `PagesFixture` to create and manage Page Object instances.

Location:

```text
test/fixtures/pages.fixture.ts
```

Example:

```ts
export class PagesFixture {

    loginPage: LoginPage;
    productsPage: ProductsPage;
    yourCartPage: YourCartPage;
    checkoutInformationPage: CheckoutInformationPage;
    checkoutOverviewPage: CheckoutOverviewPage;
    checkoutCompletePage: CheckoutCompletePage;

    constructor() {
        this.loginPage = new LoginPage();
        this.productsPage = new ProductsPage();
        this.yourCartPage = new YourCartPage();
        this.checkoutInformationPage = new CheckoutInformationPage();
        this.checkoutOverviewPage = new CheckoutOverviewPage();
        this.checkoutCompletePage = new CheckoutCompletePage();
    }
}

export const pages = new PagesFixture();
```

Tests can therefore access Page Objects using:

```ts
pages.loginPage
pages.productsPage
pages.yourCartPage
pages.checkoutInformationPage
pages.checkoutOverviewPage
pages.checkoutCompletePage
```

This eliminates repetitive Page Object creation inside individual test cases.

---

# 7. Login Hook

Login is centralized in:

```text
test/hooks/login.hooks.ts
```

The hook uses the Pages Fixture:

```ts
export async function loginBeforeTest(): Promise<void> {
    await pages.loginPage.login(
        qaConfig.username,
        qaConfig.password
    );
}
```

The WDIO configuration executes the login hook before each test.

This provides test independence while avoiding duplicate login code in every specification.

---

# 8. Test Cases

Current automated scenarios include:

### TC_001 - Search Product

Validates that a product can be searched/found in the application.

```text
Login
  ↓
Products
  ↓
Search Product
  ↓
Verify Product
```

### TC_002 - Add Product To Cart

```text
Login
  ↓
Products
  ↓
Select Product
  ↓
Add To Cart
  ↓
Go To Cart
  ↓
Verify Product
```

### TC_003 - Checkout

```text
Login
  ↓
Products
  ↓
Add Product
  ↓
Go To Cart
  ↓
Checkout
  ↓
Enter Customer Information
  ↓
Continue
  ↓
Finish
  ↓
Verify Order Completion
```

---

# 9. Test Data Management

Test data is maintained separately from test scripts using JSON files.

Example:

```text
src/data/TC_002_AddProductToCart.json
src/data/TC_003_CheckOut.json
```

This separates:

```text
Test Logic
     +
Test Data
```

and makes the framework easier to maintain.

Example:

```json
{
    "productName": "Sauce Labs Backpack"
}
```

---

# 10. Environment Configuration

Environment-specific configuration is maintained separately.

Current environment:

```text
QA
```

Configuration:

```text
config/qa.config.ts
env/qa.env
```

The framework can be extended to support:

```text
QA
UAT
PROD
```

without changing the test implementation.

---

# 11. WebdriverIO Configuration

The main configuration file is:

```text
wdio.conf.ts
```

It contains:

* WebdriverIO runner configuration
* Appium server configuration
* Android capabilities
* Test specifications
* Mocha configuration
* Allure reporting
* Global hooks
* TypeScript configuration

Current Appium endpoint:

```text
127.0.0.1:4723
```

---

# 12. Appium Setup

Start the Appium server manually:

```bash
appium --address 127.0.0.1 --port 4723
```

Verify the Android device:

```bash
adb devices
```

Expected:

```text
emulator-5554    device
```

The Android emulator must be running before executing the tests.

---

# 13. Installation

Clone the project and navigate to the framework directory:

```bash
cd D:/Automation/Projects/mobile_webdriverio_framework_tdd
```

Install dependencies:

```bash
npm install
```

Verify Node.js:

```bash
node --version
```

Verify npm:

```bash
npm --version
```

Verify Appium:

```bash
appium --version
```

Verify ADB:

```bash
adb devices
```

---

# 14. Execute Individual Test Cases

### TC_001

```bash
npm run execute_tc001
```

### TC_002

```bash
npm run execute_tc002
```

### TC_003

```bash
npm run execute_tc003
```

---

# 15. Execute All Tests

Run all test cases:

```bash
npm run execute_all
```

Equivalent WDIO command:

```bash
npx wdio run wdio.conf.ts
```

---

# 16. Run a Specific Test Using WDIO

A specific test can also be executed directly:

```bash
npx wdio run wdio.conf.ts --spec test/specs/TC_002_AddProductToCart.spec.ts
```

For example:

```bash
npx wdio run wdio.conf.ts --spec test/specs/TC_003_CheckOut.spec.ts
```

---

# 17. Allure Reporting

The framework uses **Allure Reporter** for test reporting.

### Clean previous results

```bash
npm run clean-allure
```

### Generate report

```bash
npm run allure-generate
```

### Open report

```bash
npm run allure-open
```

### Generate and open report

```bash
npm run allure-report
```

---

# 18. Execute Tests and Generate Allure Report

The complete workflow can be executed using:

```bash
npm run test-with-report
```

This performs:

```text
1. Clean previous Allure results
        ↓
2. Execute all test cases
        ↓
3. Generate Allure report
        ↓
4. Open Allure report
```

---

# 19. Debugging Tests in VS Code

The framework supports debugging through VS Code.

Use the configured launch configuration:

```text
Debug TC_003 Checkout
```

Open:

```text
Run and Debug
```

or press:

```text
Ctrl + Shift + D
```

Select:

```text
Debug TC_003 Checkout
```

and press:

```text
F5
```

### Important

Do not use the CodeLens:

```text
Debug Test
```

directly above the Mocha `describe()` or `it()` block.

The test must be launched through **WebdriverIO**, otherwise Mocha globals such as:

```text
describe
it
before
```

will not be available.

---

# 20. Locator Strategy

The framework primarily uses Android accessibility identifiers where available.

Example:

```ts
$('~test-Cart')
```

For complex product structures, XPath is used.

Example:

```text
test-Item
    └── Product Name
          └── test-ADD TO CART
```

The framework also uses Android `UiScrollable` where required for products that are not initially visible.

Example concept:

```text
UiScrollable
      ↓
scrollTextIntoView()
      ↓
Product
```

---

# 21. Test Independence

Each test performs its own login through the global `beforeTest` hook.

This ensures:

* Tests can run independently
* Tests do not depend on execution order
* Individual tests can be executed using `--spec`
* Parallel execution can be considered later

---

# 22. Coding Guidelines

### Test cases should contain business flow

Preferred:

```ts
await pages.productsPage.addProductToCart(productName);
```

Avoid placing locator implementation directly inside test cases.

### Page Objects should contain application interaction

Example:

```ts
async clickGoToCart(): Promise<void> {
    await this.cartButton.click();
}
```

### Test data should remain outside test logic

Preferred:

```ts
const productName = testData.productName;
```

rather than hard-coding test data throughout the test.

---

# 23. Future Enhancements

The framework is designed to evolve with additional capabilities.

Planned enhancements include:

* iOS automation
* IPA application support
* Multiple environments
* Parallel execution
* Reusable utility layer
* API integration
* Retry mechanism
* Screenshot capture on failure
* Video capture
* Enhanced Allure attachments
* CI/CD integration
* GitHub Actions / Jenkins integration
* Docker-based execution where applicable
* Device farm integration
* BDD framework as a separate project
* Additional mobile platforms and devices

---

# 24. Framework Benefits

The framework provides:

* **Maintainability** through Page Object Model
* **Reusability** through centralized fixtures
* **Readability** through business-oriented test cases
* **Scalability** through modular architecture
* **Test independence** through centralized login setup
* **Data separation** through JSON test data
* **Environment flexibility** through configuration files
* **Reporting** through Allure
* **Debugging** through VS Code
* **Type safety** through TypeScript

---

# 25. Quick Start

The basic workflow is:

```bash
# Install dependencies
npm install

# Start Appium
appium --address 127.0.0.1 --port 4723

# Verify device
adb devices

# Execute all tests
npm run execute_all

# Generate Allure report
npm run allure-report
```

---

## Framework Summary

```text
                 Mobile WebDriverIO Framework
                            │
             ┌──────────────┴──────────────┐
             │                             │
        Test Specs                    Test Data
             │                             │
             ▼                             ▼
       Pages Fixture                    JSON
             │
             ▼
       Page Objects
             │
             ▼
        WebdriverIO
             │
             ▼
          Appium
             │
             ▼
        UiAutomator2
             │
             ▼
       Android Device
```

The framework provides a clean foundation for building a scalable **enterprise-level mobile automation solution** using WebdriverIO, Appium, TypeScript, Mocha, Page Object Model, Fixtures, and Allure reporting.
