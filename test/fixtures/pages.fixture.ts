import { LoginPage } from '../../src/pages/LoginPage.ts';
import { ProductsPage } from '../../src/pages/ProductsPage.ts';
import { YourCartPage } from '../../src/pages/YourCartPage.ts';
import { CheckoutInformationPage } from '../../src/pages/CheckoutInformationPage.ts';
import { CheckoutOverviewPage } from '../../src/pages/CheckoutOverviewPage.ts';
import { CheckoutCompletePage } from '../../src/pages/CheckoutCompletePage.ts';

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