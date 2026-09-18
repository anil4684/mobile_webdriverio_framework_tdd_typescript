# Mobile WebDriverIO Automation Framework

A scalable mobile test automation framework built using **WebdriverIO, Appium, TypeScript, Mocha, UiAutomator2, and Allure**.

The framework is currently focused on Android automation using the Sauce Labs Mobile Sample Application and is structured to support multiple environments and future iOS automation.

---

## 1. Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript/TypeScript runtime |
| TypeScript | Programming language |
| WebdriverIO | Mobile automation framework |
| Appium | Mobile automation server |
| UiAutomator2 | Android automation driver |
| Mocha | Test framework |
| Allure | Test reporting |
| Android Emulator | Android test execution |
| VS Code | Development and debugging |

---

## 2. Application Under Test

The current framework automates the **Sauce Labs Mobile Sample Application**.

### Android

```text
Package : com.swaglabsmobileapp
Activity: .SplashActivity
Driver  : UiAutomator2
```

The Android application is maintained inside:

```text
app/android/
```

Current application:

```text
Android.SauceLabs.Mobile.Sample.app.2.7.1.apk
```

---

## 3. Framework Structure

The framework is organized into environment configuration, application binaries, test data, Page Objects, fixtures, hooks, specifications, and reporting.

```text
mobile_webdriverio_framework_tdd
│
├── .vscode
│
├── allure-report
├── allure-results
│
├── app
│   └── android
│       └── Android.SauceLabs.Mobile.Sample.app.2.7.1.apk
│
├── config
│   ├── dev.config.ts
│   ├── env.config.ts
│   ├── qa.config.ts
│   └── uat.config.ts
│
├── env
│   ├── dev.env
│   ├── qa.env
│   └── uat.env
│
├── src
│   ├── data
│   │   ├── TC_001_AddProductToCart.json
│   │   ├── TC_002_RemoveProductToCart.json
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
├── node_modules
├── package.json
├── tsconfig.json
├── wdio.conf.ts
└── README.md
```

> `node_modules`, `allure-report`, and `allure-results` are generated/runtime directories and normally should not be committed to source control.

---

## 4. Configuration Management

The framework supports multiple environments:

```text
DEV
QA
UAT
```

### Environment files

```text
env/
├── dev.env
├── qa.env
└── uat.env
```

### TypeScript configuration

```text
config/
├── dev.config.ts
├── env.config.ts
├── qa.config.ts
└── uat.config.ts
```

This separation allows the test implementation to remain unchanged when switching environments.

---

## 5. Test Data

Test data is maintained separately from the test implementation.

Location:

```text
src/data/
```

Current test data:

```text
TC_001_AddProductToCart.json
TC_002_RemoveProductToCart.json
TC_003_CheckOut.json
```

Keeping test data outside the test scripts improves maintainability, readability, reusability, and data-driven testing.

---

## 6. Page Object Model

The framework follows the **Page Object Model (POM)** design pattern.

Page Objects are maintained under:

```text
src/pages/
```

Current Page Objects:

```text
LoginPage.ts
ProductsPage.ts
YourCartPage.ts
CheckoutInformationPage.ts
CheckoutOverviewPage.ts
CheckoutCompletePage.ts
```

Each Page Object is responsible for the interaction and verification logic related to its application screen.

### Page responsibilities

```text
LoginPage
    └── Login functionality

ProductsPage
    ├── Product search
    ├── Product selection
    ├── Add to cart
    └── Navigate to cart

YourCartPage
    └── Cart operations

CheckoutInformationPage
    └── Customer information

CheckoutOverviewPage
    └── Order review and finish

CheckoutCompletePage
    └── Order completion verification
```

---

## 7. Pages Fixture

The framework uses a centralized **Pages Fixture** so that test cases do not need to create Page Object instances individually.

Location:

```text
test/fixtures/pages.fixture.ts
```

The fixture follows the naming convention:

```text
pages.loginPage
pages.productsPage
pages.yourCartPage
pages.checkoutInformationPage
pages.checkoutOverviewPage
pages.checkoutCompletePage
```

Page Objects are instantiated centrally:

```ts
this.loginPage = new LoginPage();
this.productsPage = new ProductsPage();
this.yourCartPage = new YourCartPage();
this.checkoutInformationPage = new CheckoutInformationPage();
this.checkoutOverviewPage = new CheckoutOverviewPage();
this.checkoutCompletePage = new CheckoutCompletePage();
```

Tests can therefore use:

```ts
await pages.productsPage.addProductToCart('Sauce Labs Backpack');
```

instead of creating a Page Object inside every test.

---

## 8. Login Hook

Login is centralized in:

```text
test/hooks/login.hooks.ts
```

The login hook uses the Pages Fixture:

```ts
import { pages } from '../fixtures/pages.fixture.ts';
import { qaConfig } from '../../config/qa.config.ts';

export async function loginBeforeTest(): Promise<void> {
    await pages.loginPage.login(
        qaConfig.username,
        qaConfig.password
    );
}
```

The hook is configured through WebdriverIO's test lifecycle so that login is performed before each test.

This provides test independence while avoiding duplicate login implementation across test cases.

---

## 9. Test Specifications

Test specifications are maintained under:

```text
test/specs/
```

Current specifications include:

```text
TC_001_SearchProduct.spec.ts
TC_002_AddProductToCart.spec.ts
TC_003_CheckOut.spec.ts
```

The specifications contain business-level test flow while locators and application-specific interactions remain inside Page Objects.

Example:

```ts
await pages.productsPage.addProductToCart(productName);
await pages.productsPage.clickGoToCart();
```

---

## 10. Appium Setup

The framework currently uses a manually started Appium server.

Start Appium with:

```bash
appium --address 127.0.0.1 --port 4723
```

The WebdriverIO configuration connects to:

```text
Host: 127.0.0.1
Port: 4723
```

Verify the Android device/emulator:

```bash
adb devices
```

Expected:

```text
emulator-5554    device
```

---

## 11. Android Automation

The framework uses:

```text
Automation Name: UiAutomator2
```

Accessibility identifiers are preferred where available.

Example:

```ts
$('~test-Cart')
```

XPath is used where a more complex element relationship needs to be identified.

For products that are not initially visible, Android `UiScrollable` is used where required.

---

## 12. Test Execution

### Execute all tests

```bash
npm run execute_all
```

Equivalent WebdriverIO command:

```bash
npx wdio run wdio.conf.ts
```

### Execute individual tests

```bash
npm run execute_tc001
```

```bash
npm run execute_tc002
```

```bash
npm run execute_tc003
```

A specific test can also be executed directly:

```bash
npx wdio run wdio.conf.ts --spec test/specs/TC_003_CheckOut.spec.ts
```

---

## 13. Allure Reporting

The framework uses **Allure Reporter**.

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

### Execute tests and generate the report

```bash
npm run test-with-report
```

The complete workflow is:

```text
Clean previous results
        ↓
Execute tests
        ↓
Generate Allure report
        ↓
Open Allure report
```

---

## 14. Debugging

The framework supports debugging through VS Code.

Open:

```text
Run and Debug
```

using:

```text
Ctrl + Shift + D
```

Select the configured WebdriverIO debug configuration and press:

```text
F5
```

The test must be launched through WebdriverIO rather than directly through Node.js.

Do not use the VS Code `Debug Test` CodeLens if it launches the `.spec.ts` file directly.

Correct execution flow:

```text
VS Code
   ↓
WebdriverIO
   ↓
Mocha
   ↓
Test Specification
   ↓
Appium
   ↓
Android Application
```

---

## 15. Framework Design Principles

### Separation of concerns

```text
Test Specification
        ↓
Business Flow

Page Object
        ↓
Application Interaction

Fixture
        ↓
Page Object Creation

Configuration
        ↓
Environment Settings

JSON
        ↓
Test Data
```

### Reusability

Common functionality such as login and Page Object creation is centralized.

### Maintainability

Locators and application-specific interactions are maintained inside Page Objects.

### Test independence

Each test performs its required setup and does not depend on another test's execution.

### Scalability

The framework structure allows additional Page Objects, test cases, environments, devices, and platforms to be added without major restructuring.

---

## 16. Git Ignore Recommendations

The following generated/local directories should normally not be committed:

```text
node_modules/
allure-results/
allure-report/
```

Environment files containing credentials should also be handled carefully and should not be committed if they contain secrets.

---

## 17. Future Enhancements

The framework can be extended with:

- iOS automation
- IPA application support
- Additional Android devices
- Parallel execution
- Reusable utilities
- Screenshot capture on failure
- Video capture
- Enhanced Allure attachments
- API integration
- CI/CD integration
- Jenkins integration
- GitHub Actions
- Device farm execution
- Additional data-driven scenarios
- Retry and failure-handling strategies
- Separate BDD framework
- Cross-platform execution

---

## 18. Quick Start

### Step 1 - Install dependencies

```bash
npm install
```

### Step 2 - Start Android emulator

Start the configured Android emulator.

### Step 3 - Verify device

```bash
adb devices
```

### Step 4 - Start Appium

```bash
appium --address 127.0.0.1 --port 4723
```

### Step 5 - Execute tests

```bash
npm run execute_all
```

### Step 6 - Generate Allure report

```bash
npm run allure-report
```

---

## 19. Framework Architecture

```text
                         Mobile Automation Framework
                                      │
             ┌────────────────────────┼────────────────────────┐
             │                        │                        │
        Configuration              Test Data              Test Specs
             │                        │                        │
        DEV / QA / UAT              JSON                    Mocha
             │                        │                        │
             └────────────────────────┼────────────────────────┘
                                      │
                                      ▼
                               Pages Fixture
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
                              Android Application
                                      │
                                      ▼
                                Allure Report
```

---

## 20. Summary

This framework provides a structured foundation for mobile test automation using:

- WebdriverIO
- Appium
- TypeScript
- Mocha
- UiAutomator2
- Page Object Model
- Pages Fixture
- JSON test data
- DEV/QA/UAT configuration
- Allure reporting

The architecture is designed to remain clean and maintainable as the number of test cases, environments, devices, and supported mobile platforms increases.
