import { pages } from '../../test/fixtures/pages.fixture.ts';
import checkoutData from '../../src/data/TC_003_CheckOut.json' with { type: 'json' };

describe('TC_003_CheckOut', () => {

it('should complete checkout successfully', async () => {

    // 1. Add product
    await pages.productsPage.addProductToCart(
        checkoutData.productName
    );

    // 2. Click Go To Cart
        await pages.productsPage.clickGoToCart();

    // 3. Scroll and click CHECKOUT
    await pages.yourCartPage.clickCheckout();

    // 4. Enter checkout information
    await pages.checkoutInformationPage.enterCheckoutInformation(
        checkoutData.firstName,
        checkoutData.lastName,
        checkoutData.zipCode
    );

    // 5. Scroll and click CONTINUE
    await pages.checkoutInformationPage.clickContinue();

    // 6. Scroll and click FINISH
    await pages.checkoutOverviewPage.clickFinish();

    // 7. Verify Thank You message
    await pages.checkoutCompletePage.verifyThankYouMessage();
});


});
