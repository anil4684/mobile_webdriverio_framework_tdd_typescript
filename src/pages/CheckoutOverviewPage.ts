export class CheckoutOverviewPage {

    private finishButton() {
        return $('~test-FINISH');
    }

    async scrollToFinish(): Promise<void> {
        await $(
            'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("test-FINISH"))'
        );
    }

    async clickFinish(): Promise<void> {
        await this.scrollToFinish();
        await this.finishButton().click();
    }
}   