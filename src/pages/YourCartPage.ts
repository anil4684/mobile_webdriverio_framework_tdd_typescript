export class YourCartPage {

    private checkOut() {
        return $('~test-CHECKOUT');
    }

    async scrollToCheckout(): Promise<void> {
        await $(
            'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("test-CHECKOUT"))'
        );
    }

    async clickCheckout(): Promise<void> {
        await this.scrollToCheckout();
        await this.checkOut().click();
    }
}